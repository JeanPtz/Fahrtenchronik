import sqlite3
from DataClasses import PointEntity



class PointRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)

    def __get_all_points(self):
         with self.conn:
            cursor = self.conn.execute('''
                SELECT point_id, latitude, longitude, elevation, date, track_id FROM point                     
            ''')
            
            points: list[PointEntity] = []

            for (point_id, latitude, longitude, elevation, date, track_id) in cursor:
                points.append(PointEntity(point_id, latitude, longitude, elevation, date, track_id))

            return points
         
    def get_all_points(self):
        points = self.__get_all_points()
        return (points)