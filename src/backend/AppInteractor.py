from datetime import datetime, timedelta
import sqlite3

from PersonRepository import PersonRepository
from VehicleRepository import VehicleRepository
from TrackRepository import TrackRepository
from PointRepository import PointRepository
from DataClasses import FullNames, LicensePlates, Route, TrackIdByLicensePlate, TableData
from haversine import haversine, Unit

class Appinteractor:

    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.personRepository = PersonRepository(db_name)
        self.vehicleRepository = VehicleRepository(db_name)
        self.trackRepository = TrackRepository(db_name)
        self.pointRepository = PointRepository(db_name)

    def __get_route_by_search(self, name: str, license_plate: str, start_date: str, end_date: str) -> list[Route]:
        people = self.personRepository.get_all_people()
        vehicles = self.vehicleRepository.get_all_vehicles()
        tracks = self.trackRepository.get_all_tracks()
        points = self.pointRepository.get_all_points()

        person_id: str = ""
        vehicle_id: str = ""
        track_ids: list[str] = []
        route: list[Route] = []

        for person in people:
            if person.full_name == name:
                person_id = person.id

        for vehicle in vehicles:
            if license_plate == vehicle.license_plate:
                vehicle_id = vehicle.id

        for track in tracks:
            if vehicle_id == track.vehicle_id and person_id == track.person_id:
                track_ids.append(track.id) 
 
        for track_id in track_ids:
            for point in points:
                if track_id == point.track_id and start_date <= point.date <= end_date:
                    route.append(Route(point.latitude, point.longitude, point.date))
        return route
    

    def __get_all_license_plates(self) -> list[LicensePlates]:
        vehicles = self.vehicleRepository.get_all_vehicles()

        license_plates: list[LicensePlates] = []

        for vehicle in vehicles:
                license_plates.append(LicensePlates(vehicle.license_plate))

        return license_plates

    def __get_all_full_names(self) -> list[FullNames]:
        people = self.personRepository.get_all_people()

        full_names: list[FullNames] = []

        for person in people:
                full_names.append(FullNames(person.full_name))

        return full_names

    def __get_track_ids_by_license_plate(self, license_plate) -> list[TrackIdByLicensePlate]:
        vehicles = self.vehicleRepository.get_all_vehicles()
        tracks = self.trackRepository.get_all_tracks()

        routes: list[TrackIdByLicensePlate] = []
        vehicle_id: str = ""

        for vehicle in vehicles:
            if vehicle.license_plate == license_plate:
                vehicle_id = vehicle.id
        
        for track in tracks:
            if track.vehicle_id == vehicle_id:
                routes.append(TrackIdByLicensePlate(track.id))

        return routes
    
    def __get_route_by_track_id(self, track_id) -> list[Route]:
        points = self.pointRepository.get_all_points()

        route: list[Route] = []
 

        for point in points:
            if track_id == point.track_id:
                route.append(Route(point.latitude, point.longitude, point.date))

        return route
    
    def __get_table_data_by_track_id(self, track_id) -> TableData:
        route = self.get_route_by_track_id(track_id)

        milage: int = 0
        avg_speed: int = 0
        duration: float = 0
        total_time = timedelta(0)
        error: bool = False


        for coordinates in range(1, len(route)):
            start = (route[coordinates-1].latitude, route[coordinates-1].longitude)
            end = (route[coordinates].latitude, route[coordinates].longitude)
            distance = haversine(start, end)
            milage += distance

            if route[coordinates].date != None:
                start_time = datetime.fromisoformat(route[coordinates-1].date)
                end_time = datetime.fromisoformat(route[coordinates].date)
                time = end_time - start_time
                total_time += time
            else:
                total_time = timedelta(0)

        if int(total_time.total_seconds()) == 0 or None:
            error = True
        else:
            duration = total_time.total_seconds()
            avg_speed = round(milage / (total_time.total_seconds() / 3600))

        print("Milage: ", milage)
        print("Average Speed: ", avg_speed)
        print("Duration: ", duration)
        print("Error: ", error)

        return TableData(round(milage), avg_speed, duration, error)
    
    def __get_table_data_by_license_plate(self, license_plate) -> TableData:
        track_ids = self.get_track_ids_by_license_plate(license_plate)

        milage: int = 0
        avg_speed: int = 0
        duration: float = 0
        total_time = timedelta(0)
        error: bool = False

        for track_id in track_ids:
            route = self.get_route_by_track_id(track_id.id)
            for coordinates in range(1, len(route)):
                start = (route[coordinates-1].latitude, route[coordinates-1].longitude)
                end = (route[coordinates].latitude, route[coordinates].longitude)
                distance = haversine(start, end)
                milage += distance

                if route[coordinates].date != None:
                    start_time = datetime.fromisoformat(route[coordinates-1].date)
                    end_time = datetime.fromisoformat(route[coordinates].date)
                    time = end_time - start_time
                    total_time += time
                else:
                    total_time = timedelta(0)

        if int(total_time.total_seconds()) == 0 or None:
            error = True
        else:
            duration = total_time.total_seconds()
            avg_speed = round(milage / (total_time.total_seconds() / 3600))

        print("Milage: ", milage)
        print("Average Speed: ", avg_speed)
        print("Duration: ", duration)
        print("Error: ", error)


        return TableData(round(milage), avg_speed, duration, error)
    
    
    def get_route_by_search(self, name, kfz, start_date, end_date) -> list[Route]:
        points = self.__get_route_by_search(name, kfz, start_date, end_date)
        return points
    
    def get_all_license_plates(self) -> list[LicensePlates]:
        license_plates = self.__get_all_license_plates()
        return license_plates
    
    def get_all_full_names(self) -> list[FullNames]:
        full_names = self.__get_all_full_names()
        return full_names
    
    def get_track_ids_by_license_plate(self, license_plate) -> list[TrackIdByLicensePlate]:
        track_ids = self.__get_track_ids_by_license_plate(license_plate)
        return track_ids
    
    def get_route_by_track_id(self, track_id) -> list[Route]:
        points = self.__get_route_by_track_id(track_id)
        return points
    
    def get_table_data_by_track_id(self, track_id) -> TableData:
        table_data = self.__get_table_data_by_track_id(track_id)
        return table_data
    
    def get_table_data_by_license_plate(self, license_plate) -> TableData:
        table_data = self.__get_table_data_by_license_plate(license_plate)
        return table_data
