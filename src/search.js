var express=require('express');
var connection=require('../lib/database');
var search=express.Router();

search.get('',function(req,res,next){
    res.render('Search.ejs');
});

module.exports=search;