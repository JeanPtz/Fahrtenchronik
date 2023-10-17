import sqlite3

class Point:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self._insert_points

    # Add methods for querying and updating data as needed.

    def _insert_points(self, latitude, longitude, elevation, date):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO point (latitude, longitude, elevation, date, track_id)
            VALUES (?, ?, ?, ?, ?)
        ''', (latitude, longitude, elevation, date))
        self.conn.commit()
        cursor.close()