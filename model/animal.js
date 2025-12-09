// Arquivo: backend/models/animal.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Animal', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false },
    raca: { type: DataTypes.STRING },
    idade: { type: DataTypes.STRING },
    
    // NOVO CAMPO para receber o dado do Front
    status_saude: { type: DataTypes.STRING }, 
    
    descricao: { type: DataTypes.TEXT },
    foto_url: { type: DataTypes.TEXT },
    
    // Status de adoção (mantido)
    status: { 
      type: DataTypes.ENUM('disponivel','adotado','reservado'), 
      defaultValue: 'disponivel' 
    }
  }, {
    tableName: 'animais',
    timestamps: true
  });
};