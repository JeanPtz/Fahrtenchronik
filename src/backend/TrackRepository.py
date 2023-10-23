import sqlite3
from DataClasses import Track


class TrackRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)

    def __get_route_by_search(self, name, kfz, start_date, end_date) -> list[Track]:
        # Get id for given username
        print(start_date)
        print(end_date)
        with self.conn:
            cursor = self.conn.execute('''
                SELECT pnt.latitude, pnt.longitude
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
        
    def __get_routes_by_license_plate(self, license_plate):
        with self.conn:
            cursor = self.conn.execute('''
                SELECT t.track_id FROM track t JOIN vehicle v ON t.vehicle_id = v.vehicle_id WHERE v.license_plate = ?
            ''', (license_plate,))
            return cursor.fetchall()

    def get_route_by_search(self, name, kfz, start_date, end_date):
        points = self.__get_route_by_search(name, kfz, start_date, end_date)
        return points
    
    def get_route_by_id(self, track_id):
        points = self.__get_route_by_id(track_id)
        return points
    
    def get_routes_by_license_plate(self, license_plate):
        routes = self.__get_routes_by_license_plate(license_plate)
        return routes