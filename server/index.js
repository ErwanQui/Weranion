require('dotenv').config();

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const app = express();
const cors = require('cors');
const cp = require('cookie-parser');
const mongoose = require('mongoose');

const login = require('./src/login');
const main = require('./src/main');
const food = require('./src/food');
const treasury = require('./src/treasury');
const activePlayers = require('./src/activePlayers');
const messages = require('./src/messages');
const history = require('./src/history');
const territory = require('./src/territory');
const person = require('./src/person');

const { removeInactivePlayers } = require('./services/activePlayers.service');

app.use(
  cors({
    origin: process.env.CLIENT_PATH,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }),
  express.json(),
  cp()
);

// // Options de configuration pour la connexion
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Établir la connexion à la base de données
const connection = mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 10000,
});

app.use(async (req, res, next) => {
  try {
    await connection;
    next();
  } catch (e) {
    res.status(500).json({ message: 'DB indisponible', error: e.message });
  }
});

app.get('/', async (req, res) => {
  // const test = await FoodProduction.find().populate('city').populate('name');
  // const test = await TreasurySheet.find().populate('transactions')
  //   .populate('earnings.taxes').populate('earnings.common')
  //   .populate('earnings.other').populate('losses.other').populate('losses.wages')
  //   .populate('losses.maintenance').populate('losses.commercialPurchases')
  //   .populate('investments');
  // res.json(test);
  res.json('hello');
});

app.get('/health/db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ db: 'ok', state: mongoose.connection.readyState });
  } catch (e) {
    res.status(500).json({ db: 'ko', error: e.message });
  }
});

// Add api files
app.use('/login', login);
app.use('/history', history);
app.use('/territory', territory);
app.use('/person', person);

app.use('/main', main);
app.use('/food', food);
app.use('/treasury', treasury);
app.use('/activePlayers', activePlayers);
app.use('/messages', messages);

// Other functions

// Remove InactivePlayers

setInterval(removeInactivePlayers, 100000);

// if (process.env.NODE_ENV !== 'production') {
  app.listen(4000, () => console.log('Server is running on port 4000'));
// }