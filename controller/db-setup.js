const pgp = require('pg-promise');

async function setup_db() {
    console.log('Criando tabela caso não exista...');
    const connection = pgp()(process.env.POSTGRES_CONNECTION_STRING);

    try {
        await connection.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await connection.query('CREATE TABLE IF NOT EXISTS curriculos (id_person UUID DEFAULT uuid_generate_v4() PRIMARY KEY, person_name VARCHAR(60) NOT NULL, phone VARCHAR(15), email VARCHAR(50) NOT NULL, webpage VARCHAR(50), experience TEXT NOT NULL)');
        console.log('Tabela currículos criada ou já existe.');
    } catch (error) {
        console.log('Erro ao criar tabela.');
    } finally {
        await connection.$pool.end();
    }
}

module.exports = { setup_db};

