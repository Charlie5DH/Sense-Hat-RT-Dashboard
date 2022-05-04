from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from core import consumers

websocket_urlPattern = [
    #In routing.py, "as_asgi()" is required for versions over python 3.6.
    path('ws/storeData', consumers.StoreData.as_asgi()), # add ws for prefix.
]

application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(URLRouter(websocket_urlPattern ))
})