
const express = require('express');
const router = express.Router();


const usersRouter = require('./users');
const uploadRouter = require('./upload');


router.use('/users', usersRouter);
router.use('/upload', uploadRouter);


module.exports = router;
