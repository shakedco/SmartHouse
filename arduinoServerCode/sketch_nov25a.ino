#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

ESP8266WebServer server(80);
 
const char* ssid = "arc";
const char* password =  "abed1234";
           //0,1,2,3,4,5, 6, 7, 8,9 ,10
int state[11]={0,0,0,0,0,0, 0, 0, 0, 0, 0};
int arr[11]  ={0,1,2,3,4,5,12,13,14,15,16};

void initPinMode(){
         
  for(int i=0; i<11 ; i++){
    pinMode(arr[i],OUTPUT);
  }
  for(int i=0; i<11 ; i++){
    digitalWrite(arr[i],LOW);
  }    
  
}
void setup() {
    initPinMode();
    Serial.begin(115200);
    WiFi.begin(ssid, password);  //Connect to the WiFi network
 
    while (WiFi.status() != WL_CONNECTED) {  //Wait for connection
 
        delay(500);
        Serial.println("Waiting to connect...");
 
    }
 
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());  //Print the local IP
 
    server.on("/body", handleBody); //Associate the handler function to the path
 
    server.begin(); //Start the server
    Serial.println("Server listening");
 
}
 
void loop() {
 
    server.handleClient(); //Handling of incoming requests
 
}
 
void handleBody() { //Handler for the body path
 
      if (server.hasArg("plain")== false){ //Check if body received
 
            server.send(200, "text/plain", "Body not received");
            return;
 
      }
 
      String message = "";
             message += server.arg("plain");
  
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject& root = jsonBuffer.parseObject(message);
      int ledId = root["ledId"];
      
      if(state[ledId]==0){
        Serial.println(ledId);
        Serial.println(arr[ledId]);
        Serial.println(state[ledId]);
        state[ledId]=1;
        digitalWrite(arr[ledId],HIGH);
      }else{
        state[ledId]=0;
        digitalWrite(arr[ledId],LOW);
      }

      server.send(200, "text/plin", message);
      Serial.println(message);
}