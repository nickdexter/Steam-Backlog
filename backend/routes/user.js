const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const errorResponse = require('../utils/error');
const libraryRouter = require('./library');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM "user"');
    return res.json(result.rows);
});

// Info for logged in user
router.get("/me", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Not logged in" });
    }

    res.json({
        steam64id: req.user.steam64id || req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
    });
});

router.use('/:steam64id/library', (req, res, next) => {
    req.steam64id = req.params.steam64id;
    next();
}, libraryRouter);

router.get('/:steam64id', async (req, res) => {
    const steam64id = Number(req.params.steam64id);

    if (!Number.isInteger(steam64id)) {
        response = errorResponse(400, "Invalid steam64id")
        return res.json(response);
    }

    const result = await db.query(
        'SELECT * FROM "user" WHERE steam64id = $1',
        [req.params.steam64id]
    );

    if (result.rowCount <= 0) {
        response = errorResponse(404, "user not found");
        return res.json(response);
    }
    return res.json(result.rows[0]);
});

module.exports = router;