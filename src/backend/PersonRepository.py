import sqlite3
from DataClasses import Person


class PersonRepository:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)

    def __get_all_people(self) -> list[Person]:
        with self.conn:
            cursor = self.conn.execute('''
                SELECT person_id, full_name, name, surname FROM person
            ''')
            people: list[Person] = []

            for (id, full_name, name, sur_name) in cursor:
                people.append(Person(id, full_name, name, sur_name))
            
            return people
            
        
    def get_all_people(self) -> list[Person]:
        vehicles = self.__get_all_people()
        return vehicles