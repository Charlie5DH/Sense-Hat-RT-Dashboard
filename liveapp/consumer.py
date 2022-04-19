# Consumers are the equivalent of view functions in Django. 
# We created our file named consumer.py in liveapp application.
# We have defined consumer functions that will work with the code block below. 
# A user connecting to the websocket url of our application will be added to the dashboard group.

from channels.generic.websocket import AsyncJsonWebsocketConsumer
import json

class DashConsumer(AsyncJsonWebsocketConsumer):
    
    async def connect(self):
        # the data must be connected to a subscriber group
        self.groupname='dashboard'

        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name,
        )
        print(self.groupname)
        print(self.channel_name)
        # Called on connection.
        # To accept the connection call:
        await self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']

    async def disconnect(self,close_code):
         # Called when the socket closes
        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )   

    async def receive(self, text_data):

        datapoint = json.loads(text_data)
        temperature=datapoint['temperature']
        pressure=datapoint['pressure']
        humidity=datapoint['humidity']
        timestamp=datapoint['timestamp']

        # When we receive a message from the client, we want to send it to the group
        # so all other clients can receive it.
        # We can use the channel layer to send a message to the group
        # with the group name and the message body.

        await self.channel_layer.group_send(
            self.groupname,
            {
                'type':'deprocessing', #function name to run
                'temperature':temperature, #value to send function
                'pressure':pressure,
                "humidity":humidity,
                'timestamp':timestamp #value to send function
            }
        )
        print ('>>>>',text_data)

    async def deprocessing(self,event):
        temperature=event['temperature']
        pressure=event['pressure']
        humidity=event['humidity']
        timestamp=event['timestamp']
        
        await self.send(text_data=json.dumps(
            {
                'temperature':temperature, 
                "pressure":pressure,
                'humidity':humidity ,
                'timestamp':timestamp
            }))# send for frontend

class OrientationConsumer(AsyncJsonWebsocketConsumer):
    
    async def connect(self):
        # the data must be connected to a subscriber group
        self.groupname='orientation'

        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name,
        )
        print(self.groupname)
        print(self.channel_name)
        # Called on connection.
        # To accept the connection call:
        await self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']

    async def disconnect(self,close_code):
         # Called when the socket closes
        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )   

    async def receive(self, text_data):

        datapoint = json.loads(text_data)
        pitch=datapoint['pitch']
        roll=datapoint['roll']
        yaw=datapoint['yaw']
        acceleration_x = datapoint['acceleration_x']
        acceleration_y = datapoint['acceleration_y']
        acceleration_z = datapoint['acceleration_z']
        timestamp=datapoint['timestamp']

        # When we receive a message from the client, we want to send it to the group
        # so all other clients can receive it.
        # We can use the channel layer to send a message to the group
        # with the group name and the message body.

        await self.channel_layer.group_send(
            self.groupname,
            {
                'type':'deprocessing', #function name to run
                'pitch':pitch, #value to send function
                'roll':roll,
                "yaw":yaw,
                'acceleration_x':acceleration_x,
                'acceleration_y':acceleration_y,
                'acceleration_z':acceleration_z,
                'timestamp':timestamp #value to send function
            }
        )
        print ('>>>>',text_data)

    async def deprocessing(self,event):
        pitch=event['pitch']
        roll=event['roll']
        yaw=event['yaw']
        acceleration_x = event['acceleration_x']
        acceleration_y = event['acceleration_y']
        acceleration_z = event['acceleration_z']
        timestamp=event['timestamp']
        
        await self.send(text_data=json.dumps({
                'pitch':pitch, 
                "roll":roll,
                'yaw':yaw ,
                'acceleration_x':acceleration_x,
                'acceleration_y':acceleration_y,
                'acceleration_z':acceleration_z,
                'timestamp':timestamp
        }))# send for frontend