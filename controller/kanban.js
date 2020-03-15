var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

var mysql = require('mysql');

//Create Connection
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "hola"
});

connection.connect(function(err) {
	if (err) {console.log(err)};
	console.log("Database Connected!");
});

//insert a row into the tbl_messages table
function insert_message(message) {
	var sql = "INSERT INTO test (??,??) VALUES (?,?)";
	var params = ['id', 'status',message,'0'];
    sql = mysql.format(sql, params);
    console.log(sql);	
	connection.query(sql, function (error, results) {
		if (error) throw error;
		console.log("1 record inserted");
	});
};		