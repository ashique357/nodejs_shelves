var express=require('express');
var connection=require('../lib/database');
var router=express.Router();

const models = require('../models');
const Shelf = models.Shelf;
const Bundle = models.Bundle;


router.get('/add',function(req,res,next){
    res.render('AddShelf.ejs');
});

router.post('/add', async(req, res,next) => {

    req.assert('id','Please Provide RFID Tag Number').notEmpty();
    req.assert('shelfName','Please Provide Shelf Name').notEmpty();
    
    var errors=req.validationErrors();
    
    var newShelf = await Shelf.build({
        id:req.body.id,
        shelfName:req.body.shelfName
      });
      newShelf.save().then(function() {
        req.flash('success','Successfully Shelf Is Added');
        return res.redirect('/shelf/add');
      })
})

router.get('/all',async(req,res,next)=>{
  Shelf.findAll({limit:10}).then(function(Shelf){
    return res.render('AllShelf.ejs',{
      data:Shelf
    })
  })
})

// router.get('/:id',async(req,res,next)=>{
//   const id=req.params.id 
//   Bundle.findAll({}
//   ).then(function(Bundle){
//     console.log(Bundle)
//     return res.render('SingleShelf.ejs',{
//       data:Bundle
//     })
//   })
// })

module.exports = router;

