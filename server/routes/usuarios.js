const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

router.get('/', async (req, res) => {
    res.send('Lista de usuarios funcionando');
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    res.json(result.row[0]);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username, password_hash, rol } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (username, password_hash, rol) VALUES ($1, $2, $3) RETURNING *',
      [username, password_hash, rol]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({error:'Error al crear usuario'});
  }
});

module.exports = router;  