#include "wifi_communication.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include "game.h"
#include "ir_communication.h"
#include <Arduino.h>

const char* ssid = "LZR T4G SOLUTIONS";
const char* password = "lasertagforall";

String rest_address = "http://192.168.8.6:3000/";
String token = "tutunustunsutunlt999349lt9";

HTTPClient http;

void initialise_wifi() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        vTaskDelay(pdMS_TO_TICKS(500));
    }
    Serial.println("Connected to WIFI");
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

bool get_game_status() {
    http.begin(rest_address + "gamestatus?token=" + token);
    int code = http.GET();
    http.end();
    if (code == 200) {
        String body = http.getString();
        StaticJsonDocument<512> json;
        deserializeJson(json, body);
        game_struct.game_running = json["game_running"] == "true";
        
        json.clear();
        return true;
    }
    return false;
}

void wait_for_game_start() {
    while (true) {
        if (get_game_status() && game_struct.game_running) {
            break;
        }
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}

void game_update_task(void* parms) {
    QueueHandle_t ir_queue = *((QueueHandle_t*) parms);
    while (true) {
        if (uxQueueMessagesWaiting(ir_queue) > 0 && WiFi.status() == WL_CONNECTED) {
            StaticJsonDocument<1024> json;
            
            ir_packet_t ir_packet;
            while (xQueueReceive(ir_queue, &ir_packet, 0) == pdTRUE) {
                Serial.println("Packet Taken From The Queue");
                JsonObject json_packet = json.createNestedObject();
                json_packet["gun_id"] = ir_packet.gun_id;
                json_packet["damage"] = ir_packet.damage;
            }
            
            String json_str;
            serializeJson(json, json_str);
            serializeJson(json, Serial);
            
            http.begin(rest_address + "gotshot?token=" + token);
            http.POST(json_str);
            http.end();


        } else {
            vTaskDelay(pdMS_TO_TICKS(100));
        }
    }
}