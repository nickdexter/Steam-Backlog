const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const errorResponse = require('../utils/error');

router.get('/', async (req, res) => {
    const steam64id = Number(req.steam64id);

    if (!Number.isInteger(steam64id)) {
        response = errorResponse(400, "Invalid steam64id")
        return res.json(response);
    }

    const result = await db.query(
        'SELECT * FROM user_library WHERE steam64id = $1',
        [req.steam64id]
    );

    if (result.rowCount <= 0) {
        response = errorResponse(404, "Library not found", "user does not exist");
        return res.json(response);
    }
    return res.json(result.rows);
});

module.exports = router;