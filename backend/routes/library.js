const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const { sendError } = require('../utils/error');
const isNumericId = require('../utils/id');

router.get('/', async (req, res) => {
    const steam64id = req.steam64id;

    if (!isNumericId(steam64id)) {
        return sendError(res, 400, "Invalid steam64id");
    }

    const result = await db.query(
        'SELECT * FROM user_library WHERE steam64id = $1',
        [req.steam64id]
    );

    if (result.rowCount <= 0) {
        return sendError(res, 404, "Library not found", "user does not exist");
    }
    return res.json(result.rows);
});

module.exports = router;