from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from liveapp import consumer

websocket_urlPattern = [
    #In routing.py, "as_asgi()" is required for versions over python 3.6.
    path('ws/pollData', consumer.DashConsumer.as_asgi()), # add ws for prefix.
    path('ws/orientation', consumer.OrientationConsumer.as_asgi())
]

application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(URLRouter(websocket_urlPattern ))
})