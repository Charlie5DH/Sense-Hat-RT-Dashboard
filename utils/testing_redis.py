from channels.layers import get_channel_layer

channel_layer = get_channel_layer()
channel_layer.send("broadcast", {"type": "broadcast.message", "text": "Hello world!"})
channel_layer.receive("broadcast", {"type": "broadcast.message", "text": "Hello world!"})