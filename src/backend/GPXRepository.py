import sqlite3
import haversine

class GPXRepository:
    def __init__(self, db_name):
        # Establish a connection to the SQLite database
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.__create_tables()

    def close(self):
        # Closes the database connection
        self.conn.close()

    def __create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS person (
                person_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                full_name TEXT UNIQUE, 
                name TEXT, 
                surname TEXT
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS vehicle (
                vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                license_plate TEXT UNIQUE
            )
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS track (
                track_id INTEGER PRIMARY KEY AUTOINCREMENT,
                file_name TEXT, 
                person_id INTEGER, 
                vehicle_id INTEGER, 
                FOREIGN KEY (person_id) REFERENCES person(person_id),
                FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) 
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS point (
                point_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                latitude REAL, 
                longitude REAL, 
                elevation REAL, 
                date DATETIME, 
                track_id INTEGER,
                FOREIGN KEY (track_id) REFERENCES track(track_id)  
            )
        ''')
        self.conn.commit()
    
    def __get_route_by_search(self, name, kfz, start_date, end_date):
        # Get id for given username
        print(start_date)
        print(end_date)
        with self.conn:
            cursor = self.conn.execute('''
                SELECT pnt.latitude, pnt.longitude, pnt.elevation
                FROM point pnt
                JOIN track trk ON trk.track_id = pnt.track_id
                JOIN person psn ON trk.person_id = psn.person_id
                JOIN vehicle v ON trk.vehicle_id = v.vehicle_id
                WHERE psn.full_name = ?
                AND v.license_plate = ?
                AND pnt.date >= ?
                AND pnt.date <= ?                      
            ''', (name, kfz, start_date, end_date,))
            points = cursor.fetchall()
            if points:
                return points
            else:
                raise ValueError("The route you where looking for does not exist")
            
    def __get_route_by_id(self, track_id):
        with self.conn:
            cursor = self.conn.execute('''
                SELECT latitude,longitude, elevation, date FROM point p WHERE track_id = ?
            ''', (track_id,))
            return cursor.fetchone()
            
    def __get_license_plates(self):
        with self.conn:
            cursor = self.conn.execute('''
                SELECT license_plate FROM vehicle
            ''')
            return cursor.fetchall()
        
    def __get_routes_by_license_plate(self, license_plate):
        with self.conn:
            cursor = self.conn.execute('''
                SELECT t.track_id FROM track t JOIN vehicle v ON t.vehicle_id = v.vehicle_id WHERE v.license_plate = ?
            ''', (license_plate,))
            return cursor.fetchall()
        
    def __upload_gpx_file(self, file):
        if file.filename == '':
            print("No selected file")
            return "No selected file"

        if file and file.filename.endswith('.gpx'):
            file.save(f"./src/backend/test_files/{file.filename}")
            print(f"File: {file.filename} successfully uploaded")
            return f"File: {file.filename} successfully uploaded"
        else:
            print("Invalid file format. Please upload a GPX file.")
            return "Invalid file format. Please upload a GPX file."
        

    def get_route_by_search(self, name, kfz, start_date, end_date):
        points = self.__get_route_by_search(name, kfz, start_date, end_date)
        return points
    
    def get_route_by_id(self, track_id):
        points = self.__get_route_by_id(track_id)
        return points
    
    def get_license_plate(self):
        license_plates = self.__get_license_plates()
        return license_plates
    
    def get_routes_by_license_plate(self, license_plate):
        routes = self.__get_routes_by_license_plate(license_plate)
        return routes
    
    def upload_gpx_file(self, file):
        message = self.__upload_gpx_file(file)
        return message