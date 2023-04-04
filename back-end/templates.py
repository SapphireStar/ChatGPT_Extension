import json
import mysql.connector
from mysql.connector import Error

# Replace with your MySQL database credentials
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'pass123',
    'database': 'db_gpt'
}

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

if __name__ == '__main__':
    templates = get_templates()

    if templates:
        templates_json = prepare_templates_json(templates)
        print(json.dumps(templates_json, indent=2))
    else:
        print("No templates found.")
