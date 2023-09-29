class Track:
    def __init__(self, conn):
        self.conn = conn

    def create_table(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS track (
                track_id INTEGER PRIMARY KEY AUTOINCREMENT,
                file_name TEXT, 
                point_id INTEGER, 
                vehicle_id INTEGER, 
                FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) 
            )
        ''')
        cursor.close()

    def insert(self, file_name, point_id, vehicle_id):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO track (file_name, point_id, vehicle_id)
            VALUES (?, ?, ?)
        ''', (file_name, point_id, vehicle_id))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
