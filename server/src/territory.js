const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/authentification');
const mongoose = require('mongoose');

const City = require('../models/city');
const Duchy = require('../models/duchy');
const Barony = require('../models/barony');

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

router.get('/duchies', verifyToken, async (req, res) => {
  try {
    const { name } = req.query;
    
    const filter = {};
    if (name) {
      filter.name = {
        $regex: name,
        $options: 'i'
      };
    }

    const duchies = await Duchy.find(filter)
    res.json(duchies);
  } catch (error) {
    console.error('erreur get duchies :', error);
    res.status(500).send(error);
  }
});

router.get('/baronies', verifyToken, async (req, res) => {
  try {
    console.log(req.query)
    const { name } = req.query;
    
    const filter = {};
    if (name) {
      filter.name = {
        $regex: name,
        $options: 'i'
      };
    }

    const baronies = await Barony.find(filter)
    res.json(baronies);
  } catch (error) {
    console.error('erreur get baronies :', error);
    res.status(500).send(error);
  }
});

router.get('/barony', verifyToken, async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Baronnie non trouvée' });
    }
    // // const barony = await Barony.findById(id);

    const barony = await Barony.findById(id);
    const duchies = await Duchy.find({ barony_id: id });
    const duchyIds = duchies.map(d => d._id);
    const cities = await City.find({ duchy_id: { $in: duchyIds } });

    res.json({ ...barony.toObject(), duchies, cities });
  } catch (error) {
    console.error(`erreur get barony`, error);
    res.status(500).send(error);
  }
});

module.exports = router;