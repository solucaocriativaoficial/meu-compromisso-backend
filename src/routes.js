const express = require('express');
const router = express();
const MemberController = require('./controllers/MemberController');
const AccessController = require('./controllers/AccessController');
const LoginController = require('./controllers/LoginController');
const DivisionController = require('./controllers/DivisionController');

// Member
router.get('/member', MemberController.timeline)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/all/', MemberController.findAll)
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
router.get('/division/especific/:id', DivisionController.findAll)
router.post('/division/add', DivisionController.insert)
router.put('/division/:id', DivisionController.update)
router.delete('/division/:id', DivisionController.delete)
module.exports = router;