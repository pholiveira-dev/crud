const express = require('express');
const routes = express.Router();

const testeController = require('./src/controllers/testeController');

routes.get('/', testeController.allProducts);
routes.post('/add', testeController.createProduct);
routes.post('/edit/:id', testeController.updateProduct);
routes.get('/delete/:id', testeController.deleteProdutc);

module.exports = routes;