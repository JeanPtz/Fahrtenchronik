import sqlite3

class GPXRepository:
    def __init__(self, db_name):
        # Establish a connection to the SQLite database
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self._create_tables()

    def close(self):
        # Closes the database connection
        self.conn.close()

    def create_routes(self, name, kfz, date):
        with self.conn:
            # Check if the route already exists
            cursor = self.conn.execute('''
            SELECT track.track_id
            FROM person
            INNER JOIN track ON person.person_id = track.person_id
            INNER JOIN vehicle ON track.fahrzeug_id = vehicle.vehicle_id
            INNER JOIN point ON track.track_id = point.track_id
            WHERE person.name = ? 
            AND vehicle.license_plate = ?    
            AND point.date = ?
            ''', (name, kfz, date,))
            existing_route = cursor.fetchone()

            if existing_route:
                raise ValueError("Route already exists")

            # Insert user into 'users' table and initialize score in 'scores' table
            self.conn.execute('''
                INSERT INTO users (id, name, kfz, date)
                VALUES (?, ?, ?)
            ''', (name, kfz, date))

        return Routes(self.conn, name)
    
    def _get_routes(self, name, kfz, start_date, end_date):
        # Get id for given username
        with self.conn:
            cursor = self.conn.execute('''
                SELECT id
                FROM routes
                WHERE name = ? 
                AND license_plate = ?    
                AND date >= ?
                AND date <= ?                        
            ''', (name, kfz, start_date, end_date,))
            row = cursor.fetchone()
            if row:
                route_id = row[0]
                return route_id
            else:
                raise ValueError("The route you where looking for does not exist")

    def get_routes(self, name, kfz, start_date, end_date):
        route_id = self._get_routes(name, kfz, start_date, end_date)
        return route_id