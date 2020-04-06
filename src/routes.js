const express = require('express');
const router = express();

const PersonController = require('./controllers/PersonController');
const ChurcController = require('./controllers/ChurcController');
const DistrictController = require('./controllers/DistrictController');

// Member
router.get('/person', PersonController.find)
router.get('/person/admin/', PersonController.findAdmin)
router.post('/person/add', PersonController.insert)
router.put('/person/:id', PersonController.update)
router.delete('/person/:id', PersonController.delete)

router.get('/churc', ChurcController.find)
router.post('/churc/add', ChurcController.insert)
router.put('/churc/:id', ChurcController.findById , ChurcController.update)
router.delete('/churc/:id', ChurcController.findById, ChurcController.delete)

router.get('/district', DistrictController.find)
router.post('/district/add', DistrictController.insert)
router.put('/district/:id', DistrictController.findById , DistrictController.update)
router.delete('/district/:id', DistrictController.findById, DistrictController.delete)
module.exports = router;