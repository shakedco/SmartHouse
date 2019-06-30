#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

ESP8266WebServer server(80);
 
const char* ssid = "BeHappy";
const char* password =  "k1234565";
             //0,1,2,3,4,5, 6, 7, 8,9 ,10
int state[16]=        {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
int arr[11]  ={0,1,2,3,4,5,6,7,8};
String TimeStampArr[16];
boolean registers[16]={0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
int latchPin = 13;
int clockPin = 12;
int dataPin = 14;

//void writereq(){
// // put your main code here, to run repeatedly:
//  digitalWrite(SHCP_pin,LOW);
//  for(int i=0;i<8;i++){
//     digitalWrite(STCP_pin,LOW);
//     digitalWrite(DS_PIN,registers[i]);
//     digitalWrite(STCP_pin,HIGH);  
//  }
//  digitalWrite(SHCP_pin,HIGH);
//}

void initPinMode(){
         
  for(int i=0; i<11 ; i++){
    pinMode(arr[i],OUTPUT);
  }
  for(int i=0; i<11 ; i++){
    digitalWrite(arr[i],LOW);
  }    
  
}

void UpdateShiftRegister(){
  for(int i=0;i<16;i++){
    digitalWrite(clockPin,LOW);
    digitalWrite(latchPin,LOW);
    digitalWrite(dataPin,registers[i]);
    digitalWrite(latchPin, HIGH);
    digitalWrite(clockPin,HIGH);
  }
    delay(1); 
}

void PrintRegisterArr(){
  for(int i=0;i<16;i++){
    Serial.print(" ");
    Serial.print(registers[i]);
  }
  Serial.println();
}
void handleBody() { //Handler for the body path
      if (server.hasArg("plain")== false){ //Check if body received
            server.send(200, "text/plain", "Body not received");
            return;
      }
      String message = "";
             message += server.arg("plain");
      //Serial.println(message);
      StaticJsonDocument<200> doc;
      deserializeJson(doc, message);
      
      int ledId = doc["ledId"];
      String TimeStamp=doc["timestamp"];
      
      String response="{";
      if(state[ledId]==0){
        response+="IsOppened:true,TimeStamp:"+TimeStamp;
        TimeStampArr[ledId]=TimeStamp;
        state[ledId]=1;
        registers[ledId]=1;
        UpdateShiftRegister();
      }else{
        response+="IsClosed:true,TimeStamp:"+TimeStamp;
        TimeStampArr[ledId]="";
        state[ledId]=0;
        registers[ledId]=0;
        UpdateShiftRegister();
      }
       response+="}";
      server.send(200, "text/plin", response);
      PrintRegisterArr();
}
void printTImesS(){
  String message = "";
  for(int i=0;i<16;i++){
    message+=TimeStampArr[i];
    if(i!=15){
      message+=",";
    }
  }
  server.send(200, "text/plin", message);
}
void handleRegisterStatus(){
  String message = "";
  for(int i=0;i<16;i++){
    message+=registers[i];
    if(i!=15){
      message+=",";
    }
  }
  server.send(200, "text/plin", message);
}
void handleConnect(){
    if (server.hasArg("plain")== false){ //Check if body received
          server.send(200, "text/plain", "Body not received");
          return;
    }
    String message = "";
           message += server.arg("plain");
    server.send(200,"text/plain","Connected");
}
void handleHouseMode(){
     if (server.hasArg("plain")== false){ //Check if body received
        server.send(200, "text/plain", "Body not received");
        return;
    }
    
    StaticJsonDocument<2500> doc;
    String MSG=server.arg("plain");
//    Serial.println(MSG);
    deserializeJson(doc,MSG);
    boolean Status=doc["length"];
    if(Status==0){
      server.send(200,"text/plain","Error");
      return;  
    }
//    Serial.println(Status);
    int len=doc["length"];
    for(int i=0;i<len;i++){
        int Switch=doc["Arr"][i]["switch"];
        int RegIndex=doc["Arr"][i]["RegIndx"];
        Serial.println(RegIndex);
        registers[RegIndex]=Switch;
    }
    server.send(200,"text/plain","ModeUpdated");
}
void setup() {
    pinMode(latchPin,OUTPUT);
    pinMode(dataPin,OUTPUT);
    pinMode(clockPin,OUTPUT);
    //initPinMode();
    Serial.begin(115200);
    WiFi.begin(ssid, password);  //Connect to the WiFi network
    while (WiFi.status() != WL_CONNECTED) {  //Wait for connection
        delay(500);
        Serial.println("Waiting to connect...");
    }
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());  //Print the local IP
    server.on("/TS",printTImesS);
    server.on("/connect",handleConnect);//#
    server.on("/registerStatus",handleRegisterStatus);//#
    server.on("/body", handleBody); //Associate the handler function to the path
    server.on("/SetMode", handleHouseMode);
    server.begin(); //Start the server
    Serial.println("Server listening");
}

void loop() {
    //PrintRegisterArr();
    UpdateShiftRegister();
    server.handleClient(); //Handling of incoming requests
 
}
 


