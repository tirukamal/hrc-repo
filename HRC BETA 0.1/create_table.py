import sqlite3
import pytz
from datetime import datetime

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

    # Convert time to Indian Standard Time
    ist = pytz.timezone('Asia/Kolkata')
    current_time = datetime.now(pytz.utc).astimezone(ist)

    # Insert current time into checkin_time and checkout_time columns
    cursor.execute('''
        INSERT INTO AttendanceRecord (user_email, checkin_time, checkout_time, leave_applications)
        VALUES (?, ?, ?, ?)
    ''', ('user@example.com', current_time, current_time, 'No leave applications'))

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()
