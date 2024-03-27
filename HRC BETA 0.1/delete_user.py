import sqlite3

def delete_record(email):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('employee_database.db')
        cursor = conn.cursor()

        # Execute SQL DELETE statement
        cursor.execute("DELETE FROM users WHERE email = ?", (email,))

        # Commit the transaction
        conn.commit()

        print("Record deleted successfully.")

    except sqlite3.Error as error:
        print("Failed to delete record from the database:", error)

    finally:
        # Close the database connection
        if conn:
            conn.close()

if __name__ == '__main__':
    email_to_delete = input("Enter the email to delete: ")  # Example email to delete
    delete_record(email_to_delete)
