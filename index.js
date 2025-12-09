const { Sequelize } = require('sequelize');
const AnimalModel = require('./model/animal');
const AdotanteModel = require('./model/adotante');

require('dotenv').config(); // Garante que o .env seja lido aqui também

const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Importante para evitar erros de certificado
    },
    family: 4
  }
});

const Animal = AnimalModel(sequelize);
const Adotante = AdotanteModel(sequelize);

Adotante.hasMany(Animal, { foreignKey: 'adotanteId', as: 'animais' });
Animal.belongsTo(Adotante, { foreignKey: 'adotanteId', as: 'adotante' });

module.exports = { sequelize, Sequelize, Animal, Adotante };