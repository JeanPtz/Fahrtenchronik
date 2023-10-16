class Person:
    def __init__(self, conn):
        self.conn = conn

    def insert(self, nickname, name, surname, email):
        cursor = self.conn.cursor()
        cursor.execute('''
            INSERT INTO person (nickname, name, surname, email)
            VALUES (?, ?, ?, ?)
        ''', (nickname, name, surname, email))
        self.conn.commit()
        cursor.close()

    # Add methods for querying and updating data as needed.
