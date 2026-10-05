#!/usr/bin/env python3
"""serve.py: local static server for the live deck (127.0.0.1 only, no caching). Usage: python3 serve.py [port]"""
import http.server, os, sys
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()
    def log_message(self, *a):
        pass
http.server.ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()
