import json
import requests
import websocket
import random, time
from datetime import datetime
from sense_hat import SenseHat

sense = SenseHat()

ws = websocket.WebSocket()

try:
    ws.connect("ws://150.162.236.51:4000/ws/pollData")
except:
    print('error connecting')
    pass


while True:
    temperature = round(sense.get_temperature(), 2)
    pressure = round(sense.get_pressure(), 2)
    humidity = round(sense.get_humidity(), 2)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    data = json.dumps(
            {'temperature':temperature,
            'pressure':pressure,
            'humidity':humidity,
            'timestamp':timestamp,
            })
    
    ws.send(data)
    
    print('>>>>', data)
    time.sleep(1)