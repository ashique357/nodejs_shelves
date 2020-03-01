var express=require('express');
var connection=require('../lib/database');
var bundle=express.Router();

const models = require('../models');
const Shelf = models.Shelf;
const Bundle = models.Bundle;


bundle.get('/add',function(req,res,next){
    Shelf.findAll({limit:10}).then(function(Shelf){
        return res.render('AddBundle.ejs',{
            data:Shelf
        })
    })
});

bundle.post('/add', async(req, res,next) => {

    req.assert('id','Please Provide RFID Tag Number').notEmpty();
    req.assert('style','Please Provide Style Name').notEmpty();
    req.assert('size','Please Provide Size Name').notEmpty();
    req.assert('color','Please Provide Color Name').notEmpty();
    req.assert('qty','Please Provide Quantity Amount').notEmpty();
    req.assert('shelfId','Please Provide Shelf Name').notEmpty();
    
    var errors=req.validationErrors();
    
    var newBundle = await Bundle.build({
        id:req.body.id,
        style:req.body.style,
        size:req.body.size,
        color:req.body.color,
        qty:req.body.qty,
        shelfId:req.body.shelfId
      });
      newBundle.save().then(function() {
        req.flash('success','Successfully Bundle Added');
        return res.redirect('/bundle/add');
      })
})

bundle.get('/all',function(req,res,next){
    Bundle.findAll({limit:10,include: [{model: Shelf, as: 'shelf'}]}).then(function(Bundle){
        // console.log(Bundle);
        return res.render('AllBundle.ejs',{
            data:Bundle
        })
    })
});

module.exports = bundle;

