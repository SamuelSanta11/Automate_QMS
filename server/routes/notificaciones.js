const express = require('express');
const pool = require('../database/pool');
const router = express.Router();


// Obtener notificacion
router.post('/', async (req, res) => {
    try {
        const { maquina_id, usuario_id, mensaje } = req.body;

        const result = await pool.query(
            'INSERT INTO notificaciones (maquina_id, usuario_id, mensaje, estado, fecha) VALUES ($1, $2, $3, \'pendiente\', NOW()) RETURNING *',
            [maquina_id, usuario_id, mensaje]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creando la notificación' });
    }
});


// Obtener todas las notificaciones
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notificaciones ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo las notificaciones' });
    }
});


// Aprobar una notificacion
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const result = await pool.query(
            'UPDATE notificaciones SET estado = $1 WHERE id = $2 RETURNING *',
            [estado, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar notificación' });
    }
});

module.exports = router;
