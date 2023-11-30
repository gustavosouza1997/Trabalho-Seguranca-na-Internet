const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { CurriculosController } = require('../controller/curriculos.controller');
const { utils } = require('pg-promise');

const curriculosController = new CurriculosController();
router.use(csrf({ cookie: true }));

// Listar todos os currículos
router.get('/', curriculosController.getAllCurriculos);


// Formulário para cadastrar um novo currículo
router.get('/cadastrar', (req, res) => {
  res.cookie('csrfToken', req.csrfToken());
  res.render('cadastrar');
});

// Cadastrar um novo currículo
router.post('/cadastrar-protegida', async (req, res) => {
  if (req.body._csrf === req.cookies.csrfToken) {
    return res.status(403).send('Token CSRF inválido');
  }

  await curriculosController.insertCurriculos(req, res);
});

// Consultar informações de um currículo
router.get('/consultar/:id_person', async (req, res) => {
  await curriculosController.getCurriculo(req, res);
});

module.exports = router;
