-- Migration number: 0001 	 2024-01-20T00:00:00.000Z
CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    language TEXT,
    location_lat REAL,
    location_lng REAL,
    created_at TEXT NOT NULL,
    processed BOOLEAN DEFAULT FALSE
);
