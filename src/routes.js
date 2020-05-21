const express = require('express');
const router = express();

const PersonController = require('./controllers/PersonController');
const AuthController = require('./controllers/AuthController');
const TokenAccess = require('./middleware/TokenAccess');
const DistrictController = require('./controllers/DistrictController');
const ChurcController = require('./controllers/ChurcController');
const DepartmentController = require('./controllers/DepartmentController');
const DepartmentOcupationController = require('./controllers/DepartmentOcupationController');
const ScaleController = require('./controllers/ScaleController');
const ScaleMiddleware = require('./middleware/Scale');
const ScaleCompletePerson = require('./controllers/ScaleCompletePersonController');
const ScaleCompleteDepController = require('./controllers/ScaleCompleteDepController');
const HandleScaleController = require('./controllers/HandleScaleController');

router.post('/auth/registration/', AuthController.registration);
router.post('/auth/signin/', AuthController.signin);

router.use(TokenAccess);

router.post('/person/create/', PersonController.insert);
router.put('/person/update/:id', PersonController.update);
router.delete('/person/delete/:id', PersonController.delete);

router.post('/district/create/', DistrictController.insert);
router.put('/district/update/:id', DistrictController.update);
router.delete('/district/delete/:id', DistrictController.delete);

router.post('/churc/create/', ChurcController.insert);
router.put('/churc/update/:id', ChurcController.update);
router.delete('/churc/delete/:id', ChurcController.delete);

router.get('/department/all/', DepartmentController.list);
router.post('/department/create/', DepartmentController.insert);
router.put('/department/update/:id', DepartmentController.update);
router.delete('/department/delete/:id', DepartmentController.delete);

router.post('/department/ocupation/create/', DepartmentOcupationController.insert);
router.put('/department/ocupation/update/:id', DepartmentOcupationController.update);
router.delete('/department/ocupation/delete/:id', DepartmentOcupationController.delete);

router.get('/scale/i/', ScaleCompletePerson.i_scale);
router.get('/scale/district/person/', ScaleCompletePerson.scale_complete_person);

router.get('/scale/i/department/', ScaleCompleteDepController.my_department_scale);

router.post('/scale/create/person/', ScaleMiddleware.verify_date_for_person, ScaleController.insert);
router.post('/scale/create/department/', ScaleMiddleware.verify_date_for_department, ScaleController.insert);
router.put('/scale/update/:id', ScaleController.update);
router.delete('/scale/delete/:id', ScaleController.delete);

router.post('/scale/handle/create/', HandleScaleController.insert);
router.put('/scale/handle/update/:id', HandleScaleController.update);
router.delete('/scale/handle/delete/:id', HandleScaleController.delete);

module.exports = router;