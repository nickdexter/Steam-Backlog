const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const libraryRouter = require('./library');
const { sendError } = require('../utils/error');
const isNumericId = require('../utils/id');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM "user"');
    return res.json(result.rows);
});

// Info for logged in user
router.get("/me", (req, res) => {
    if (!req.user) {
        return sendError(res, 401, "Not logged in");
    }

    res.json({
        steam64id: req.user.steam64id || req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
    });
});

// Forward request to library route
router.use('/:steam64id/library', (req, res, next) => {
    req.steam64id = req.params.steam64id;
    next();
}, libraryRouter);

router.get('/:steam64id', async (req, res) => {
    const steam64id = req.params.steam64id;

    if (!isNumericId(steam64id)) {
        return sendError(res, 400, "Invalid steam64id");
    }

    const result = await db.query(
        'SELECT * FROM "user" WHERE steam64id = $1',
        [req.params.steam64id]
    );

    if (result.rowCount <= 0) {
        return sendError(res, 404, "user not found");
    }

    return res.json(result.rows[0]);
});

module.exports = router;