const express = require('express');
const router = express();
const MemberController = require('./controllers/MemberController');
const AccessController = require('./controllers/AccessController');
const LoginController = require('./controllers/LoginController');
const dadosController = require('./controllers/dadosController')

// Member
router.get('/member', MemberController.timeline)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/all/', MemberController.findAll)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

// Access
//router.delete('/access/:id', AccessController.delete)
//router.post('/access/add', AccessController.insert)
router.post('/access/add', AccessController.insert)

//Validation login
router.post('/login', LoginController.validation)

//test
router.get('/dados', dadosController.test)
module.exports = router;