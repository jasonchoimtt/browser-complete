import json
import struct
import sys


HOST = '127.0.0.1'
PORT = 50302


def stdout_sendall(data):
    sys.stdout.write(data)
    sys.stdout.flush()


def send(obj, sendall=stdout_sendall):
    content = json.dumps(obj, indent=4)
    sendall(struct.pack('@I', len(content)))
    sendall(content)
    sys.stdout.flush()


def read(recv=sys.stdin.read):
    raw_length = recv(4)
    if not raw_length:
        sys.exit(0)
    length = struct.unpack('@I', raw_length)[0]
    message = recv(length)
    return json.loads(message)
