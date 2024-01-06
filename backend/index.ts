import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes'

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Bem-vindo ao backend da Pratique CRM!');
});


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});