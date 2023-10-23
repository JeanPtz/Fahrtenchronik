from dataclasses import dataclass


@dataclass
class Person:
    full_name : str = ""
    name : str = ""
    sur_name : str = ""

@dataclass
class Vehicle:
    license_plate : str = ""

@dataclass
class Track:
    file_name : str = ""

@dataclass
class Point:
    latitude : float = 0
    longitude : float = 0
    elevation : float = 0
    date : str = ""