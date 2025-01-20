# Habits Tracker API

This is a backend service for a habit-tracking application, built using Python, Flask, and PostgreSQL. The API provides functionality to manage habits and track daily progress.

## Features

- Create and manage habits with descriptions, start and end dates, and goals.
- Track daily progress for each habit.
- Update habit streaks based on user activity.
- Prevent duplicate tracking for the same day.
- Database schema includes tables for habits and daily entries.

## Prerequisites

- Python 3.8+
- PostgreSQL installed and running.
- `pip` for package management.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the PostgreSQL database:
   - Create a database named `flask_db`.
   - Update the `DATABASE_URL` in the code with your database credentials.
     ```python
     DATABASE_URL = "postgresql://<username>:<password>@<host>:<port>/<database>"
     ```
5. Run the application:
   ```bash
   python app.py
   ```
6. Access the application:
   - API Root: `http://127.0.0.1:5000/`

## Endpoints

### Habits Management

- **Create a Habit**
  - `POST /habits`
  - Request Body:
    ```json
    {
      "name": "Habit Name",
      "description": "Habit Description",
      "startdate": "YYYY-MM-DD",
      "enddate": "YYYY-MM-DD"
    }
    ```
- **Get All Habits**
  - `GET /habits`
- **Update Habit Streak**
  - `PUT /habits/<id>`
  - Request Body:
    ```json
    {
      "streak": 10
    }
    ```

### Habit Entries

- **Add a Habit Entry**
  - `POST /habit_entries`
  - Request Body:
    ```json
    {
      "habit_id": 1,
      "date": "YYYY-MM-DD"
    }
    ```
- **Check Habit Entries**
  - `GET /habit_entries/check`
  - Query Parameters:
    - `habit_id` (required)

## Database Schema

### Table: `habbit`

| Column     | Type    | Description                         |
|------------|---------|-------------------------------------|
| `id`       | SERIAL  | Primary key                        |
| `name`     | VARCHAR | Name of the habit                  |
| `description` | TEXT  | Description of the habit          |
| `startdate`| DATE    | Start date of the habit            |
| `enddate`  | DATE    | End date of the habit              |
| `goal`     | INT     | Duration goal (calculated column)  |
| `streak`   | INT     | Current streak (default: 0)        |

### Table: `habit_entries`

| Column     | Type    | Description                         |
|------------|---------|-------------------------------------|
| `id`       | SERIAL  | Primary key                        |
| `habit_id` | INT     | Foreign key referencing `habbit.id`|
| `date`     | DATE    | Date of the habit entry            |
| `checked`  | BOOLEAN | Checked status (default: FALSE)    |

## Notes

- Use the `requirements.txt` file for dependencies:
  ```
  Flask==2.0.3
  psycopg2-binary==2.9.1
  flask-cors==3.0.10
  ```

## Troubleshooting

- Ensure PostgreSQL is running and accessible.
- Verify database connection details in the `DATABASE_URL` variable.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to get started.
