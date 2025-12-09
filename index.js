const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    family: 4 // <--- ESSA LINHA PRECISA ESTAR LÁ
  }
});
