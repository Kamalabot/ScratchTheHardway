import os
import sys
import sqlite3
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "records.db")

SAMPLE_RECORDS = [
    ("Bruce Wayne", "bruce@wayne-enterprises.com", "Lead Gameplay Architect - Core Movement System"),
    ("Clark Kent", "clark.kent@dailyplanet.org", "Senior Narrative Designer - Story Branching Logic"),
    ("Diana Prince", "diana@themyscira.net", "Combat & Animation State Machine Specialist"),
    ("Barry Allen", "barry.allen@starlabs.io", "Network Replication & High-Tick Latency Optimization"),
    ("Arthur Curry", "arthur@atlantis-oceanics.org", "Fluid Physics & Underwater Particle VFX"),
    ("Victor Stone", "victor.stone@cybernetics.tech", "Engine Systems & Unreal Memory Profiling"),
    ("Hal Jordan", "hal.jordan@ferrisair.com", "Flight Dynamics & Vehicle Physics Simulator"),
    ("Selina Kyle", "selina@shadowworks.io", "Stealth AI Perception & Pathfinding Grids"),
    ("Oliver Queen", "oliver@queen-industries.com", "Projectile Trajectory & Weapon Ability Specs"),
    ("Zatanna Zatara", "zatanna@mysticarts.stage", "Particle Niagria VFX & Elemental Shaders")
]


def ensure_table(db_path: str) -> None:
    logging.info("Checking database schema readiness...")
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
            logging.info("Branch: Database schema confirmed.")
    except sqlite3.Error as exc:
        logging.error(f"Database schema verification failed: {exc}")
        sys.exit(1)


def seed_records(db_path: str) -> list[int]:
    logging.info(f"Preparing to seed {len(SAMPLE_RECORDS)} records...")
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    inserted_ids = []

    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()

            for idx, (name, email, notes) in enumerate(SAMPLE_RECORDS, start=1):
                logging.info(f"Loop iteration {idx}/{len(SAMPLE_RECORDS)}: Checking existing record for '{email}'...")
                cursor.execute("SELECT id FROM records WHERE email = ?", (email,))
                existing = cursor.fetchone()

                if existing:
                    logging.info(f"Branch: Record with email '{email}' already exists (ID: {existing[0]}). Skipping.")
                else:
                    logging.info(f"Branch: Inserting new record for '{name}' <{email}>...")
                    cursor.execute(
                        """
                        INSERT INTO records (name, email, notes, created_at)
                        VALUES (?, ?, ?, ?)
                        """,
                        (name, email, notes, now_str)
                    )
                    inserted_ids.append(cursor.lastrowid)

            conn.commit()
            logging.info(f"Batch commit finished. Total new records inserted: {len(inserted_ids)}")
            return inserted_ids
    except sqlite3.Error as exc:
        logging.error(f"Error during batch record insertion: {exc}")
        sys.exit(1)


def display_database_summary(db_path: str) -> None:
    logging.info("Generating post-seed database summary report...")
    try:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, name, email, notes, created_at FROM records ORDER BY id ASC")
            rows = cursor.fetchall()
            total_count = len(rows)

            logging.info(f"Branch: Total records stored in database: {total_count}")

            print("\n" + "=" * 95)
            print(f"                       DATABASE CURRENT STATE ({total_count} TOTAL RECORDS)")
            print("=" * 95)
            header = f"{'ID':<4} | {'Name':<18} | {'Email':<32} | {'Timestamp':<19} | {'Notes'}"
            print(header)
            print("-" * 95)

            for idx, row in enumerate(rows, start=1):
                logging.info(f"Loop iteration: Displaying row {idx}/{total_count} (Record ID: {row[0]}).")
                r_id, r_name, r_email, r_notes, r_time = row
                truncated_notes = (r_notes[:20] + "...") if len(r_notes) > 23 else r_notes
                print(f"{r_id:<4} | {r_name:<18} | {r_email:<32} | {r_time:<19} | {truncated_notes}")

            print("=" * 95 + "\n")
    except sqlite3.Error as exc:
        logging.error(f"Summary query failed: {exc}")
        sys.exit(1)


def main() -> None:
    logging.info("Starting seed data operation...")
    ensure_table(DB_FILE)
    seed_records(DB_FILE)
    display_database_summary(DB_FILE)
    logging.info("Seed data operation completed successfully.")
    sys.exit(0)


if __name__ == "__main__":
    main()
