from http.server import HTTPServer,BaseHTTPRequestHandler
import time
import json
import mysql.connector
from mysql.connector import Error

HOST = "localhost"
PORT = 8080

class handleHTTP(BaseHTTPRequestHandler):
    def do_OPTIONS(self):     
        self.send_response(200, "ok")       
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")        
        self.end_headers()
        
    def do_GET(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-type","application/json")
        self.end_headers()
        

        self.wfile.write(bytes(json.dumps(prepare_templates_json(get_templates())),'utf-8'))
        
    def do_POST(self):
        request = self.rfile.read(int(self.headers.get('Content-Length'))).decode('utf-8')
        print(request)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')                
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-type","application/json")
        self.end_headers()

        #certificate account
        dict_json = json.loads(request)
        if check_account(dict_json["account"],dict_json["password"]):
            self.wfile.write(bytes('{"result":"success"}','utf-8'))
        else:
            self.wfile.write(bytes('{"result":"failed"}','utf-8'))

        

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234523456@',
    'database': 'sys'
}

def check_account(account,password):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = 'SELECT 1 FROM login WHERE username = {} AND password = {} LIMIT 1'.format(account,password)
        cursor.execute(query)

        if cursor.fetchall().__len__() >= 1:
            return True
        else:
            print("Error: Account or password incorrect.")
            return False

    except Error as e:
        print(f"Error: {e}")
        return False

    finally:
        if conn:
            cursor.close()
            conn.close()

def get_templates():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM templates"
        cursor.execute(query)

        templates = cursor.fetchall()

        if templates:
            return templates
        else:
            print("Error: Unable to fetch templates.")
            return None

    except Error as e:
        print(f"Error: {e}")
        return None

    finally:
        if conn:
            cursor.close()
            conn.close()

def prepare_templates_json(templates):
    templates_json = {}
    for template in templates:
        templates_json[str(template['id'])] = {
            'title': template['title'],
            'author': template['author'],
            'description':template['descp'],
            'content': template['content']
        }
    return templates_json

server = HTTPServer((HOST,PORT),handleHTTP)
print("Server now running")

server.serve_forever()
server.server_close()
print("Server stop")