import json
import requests
import websocket
import random, time

ws = websocket.WebSocket()
ws.connect("ws://localhost:8000/ws/pollData")

for i in range(100):
    ws.send(json.dumps({'value':random.randint(1,100)}))
    time.sleep(1)
    