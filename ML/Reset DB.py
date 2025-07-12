from shelve import open as shelf_open

with shelf_open("shared") as db:
    db["barrier_open"] = False
