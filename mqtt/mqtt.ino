#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <PubSubClient.h>

const char* ssid     = "FKL_CUTTING";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "%%CUT$$DG@@TING";     // The password of the Wi-Fi network

const char* mqttBroker = "broker.hivemq.com";
//byte mqttBroker={5,196,95,208};
const int port=1883;
//const int webPort=8000;
const char* mqttUser = "user";
const char* mqttPassword = "user";

WiFiClient esp8266_client;
PubSubClient client(esp8266_client);

void callback(char* topic, byte* payload, unsigned int length) {
 
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
 
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
 
  Serial.println();
  Serial.println("-----------------------");
 
}

void setup() {
  Serial.begin(115200);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');
  
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!\n");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  client.setServer(mqttBroker,port);
  client.setCallback(callback);

  while(!client.connected()){
    Serial.println("Trying To Connect To The MQTT");
    if(client.connect("Esp8266_RFID",mqttUser,mqttPassword)){
      Serial.println("Connected To MQTT Broker\n");
      }
    else{
      Serial.println("Connection Failed With State\n");
      Serial.print(client.state());
      delay(2000);
      }
  }
//  client.subscribe("rfid/test");
  client.publish("rfid/all", "Getting Data");
}

void loop() {
client.loop();
   int a=1;
   int rfid=1;
   int existing_data=1;
   int result=1;
   if(rfid==1){
    if(existing_data==1){
      if(result=1){
        client.publish("rfid/update/1","Status=1");
        }
       else{
        client.subscribe("rfid/redirect");
        }
      }
      else{
        client.subscribe("rfid/test");
        }
    } 
 }
