const express = require('express');
const router = express();

const MemberController = require('./controllers/MemberController');

// Member
router.get('/member', MemberController.findAll)
router.get('/member/profile/:id', MemberController.findOne)
router.get('/member/replace', MemberController.findReplace)
router.post('/member/add', MemberController.insert)
router.put('/member/profile/:id', MemberController.update)
router.delete('/member/:id', MemberController.delete)

module.exports = router;