const express = require('express');
const router = express.Router();
const { CurriculosController } = require('../controller/curriculos.controller');

const curriculosController = new CurriculosController();

// Listar todos os currículos
router.get('/', curriculosController.getAllCurriculos);

// Formulário para cadastrar um novo currículo
router.get('/cadastrar', (req, res) => {
  res.render('cadastrar');
});

// Cadastrar um novo currículo
router.post('/cadastrar', async (req, res) => {
  await curriculosController.insertCurriculos(req, res);
});

// Consultar informações de um currículo
router.get('/consultar/:id_person', async (req, res) => {
  await curriculosController.getCurriculo(req, res);
});

module.exports = router;
