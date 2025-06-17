const express = require('express');
const router = express.Router();
const pool = require('../database/pool');

//Crear un formulario
router.post('/', async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const result = await pool.query(
            'INSERT INTO formularios (titulo, descripcion, fecha_creacion) VALUES ($1, $2, NOW()) RETURNING *',
            [titulo, descripcion]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear formulario' });
    }
});

//Obtener formulario
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM formularios ORDER BY fecha_creacion DESC')
        res.json(result.rows);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener formularios' });
    }
});

//Obtener formularios con preguntas 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const formularios = await pool.query('SELECT * FROM formularios WHERE id = $1', [id]);
        const preguntas = await pool.query('SELECT * FROM pregunta_formularios WHERE formulario_id = $1', [id]);
        res.json({
            formulario: formularios.rows[0],
            preguntas: preguntas.rows
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener preguntas' });
    }
});

module.exports = router;
