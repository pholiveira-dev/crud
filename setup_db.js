// setup_db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const createTable = async () => {
  let client;
  try {
    console.log('Iniciando script de migração...');
    client = await pool.connect();
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
    console.log('Tabela "produto" criada com sucesso!');
  } catch (err) {
    console.error('Erro na migração:', err.message);
    process.exit(1);
  } finally {
    if (client) {
        client.release();
    }
    await pool.end();
  }
};

createTable();