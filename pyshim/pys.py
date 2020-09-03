
#!/usr/bin/env python

# WS server that sends messages at random intervals

import asyncio
import datetime
import random
import websockets

async def time(websocket, path):
    while True:
        now = datetime.datetime.utcnow().isoformat() + "Z"
        await websocket.send("G 0.1 0.8 1 1 0.1")
        await asyncio.sleep(5)

start_server = websockets.serve(time, "127.0.0.1", 8011)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
