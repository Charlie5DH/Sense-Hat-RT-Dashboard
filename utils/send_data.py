import json
import requests
import websocket
import random, time
from datetime import datetime

ws = websocket.WebSocket()
ws.connect("ws://150.162.236.51:4000/ws/pollData")

for i in range(100):
    ws.send(json.dumps({'value':random.randint(1,100), 'timestamp':datetime.now().strftime("%Y-%m-%d %H:%M:%S")}))
    time.sleep(1)
    