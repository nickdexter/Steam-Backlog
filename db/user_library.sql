CREATE TABLE user_library (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gameid BIGINT NOT NULL REFERENCES game(gameid) ON DELETE CASCADE,
    steam64id BIGINT NOT NULL REFERENCES "user"(steam64id) ON DELETE CASCADE,
    status game_status NOT NULL,

    UNIQUE (gameid, steam64id)
);

-- INDEX for fast user lookups
CREATE INDEX idx_library_user ON user_library(steam64id);
CREATE INDEX idx_library_game ON user_library(gameid);