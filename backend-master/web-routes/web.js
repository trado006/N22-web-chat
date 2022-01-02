var express = require('express');
var router = express.Router();

router.get('/sign-in', function(req, res, next) {
    res.render('pages/login');
});

router.get('/sign-up', function(req, res, next){
    res.render('pages/signup');
})

router.get('/me', function(req, res, next){
    res.render('pages/me');
})

module.exports = router;