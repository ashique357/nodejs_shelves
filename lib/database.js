var mySql=require('mysql');

var connection=mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'kanban'
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Successfully Connected');
    }
});

module.exports =connection;