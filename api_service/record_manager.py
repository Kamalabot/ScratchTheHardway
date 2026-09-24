import os
import sys
import sqlite3
import re
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "records.db")
EMAIL_REGEX = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"


def init_database(db_path: str) -> None:
    logging.info("Initializing database connection...")
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS records (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    notes TEXT,
                    created_at TEXT NOT NULL
                )
            """)
            conn.commit()
            logging.info("Database table 'records' verified/created successfully.")
    except sqlite3.Error as e:
        logging.error(f"Failed to initialize SQLite database: {e}")
        sys.exit(1)


def get_user_input() -> tuple[str, str, str]:
    while True:
        logging.info("Waiting for user input: Full Name...")
        try:
            name = input("Enter Full Name: ").strip()
        except (KeyboardInterrupt, EOFError):
            logging.warning("User aborted input operation.")
            sys.exit(0)

        if not name:
            logging.warning("Branch: Name was empty. Prompting again.")
            print("[Error] Name cannot be blank. Please try again.")
            continue
        else:
            logging.info(f"Branch: Valid name received: '{name}'")
            break

    while True:
        logging.info("Waiting for user input: Email Address...")
        try:
            email = input("Enter Email Address: ").strip()
        except (KeyboardInterrupt, EOFError):
            logging.warning("User aborted input operation.")
            sys.exit(0)

        if not re.match(EMAIL_REGEX, email):
            logging.warning(f"Branch: Invalid email format '{email}'. Prompting again.")
            print("[Error] Invalid email address format. Example: user@domain.com")
            continue
        else:
            logging.info(f"Branch: Valid email received: '{email}'")
            break

    logging.info("Waiting for user input: Notes (optional)...")
    try:
        notes = input("Enter Notes (optional, press Enter to skip): ").strip()
    except (KeyboardInterrupt, EOFError):
        logging.warning("User aborted input operation.")
        sys.exit(0)

    if notes:
        logging.info(f"Branch: Notes provided ({len(notes)} chars).")
    else:
        logging.info("Branch: No notes provided. Setting default empty string.")
        notes = ""

    return name, email, notes


def insert_record(db_path: str, name: str, email: str, notes: str) -> int:
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logging.info("Executing database insert query...")
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO records (name, email, notes, created_at)
                VALUES (?, ?, ?, ?)
                """,
                (name, email, notes, created_at)
            )
            conn.commit()
            inserted_id = cursor.lastrowid
            logging.info(f"Record committed to database with generated ID: {inserted_id}")
            return inserted_id
    except sqlite3.Error as e:
        logging.error(f"Database insertion failed: {e}")
        sys.exit(1)


def display_record(db_path: str, record_id: int) -> None:
    logging.info(f"Fetching specific record ID {record_id} for confirmation...")
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, email, notes, created_at FROM records WHERE id = ?",
                (record_id,)
            )
            row = cursor.fetchone()
            if row:
                logging.info(f"Branch: Found record ID {record_id}.")
                print("\n" + "=" * 50)
                print(f"       SUCCESSFULLY INSERTED RECORD #{row[0]}")
                print("=" * 50)
                print(f"  ID         : {row[0]}")
                print(f"  Name       : {row[1]}")
                print(f"  Email      : {row[2]}")
                print(f"  Notes      : {row[3] if row[3] else '(None)'}")
                print(f"  Timestamp  : {row[4]}")
                print("=" * 50)
            else:
                logging.warning(f"Branch: Record ID {record_id} was not found.")
    except sqlite3.Error as e:
        logging.error(f"Error querying record: {e}")
        sys.exit(1)


def display_all_records(db_path: str) -> None:
    logging.info("Querying all records from database...")
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, email, notes, created_at FROM records ORDER BY id ASC"
            )
            rows = cursor.fetchall()

            total_records = len(rows)
            logging.info(f"Branch: Retrieved {total_records} record(s) from table.")

            if not rows:
                print("\n[Notice] No records found in the database.")
                return

            print(f"\nAll Database Records ({total_records} total):")
            header = f"{'ID':<5} | {'Name':<22} | {'Email':<28} | {'Timestamp':<19} | {'Notes'}"
            print("-" * len(header))
            print(header)
            print("-" * len(header))

            for index, row in enumerate(rows, start=1):
                logging.info(f"Loop iteration: Rendering table row {index}/{total_records} (ID: {row[0]}).")
                r_id, r_name, r_email, r_notes, r_time = row
                truncated_notes = (r_notes[:25] + "...") if len(r_notes) > 28 else r_notes
                print(f"{r_id:<5} | {r_name:<22} | {r_email:<28} | {r_time:<19} | {truncated_notes}")

            print("-" * len(header) + "\n")
    except sqlite3.Error as e:
        logging.error(f"Error retrieving all records: {e}")
        sys.exit(1)


def main() -> None:
    logging.info("Starting Record Management CLI script.")
    init_database(DB_FILE)

    name, email, notes = get_user_input()
    inserted_id = insert_record(DB_FILE, name, email, notes)

    display_record(DB_FILE, inserted_id)
    display_all_records(DB_FILE)

    logging.info("Script execution completed successfully.")
    sys.exit(0)


if __name__ == "__main__":
    main()
