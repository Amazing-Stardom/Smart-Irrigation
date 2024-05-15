#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "vivo T3 5G"; // Replace with your Wi-Fi SSID
const char* password = "Arun@123"; // Replace with your Wi-Fi password

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  while (WiFi.status()!= WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    String serverPath = "/update-sensor";
    String url = "http://localhost:8080" + serverPath; // Change localhost to your server's IP if needed
    
    http.begin(url.c_str());
    http.addHeader("Content-Type", "application/json");
    
    String jsonData = "{\"temperature\": 25.34, \"humidity\": 70, \"rain\": 1, \"moisture\": 70}";
    
    int httpResponseCode = http.POST(jsonData);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      Serial.print("Response: ");
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
    
    delay(5000); // Wait for 5 seconds before sending the next request
  } else {
    Serial.println("WiFi Disconnected");
  }
}
