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

// router.get('/add/a',async(req,res,next)=>{
//     req.assert('id','Please Provide RFID Tag Number').notEmpty();
//     req.assert('shelfName','Please Provide Shelf Name').notEmpty();

//     var errors=req.validationErrors();
//     if(!errors){
//         var shelf={
//             id:req.sanitize('id').escape().trim(),
//             shelfName:req.sanitize('shelfName').escape().trim()
//         }
        
//     }
//     else{
//         var error_msg="";
//         errors.forEach(function(error){
//             error_msg+=error.msg +'<br>'
//         });
//         req.flash('error',error_msg);

//         res.render('AddShelf.ejs',{
//             title:'Add a shelf name',
//             shelfName:req.body.shelfName,
//             id:req.body.id
//         })
//     }
// });

// router.get('/api/shelf',function(req,res,next){
//     connection.query('SELECT * FROM shelves ORDER BY rfid_shelf desc',function(err,rows){
//         if(err){
//             req.json('error',err);
//             res.json(data);
//         }
//         else{
//             res.json({data:rows});
//         }
//     });
// });

module.exports = router;

