const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Adotante', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    // [CORREÇÃO]: Contato deve ser 'telefone' ou 'contato' + adicionada 'senha'
    telefone: { type: DataTypes.STRING }, 
    endereco: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false }, // Campo obrigatório para login
  }, {
    tableName: 'adotantes',
    timestamps: true
  });
};