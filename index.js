const { Sequelize } = require('sequelize'); // <--- ESSA LINHA É ESSENCIAL
const AnimalModel = require('./model/animal');
const AdotanteModel = require('./model/adotante');

require('dotenv').config();

const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    family: 4 // Correção do IPv6 para o Render
  }
});

const Animal = AnimalModel(sequelize);
const Adotante = AdotanteModel(sequelize);

// Configuração das relações
Adotante.hasMany(Animal, { foreignKey: 'adotanteId', as: 'animais' });
Animal.belongsTo(Adotante, { foreignKey: 'adotanteId', as: 'adotante' });

module.exports = { sequelize, Sequelize, Animal, Adotante };
