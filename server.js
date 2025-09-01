// server.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// ... sua configuração de Middlewares e Views

// Configuração de rota:
const routes = require('./routes');
app.use(routes);

// ... seu código de CRUD (que continua igual)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor em: http://localhost:${PORT}`);
});