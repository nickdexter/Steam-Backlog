CREATE TABLE review (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gameid BIGINT NOT NULL REFERENCES game(gameid) ON DELETE CASCADE,
    steam64id BIGINT NOT NULL REFERENCES "user"(steam64id) ON DELETE CASCADE,
    score INT NOT NULL CHECK (score >= 0 AND score <= 10),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (gameid, steam64id)
);

-- INDEX for fast average score calculations
CREATE INDEX idx_review_gameid ON review(gameid);
CREATE INDEX idx_review_user ON review(steam64id);