const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authentification');

const City = require('./../models/city');

router.get('/city', verifyToken, async (req, res) => {
  try {
    const { cityName } = req.query;
    const city = await City.findOne({ name: cityName });
    res.json(city);
  } catch (error) {
    console.error('erreur update :', error);
    res.status(500).send(error);
  }
});

router.get('/cities', verifyToken, async (req, res) => {
  try {
    const cities = await City.find()
      .populate('duchy_id')
      .populate('duchy_id.barony_id');
      console.log('ok')
    res.json(cities);
  } catch (error) {
    console.error('erreur update :', error);
    res.status(500).send(error);
  }
});

// router.put('/', verifyToken, async (req, res) => {
//   try {
//     const { city_name } = req.query;
//     const city = await City.findOne({ name: city_name });
//     res.json(city);
//   } catch (error) {
//     console.error('erreur update :', error);
//     res.status(500).send(error);
//   }
// });

module.exports = router;