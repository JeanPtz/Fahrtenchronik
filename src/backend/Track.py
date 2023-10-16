class Track:
    def __init__(self, conn):
        self.conn = conn

    def insert(self, file_name, point_id, vehicle_id):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO track (file_name, point_id, vehicle_id)
            VALUES (?, ?, ?)
        ''', (file_name, point_id, vehicle_id))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
