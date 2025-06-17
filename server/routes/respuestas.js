const express = require('express');
const pool = require('../database/pool');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM respuestas_formulario')
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al obtener respuestas' })
    }
});


// Enviar respuestas de un formulario
router.post('/', async (req, res) => {
    try {
        const { formulario_id, usuario_id, respuestas } = req.body;

        // Guardar la respuesta principal del formulario
        const result = await pool.query(
            'INSERT INTO respuestas_formulario (formulario_id, usuario_id, fecha_respuesta) VALUES ($1, $2, NOW()) RETURNING id',
            [formulario_id, usuario_id]
        );
        const respuesta_formulario_id = result.rows[0].id;

        // Guardar cada respuesta individual de las preguntas
        for (const respuesta of respuestas) {
            await pool.query(
                'INSERT INTO respuestas_preguntas (respuesta_id, pregunta_id, valor) VALUES ($1, $2, $3)',
                [respuesta_formulario_id, respuesta.pregunta_id, respuesta.valor]
            );
        }

        res.json({ message: 'Respuestas enviadas correctamente', respuesta_formulario_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error enviando las respuestas' });
    }
});


// Obtener respuestas de un formulario
router.get('/:formulario_id', async (req, res) => {
    try {
        const { formulario_id } = req.params;

        const respuestas = await pool.query(`
            SELECT rf.id, rf.usuario_id, rf.fecha_respuesta, rp.pregunta_id, rp.valor
            FROM respuestas_formulario rf
            LEFT JOIN respuestas_preguntas rp ON rf.id = rp.respuesta_id
            WHERE rf.formulario_id = $1
        `, [formulario_id]);

        res.json(respuestas.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las respuestas' });
    }
});

module.exports = router;

