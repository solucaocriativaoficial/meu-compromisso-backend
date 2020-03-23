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
router.delete('/auth/:id', AuthController.delete)
router.put('/auth/update-privileges', AuthController.update_privileges)
router.post('/auth/add', AuthController.insert)
router.post('/auth', AuthController.auth)
router.post('/forgot-password/step1', AuthController.forgot_password_step1)
router.post('/forgot-password/step2', AuthController.forgot_password_step2)
router.put('/forgot-password/step3', AuthController.forgot_password_step3)
router.put('/replace-privileges', AuthController.replace_privileges)

module.exports = router;