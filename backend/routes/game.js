const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const errorResponse = require('../utils/error');

router.get('/', async (req, res) => {
    const result = await db.query("SELECT * FROM game");
    return res.json(result.rows);
});

router.get('/:gameid', async (req, res) => {
    const gameid  = Number(req.params.gameid);

    if (!Number.isInteger(gameid) || gameid <= 0){
        response = errorResponse(400, "Invalid gameid", "gameid must be a positive integer");
        return res.json(response);
    }

    const result = await db.query(
        "SELECT * FROM game WHERE gameid = $1",
        [req.params.gameid]
    );

    if(result.rowCount <= 0) {
        response = errorResponse(404, "gameid not found", "");
        return res.json(response);
    }
    return res.json(result.rows[0]);
});

module.exports = router;