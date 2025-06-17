const express = require('express');
const pool = require('../database/pool');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM preguntas_formulario')
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener pregunta' })
    }
});


// Crear una pregunta en un formulario
router.post('/', async (req, res) => {
    try {
        const { formulario_id, tipo_pregunta, pregunta, opciones } = req.body;

        const result = await pool.query(
            'INSERT INTO preguntas_formulario (formulario_id, tipo_pregunta, pregunta, opciones) VALUES ($1, $2, $3, $4) RETURNING *',
            [formulario_id, tipo_pregunta, pregunta, opciones]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la pregunta' });
    }
});


// Obtener todas las preguntas de un formulario
router.get('/:formulario_id', async (req, res) => {
    try {
        const { formulario_id } = req.params;
        const result = await pool.query('SELECT * FROM preguntas_formulario WHERE formulario_id = $1', [formulario_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No se encontraron preguntas para este formulario' });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las preguntas' });
    }
});

module.exports = router;
