const express = require('express');
const router = express.Router();
const { CurriculosController } = require('../controller/curriculos.controller');

const curriculosController = new CurriculosController();

// Listar todos os currículos
router.get('/', curriculosController.getCurriculos);

// Formulário para cadastrar um novo currículo
router.get('/cadastrar', (req, res) => {
  res.render('cadastrar');
});

// Formulário para cadastrar um novo currículo
router.get('/listar', (req, res) => {
  res.render('listar');
});

// Cadastrar um novo currículo
router.post('/cadastrar', async (req, res) => {
  const curriculos = await curriculosController.insertCurriculos(req, res);
});

// Consultar informações de um currículo
router.get('/consultar/:id', async (req, res) => {
  res.render('consultar');
});

module.exports = router;
