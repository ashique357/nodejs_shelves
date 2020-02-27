var express=require('express');
var connection=require('../lib/database');
var router=express.Router();


router.get('/add',function(req,res,next){
    res.render('AddShelf.ejs');
});

router.post('/add',function(req,res,next){
    req.assert('rfidShelf','Please Provide RFID Tag Number').notEmpty();
    req.assert('shelfName','Please Provide Shelf Name').notEmpty();

    var errors=req.validationErrors();
    if(!errors){
        var shelf={
            rfidShelf:req.sanitize('rfidShelf').escape().trim(),
            shelfName:req.sanitize('shelfName').escape().trim()
        }
        connection.query('INSERT INTO shelves SET ?',shelf,function(err,result){
            if(err){
                req.flash('error',err);
                res.render('AddShelf.ejs',{
                    title:'Add a new shelf',
                    shelfName:shelf.shelfName,
                    rfidShelf:shelf.rfidShelf
                });
            }
            else{
                req.flash('success','Shelf is added successfully');
                res.render('AddShelf.ejs');
            }
        })
    }
    else{
        var error_msg="";
        errors.forEach(function(error){
            error_msg+=error.msg +'<br>'
        });
        req.flash('error',error_msg);

        res.render('AddShelf.ejs',{
            title:'Add a shelf name',
            shelfName:req.body.shelfName,
            rfidShelf:req.body.rfidShelf
        })
    }
});

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

