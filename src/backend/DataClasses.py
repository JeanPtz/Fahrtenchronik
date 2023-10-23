from dataclasses import dataclass


@dataclass
class Person:
    person_id : int 
    full_name : str
    name : str
    sur_name : str

@dataclass
class Vehicle:
    vehicle_id : int 
    license_plate : str 

@dataclass
class Track:
    track_id : int
    file_name : str
    person_id : int
    vehicle_id : int

@dataclass
class Point:
    point_id : int
    latitude : float
    longitude : float
    elevation : float
    date : str
    track_id : int