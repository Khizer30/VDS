import numpy as np
import cv2 as cv
from cv2 import VideoCapture, BackgroundSubtractorMOG2, COLOR_BGR2GRAY, MORPH_ELLIPSE, MORPH_CLOSE, RETR_TREE, CHAIN_APPROX_SIMPLE, FONT_HERSHEY_TRIPLEX, WINDOW_NORMAL
from typing import Tuple, List

# Load Video
cap: VideoCapture = VideoCapture("data/1.mp4")

# Set Min Width & Height of Rectangle Box
min_width_rectangle: int = 250
min_height_rectangle: int = 250

# Position in Frame where Vehicles are Counted
count_line_position: int = 750

# Initialize Background Subtractor
algo: BackgroundSubtractorMOG2 = cv.createBackgroundSubtractorMOG2(history = 100, varThreshold = 40)

# Find Centers
def find_centers(
        x: int,
        y: int,
        w: int,
        h: int
) -> Tuple[int, int]:
    v: int = int(w / 2)
    h: int = int(h / 2)
    cx: int = x + v
    cy: int = y + h

    return cx, cy

# Variables
detect: List[Tuple[int, int]] = []
counter: int = 0
offset: int = 7

while True:
    ret, video = cap.read()

    gray = cv.cvtColor(video, COLOR_BGR2GRAY)
    blur = cv.GaussianBlur(gray, (3, 3), 5)
    vid_sub = algo.apply(blur)
    dilat = cv.dilate(vid_sub, np.ones((5, 5)))
    kernel = cv.getStructuringElement(MORPH_ELLIPSE, (5, 5))
    dilatada = cv.morphologyEx(dilat, MORPH_CLOSE, kernel)
    dilatada = cv.morphologyEx(dilatada, MORPH_CLOSE, kernel)
    countersahpe, h = cv.findContours(dilatada, RETR_TREE, CHAIN_APPROX_SIMPLE)

    frame_height, frame_width = video.shape[:2]

    cv.line(video, (25, count_line_position), (frame_width - 25, count_line_position), (0, 255, 0), 3)

    # Loop Over Every Box
    for i, c in enumerate(countersahpe):
        x, y, w, h = cv.boundingRect(c)
        val_counter = (w >= min_width_rectangle) and (h >= min_height_rectangle)

        if val_counter:
            # Draw Box Around Vehicle
            cv.rectangle(video, (x, y), (x + w, y + h), (0, 255, 255), 3)
            cv.putText(video, f"Vehicle No: {counter + 1}", (x + int(w / 4), y - 30), FONT_HERSHEY_TRIPLEX, 1, (0, 0, 255), 2)

            # Draw Center Dot on Vehicle
            center = find_centers(x, y, w, h)
            cv.circle(video, center, 3, (0, 0, 255), -1)

            detect.append(center)

            # Check If Vehicle Passes a Line in the Frame
            for x, y in detect:
                if (count_line_position + offset) > y > (count_line_position - offset):
                    counter += 1
                    cv.line(video, (25, count_line_position), (frame_width - 25, count_line_position), (255, 255, 0), 3)
                    detect.remove((x, y))

                    # Save Cropped Image
                    cropped_image = video[int(y - h / 2):int(y + h / 2), int(x - w / 2):int(x + w / 2)]
                    cv.imwrite(f"Detected Vehicles/{counter}.png", cropped_image)

                    print(f"No. of Vehicles Detected: {counter}")

    cv.namedWindow("Detector", WINDOW_NORMAL)
    cv.resizeWindow("Detector", 800, 600)
    cv.imshow("Detector", video)

    if cv.waitKey(1) == ord("q"):
        break

cap.release()
cv.destroyAllWindows()
