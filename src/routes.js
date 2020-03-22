const express = require('express');
const router = express();

const MemberController = require('./controllers/MemberController');
const AuthController = require('./controllers/AuthController');

// Member
router.get('/member', MemberController.findAll)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/filter/', MemberController.filter)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

// Auth
//router.delete('/auth/:id', AuthController.delete)
//router.put('/auth/update-password', AuthController.update_password)
//router.put('/auth/update-privileges', AuthController.update_privileges)
//router.post('/auth/add', AuthController.insert)
router.post('/auth', AuthController.auth)

module.exports = router;