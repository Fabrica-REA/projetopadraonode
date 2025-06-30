// npm install express cors mysql2 dotenv multer
// npm install express express-validator helmet express-rate-limit
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { getPool } = require('./db');
// ________________ import routes ____________________
const usuarioRoutes = require('./routes/Usuario');
const cursoRoutes = require('./routes/Curso');
// ____________________ end import routes ____________________

const app = express();
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
  },
  api: {
    prefix: '/projpadraoapi',
  },
  server: {
    port: process.env.PORT || 5000,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: 200,
  },
};
const limiter = rateLimit(config.rateLimit);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(limiter);

app.use(config.api.prefix, usuarioRoutes);
app.use(config.api.prefix, cursoRoutes);
// ____________________ use routes ____________________
app.use((req, res, next) => {
    console.log(`Requisição recebida em: ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

async function startServer() {
  try {
    await getPool(config.db, config.db.connectionLimit);
    app.listen(config.server.port, '0.0.0.0', () => {
      console.log(`Server listening on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
}

startServer();



