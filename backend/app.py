import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

# Database connection details
DATABASE_URL = "postgresql://postgres:1234@localhost:5432/mydb"

# Updated SQL query with trigger for PostgreSQL
create_table_query = """
-- Table to store user information
CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store habits
CREATE TABLE IF NOT EXISTS Habits (
    habit_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Table to log habit completions
CREATE TABLE IF NOT EXISTS HabitLogs (
    log_id SERIAL PRIMARY KEY,
    habit_id INT NOT NULL,
    completion_date DATE NOT NULL,
    UNIQUE(habit_id, completion_date),
    FOREIGN KEY (habit_id) REFERENCES Habits(habit_id) ON DELETE CASCADE
);

-- Table to store milestones
CREATE TABLE IF NOT EXISTS Milestones (
    milestone_id SERIAL PRIMARY KEY,
    habit_id INT NOT NULL,
    milestone_date DATE NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (habit_id) REFERENCES Habits(habit_id) ON DELETE CASCADE
);

-- Trigger function to update 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating 'updated_at' on Habits table
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON Habits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
"""

# SQL queries to insert default data for one user
insert_default_data_queries = [
    """
    INSERT INTO Users (username, email) VALUES
    ('JohnDoe', 'john@example.com')
    ON CONFLICT (email) DO NOTHING;
    """,
    """
    INSERT INTO Habits (user_id, name, description) VALUES
    (1, 'Morning Exercise', 'Exercise for 30 minutes every morning.')
    ON CONFLICT DO NOTHING;
    """,
    """
    INSERT INTO HabitLogs (habit_id, completion_date) VALUES
    (1, '2025-01-01'),
    (1, '2025-01-02')
    ON CONFLICT DO NOTHING;
    """
]

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    cursor.execute(create_table_query)
    print("Tables and triggers created successfully!")

    for query in insert_default_data_queries:
        cursor.execute(query)
    print("Default data inserted successfully!")

    conn.commit()

except Exception as e:
    print("Error while creating tables or inserting default data:", e)

finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()

## 
@app.route('/habits', methods=['POST'])
def create_habit():
    data = request.get_json()
    user_id = data.get('user_id')
    name = data.get('name')
    description = data.get('description')

    if not user_id or not name:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Habits (user_id, name, description)
            VALUES (%s, %s, %s)
            RETURNING habit_id;
        """, (user_id, name, description))

        habit_id = cursor.fetchone()[0]
        conn.commit()

        return jsonify({'habit_id': habit_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>', methods=['PUT'])
def update_habit(habit_id):
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE Habits
            SET name = %s, description = %s
            WHERE habit_id = %s
        """, (name, description, habit_id))

        conn.commit()

        return jsonify({'message': 'Habit updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>', methods=['DELETE'])
def delete_habit(habit_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            DELETE FROM Habits
            WHERE habit_id = %s
        """, (habit_id,))

        conn.commit()

        return jsonify({'message': 'Habit deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>/logs', methods=['POST'])
def log_habit(habit_id):
    data = request.get_json()
    completion_date = data.get('completion_date')

    if not completion_date:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO HabitLogs (habit_id, completion_date)
            VALUES (%s, %s)
            ON CONFLICT (habit_id, completion_date) DO NOTHING;
        """, (habit_id, completion_date))

        conn.commit()

        return jsonify({'message': 'Habit logged successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>/logs', methods=['GET'])
def get_habit_logs(habit_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT log_id, completion_date
            FROM HabitLogs
            WHERE habit_id = %s
            ORDER BY completion_date DESC
        """, (habit_id,))

        logs = cursor.fetchall()
        return jsonify({'logs': logs}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>/milestones', methods=['POST'])
def create_milestone(habit_id):
    data = request.get_json()
    milestone_date = data.get('milestone_date')
    description = data.get('description')

    if not milestone_date:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Milestones (habit_id, milestone_date, description)
            VALUES (%s, %s, %s)
            RETURNING milestone_id;
        """, (habit_id, milestone_date, description))

        milestone_id = cursor.fetchone()[0]
        conn.commit()

        return jsonify({'milestone_id': milestone_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>/milestones', methods=['GET'])
def get_habit_milestones(habit_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT milestone_id, milestone_date, description
            FROM Milestones
            WHERE habit_id = %s
            ORDER BY milestone_date ASC
        """, (habit_id,))

        milestones = cursor.fetchall()
        return jsonify({'milestones': milestones}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/habits/<int:habit_id>/milestones/<int:milestone_id>', methods=['DELETE'])
def delete_milestone(habit_id, milestone_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            DELETE FROM Milestones
            WHERE habit_id = %s AND milestone_id = %s
        """, (habit_id, milestone_id))

        conn.commit()

        return jsonify({'message': 'Milestone deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    if not username or not email:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO Users (username, email)
            VALUES (%s, %s)
            RETURNING user_id;
        """, (username, email))

        user_id = cursor.fetchone()[0]
        conn.commit()

        return jsonify({'user_id': user_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT user_id, username, email, created_at
            FROM Users
            WHERE user_id = %s
        """, (user_id,))

        user = cursor.fetchone()
        return jsonify({'user': user}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    if not username or not email:
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE Users
            SET username = %s, email = %s
            WHERE user_id = %s
        """, (username, email, user_id))

        conn.commit()

        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            DELETE FROM Users
            WHERE user_id = %s
        """, (user_id,))

        conn.commit()

        return jsonify({'message': 'User deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>/habits', methods=['GET'])
def get_user_habits(user_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT habit_id, name, description, created_at, updated_at
            FROM Habits
            WHERE user_id = %s
            ORDER BY created_at DESC
        """, (user_id,))

        habits = cursor.fetchall()
        return jsonify({'habits': habits}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>/logs', methods=['GET'])
def get_user_logs(user_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT l.log_id, l.completion_date, h.name
            FROM HabitLogs l
            JOIN Habits h ON l.habit_id = h.habit_id
            WHERE h.user_id = %s
            ORDER BY l.completion_date DESC
        """, (user_id,))

        logs = cursor.fetchall()
        return jsonify({'logs': logs}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

##
@app.route('/users/<int:user_id>/milestones', methods=['GET'])
def get_user_milestones(user_id):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute("""
            SELECT m.milestone_id, m.milestone_date, m.description, h.name
            FROM Milestones m
            JOIN Habits h ON m.habit_id = h.habit_id
            WHERE h.user_id = %s
            ORDER BY m.milestone_date ASC
        """, (user_id,))

        milestones = cursor.fetchall()
        return jsonify({'milestones': milestones}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

@app.route('/')
def home():
    return "Hello, Flask!"
##
if __name__ == '__main__':
    app.run(debug=True)