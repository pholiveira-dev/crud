// server.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Importe a função createTable do seu arquivo db.js
const { createTable } = require('./config/db');

// Configuração de Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

// Configuração de Views:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Configuração de rota:
const routes = require('./routes');
app.use(routes);

const PORT = 3000;

// Chame createTable() e, quando ela for resolvida, inicie o servidor
createTable().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor em: http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Falha ao iniciar o servidor:', error);
});