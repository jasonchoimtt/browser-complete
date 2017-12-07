#!/usr/bin/env python

import json
import socket
import sys

from common import HOST, PORT, send, read


def main():
    req = json.load(sys.stdin)

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((HOST, PORT))

    send(req, sock.sendall)

    resp = read(sock.recv)

    print(json.dumps(resp, indent=4))


if __name__ == '__main__':
    main()
