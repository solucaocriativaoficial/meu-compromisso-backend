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
const Current_departmentsControlller = require('./controllers/Current_departamentsController');
const ScaleController = require('./controllers/ScaleController');
const FilterController = require('./controllers/FilterController');
const CursoPregacaoController = require('./controllers/CursoPregacaoController');

// Member
router.get('/member', MemberController.timeline)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/all/', MemberController.findAll)
router.post('/member/filter/', FilterController.search_member)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

// Auth
router.delete('/auth/:id', AuthController.delete)
router.put('/auth/update-password', AuthController.update_password)
router.put('/auth/update-privileges', AuthController.update_privileges)
router.post('/auth/add', AuthController.insert)
router.post('/auth', AuthController.auth)


//Division
router.get('/division', DivisionController.findAll)
router.get('/division/especific/:id', DivisionController.findOne)
router.post('/division/add', DivisionController.insert)
router.post('/division/filter/', FilterController.search_division)
router.put('/division/:id', DivisionController.update)
router.delete('/division/:id', DivisionController.delete)

//União
router.get('/unity', UnityController.findAll)
router.get('/unity/especific/:id', UnityController.findOne)
router.post('/unity/add', UnityController.insert)
router.post('/unity/filter/', FilterController.search_unity)
router.put('/unity/:id', UnityController.update)
router.delete('/unity/:id', UnityController.delete)

//Association
router.get('/association', AssociationController.findAll)
router.get('/association/especific/:id', AssociationController.findOne)
router.post('/association/add', AssociationController.insert)
router.post('/association/filter/', FilterController.search_association)
router.put('/association/:id', AssociationController.update)
router.delete('/association/:id', AssociationController.delete)

//district
router.get('/district', DistrictController.findAll)
router.post('/district/add', DistrictController.insert)
router.post('/district/filter/', FilterController.search_district)
router.put('/district/:id', DistrictController.update)
router.delete('/district/:id', DistrictController.delete)

//churc
router.get('/churc', ChurcController.findAll)
router.get('/churc/especific/:id', ChurcController.findOne)
router.post('/churc/add', ChurcController.insert)
router.post('/churc/filter/', FilterController.search_churc)
router.put('/churc/:id', ChurcController.update)
router.delete('/churc/:id', ChurcController.delete)

//department
router.get('/department', DepartmentsController.findAll)
router.post('/department/add', DepartmentsController.insert)
router.put('/department/:id', DepartmentsController.update)
router.delete('/department/:id', DepartmentsController.delete)

//current department
router.get('/current_department', Current_departmentsControlller.findAll)
router.post('/current_department/add', Current_departmentsControlller.insert)
router.put('/current_department/:id', Current_departmentsControlller.update)
router.delete('/current_department/:id', Current_departmentsControlller.delete)

//Escala
router.get('/scale/myscale_i/:id', ScaleController.myScale_I)
router.get('/scale/myscale_dep/:id', ScaleController.myScale_Dep)
router.get('/scale', ScaleController.findAll)
router.post('/scale/add', ScaleController.insert)
router.put('/scale/:id', ScaleController.update)
router.delete('/scale/:id', ScaleController.delete)

//Curso de pregação
router.get('/cursopregacao', CursoPregacaoController.findAll)
router.post('/cursopregacao/add', CursoPregacaoController.insert)
router.put('/cursopregacao/:id', CursoPregacaoController.update)
router.delete('/cursopregacao/:id', CursoPregacaoController.delete)

module.exports = router;