import sqlite3
from DataClasses import Vehicle


class VehicleRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)

    def __get_vehicles(self) -> list[Vehicle]:
        with self.conn:
            cursor = self.conn.execute('''
                SELECT vehicle_id, license_plate FROM vehicle
            ''')
            vehicles: list[Vehicle] = []

            for (vehicle_id, license_plate) in cursor:
                vehicles.append(Vehicle(vehicle_id, license_plate))
            
            return vehicles
            
        
    def get_license_plates(self) -> list[Vehicle]:
        vehicles = self.__get_vehicles()
        return vehicles