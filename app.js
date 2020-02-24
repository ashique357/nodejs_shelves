//initializing necessary libraries and modules
const express = require('express');             //initializing express module
const bodyParser=require('body-parser');        //initializing body parser module to handle post request to the body
const mySql=require('mysql');                   //initializing mySql module for database handling.
const path=require('path');                     //initializing path module for routing.
const app=express();
const port=3000;

//configure template  
app.set('port', process.env.port || port);                  // set express to use this port
app.set('views', __dirname + '/views');                     // set express to look in this folder to render our view
app.set('view engine', 'ejs');                              // configure template engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());                                 // parse form data client
app.use(express.static(path.join(__dirname, 'public')));    // configure express to use public folder

var searchRouter=require('./src/search');
app.use('/',searchRouter);

var addShelf=require('./src/search');
app.use('/add-shelf',addShelf);

var addBundle=require('./src/search');
app.use('/add-bundle',addBundle);

var Shelves=require('./src/search');
app.use('/shelves',Shelves);

var Shelf=require('./src/search');
app.use('/shelf',Shelf);



app.listen(port,()=>{
    console.log(`Server is runnung on port:${port}`);
});