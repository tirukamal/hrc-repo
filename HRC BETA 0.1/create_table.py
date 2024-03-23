import sqlite3

def create_database():
    conn = sqlite3.connect('employee_database.db')
    cursor = conn.cursor()

    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            contact TEXT,
            emergency_contact TEXT
        )
    ''')

    # Create attendance table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS AttendanceRecord (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT,       
            checkin_time DATETIME,
            checkout_time DATETIME,
            leave_applications TEXT
        )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()

