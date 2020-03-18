var mysql = require('mysql');
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', function () {
	client.subscribe('rfid/tagNumber/status1');
	client.subscribe('rfid/tagNumber/status0')
	console.log("connected");

	// client.publish('presence', 'Hello mqtt')
  })
  
  client.on('message', function (topic, message) {

	// message is Buffer
	console.log(message.toString())

	insert_message(message);
  })


//Create Connection
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "kanban"
});

connection.connect(function(err) {
	if (err) {console.log(err)};
	console.log("Database Connected!");
});



//insert a row into the tbl_messages table
function insert_message(message) {
	var msg=message.toString();
	var sql1=`SELECT id from bundles WHERE id='${msg}'`;
	connection.query(sql1,function(err, rows, fields){	
		if(rows[0]!=undefined){
			var sql3=`UPDATE kunbuns SET status='1' where id='${msg}'`;
			connection.query(sql3,function(error,rows,fields){
				if(error) throw error;
				console.log('Data Updated');
			})
		}
		else{
			// return res.redirect('/bundle/add');
			console.log("Redirect");
		}
	})
};		

//insert a row into the tbl_messages table
function insert_message(message) {
	var msg=message.toString(); 
	var msge=msg
	if(msg=="Cancel"){
		// var cancel=msg;
		// console.log(temp);
		var sql=`UPDATE bundles SET status='0'`;
			connection.query(sql,function(error,rows,fields){
			if(error) throw error;
			console.log('Data Updated 0');
		})
	}
	else{
		var sql1=`SELECT id from bundles WHERE id='${msge}'`;
		connection.query(sql1,function(err, rows, fields){
		if(rows[0]!=undefined){
			var sql2=`UPDATE bundles SET status='1' where id='${msge}'`;
			connection.query(sql2,function(error,rows,fields){
			if(error) throw error;
			console.log('Data Updated 1');
			// return msge[1];
		})
	}
		});	
	}
	
}		



// var sql = "INSERT INTO test (??,??) VALUES (?,?)";
// 	var params = ['id', 'status',message,'0'];
//     sql = mysql.format(sql, params);
//     console.log(sql);	
// 	connection.query(sql, function (error, results) {
// 		if (error) throw error;
// 		console.log("1 record inserted");
// 	});

// var sql3=`UPDATE kunbuns SET status='1' where id='${msg}'`;
// 			connection.query(sql3,function(error,rows,fields){
// 				if(error) throw error;
// 				console.log('Data Updated');
// 			})

// sql2="INSERT INTO kunbuns (??,??) VALUES (?,?)";
// 			var params=['id','status',msg,'1'];
// 			sql2=mysql.format(sql2,params);
// 			connection.query(sql2,function(error,results){
// 				if(error) throw error;
// 				console.log("Data Inserted");

// 			})
// 			})

// var sql1=`SELECT id from bundles WHERE id='${msg}'`;
// 	connection.query(sql1,function(err, rows, fields){	
// 		if(rows[0]!=undefined){
// 			if(msg=="Cancel"){
// 				console.log(msg);
// 				var sql2=`UPDATE bundles SET status='0' where id='${msg}'`;
// 				connection.query(sql2,function(error,rows,fields){
// 				if(error) throw error;
// 				console.log('Data Updated');
// 			})
// 			}
// 			else{
// 				var sql3=`UPDATE bundles SET status='1' where id='${msg}'`;
// 				connection.query(sql3,function(error,rows,fields){
// 				if(error) throw error;
// 				console.log('Data Updated');
// 			})
// 			}
// 		}
// 		else{
// 			// return res.redirect('/bundle/add');
// 			// console.log("Redirect");
// 		}
// 	})
