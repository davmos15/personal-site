#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8000

class SSIHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        if self.path.endswith('.html'):
            try:
                # Read the requested file
                file_path = self.path[1:] if self.path.startswith('/') else self.path
                if file_path == '' or file_path == '/':
                    file_path = 'index.html'
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace nav placeholder with actual nav content
                if '<div id="nav-placeholder"></div>' in content:
                    with open('nav.html', 'r', encoding='utf-8') as nav_file:
                        nav_content = nav_file.read()
                    content = content.replace('<div id="nav-placeholder"></div>', nav_content)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
            except Exception as e:
                print(f"Error processing {self.path}: {e}")
        
        # Default behavior for non-HTML files
        super().do_GET()

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), SSIHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop the server")
    
    Timer(1, open_browser).start()
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")