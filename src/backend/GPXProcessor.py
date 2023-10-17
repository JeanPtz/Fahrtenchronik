import os
import sqlite3
import gpxpy

class GPXProcessor:
    def __init__(self, db_name, folder_path):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.folder_path = folder_path

    def process_gpx_files(self):
        for filename in os.listdir(self.folder_path):
            if filename.endswith('.gpx'):
                gpx_file_path = os.path.join(self.folder_path, filename)
                with open(gpx_file_path, 'r') as gpx_file:
                    gpx = gpxpy.parse(gpx_file)
                    for track in gpx.tracks:
                        for segment in track.segments:
                            for point in segment.points:
                                cursor = self.conn.cursor()
                                cursor.execute('''
                                    INSERT INTO point (latitude, longitude, elevation, date)
                                    VALUES (?, ?, ?, ?)
                                ''', (point.latitude, point.longitude, point.elevation, point.time))
                                self.conn.commit()
                                cursor.close()
