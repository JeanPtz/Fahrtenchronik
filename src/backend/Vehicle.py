class Vehicle:
    def __init__(self, conn):
        self.conn = conn

    def insert(self, license_plate, chassis_nr):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO vehicle (license_plate, chassis_nr)
            VALUES (?, ?)
        ''', (license_plate, chassis_nr))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
