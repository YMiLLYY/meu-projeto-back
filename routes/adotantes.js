// Arquivo: backend/routes/adotantes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const { Adotante, Animal } = require('../index'); 

// Login
async function login(req, res) {
  const { email, senha } = req.body;
  try {
    const adotante = await Adotante.findOne({ where: { email } });
    if (!adotante) return res.status(401).json({ error: "Email ou senha inválidos" });
    
    if (!bcrypt.compareSync(senha, adotante.senha)) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.json({ id: adotante.id, nome: adotante.nome, email: adotante.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cadastro
router.post('/', async (req, res) => {
  // Recebe 'telefone' diretamente
  const { nome, email, senha, endereco, telefone } = req.body; 

  try {
    const hash = bcrypt.hashSync(senha, 8); 
    const novo = await Adotante.create({ 
      nome, 
      email, 
      senha: hash, 
      endereco, 
      telefone 
    });
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar
router.get('/', async (req, res) => {
  try {
    const adotantes = await Adotante.findAll({ include: [{ model: Animal, as: 'animais' }] });
    res.json(adotantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, login };