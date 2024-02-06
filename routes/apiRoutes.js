const router = require('express').Router();
const fs = require('fs');
const fileName = require('../db/db.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    const data = fs.readFileSync('db/db.json', 'utf8');
    const parsedData = JSON.parse(data);
    res.json(parsedData);
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    const payload = {
        title,
        text,
        id: uuidv4()
    };
    console.log(payload);
    const newData = [...fileName, payload];
    const data = fs.writeFileSync('db/db.json', JSON.stringify(newData), (err) => console.log(err));
    res.json(data);
});

module.exports = router;