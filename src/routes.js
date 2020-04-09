const express = require('express');
const router = express();

const TokenAccess = require('./middleware/TokenAccess');
const AuthController = require('./controllers/AuthController');
const PersonController = require('./controllers/PersonController');
const ChurcController = require('./controllers/ChurcController');
const DistrictController = require('./controllers/DistrictController');
const DepartmentController = require('./controllers/DepartmentController');
const ScaleController = require('./controllers/ScaleController');
const HandleScaleController = require('./controllers/HandleScaleController');

router.post('/auth', AuthController.SignIn);
router.post('/registration', AuthController.Signout);

//a partir dessa rota, todas deverão estar autenticadas
router.use(TokenAccess);

router.get('/person', PersonController.find)
router.post('/person/add', PersonController.insert)
router.put('/person/:id', PersonController.findById, PersonController.update)
router.delete('/person/:id', PersonController.findById, PersonController.delete)

router.get('/churc', ChurcController.find)
router.post('/churc/add', ChurcController.insert)
router.put('/churc/:id', ChurcController.findById , ChurcController.update)
router.delete('/churc/:id', ChurcController.findById, ChurcController.delete)

router.get('/district', DistrictController.find)
router.post('/district/add', DistrictController.insert)
router.put('/district/:id', DistrictController.findById , DistrictController.update)
router.delete('/district/:id', DistrictController.findById, DistrictController.delete)

router.get('/department', DepartmentController.find)
router.post('/department/add', DepartmentController.insert)
router.put('/department/:id', DepartmentController.findById , DepartmentController.update)
router.delete('/department/:id', DepartmentController.findById, DepartmentController.delete)

router.get('/scale', ScaleController.find)
router.post('/scale/add', ScaleController.insert)
router.put('/scale/:id', ScaleController.checkMemberScaled, ScaleController.findById , ScaleController.update)
router.delete('/scale/:id', ScaleController.findById, ScaleController.delete)

router.get('/scale/handle', HandleScaleController.find)
router.post('/scale/handle/add', HandleScaleController.insert)
router.put('/scale/handle/:id', HandleScaleController.findById , HandleScaleController.update)
router.delete('/scale/handle/:id', HandleScaleController.findById, HandleScaleController.delete)


module.exports = router;