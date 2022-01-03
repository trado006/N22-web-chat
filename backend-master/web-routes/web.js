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

router.get('/', function(req, res, next){
    res.render('pages/home');
})

router.get('/users/:id', function(req, res, next){
    res.render('pages/user', {id: req.params.id });
})

router.get('/search/', function(req, res, next){
    res.render('pages/search', {keyword: req.query.keyword });
})

module.exports = router;