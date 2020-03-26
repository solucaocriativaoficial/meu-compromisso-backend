const express = require('express');
const router = express();

const MemberController = require('./controllers/MemberController');
const AuthController = require('./controllers/AuthController');
const DivisionController = require('./controllers/DivisionController');
const UnityController = require('./controllers/UnityController');
const AssociationController = require('./controllers/AssociationController');
const DistrictController = require('./controllers/DistrictController');
const ChurcController = require('./controllers/ChurcController');
const DepartmentsController = require('./controllers/DepartmentsController');
const Current_departmentsController = require('./controllers/Current_departmentsController');
const ScaleController = require('./controllers/ScaleController');

// Member
router.get('/member', MemberController.findAll)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/filter/', MemberController.filter)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

// Auth
router.delete('/auth/:id', AuthController.delete)
router.post('/auth/add', AuthController.insert)
router.post('/auth', AuthController.auth)
router.post('/forgot-password/step1', AuthController.forgot_password_step1)
router.post('/forgot-password/step2', AuthController.forgot_password_step2)
router.put('/forgot-password/step3', AuthController.forgot_password_step3)
router.put('/replace-privileges', AuthController.replace_privileges)

//Division
router.get('/division', DivisionController.findAll)
router.get('/division/especific/:id', DivisionController.findOne)
router.get('/division/filter/', DivisionController.filter)
router.post('/division/add', DivisionController.insert)
router.put('/division/:id', DivisionController.update)
router.delete('/division/:id', DivisionController.delete)

//Unity
router.get('/unity', UnityController.findAll)
router.get('/unity/especific/:id', UnityController.findOne)
router.get('/unity/filter/', UnityController.filter)
router.post('/unity/add', UnityController.insert)
router.put('/unity/:id', UnityController.update)
router.delete('/unity/:id', UnityController.delete)

//Association
router.get('/association', AssociationController.findAll)
router.get('/association/especific/:id', AssociationController.findOne)
router.get('/association/filter/', AssociationController.filter)
router.post('/association/add', AssociationController.insert)
router.put('/association/:id', AssociationController.update)
router.delete('/association/:id', AssociationController.delete)

//District
router.get('/district', DistrictController.findAll)
router.get('/district/especific/:id', DistrictController.findOne)
router.get('/district/filter/', DistrictController.filter)
router.post('/district/add', DistrictController.insert)
router.put('/district/:id', DistrictController.update)
router.delete('/district/:id', DistrictController.delete)

//Churc
router.get('/churc', ChurcController.findAll)
router.get('/churc/especific/:id', ChurcController.findOne)
router.get('/churc/filter/', ChurcController.filter)
router.post('/churc/add', ChurcController.insert)
router.put('/churc/:id', ChurcController.update)
router.delete('/churc/:id', ChurcController.delete)

//Departments
router.get('/department', DepartmentsController.findAll)
router.get('/department/especific/:id', DepartmentsController.findOne)
router.get('/department/filter/', DepartmentsController.filter)
router.post('/department/add', DepartmentsController.insert)
router.put('/department/:id', DepartmentsController.update)
router.delete('/department/:id', DepartmentsController.delete)

//Currents departments
router.get('/department/current/', Current_departmentsController.findAll)
router.get('/department/current/especific/:id', Current_departmentsController.findOne)
router.get('/department/current/filter/', Current_departmentsController.filter)
router.post('/department/current/add', Current_departmentsController.insert)
router.put('/department/current/:id', Current_departmentsController.update)
router.delete('/department/current/:id', Current_departmentsController.delete)

//Scale
router.get('/scale', ScaleController.findAll)
router.get('/scale/churc/:id', ScaleController.scale_churc)
router.get('/scale/i/:id', ScaleController.scale_i)
router.get('/scale/filter/', ScaleController.filter)
router.post('/scale/add', ScaleController.insert)
router.put('/scale/:id', ScaleController.update)
router.delete('/scale/:id', ScaleController.delete)

module.exports = router;