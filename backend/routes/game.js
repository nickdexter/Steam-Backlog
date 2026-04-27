const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const { sendError } = require('../utils/error');
const isNumericId = require('../utils/id');

router.get('/', async (req, res) => {
    const result = await db.query("SELECT * FROM game");
    return res.json(result.rows);
});

router.get('/:gameid', async (req, res) => {
    const gameid = req.params.gameid;

    if (!isNumericId(gameid)) {
        return sendError(res, 400, "Invalid gameid", "gameid must be a positive integer");
    }

    const result = await db.query(
        "SELECT * FROM game WHERE gameid = $1",
        [req.params.gameid]
    );

    if (result.rowCount <= 0) {
        return sendError(res, 404, "gameid not found", "Game not found in our database");
    }
    return res.json(result.rows[0]);
});

module.exports = router;