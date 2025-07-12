from serial import Serial
from time import sleep
from dotenv import load_dotenv
from os import getenv
from shelve import open as shelf_open

# Environment Variables
load_dotenv()
port: str = getenv("COM")

# Configuration
baud_rate: int = 9600

# Open Barrier
def open_barrier() -> None:
    try:
        with shelf_open("shared") as db:
            flag: bool = db["barrier_open"]

            if not flag:
                with Serial(port, baud_rate, timeout = 3) as arduino:
                    sleep(2)
                    arduino.write(b"OPEN\n")
                    db["barrier_open"] = True

                    while True:
                        line: str = arduino.readline().decode().strip()

                        if line:
                            print(f"Arduino: {line}")

                        if "Barrier Opened" in line:
                            break
            else:
                print("Barrier Already Opened")
    except Exception as e:
        print(f"Error: {e}")

# Close Barrier
def close_barrier() -> None:
    try:
        with shelf_open("shared") as db:
            flag: bool = db["barrier_open"]

            if flag:
                with Serial(port, baud_rate, timeout = 3) as arduino:
                    sleep(2)
                    arduino.write(b"CLOSE\n")
                    db["barrier_open"] = False

                    while True:
                        line: str = arduino.readline().decode().strip()

                        if line:
                            print(f"Arduino: {line}")

                        if "Barrier Closed" in line:
                            break
            else:
                print("Barrier Already Closed")
    except Exception as e:
        print(f"Error: {e}")
