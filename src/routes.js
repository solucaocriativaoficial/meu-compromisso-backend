const express = require('express');
const router = express();
const MemberController = require('./controllers/MemberController');
const AccessController = require('./controllers/AccessController');
const LoginController = require('./controllers/LoginController');
const DivisionController = require('./controllers/DivisionController');
const AssociationController = require('./controllers/AssociationController');
const FilterController = require('./controllers/FilterController');

// Member
router.get('/member', MemberController.timeline)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/all/', MemberController.findAll)
router.post('/member/filter/', FilterController.search_member)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

// Access
router.delete('/access/:id', AccessController.delete)
router.put('/access/update-password', AccessController.update_password)
router.put('/access/update-privileges', AccessController.update_privileges)
router.post('/access/add', AccessController.insert)

//Validation login
router.post('/validation', LoginController.validation)


//Division
router.get('/division', DivisionController.findAll)
router.get('/division/especific/:id', DivisionController.findOne)
router.post('/division/add', DivisionController.insert)
router.post('/division/filter/', FilterController.search_division)
router.put('/division/:id', DivisionController.update)
router.delete('/division/:id', DivisionController.delete)

//Association
router.get('/association', AssociationController.findAll)
router.get('/association/especific/:id', AssociationController.findOne)
router.post('/association/add', AssociationController.insert)
router.post('/association/filter/', FilterController.search_association)
router.put('/association/:id', AssociationController.update)
router.delete('/association/:id', AssociationController.delete)
module.exports = router;