class Point:
    def __init__(self, conn):
        self.conn = conn

    def create_table(self):
        cursor = self.conn.cursor()
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
        cursor.close()

    def insert(self, latitude, longitude, elevation, date, track_id):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO point (latitude, longitude, elevation, date, track_id)
            VALUES (?, ?, ?, ?, ?)
        ''', (latitude, longitude, elevation, date, track_id))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
