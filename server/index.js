require('dotenv').config();
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

const { removeInactivePlayers } = require('./services/activePlayers.service');

app.use(
  cors({
    origin: process.env.CLIENT_PATH,
    methods: ['GET', 'POST'],
    credentials: true
  }),
  express.json(),
  cp()
);

// Options de configuration pour la connexion
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Établir la connexion à la base de données
mongoose.connect(process.env.MONGODB_URL, options)
  .then(() => {
    console.log('Connexion à la base de données établie');
  })
  .catch((error) => {
    console.error('Erreur de connexion à la base de données :', error);
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

// Add api files
app.use('/login', login);
app.use('/main', main);
app.use('/food', food);
app.use('/treasury', treasury);
app.use('/activePlayers', activePlayers);
app.use('/messages', messages);

// Other functions

// Remove InactivePlayers

setInterval(removeInactivePlayers, 100000);

app.listen(4000, () => 'Server is running on port 4000');