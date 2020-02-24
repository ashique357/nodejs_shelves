var express=require('express');
var connection=require('../lib/database');
var router=express.Router();

router.get('/',function(req,res,next){
    res.render('Search.ejs');
});

router.get('/add-shelf',function(req,res,next){
    res.render('AddShelf.ejs');
});

router.get('/add-bundle',function(req,res,next){
    res.render('AddProduct.ejs');
});

router.get('/shelf',function(req,res,next){
    res.render('SingleShelf.ejs');
});

router.get('/shelves',function(req,res,next){
    res.render('AllShelves.ejs');
})
module.exports = router;