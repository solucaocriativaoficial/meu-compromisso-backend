const express = require('express');
const router = express();
const MemberController = require('./controllers/MemberController');

//Search
router.get('/members', MemberController.findAll)

//Registration
router.post('/member/add', MemberController.insert)

module.exports = router;