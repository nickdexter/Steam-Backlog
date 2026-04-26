const express = require('express');
const router = express.Router();
const db = require('../utils/dbconn');
const errorResponse = require('../utils/error');

router.get('/', async (req, res) => {
    const result = await db.query("SELECT * FROM review");
    return res.json(result.rows);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    
    if (!Number.isInteger(id)){
        response = errorResponse(400, "Invalid id")
        return res.json(response);
    }
    
    const result = await db.query(
        'SELECT * FROM review WHERE id = $1',
        [req.params.id]
    );
    return res.json(result.rows[0]);
});

module.exports = router;