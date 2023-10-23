import sqlite3
from DataClasses import Person


class PersonRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)