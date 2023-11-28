class Utils{
    async validaCurriculo(req, res) {
        if (!(await this.validaName(req, res)) || !(await this.validaEmail(req, res)) || !(await this.validaExperience(req, res))) {
          res.status(400).send({ error: 'Dados inválidos' });
          return false;
        }
        return true;
      }

      async validaName(req, res) {
        const { person_name } = req.body;
        if (!person_name || person_name.length < 3 || person_name.length > 60) {
          res.status(400).send({ error: 'Nome inválido' });
          return false;
        }
        return true;
      }

      async validaEmail(req, res) {
        const { email } = req.body;
        if (!email || email.length < 5 || email.length > 50) {
          res.status(400).send({ error: 'Email inválido' });
          return false;
        }
        return true;
      }

      async validaExperience(req, res) {
        const { experience } = req.body;
        if (!experience || experience.length < 5) {
          res.status(400).send({ error: 'Experiência de Trabalho inválida' });
          return false;
        }
        return true;
      }
}

module.exports = {
    Utils
};