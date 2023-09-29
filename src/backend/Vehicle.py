class Vehicle:
    def __init__(self, conn):
        self.conn = conn

    def create_table(self):
        cursor = self.conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS vehicle (
                vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                license_plate TEXT, 
                chassis_nr TEXT
            )
        ''')
        cursor.close()

    def insert(self, license_plate, chassis_nr):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO vehicle (license_plate, chassis_nr)
            VALUES (?, ?)
        ''', (license_plate, chassis_nr))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
