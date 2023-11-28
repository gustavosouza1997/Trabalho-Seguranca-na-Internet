const pgp = require('pg-promise');
const dotenv = require('dotenv').config();
const { Utils } = require('../utils/utils');

class CurriculosController {
  async getAllCurriculos(req, res) {
    const connection = pgp()(process.env.POSTGRES_CONNECTION_STRING);

    try {
      const curriculos = await connection.query('SELECT * FROM curriculos');
      await connection.$pool.end();
      res.render('listar', { curriculos });
    } catch (error) {
      console.error('Erro ao carregar todos os currículos:', error);
      res.status(500).send('Erro ao carregar todos os currículos.');
    }
  }

  async getCurriculo(req, res) {
    const connection = pgp()(process.env.POSTGRES_CONNECTION_STRING);

    try {
      const curriculo = await connection.query(
        'SELECT * FROM curriculos WHERE id_person = $1', 
        [req.params.id_person]
      );
      await connection.$pool.end();
      res.render('consultar', { curriculo });
    } catch (error) {
      console.error('Erro ao pesquisar currículo:', error);
      res.status(500).send('Erro ao pesquisar currículo.');
    }
  }

  async insertCurriculos(req, res) {
    const connection = pgp()(process.env.POSTGRES_CONNECTION_STRING);
    const utilsInstance = new Utils();

    if (!(await utilsInstance.validaCurriculo(req, res))) {
      return;
    }

    try {
      const { person_name, phone, email, webpage, experience } = req.body;
      const curriculos = await connection.query(
        'INSERT INTO curriculos (person_name, phone, email, webpage, experience) VALUES ($1, $2, $3, $4, $5)',
        [person_name, phone, email, webpage, experience]
      );
      await connection.$pool.end();
      res.redirect('/');
      return;
    } catch (error) {
      console.error('Erro ao processar currículo:', error);
      res.status(500).send('Erro ao processar currículo.');
    }
  }
}

module.exports = {
  CurriculosController
};
