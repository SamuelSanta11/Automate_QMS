const express = require('express');
const pool = require('../database/pool');
const multer = require('multer');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM maquinas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener maquinas' })    
    }
});

//Configuracion de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //Carpeta para almacenar archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

//Reportar maquina 
router.post('/reportar', upload.single('evidencia_imagen'), async (req, res) => {
    try {
        const { id, estado, descripcion } = req.body;
        const evidencia_imagen = req.file ? req.file.path : null;

        const result = await pool.query(
            'UPDATE maquinas SET estado = $1, descripcion = $2, evidencia_imagen = $3, fecha_reporte = NOW() WHERE id = $4 RETURNING *',
            [estado, descripcion, evidencia_imagen, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reportando la máquina' });
    }
});

module.exports = router;
