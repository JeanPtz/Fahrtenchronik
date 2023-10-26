from dataclasses import dataclass


@dataclass
class Person:
    id : str 
    full_name : str
    name : str
    sur_name : str

@dataclass
class Vehicle:
    id : str 
    license_plate : str 

@dataclass
class TrackEntity:
    id : str
    file_name : str
    person_id : str
    vehicle_id : str

@dataclass
class PointEntity:
    id : str
    latitude : float
    longitude : float
    elevation : float
    date : str
    track_id : str

@dataclass
class TrackIdByLicensePlate:
    id: str

@dataclass
class LicensePlates:
    license_plate: str

@dataclass
class FullNames:
    full_name: str

@dataclass
class Route:
    latitude : float
    longitude : float

@dataclass
class TableData:
    milage: int
    avg_speed: float
    duration: float
    message: int