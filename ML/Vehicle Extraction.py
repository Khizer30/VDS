import cv2 as cv
from ultralytics import YOLO
from datetime import datetime
from threading import Thread
from cv2 import VideoCapture, ROTATE_90_CLOCKWISE, WINDOW_NORMAL
from ultralytics.engine.results import Results
from numpy import ndarray
from typing import Dict, List, Tuple, Union
from VDS import VDS

# Configuration
# 1.MOV
model_location: str = "models/Vehicle Extraction Model.pt"
video_location: str = "dataset/1.mov"
video_landscape: bool = True
video_rotate: bool = False
show_count_line: bool = True
show_annotated_frame: bool = False
count_line_position: int = 1500
count_line_offset: int = 25
skip_frames: int = 15
save_dir: str = "Extracted Vehicles"

# Height & Width
width: int = 854 if video_landscape else 480
height: int = 480 if video_landscape else 854

# OpenCV Configuration
cv.namedWindow("Vehicle Tracking", WINDOW_NORMAL)
cv.resizeWindow("Vehicle Tracking", width, height)

# Load Model
model: YOLO = YOLO(model_location, task = "detect", verbose = False)

# Load Video
cap: VideoCapture = cv.VideoCapture(video_location)

# Variables
vds: VDS = VDS()
counter: int = 0
detected: Dict[int, Dict[str, Union[int, bool]]] = { }
time: int = 0

# Loop Over Every Frame
while cap.isOpened():
    success, frame = cap.read()

    if success:
        time = (time + 1) % skip_frames

        # Rotate Frame
        if video_rotate:
            frame = cv.rotate(frame, ROTATE_90_CLOCKWISE)

        # Frame Height & Frame Width
        frame_height, frame_width = frame.shape[:2]

        # Detection Line
        if show_count_line:
            cv.line(frame, (25, count_line_position), (frame_width - 25, count_line_position), (0, 255, 0), 3)

        if time != 0:
            cv.imshow("Vehicle Tracking", frame)
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
                            if detected_id not in detected:
                                detected[detected_id] = { "x": x, "y": y, "extracted": False }
                            else:
                                detected[detected_id]["x"] = x
                                detected[detected_id]["y"] = y

                            # Check If Vehicle Passes The Line
                            if not detected[detected_id]["extracted"] and (count_line_position + count_line_offset) > y > (count_line_position - count_line_offset):
                                counter += 1
                                detected[detected_id]["extracted"] = True

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
            cv.imshow("Vehicle Tracking", frame)

        if cv.waitKey(1) & 0xFF == ord("q"):
            break
    else:
        break

# Clear Memory
cap.release()
cv.destroyAllWindows()
