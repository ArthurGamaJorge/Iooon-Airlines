const express = require('express');
const cors = require('cors');
const { getJson } = require('serpapi');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  "https://iooonairlines.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origem ${origin} não permitida.`), false);
  }
}));

const API_KEY = process.env.SERPAPI_KEY;

app.get('/', (req, res) => {
  res.json({ message: 'API iooonAirlines está online!' });
});

app.get('/api/flights', async (req, res) => {
  try {
    const { departure_id, arrival_id, outbound_date } = req.query;

    if (!departure_id || !arrival_id || !outbound_date) {
      return res.status(400).json({ error: 'Parâmetros faltando: departure_id, arrival_id e outbound_date são obrigatórios' });
    }

    const params = {
      engine: 'google_flights',
      departure_id,
      arrival_id,
      outbound_date,
      currency: 'BRL',
      hl: 'pt',
      type: '2',
      api_key: API_KEY,
    };

    getJson(params, (data) => {
      if (!data) {
        return res.status(500).json({ error: 'Erro ao obter dados da SerpApi' });
      }
      res.json(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
