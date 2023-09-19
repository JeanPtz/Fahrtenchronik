import sqlite3
from Routes import Routes

class GPXRepository:
    def __init__(self, db_name):
        # Establish a connection to the SQLite database
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self._create_tables()

    def close(self):
        # Closes the database connection
        self.conn.close()

    def _create_tables(self):
        # Create 'routes' table if they don't exist
        with self.conn:
            self.conn.execute('''
                CREATE TABLE IF NOT EXISTS person (
                    person_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                    nick VARCHAR(10), 
                    name VARCHAR(255), 
                    vorname VARCHAR(255), 
                    email VARCHAR(255) 
                )
            ''')

            self.conn.execute('''
                CREATE TABLE IF NOT EXISTS vehicle (
                    fahrzeug_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                    kennzeichen VARCHAR(10), 
                    fahrgestellnummer VARCHAR(255) 
                )
            ''')

            self.conn.execute('''
                CREATE TABLE IF NOT EXISTS track (
                    tid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    dateiname VARCHAR(255), 
                    pid INT, 
                    fzid INT, 
                    FOREIGN KEY (pid) REFERENCES person(pid), 
                    FOREIGN KEY (fzid) REFERENCES fahrzeug(fzid) 
                )
            ''')

            self.conn.execute('''
                CREATE TABLE IF NOT EXISTS track (
                    ptid INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                    lat FLOAT, 
                    lon FLOAT, 
                    ele FLOAT, 
                    dt DATETIME, 
                    tid INT,
                    FOREIGN KEY (tid) REFERENCES track(tid)  
                )
            ''')

    def create_routes(self, name, kfz, date):
        with self.conn:
            # Check if the username already exists
            cursor = self.conn.execute('''
                SELECT id
                FROM users
                WHERE name = ? 
                AND kfz = ?    
                AND date = ?
            ''', (name, kfz, date,))
            existing_user = cursor.fetchone()

            if existing_user:
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
                AND kfz = ?    
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
        return Routes(self.conn, route_id, name, kfz, start_date, end_date)