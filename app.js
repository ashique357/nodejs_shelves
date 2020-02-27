//initializing necessary libraries and modules
const express = require('express');             //initializing express module
const bodyParser=require('body-parser');        //initializing body parser module to handle post request to the body
const mySql=require('mysql');                   //initializing mySql module for database handling.
const path=require('path');
var expressValidator=require('express-validator');                     //initializing path module for routing.
var flash = require('express-flash');
var session = require('express-session');
const app=express();
const port=3000;

//configure template  
app.set('port', process.env.port || port);                  // set express to use this port
app.set('views', __dirname + '/views');                     // set express to look in this folder to render our view
app.set('view engine', 'ejs');                              // configure template engine


app.use(bodyParser.json());                                 // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));    // configure express to use public folder

app.use(session({ 
    secret: 'dg_catalyst',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}));


app.use(flash());
app.use(expressValidator());

var shelfRouter=require('./src/shelf');
app.use('/shelf',shelfRouter);

var bundleRouter=require('./src/bundle');
app.use('/bundle',bundleRouter);

var searchRouter=require('./src/search');
app.use('/search',searchRouter);

app.listen(port,()=>{
    console.log(`Server is runnung on port:${port}`);
});