const express = require('express');
const  router = require('express').Router();
const { googleLogin } = require('../controllers/authController');

router.get('/test', (req,res)=>{
    res.send('test route')
});

router.get('/google', googleLogin)

module.exports = router;