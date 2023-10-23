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
        
    def __upload_gpx_file(self, file):
        if file.filename == '':
            print("No selected file")
            return "No selected file"

        if file and file.filename.endswith('.gpx'):
            file.save(f"./src/backend/gpx_files/{file.filename}")
            print(f"File: {file.filename} successfully uploaded")
            return f"File: {file.filename} successfully uploaded"
        else:
            print("Invalid file format. Please upload a GPX file.")
            return "Invalid file format. Please upload a GPX file."
    
    def upload_gpx_file(self, file):
        message = self.__upload_gpx_file(file)
        return message