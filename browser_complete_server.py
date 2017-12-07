#!/usr/bin/env python

from __future__ import print_function

import logging
import socket
import sys
import time

from common import HOST, PORT, send, read


def configure_logger():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    fmt = '%(asctime)s %(levelname)s %(message)s'
    formatter = logging.Formatter(fmt, datefmt='%H:%M:%S')
    sh = logging.StreamHandler(sys.stderr)
    sh.setFormatter(formatter)
    logger.addHandler(sh)


def main():
    configure_logger()
    logging.info('Daemon started.')

    time.sleep(3)

    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((HOST, PORT))
    sock.listen(0)
    logging.info('Listening on tcp://{}:{}'.format(HOST, PORT))

    try:
        next_id = 0
        while True:
            conn, addr = sock.accept()
            logging.info('Connection from {}'.format(addr))

            try:
                # Read only one request
                req = read(conn.recv)
                req['id'] = next_id
                next_id += 1

                send(req)

                resp = read()
                send(resp, conn.sendall)

            finally:
                conn.close()

    finally:
        sock.close()

    logging.info('Daemon exitting gracefully.')


if __name__ == '__main__':
    main()
