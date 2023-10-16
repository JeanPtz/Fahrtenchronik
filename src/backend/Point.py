import os
import sqlite3
import xml.etree.ElementTree as ET


class Point:
    def __init__(self, db_name):
        self.conn = self.conn = sqlite3.connect(db_name, check_same_thread=False)

    # Add methods for querying and updating data as needed.

def insert_points(self, file_path):
    with open(file_path, 'r') as gpx_file:
        gpx_data = ET.parse(gpx_file)
        root = gpx_data.getroot()
        
        for trkpt in root.iter('trkpt'):
            latitude = float(trkpt.get('lat'))
            longitude = float(trkpt.get('lon'))
            elevation = float(trkpt.find('ele').text)
            date = trkpt.find('time').text
            
            cursor = self.conn.cursor()
            cursor.execute('''
                INSERT INTO point (latitude, longitude, elevation, date, track_id)
                VALUES (?, ?, ?, ?, ?)
            ''', (latitude, longitude, elevation, date))
            self.conn.commit()
            cursor.close()

gpx_dir = "gpx_files/"


for filename in os.listdir(gpx_dir):
    if filename.endswith(".gpx"):
        file_path = os.path.join(gpx_dir, filename)
        insert_points(file_path)
