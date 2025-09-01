const pool  = require('../../config/db');

exports.allProducts = async (req, res) => {
    
    try {
        const result = await pool.query('SELECT * FROM produto ORDER BY id_produto ASC')
        res.render('index', { produtos: result.rows });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createProduct = async (req, res) => {

    const { nome, preco, quantidade, descricao } = req.body;

    try {
        await pool.query(
            "INSERT INTO produto(nome, preco, quantidade, descricao) VALUES ($1, $2, $3, $4) RETURNING *",
            [nome, preco, quantidade, descricao]
        );

        res.redirect('/');

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nome, preco, quantidade, descricao } = req.body;
    try {

        await pool.query(
            'UPDATE produto SET nome=$1, preco=$2, quantidade=$3, descricao=$4 WHERE id_produto=$5',
            [nome, preco, quantidade, descricao, id]
            
        )
        res.redirect('/')
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.deleteProdutc = async (req, res) => {
    try {

        const { id } = req.params;

        await pool.query('DELETE FROM produto WHERE   id_produto=$1', [id]);

        res.redirect('/');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}