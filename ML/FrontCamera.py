import cv2 as cv
from ultralytics import YOLO
from datetime import datetime
from os import environ
from logging import getLogger, ERROR
from threading import Thread
from cv2 import VideoCapture, ROTATE_90_CLOCKWISE, WINDOW_NORMAL
from ultralytics.engine.results import Results
from numpy import ndarray
from typing import Dict, List, Tuple, Union
from VDS import VDS

# Configuration of Model Testing
video_location: str = "dataset/Video.mp4"
video_landscape: bool = True
video_rotate: bool = False
show_count_line: bool = True
show_annotated_frame: bool = False
count_line_position: int = 600
count_line_offset: int = 100
skip_frames: int = 10
save_dir: str = "Extracted Vehicles"

# Configuration of Barrier Testing
# video_location: str = "dataset/A.mp4"
# video_landscape: bool = True
# video_rotate: bool = False
# show_count_line: bool = True
# show_annotated_frame: bool = False
# count_line_position: int = 850
# count_line_offset: int = 100
# skip_frames: int = 10
# save_dir: str = "Extracted Vehicles"

# Height & Width
width: int = 854 if video_landscape else 480
height: int = 480 if video_landscape else 854

# OpenCV Configuration
cv.namedWindow("Front Camera", WINDOW_NORMAL)
cv.resizeWindow("Front Camera", width, height)

# Suppress Ultralytics Logs
environ["YOLO_VERBOSE"] = "False"
getLogger("ultralytics").setLevel(ERROR)
getLogger("ultralytics.yolo.engine.model").setLevel(ERROR)

# Setup
model_location: str = "models/Vehicle Extraction Model.pt"
model: YOLO = YOLO(model_location, task = "detect", verbose = False)
cap: VideoCapture = cv.VideoCapture(video_location)
vds: VDS = VDS()

# Front Camera
class FrontCamera:
    # Constructor
    def __init__(
            self
    ) -> None:
        self.counter: int = 0
        self.time: int = 0
        self.detected: Dict[int, Dict[str, Union[int, bool]]] = { }


    # Start
    def start(
            self
    ) -> None:
        # Loop Over Every Frame
        while cap.isOpened():
            success, frame = cap.read()

            if success:
                self.time = (self.time + 1) % skip_frames

                # Rotate Frame
                if video_rotate:
                    frame = cv.rotate(frame, ROTATE_90_CLOCKWISE)

                # Frame Height & Frame Width
                frame_height, frame_width = frame.shape[:2]

                # Detection Line
                if show_count_line:
                    cv.line(frame, (25, count_line_position), (frame_width - 25, count_line_position), (0, 255, 0), 3)

                if self.time != 0:
                    cv.imshow("Front Camera", frame)
                else:
                    # Localize Vehicle
                    results: List[Results] = model.track(frame, persist = True)

                    if len(results) != 0:
                        # Check Every Detection Box
                        for box in results[0].boxes:
                            if box.id:
                                x, y, w, h = box.xywh[0]
                                x, y, w, h = int(x), int(y), int(w), int(h)

                                # Draw Center Dot on Vehicle
                                if show_count_line:
                                    center: Tuple[int, int] = (x, y)
                                    cv.circle(frame, center, 3, (0, 0, 255), -1)

                                detected_class: int = int(box.cls[0])
                                detected_id: int = int(box.id[0])

                                if detected_class == 2:
                                    # Update Detected Vehicle Object
                                    if detected_id not in self.detected:
                                        self.detected[detected_id] = { "x": x, "y": y, "extracted": False }
                                    else:
                                        self.detected[detected_id]["x"] = x
                                        self.detected[detected_id]["y"] = y

                                    # Check If Vehicle Passes The Line
                                    if not self.detected[detected_id]["extracted"] and (count_line_position + count_line_offset) > y > (count_line_position - count_line_offset):
                                        self.counter += 1
                                        self.detected[detected_id]["extracted"] = True

                                        if show_count_line:
                                            cv.line(frame, (25, count_line_position), (frame_width - 25, count_line_position), (255, 255, 0), 3)

                                        # Save Cropped Image
                                        image_name: str = datetime.now().strftime("%m %d %H %M %S")
                                        cropped_image: ndarray = frame[int(y - h / 2):int(y + h / 2), int(x - w / 2):int(x + w / 2)]
                                        cv.imwrite(f"{save_dir}/{image_name}.png", cropped_image)

                                        # Process Image in Thread
                                        thread: Thread = Thread(target = vds.process, args = (image_name, cropped_image))
                                        thread.start()

                    if show_annotated_frame:
                        # Plot Box on Frame
                        frame: ndarray = results[0].plot()

                    # Display Frame
                    cv.imshow("Front Camera", frame)

                if cv.waitKey(1) & 0xFF == ord("q"):
                    break
            else:
                break

        # Clear Memory
        cap.release()
        cv.destroyAllWindows()

# Main
if __name__ == "__main__":
    front_camera = FrontCamera()
    front_camera.start()
