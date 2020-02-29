//initializing necessary libraries and modules
const express = require('express');             
const bodyParser=require('body-parser');       
const mySql=require('mysql');                   
const path=require('path');                 

var flash = require('express-flash');
var session = require('express-session');
var expressValidator=require('express-validator');

const app=express();
const port=3000;

const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//   host: 'localhost',
//   dialect: 'mysql'
//   // storage: './lib/db.sql'
// });

//configure template  
app.set('port', process.env.port || port);                  
app.set('views', __dirname + '/views');                    
app.set('view engine', 'ejs');                             


app.use(bodyParser.json());                                 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));   

app.use(session({ 
    secret: 'dg_catalyst',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}));

var models = require("./models");
models.sequelize.sync().then(function() {
  console.log('connected to database')
}).catch(function(err) {
  console.log(err)
});

app.use(flash());
app.use(expressValidator());


var shelfRouter=require('./controller/shelf');
app.use('/shelf',shelfRouter);

var bundleRouter=require('./controller/bundle');
app.use('/bundle',bundleRouter);

var searchRouter=require('./controller/search');
app.use('/search',searchRouter);


app.listen(port,()=>{
    console.log(`Server is runnung on port:${port}`);
});