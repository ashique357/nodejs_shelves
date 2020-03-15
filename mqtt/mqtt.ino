#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <PubSubClient.h>
#include "MFRC522.h" 

#define RST_PIN         D1          // Configurable, see typical pin layout above
#define SS_PIN          D2         // Configurable, see typical pin layout above


const char* ssid     = "RFID";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "12345678";     // The password of the Wi-Fi network


const char* mqttBroker = "broker.hivemq.com";
//byte mqttBroker={5,196,95,208};
const int port=1883;
//const int webPort=8000;
const char* mqttUser = "user";
const char* mqttPassword = "user";
char message_buff[100];


WiFiClient esp8266_client;
PubSubClient client(esp8266_client);
MFRC522 mfrc522(SS_PIN, RST_PIN); 

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
  Serial.begin(74880);         // Start the Serial communication to send messages to the computer
  delay(10);
  Serial.println('\n');
 
  SPI.begin(); // open SPI connection
  mfrc522.PCD_Init(); // Initialize Proximity Coupling Device (PCD)
  
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
//  client.publish("rfid/all", "Getting Data");
}

void loop() {
client.loop();
   if ( ! mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial())return;
  Serial.print("Card UID:");//Dump UID
  String rfidUid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidUid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    rfidUid += String(mfrc522.uid.uidByte[i], HEX);
  }

  Serial.println(rfidUid);
  Serial.println("");
  rfidUid.toCharArray(message_buff, rfidUid.length() + 1);
  client.publish("rfid/ws/tagNumber", message_buff);

  
}
 
