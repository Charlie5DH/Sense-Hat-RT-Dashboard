from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import SenseHatEnvMeasures, SenseHatOrientationMeasures
from .serializers import SenseHatEnvMeasuresSerializer, SenseHatOrientationMeasuresSerializer
from channels.db import database_sync_to_async
from rest_framework.response import Response
import json

class StoreData(AsyncJsonWebsocketConsumer):
    
    async def connect(self):
        # the data must be connected to a subscriber group
        self.groupname='consuming'

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

        response = await self.store_data(datapoint)
    
    # Store data asyncronously in the database and publish to the queue
    @database_sync_to_async
    def store_data(self, text_data):
        serializer = SenseHatEnvMeasuresSerializer(data=text_data)
        #print(serializer)
        if serializer.is_valid():
            serializer.save()
            # when a measure is created, a message is sent to the queue
            # we are specifying the parameter measure_created as an identifier
            # for the consumer to know what type of message it is and discriminate
            #publish(method='measure_created', exchange='', queue='admin', message=serializer.data)
            print ('>> Measure Published >>>>', text_data)
            return Response(serializer.data)


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
