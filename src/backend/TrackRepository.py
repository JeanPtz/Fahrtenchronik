import sqlite3
from DataClasses import TrackEntity



class TrackRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)

    def __get_all_tracks(self):
         with self.conn:
            cursor = self.conn.execute('''
                SELECT track_id, file_name, person_id, vehicle_id FROM track                     
            ''')
            
            tracks: list[TrackEntity] = []

            for (track_id, file_name, person_id, vehicle_id) in cursor:
                tracks.append(TrackEntity(track_id, file_name, person_id, vehicle_id))

            return tracks
            
    def __get_route_by_id(self, track_id):
        with self.conn:
            cursor = self.conn.execute('''
                SELECT latitude,longitude FROM point p WHERE track_id = ?
            ''', (track_id,))
            return cursor.fetchone()
        
    def get_all_tracks(self):
        tracks = self.__get_all_tracks()
        return tracks
    
    def get_route_by_id(self, track_id):
        points = self.__get_route_by_id(track_id)
        return points