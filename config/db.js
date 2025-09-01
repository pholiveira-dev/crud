const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});



const createTable = async () => {
  try {
    console.log('Iniciando conexão para criar a tabela...');
    const client = await pool.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS produto (
        id_produto SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        quantidade INT NOT NULL,
        descricao TEXT
      );
    `;

    await client.query(query);
    console.log('Tabela "produto" criada com sucesso (ou já existia).');
    client.release();
  } catch (err) {
    console.error('Erro ao criar a tabela:', err.message);
    process.exit(1); // Sai do processo com erro
  } finally {
    await pool.end();
  }
};

createTable();

module.exports = pool;