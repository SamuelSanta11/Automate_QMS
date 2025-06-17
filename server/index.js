const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./database/pool');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor ejecutándose correctamente');
});

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/maquinas', require('./routes/maquinas'));
app.use('/api/formularios', require('./routes/formularios'));
app.use('/api/preguntas', require('./routes/preguntas'));
app.use('/api/respuestas', require('./routes/respuestas'));
app.use('/api/notificaciones', require('./routes/notificaciones'));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

