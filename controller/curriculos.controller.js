const pgp = require('pg-promise');

class CurriculosController {
  async getCurriculos(req, res) {
    const connection = pgp()('postgres://postgres:postgres@localhost:5432/trabalhog2');

    try {
      const curriculos = await connection.query('SELECT * FROM curriculos');
      await connection.$pool.end();
      res.render('listar', { curriculos });
    } catch (error) {
      console.error('Erro ao processar currículo:', error);
      res.status(500).send('Erro ao processar currículo.');
    }
  }

  async insertCurriculos(req, res) {
    const connection = pgp()('postgres://postgres:postgres@localhost:5432/trabalhog2');

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
  CurriculosController,
};
