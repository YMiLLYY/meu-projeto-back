const express = require('express');
const router = express.Router();
// [CORREÇÃO DE CAMINHO]: Volta uma pasta para encontrar o index.js e obter os modelos
const { Animal, Adotante } = require('../index');

// GET /animais (listar todos)
router.get('/', async (req, res) => {
  try {
    const animais = await Animal.findAll({ include: [{ model: Adotante, as: 'adotante' }] });
    res.json(animais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /animais/:id (buscar por id)
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id, { include: [{ model: Adotante, as: 'adotante' }]});
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /animais (criar)
router.post('/', async (req, res) => {
  try {
    // Note: Você pode querer adicionar aqui uma verificação de autenticação/autorização
    const novo = await Animal.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /animais/:id (atualizar)
router.put('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByPk(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
    await animal.update(req.body);
    res.json(animal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /animais/:id (deletar)
router.delete('/:id', async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id);
        if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
        await animal.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;