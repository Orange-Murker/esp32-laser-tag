#include "wifi_communication.h"
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "";
const char* password = "";
const char* base_rest_address = "";

HTTPClient http;

void initialise_wifi() {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}

bool send_wifi_packet(String address, String JSONdata) {
    if (WiFi.status() == WL_CONNECTED) {
        http.begin(address);
        http.addHeader("Content-Type", "application/json");

        http.POST(JSONdata);

        http.end();
        return true;
    }
    return false;
}