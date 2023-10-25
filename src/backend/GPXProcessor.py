import os
import sqlite3
import gpxpy

class GPXProcessor:
    def __init__(self, db_name, folder_path):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.folder_path = folder_path

    def process_gpx_data(self):
        for filename in os.listdir(self.folder_path):
            if filename.endswith('.gpx'):
                #check if file has already been processed
                if self.conn.execute('SELECT track_id FROM track WHERE file_name = ?', (filename,)).fetchone() == None:
                    #get name and license plate data
                    parts = filename.split('_')
                    full_name = parts[0] 
                    licence_plate = parts[1]

                    #check if the name is the name is already asignt to a license plate
                    if self.conn.execute('SELECT vehicle_id FROM vehicle WHERE license_plate = ?', (licence_plate,)).fetchone() == None:
                        #if the name contains '-' i can get a first- and surname 
                        if '-' in full_name:
                            name = full_name.split('-')
                            firstname = name[0]
                            surname = name[1]
                        else:
                            firstname, surname = full_name
                            
                        #insert name
                        cursor = self.conn.cursor()
                        cursor.execute('''
                            INSERT OR IGNORE INTO person (full_name, name, surname)
                            VALUES (?, ?, ?)
                            ''', (full_name.replace('-', ' '), firstname, surname))
                        self.conn.commit()

                        #insert license plate
                        cursor.execute('''
                            INSERT INTO vehicle (license_plate)
                            VALUES (?)
                            ''', (licence_plate,))
                        self.conn.commit()
                        cursor.close()

                    #get track data
                    cursor = self.conn.cursor()
                    person_id = self.conn.execute('SELECT person_id FROM person WHERE full_name = ?', [full_name.replace('-', ' ')]).fetchone()[0]
                    vehicle_id = self.conn.execute('SELECT vehicle_id FROM vehicle WHERE license_plate = ?', [licence_plate]).fetchone()[0]

                    cursor.execute('''
                        INSERT INTO track (file_name, person_id, vehicle_id)
                        VALUES (?, ?, ?)
                    ''', (filename, person_id, vehicle_id))
                    self.conn.commit()
                    cursor.close()

                    #get point data
                    gpx_file_path = os.path.join(self.folder_path, filename)
                    track_id = self.conn.execute('SELECT track_id FROM track WHERE file_name = ?', (filename,)).fetchone()[0]
                    with open(gpx_file_path, 'r') as gpx_file:
                        gpx = gpxpy.parse(gpx_file)
                        for track in gpx.tracks:
                            for segment in track.segments:
                                for point in segment.points:
                                    cursor = self.conn.cursor()
                                    cursor.execute('''
                                        INSERT INTO point (latitude, longitude, elevation, date, track_id)
                                        VALUES (?, ?, ?, ?, ?)
                                    ''', (point.latitude, point.longitude, point.elevation, point.time, track_id))
                                    self.conn.commit()
                                    cursor.close()
                            for waypoint in gpx.waypoints:
                                cursor = self.conn.cursor()
                                cursor.execute('''
                                    INSERT INTO point (latitude, longitude, elevation, date, track_id)
                                    VALUES (?, ?, ?, ?, ?)
                                ''', (waypoint.latitude, waypoint.longitude, waypoint.elevation, waypoint.time, track_id))
                                self.conn.commit()
                                cursor.close()
                    
                        

                    print(f"File {filename} successfully added to database")
                else:
                    print("File already processed")       
            else:
                print("Invalid file format")