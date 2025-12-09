require('dotenv').config();
const cors = require('cors'); // Adicione esta linha
const express = require('express');
const app = express();

app.use(cors()); // Adicione esta linha ANTES das rotas
app.use(express.json());

// [CORREÇÃO DE CAMINHOS E NOME]: Importa index.js e renomeia sequelize para dbConnection
const { sequelize: dbConnection } = require('./index'); 
// [CORREÇÃO DE CAMINHOS]: Importa routers da pasta 'routes'
const animaisRouter = require('./routes/animais.js'); 
const { login, router: adotantesRouter } = require('./routes/adotantes'); // Importa router E função login


// Rotas de API
app.use('/api/animais', animaisRouter);
app.use('/api/adotantes', adotantesRouter);
// Rota de login separada
app.post('/api/login', login); 

const PORT = process.env.PORT || 3001;

async function main() {
  try {
    await dbConnection.authenticate();
    console.log('✅ Conexão estabelecida com o banco (Postgres / Supabase).');
    
    // ATENÇÃO: { force: true } apaga e recria as tabelas. Troque para .sync() em produção.
    await dbConnection.sync(); 
    console.log('✅ Modelos sincronizados com o banco (force: true ativo).');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro fatal ao conectar no banco ou iniciar:', err);
    console.error('Verifique as credenciais no .env e a estrutura de arquivos.');
    process.exit(1);
  }
}

main();