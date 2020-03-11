var mqtt = require('mqtt');
var mqttBrokerUrl="broker.hivemq.com";
 var ClientID="mycleintID_"+parseInt(Math.random()*100,10);
 var port=1883;
 //var topic="rfid/test";
 var client = mqtt.connect({mqttBrokerUrl,port});
    console.log(client);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.onConnect=onConnect;
// connect the client
// client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  // console.log("onConnect");
  var subTopic="rfid/test";
  client.subscribe(subTopic);
  // message = new Paho.Message("Hello");
  // message.destinationName = "World";
  // client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

 function onConnectionLost(responseObj){
  if(responseObj.errorCode !=0){
    console.log(responseObj.errorMessage)
  }
 }

 function onMessageArrived(message){
//    document.getElementById("rfidBundle").value=message.payloadString;
    console.log(message)
   //  return message.payloadString;
 }

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