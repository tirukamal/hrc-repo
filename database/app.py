import sqlite3
import hashlib

def hash_password(password):
    """Hashes the password using SHA-256."""
    return hashlib.sha256(password.encode()).hexdigest()

def create_database():
    conn = sqlite3.connect('employee_database.db')
    cursor = conn.cursor()

    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emp_id TEXT NOT NULL,
            transitory_id TEXT NOT NULL,
            permanent_id TEXT NOT NULL,
            office_email TEXT NOT NULL UNIQUE,
            login_userid TEXT NOT NULL UNIQUE,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            gender TEXT NOT NULL,
            date_of_birth TEXT, -- You can choose to store it as a string or datetime
            personal_email TEXT NOT NULL,
            secondary_email TEXT,
            primary_phone TEXT NOT NULL,
            secondary_phone TEXT,
            permanent_address TEXT NOT NULL,
            perm_pincode TEXT,
            perm_city TEXT,
            current_address BOOLEAN,
            current_pincode TEXT,
            current_city TEXT,
            blood_group TEXT,
            accessibility_needs BOOLEAN,
            accessibility_needs_description TEXT,
            date_of_joining DATE,
            date_of_leaving DATE,
            employment_type TEXT,
            referred_by_id TEXT,
            referred_by_name TEXT,
            job_title TEXT,
            job_position TEXT,
            marital_status TEXT,
            date_created DATETIME,
            last_updated DATETIME,
            UNIQUE (office_email, login_userid), -- Unique constraint on office_email and login_userid
            CHECK (gender IN ('MALE', 'FEMALE', 'OTHERS')) -- Check constraint for gender values
        )
    ''')

    # Create EducationInfo table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS EducationInfo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emp_id TEXT NOT NULL UNIQUE,
            master_degree_university TEXT,
            master_degree_branch TEXT,
            master_degree_marks REAL,
            master_degree_date DATE,
            master_degree_certificate TEXT,
            pursuing_degree_university TEXT,
            pursuing_degree_branch TEXT,
            pursuing_degree_marks REAL,
            pursuing_degree_date DATE,
            pursuing_degree_certificate TEXT,
            intermediate_diploma_college TEXT,
            intermediate_diploma_branch TEXT,
            intermediate_diploma_marks REAL,
            intermediate_diploma_date DATE,
            intermediate_diploma_certificate TEXT,
            tenth_school TEXT,
            tenth_marks REAL,
            tenth_date DATE,
            tenth_certificate TEXT,
            education_gap BOOLEAN,
            live_backlogs DATE,
            backlog_reason TEXT,
            date_created DATETIME,
            last_updated DATETIME,
            FOREIGN KEY (emp_id) REFERENCES users(emp_id)
        )
    ''')

    # Create EMP_EDU_TYPE table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS EMP_EDU_TYPE (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emp_id TEXT NOT NULL,
            emp_edu_name TEXT NOT NULL,
            emp_edu_description TEXT,
            start_mm_yy TEXT,
            end_mm_yy TEXT,
            cgpa_percentage_rank REAL,
            date_created DATETIME,
            last_updated DATETIME,
            FOREIGN KEY (emp_id) REFERENCES users(emp_id)
        )
    ''')

    # Create AttendanceRecord table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS AttendanceRecord (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_email TEXT NOT NULL,
            checkin_time DATETIME,
            checkout_time DATETIME,
            leave_start_time DATETIME,
            leave_reason TEXT DEFAULT NULL,
            FOREIGN KEY (user_email) REFERENCES users(personal_email)
        )
    ''')

    # Create InternInfo table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Additional_InternInfo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            id_card_number TEXT NOT NULL,
            id_card_photo BLOB,
            postal_address TEXT NOT NULL,
            date_of_birth DATE NOT NULL,
            FOREIGN KEY (email) REFERENCES users(personal_email)
        )
    ''')

    # Create TaskPage table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS TaskPage (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            update_time DATETIME NOT NULL,
            task_text TEXT NOT NULL,
            FOREIGN KEY (email) REFERENCES users(personal_email)
        )
    ''')

    # Create ProjectInfo table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ProjectInfo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_name TEXT NOT NULL,
            project_info TEXT NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS experience_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            previous_company TEXT NOT NULL,
            designation TEXT NOT NULL,
            years_of_experience INTEGER NOT NULL,
            date DATE NOT NULL,
            previous_salary REAL NULL,
            skills TEXT NOT NULL,
            experience_certificate BLOB,
            date_created DATE NOT NULL,
            last_date_updated DATE NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS document_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            emp_id INTEGER NOT NULL,
            adhar_card BLOB,
            pan_card BLOB,
            passport BLOB,
            passport_photo BLOB,
            e_signature BLOB,
            resume BLOB,
            additional_certificates BLOB,
            document_path TEXT NOT NULL,
            date_created DATE NOT NULL,
            last_date_updated DATE NOT NULL,
            FOREIGN KEY (emp_id) REFERENCES users(emp_id)
        )
    ''')


    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_database()
