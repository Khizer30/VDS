import cv2 as cv
from ultralytics import YOLO
from easyocr import Reader
from supabase import create_client
from dotenv import load_dotenv
from os import getenv
from re import search
from datetime import datetime
from cv2 import INTER_CUBIC, COLOR_BGR2GRAY
from ultralytics.engine.results import Results
from supabase.client import Client
from numpy import ndarray
from typing import Dict, List, Tuple, Union
from Barrier import open_barrier

# Configuration
vehicle_folder: str = "Extracted Vehicles"
number_plate_folder: str = "Extracted Number Plates"
make_model_location: str = "models/Vehicle Make & Model.pt"
colour_model_location: str = "models/Vehicle Colour.pt"
number_plate_model_location: str = "models/Number Plate Extraction Model.pt"

# Environment Variables
load_dotenv()
SUPABASE_URL: str = getenv("SUPABASE_URL")
SUPABASE_KEY: str = getenv("SUPABASE_KEY")

# Vehicle Detection System Class
class VDS:
    # Constructor
    def __init__(
            self
    ) -> None:
        self.make_model: YOLO = YOLO(make_model_location, task = "classify", verbose = False)
        self.colour_model: YOLO = YOLO(colour_model_location, task = "classify", verbose = False)
        self.number_plate_model: YOLO = YOLO(number_plate_model_location, task = "detect", verbose = False)
        self.reader: Reader = Reader(["en"], gpu = False, verbose = False)
        self.client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        self.makes: List[Dict[str, Union[int, str]]] = self.client.table("Make").select("*").execute().data
        self.colours: List[Dict[str, Union[int, str]]] = self.client.table("Colour").select("*").execute().data


    # Process New Vehicle
    def process(
            self,
            image_name: str,
            image: ndarray
    ) -> None:
        make, colour = self.classify(image)
        number_plate: str = self.extract_number_plate(image_name, image)
        valid_vehicle, message = self.validate_vehicle(make, colour, number_plate)

        print("")
        print("DETECTION")
        print(f"Vehicle Image: {image_name}.png, Make: {make}, Colour: {colour}, Number Plate: {number_plate}")

        if valid_vehicle:
            print("Entry Allowed. Lifting Barrier...")
            print(f"{message}")

            # Open Barrier
            # open_barrier()
        else:
            print("Entry Denied.")
            print(f"{message}")


    # Classify
    def classify(
            self,
            image: ndarray
    ) -> Tuple[str, str]:
        make_results: List[Results] = self.make_model.predict(image, conf = 0.25)
        colour_results: List[Results] = self.colour_model.predict(image, conf = 0.25)

        predicted_make: str = self.make_model.names[make_results[0].probs.top1]
        predicted_colour: str = self.colour_model.names[colour_results[0].probs.top1]

        return predicted_make, predicted_colour


    # Split Elements
    def split_elements(
            self,
            arr: List[str]
    ) -> List[str]:
        result: List[str] = []

        for item in arr:
            if " " in item:
                result.extend(item.split(" "))
            elif "," in item:
                result.extend(item.split(","))
            else:
                result.append(item)

        return result


    # Read Images
    def extract_number_plate(
            self,
            image_name: str,
            image: ndarray
    ) -> str:
        save_image_path: str = f"{number_plate_folder}/{image_name}.png"
        cropped_image: ndarray = image
        results: List[Results] = self.number_plate_model.predict(image)

        for box in results[0].boxes:
            x, y, w, h = box.xywh[0]
            x, y, w, h = int(x), int(y), int(w), int(h)

            cropped_image = image[int(y - h / 2):int(y + h / 2), int(x - w / 2):int(x + w / 2)]

            scale_factor: int = 5
            h, w = cropped_image.shape[:2]
            cropped_image = cv.resize(cropped_image, (w * scale_factor, h * scale_factor), interpolation = INTER_CUBIC)

            cropped_image = cv.cvtColor(cropped_image, COLOR_BGR2GRAY)

            cropped_image = cv.bilateralFilter(cropped_image, 10, 10, 25)

            cv.imwrite(save_image_path, cropped_image)

        return self.ocr(cropped_image)


    # OCR Image
    def ocr(
            self,
            image: ndarray
    ) -> str:
        code: str = ""
        number: str = ""
        output: List[str] = self.reader.readtext(image, detail = 0, paragraph = False)
        extras: List[str] = ["ICT", "ISLAMABAD", "PUNJAB"]

        for i, text in enumerate(output):
            output[i] = text.upper().replace("-", " ").replace(".", " ").replace(":", " ").replace(";", " ").replace("\"", " ").replace("\'", " ").replace("[", " ").replace("]", " ")

        output = self.split_elements(output)

        for text in output:
            if 2 <= len(text) <= 3 and code == "":
                text = text.replace("2", "Z").replace("0", "O")

                if text.isalpha() and text not in extras:
                    code = text

            if 2 <= len(text) <= 4 and text.isdigit() and number == "":
                number = text

            # Adjust For Those Numbers Plates With Model's Year In It
            if 3 <= len(text) <= 4 and text.isdigit() and len(number) == 2:
                number = text

            if 5 <= len(text) <= 6 and bool(search(r"(?=^[A-Za-z]{2,4}\d{3,4}$)", text)):
                code = text
                number = ""

        return f"{code}{number}"


    # Find ID
    def find_id(
            self,
            attribute: str,
            name: str
    ) -> int:
        i: int = -1

        if attribute == "make":
            for x in self.makes:
                if x["name"] == name:
                    i = x["id"]
                    break
        else:
            for x in self.colours:
                if x["name"] == name:
                    i = x["id"]
                    break

        return i


    # Validate Vehicle
    def validate_vehicle(
            self,
            make: str,
            colour: str,
            number_plate: str
    ) -> Tuple[bool, str]:
        flag: bool = False
        message: str = ""

        try:
            # Check If Vehicle Exists
            vehicle_response: List[Dict[str, Union[int, str]]] = self.client.table("Vehicle").select("*").eq("numberPlate", number_plate).execute().data

            if vehicle_response:
                # Find Make ID & Colour ID
                make_id: int = self.find_id("make", make)
                colour_id: int = self.find_id("colour", colour)

                # Mismatches
                if make_id != vehicle_response[0]["makeID"] and colour_id != vehicle_response[0]["colourID"]:
                    message = "Make & Colour Mismatch!"

                if make_id != vehicle_response[0]["makeID"]:
                    message = "Make Mismatch!"

                if colour_id != vehicle_response[0]["colourID"]:
                    message = "Colour Mismatch!"

                # Insert Detection Record
                vehicle_id: int = vehicle_response[0]["id"]

                self.client.table("Detection").insert({
                    "make": make, "colour": colour, "numberPlate": number_plate, "vehicleID": vehicle_id, "timestamp": datetime.now().isoformat()
                }).execute()

                flag = True
            else:
                message = "Vehicle Not Registered!"
        except:
            message = "Database Connection Error"

        return flag, message
