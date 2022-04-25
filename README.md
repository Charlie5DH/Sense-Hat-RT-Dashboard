# Real-Time Application Development Using Websocket in Django

This is a tutorial on how to create a real-time application using websocket in Django. We are using Redis as the channel (cache memmory) for the real-time application. The redis cache is runned in a docker container using docker-compose. We are also using a MongoDB database running in a container, in its default port. More information about channels can be found in:

- https://channels.readthedocs.io/en/latest/introduction.html,
- https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django
- https://testdriven.io/blog/django-channels/
- https://realpython.com/getting-started-with-django-channels/#consumers-and-groups
- https://blog.logrocket.com/django-channels-and-websockets/
- https://www.atatus.com/blog/websockets-tutorial-going-real-time-with-node-and-react/

The frontend is a simple dashboard with temperature, humidity and pressure data coming from a raspberry pi sense hat module over WebSockets, made in reacjs and using Antd Charts with the `useWebsockets` library. There is only one channel being used. In utils is the code in the raspberry pi.

**TODO**: Add interactions to stop the updating of the dashboard.

**UPDATE:** Changed Antd library to Echarts.

<img src="./assets/Screenshot 2022-04-18 182634.png" alt="" />

## WebSockets

WebSocket is a computer communication protocol that provides a full duplex communication channel over a single TCP connection. All internet browsers have supported Websockets since 2011.

Which Web Applications can be Developed using Websocket

- Chat Apps
- Real-time push nitifications
- Real-time graph
- Real-time applications (GPS tracking, reading instant data from sensors and taking action) by connecting with IOT devices (such as rasberrypie …)
- Chat bots

Django channels: It is a package that provides long-running connections for Django projects such as WebSockets, MQTT, chatbots, amateur radio and more … . It adds extra features to asynchronous views that come with Django.

We need to define channels below INSTALLED_APPS in our settings.py file as follows. In our project, we started the application called liveapp.

```python
INSTALLED_APPS = [
    'channels', # for async app  it must be top place

  	'liveapp'
```

Since our application will work asynchronously, we need to define it as follows. In learndj project, we created a file named `routing.py` where we will define urls.

```python
WSGI_APPLICATION = 'learndj.wsgi.application'
ASGI_APPLICATION = 'learndj.routing.application'
```

If we are going to use `CHANNEL_LAYERS` that came with Django, we add the following codes. Django provides an in memmory channel layer, however this is not recommended for production.

```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    },
}
```

When defining the websocket url, we add `ws/` prefix to separate it from other urls.
Consumer class that will run when a request is made to the websocket url is the DashConsumer class in the `consumer.py` file we created. So, consumers functions as the views, we stablish a URL with the `ws` prefix, to differenciate between `http` and websocket requests. We definde that the path to the channels was in the routing file.

### Basic Layout

A consumer is a subclass of either channels.consumer.AsyncConsumer or channels.consumer.SyncConsumer. As these names suggest, one will expect you to write async-capable code, while the other will run your code synchronously in a threadpool for you.

Let’s look at a basic example of a SyncConsumer:

```python
from channels.consumer import SyncConsumer

class EchoConsumer(SyncConsumer):

    def websocket_connect(self, event):
        self.send({
            "type": "websocket.accept",
        })

    def websocket_receive(self, event):
        self.send({
            "type": "websocket.send",
            "text": event["text"],
        })
```

This is a very simple WebSocket echo server - it will accept all incoming WebSocket connections, and then reply to all incoming WebSocket text frames with the same text.

Consumers are structured around a series of named methods corresponding to the type value of the messages they are going to receive, with any . replaced by \_. The two handlers above are handling websocket.connect and websocket.receive messages respectively.

How did we know what event types we were going to get and what would be in them (like websocket.receive having a text) key? That’s because we designed this against the ASGI WebSocket specification, which tells us how WebSockets are presented - read more about it in ASGI - and protected this application with a router that checks for a scope type of websocket - see more about that in Routing.

Apart from that, the only other basic API is self.send(event). This lets you send events back to the client or protocol server as defined by the protocol - if you read the WebSocket protocol, you’ll see that the dict we send above is how you send a text frame to the client.

The AsyncConsumer is laid out very similarly, but all the handler methods must be coroutines, and self.send is a coroutine:

```python
from channels.consumer import AsyncConsumer

class EchoConsumer(AsyncConsumer):

    async def websocket_connect(self, event):
        await self.send({
            "type": "websocket.accept",
        })

    async def websocket_receive(self, event):
        await self.send({
            "type": "websocket.send",
            "text": event["text"],
        })
```

### Generic Consumers

What you see above is the basic layout of a consumer that works for any protocol. Much like Django’s generic views, Channels ships with generic consumers that wrap common functionality up so you don’t need to rewrite it, specifically for HTTP and WebSocket handling.

#### AsyncWebsocketConsumer

Available as channels.generic.websocket.AsyncWebsocketConsumer, this has the exact same methods and signature as WebsocketConsumer but everything is async, and the functions you need to write have to be as well:

```python

from channels.generic.websocket import AsyncWebsocketConsumer

class MyConsumer(AsyncWebsocketConsumer):
    groups = ["broadcast"]

    async def connect(self):
        # Called on connection.
        # To accept the connection call:
        await self.accept()
        # Or accept the connection and specify a chosen subprotocol.
        # A list of subprotocols specified by the connecting client
        # will be available in self.scope['subprotocols']
        await self.accept("subprotocol")
        # To reject the connection, call:
        await self.close()

    async def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        await self.send(text_data="Hello world!")
        # Or, to send a binary frame:
        await self.send(bytes_data="Hello world!")
        # Want to force-close the connection? Call:
        await self.close()
        # Or add a custom WebSocket error code!
        await self.close(code=4123)

    async def disconnect(self, close_code):
        # Called when the socket closes

```

## Channel Layer

A channel layer is a way to group together consumers that share a common topic, and then send messages to all of them at once. It allows multiple parts of our application to excange messages, without shuttling all the messages or events through a database. It works basically as a buffer. We need a channel layer to give consumers (which we'll implement in the next step) the ability to talk to one another. We'll use Redis for this. We could use use the `InMemoryChannelLayer` layer since we're in development mode, but we'll use a production-ready layer, `RedisChannelLayer`.

To use the RedisChannelLayer, we need to install the `channels_redis` package.

```bash
pip install channels-redis
```

and to stablish the connection of the layer we have to add the following code to the `settings.py` file.

```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("localhost", 6379)], # Here, we let channels_redis know where the Redis server is located.
        },
    },
}
```

To test if everything works as expected, open the Django shell and run:

    ```python
    from channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    channel_layer.send("broadcast", {"type": "broadcast.message", "text": "Hello world!"})
    channel_layer.receive("broadcast", {"type": "broadcast.message", "text": "Hello world!"})
    ```

We have to build the redis service using Docker. We can do this running the command below:

```bash
docker run --rm --name test-redis redis redis-server --save 60 1 --loglevel warning -p 6379:6379
```

This will create a redis server in the background, and we can use it to test our channel layer and consumers. There are several different persistence strategies to choose from. This one will save a snapshot of the DB every 60 seconds if at least 1 write operation was performed (it will also lead to more logs, so the loglevel option may be desirable). If persistence is enabled, data is stored in the VOLUME /data, which can be used with --volumes-from some-volume-container or -v /docker/host/dir:/data (see docs.docker volumes).

A better way is to use Docker compose.

```yml
version: "3"
services:
  cache:
    image: redis:alpine
    ports:
      - 6379:6379
    volumes:
      - ./data:/data
    restart: always
    command: redis-server --save 60 1 --loglevel warning -p requirepass mysecretpassword

volumes:
  data:
    driver: local
```

Here in the above docker-compose file, we have defined a service called cache. The cache service will pull the redis:alpine image from Dockerhub. It is set to restart always, if the docker container fails for some reason it will restart. Then, we map the container port 6379 to the local port 6379. If we aim to run multiple verisons of Redis, we can choose a random port.

Consequently, we use a custom `redis-server` command with `--save 60 1` which instructs the server to save 1 or more writes every 60 seconds to disk in case the server restarts. We are using the `--requirepass` parameter to add authentication with the password to read/write data on the Redis server. As we know if this was a production-grade application the password won’t be exposed out. This is being done here because it is only intended for development purposes.

Subsequently, we use a volume for the /data where any writes will be persisted. It is mapped to a volume called cache. This volume is managed as a local driver, you can read more about Docker volume driver if you want.

To run the container we can run the command docker-compose up with the above file using `​​docker-compose -f docker-compose.yml`.

## Database Connection

We are using a MongoDB database to store the data coming through the Channel. The data is received by the consumer and stored in the database in a sync form, since access to the database must be synchronized. For this, we declare a sync function in the consumers using `database_sync_to_async` as decorator ad call the function inside the receive method of the consumer.

```python
@database_sync_to_async
    def store_data(self, datapoint):
        serializer = SenseHatOrientationMeasuresSerializer(data=datapoint)
        #print(serializer)
        if serializer.is_valid():
            serializer.save()
            print ('>>>>', datapoint)
            return Response(serializer.data)
```

The connection with the MongoDB database is made using Djongo.

```python
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'ENFORCE_SCHEMA': False,
        "NAME": "mongo_rtchannels",
        "CLIENT": {
            "host": "localhost",
            "port": 27017,
            "username": "root",
            "password": "root",
        },
    }
}
```

### WebSocker Origin

WebSocket doesn’t come with CORS inbuilt. That being said, it means that any website can connect to any other website’s websocket connection and communicate without any restriction! I’m not going into reasons why this is the way it is, but a quick fix to this is to verify Origin header on the websocket handshake.

Sure, Origin header can be faked by an attacker, but it doesn’t matter, because to exploit it, attacker needs to fake the Origin header on victim’s browser, and modern browsers do not allow normal javascript sitting in web browsers to change Origin header.

Moreover, if you’re actually authenticating users using, preferably, cookies, then this is not really a problem for you

### Notes

To connect with the django server from other computer, we have to run the server defining the host and port, with the IP address of the computer.

```bash
python manage.py runserver ${your_ip_address}:${your_port}
```
