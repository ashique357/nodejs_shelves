var express=require('express');
var connection=require('../lib/database');
var bundle=express.Router();

bundle.get('/add',function(req,res,next){
    // connection.query('SELECT * FROM shelves ORDER BY rfidShelf desc',function(err,rows){
    //     console.log(rows[0].rfidShelf)
    //     if(err){
    //         req.flash('error',err);
    //         res.render('AddBundle.ejs',{
    //             title:"Add bundles",
    //             data:rows
    //         });
    //     }
    //     else{
    //         res.render('AddBundle.ejs',{
    //             title:"Add bundles",
    //             data:rows
    //         });
    //     }
    // });
    res.render("AddBundle.ejs");
});


bundle.post('/add',function(req,res,next){
    req.assert('rfidBundle','Please Provide RFID Tag Number').notEmpty();
    req.assert('color','Please Provide Color Name').notEmpty();
    req.assert('style','Please Provide Style').notEmpty();
    req.assert('size','Please Provide Size Name').notEmpty();
    req.assert('qty','Please Provide Quantity').notEmpty();
    req.check('shelf_id','Please Provide Shelf Name').notEmpty();
    
    var errors=req.validationErrors();
    if(!errors){
        var bundles={
            rfidBundle:req.sanitize('rfidBundle').escape().trim(),
            style:req.sanitize('style').escape().trim(),
            size:req.sanitize('size').escape().trim(),
            color:req.sanitize('color').escape().trim(),
            qty:req.sanitize('qty').escape().trim(),
            shelf_id:req.body.shelf_id
        }
        // console.log(bundles);
        connection.query('INSERT INTO bundles SET ?',bundles,function(err,result){
            if(err){
                req.flash('error',err);
                res.render('AddBundle.ejs',{
                    title:'Add a new Bundle',
                    rfidBundle:bundles.rfidBundle,
                    style:bundles.style,
                    size:bundles.size,
                    color:bundles.color,
                    qty:bundles.qty,
                    shelf_id:bundles.shelf_id
                });
            }
            else{
                req.flash('success','Product is added successfully');
                res.render('AddBundle.ejs');
            }
        });
    }
    else{
        var error_msg="";
        errors.forEach(function(error){
            error_msg+=error.msg +'<br>'
        });
        req.flash('error',error_msg);

        res.render('AddBundle.ejs',{
            title:'Add a Product name',
            rfidBundle:req.body.rfidBundle,
            style:req.body.style,
            size:req.body.size,
            color:req.body.color,
            qty:req.body.qty,
            shelf_id:req.body.shelf_id
        });
    }
    
});

bundle.get('/all',function(req,res,next){
    connection.query("SELECT DISTINCT rfidBundle,color,size,qty,style,shelf_id FROM bundles ",function(err,rows){
        console.log(rows)
        if(err){
            req.flash('error',err);
        }
        else{
            res.render('AllBundle.ejs',{
                data:rows
            })
        }
    })
})

module.exports = bundle;

