const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

router.get('/', (req, res) => {
    res.send('Formularios funcionando');
});

module.exports = router;
