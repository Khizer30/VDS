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
from supabase.client import Client, PostgrestAPIResponse
from numpy import ndarray
from typing import List, Tuple

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


    # Process New Vehicle
    def process(
            self,
            image_name: str,
            image: ndarray
    ) -> None:
        make, colour = self.classify(image)
        number_plate: str = self.extract_number_plate(image_name, image)
        valid_vehicle: bool = self.validate_vehicle(make, colour, number_plate)

        print("")
        print("DETECTION")
        print(f"Vehicle Image: {image_name}.png, Make: {make}, Colour: {colour}, Number Plate: {number_plate}")

        if valid_vehicle:
            print("Entry Allowed. Lifting Barrier...")
        else:
            print("ALERT! Entry Denied. Vehicle Not Registered.")

        print("")


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

        for i, text in enumerate(output):
            output[i] = text.upper().replace("-", " ").replace(".", " ").replace(":", " ").replace(";", " ").replace("\"", " ").replace("\'", " ").replace("[", " ").replace("]", " ")

        output = self.split_elements(output)

        for text in output:
            if (len(text) == 2 or len(text) == 3 or len(text) == 4) and code == "":
                text = text.replace("2", "Z").replace("0", "O")

                if text.isalpha():
                    code = text

            if (len(text) == 3 or len(text) == 4) and text.isdigit() and number == "":
                number = text

            if (len(text) == 5 or len(text) == 6) and bool(search(r"(?=^[A-Za-z]{2,4}\d{3,4}$)", text)):
                code = text
                number = ""

        return f"{code}{number}"


    # Validate Vehicle
    def validate_vehicle(
            self,
            make: str,
            colour: str,
            number_plate: str
    ) -> bool:
        flag: bool = False

        try:
            # Find Colour & Make ID
            colour_response: PostgrestAPIResponse = self.client.table("Colour").select("id").eq("name", colour).execute()
            make_response: PostgrestAPIResponse = self.client.table("Make").select("id").eq("name", make).execute()

            colour_id: int = colour_response.data[0]["id"]
            make_id: int = make_response.data[0]["id"]

            # Check If Vehicle Exists
            vehicle_response: PostgrestAPIResponse = self.client.table("Vehicle").select("*").eq("makeID", make_id).eq("colourID", colour_id).eq("numberPlate", number_plate).execute()

            if vehicle_response.data:
                # Insert Detection Record
                vehicle_id: int = vehicle_response.data[0]["id"]

                self.client.table("Detection").insert({
                    "make": make, "colour": colour, "numberPlate": number_plate, "vehicleID": vehicle_id, "timestamp": datetime.now().isoformat()
                }).execute()

                flag = True
        except:
            print("Database Connection Error")

        return flag
