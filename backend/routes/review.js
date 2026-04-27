const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const { sendError } = require('../utils/error');
const isNumericId = require('../utils/id');

router.get('/', async (req, res) => {
    const result = await db.query("SELECT * FROM review");
    return res.json(result.rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    if (!isNumericId(id)) {
        return sendError(res, 400, "Invalid id", "id must be a number");
    }

    const result = await db.query(
        'SELECT * FROM review WHERE id = $1',
        [req.params.id]
    );

    if (result.rowCount <= 0) {
        return sendError(res, 404, "Review not found");
    }

    return res.json(result.rows[0]);
});

module.exports = router;