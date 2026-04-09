from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_db():
    conn = sqlite3.connect(os.path.join(BASE_DIR, "stations.db"))
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
    CREATE TABLE IF NOT EXISTS stations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT NOT NULL,
        power INTEGER NOT NULL,
        date TEXT NOT NULL
    )
    """)
    conn.close()

init_db()

@app.route("/")
def home():
    return "Backend running"

@app.route("/stations", methods=["GET"])
def get_stations():
    conn = get_db()
    rows = conn.execute("SELECT * FROM stations").fetchall()
    conn.close()

    stations = [dict(row) for row in rows]
    return jsonify(stations)

if __name__ == "__main__":
    app.run(debug=True)