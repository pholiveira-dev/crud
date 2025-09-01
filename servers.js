require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

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

// Vai ser um CRUD de Produtos

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor em: http://localhost:${PORT}`);
});