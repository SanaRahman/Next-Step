import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection details
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/flask_db"

# Create table for habits
def create_habit_table():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS habbit (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            startdate DATE,
            enddate DATE,
            goal INT GENERATED ALWAYS AS (enddate - startdate) STORED,
            streak INT DEFAULT 0
        )
        """)
        conn.commit()
    except Exception as e:
        print(e)

# Create table for habit entries (to track user's click)
def create_habit_entries_table():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE IF NOT EXISTS habit_entries (
            id SERIAL PRIMARY KEY,
            habit_id INT REFERENCES habbit(id) ON DELETE CASCADE,
            date DATE,
            checked BOOLEAN DEFAULT FALSE,
            UNIQUE(habit_id, date)
        )
        """)
        conn.commit()
    except Exception as e:
        print(e)

@app.route('/habits', methods=['POST'])
def create_habit():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        data = request.get_json()
        name = data['name']
        description = data['description']
        startdate = data['startdate']
        enddate = data['enddate']
        cur.execute("INSERT INTO habbit (name, description, startdate, enddate) VALUES (%s, %s, %s, %s)", (name, description, startdate, enddate))
        conn.commit()
        return jsonify({"message": "Habit created successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Fetch all habits
@app.route('/habits', methods=['GET'])
def get_habits():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT * FROM habbit")
        rows = cur.fetchall()
        habits = []
        for row in rows:
            habit = {
                "id": row[0],
                "name": row[1],
                "description": row[2],
                "startdate": row[3],
                "enddate": row[4],
                "goal": row[5],
                "streak": row[6]
            }
            habits.append(habit)
        return jsonify(habits)
    except Exception as e:
        return jsonify({"error": str(e)})

# Update habit streak
@app.route('/habits/<int:id>', methods=['PUT'])
def update_streak(id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        data = request.get_json()
        streak = data['streak']
        cur.execute("UPDATE habbit SET streak = %s WHERE id = %s", (streak, id))
        conn.commit()
        return jsonify({"message": "Streak updated successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

# API to track habit entry when clicked
@app.route('/habit_entries', methods=['POST'])
def add_habit_entry():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        data = request.get_json()
        habit_id = data['habit_id']
        date = data['date']

        # Check if the habit entry already exists for the given date
        cur.execute("SELECT * FROM habit_entries WHERE habit_id = %s AND date = %s", (habit_id, date))
        existing_entry = cur.fetchone()

        if existing_entry:
            return jsonify({"message": "This habit is already checked for this day."})

        # Insert the new habit entry
        cur.execute("INSERT INTO habit_entries (habit_id, date, checked) VALUES (%s, %s, TRUE)", (habit_id, date))
        conn.commit()
        return jsonify({"message": "Habit entry added successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

# Check if the habit is checked for a specific day
@app.route('/habit_entries/check', methods=['GET'])
def check_habit_entry():
    try:
        habit_id = request.args.get('habit_id')

        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        cur.execute("SELECT * FROM habit_entries WHERE habit_id = %s", (habit_id,))
        results = cur.fetchall()

        entries = []
        for row in results:
            entry = {
                "habit_id": row[1],
                "date": row[2],
                "checked": row[3]
            }
            entries.append(entry)

        return jsonify({"entries": entries})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/')
def home():
    return "Welcome to Habits API"

if __name__ == '__main__':
    create_habit_table()
    create_habit_entries_table()
    app.run(debug=True)
