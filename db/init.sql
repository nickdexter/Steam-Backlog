CREATE TABLE "user" (
    steam64id BIGINT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    password_hash TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game (
    gameid BIGINT PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TYPE game_status AS ENUM (
    'playing',
    'completed',
    'backlog',
    'dropped',
    'excluded'
);