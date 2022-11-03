#include "wifi_communication.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include "game.h"
#include "ir_communication.h"
#include <Arduino.h>
#include <ArduinoJson.h>

const char* ssid = "LZR T4G SOLUTIONS";
const char* password = "lasertagforall";
String rest_address = "http://192.168.211.106:3001/api/";
String token = "tutunustunsutunlt999349lt9";

HTTPClient http;

void initialise_wifi() {
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        vTaskDelay(pdMS_TO_TICKS(500));
    }
    Serial.println("Connected to WIFI");
    Serial.println(WiFi.localIP());
}

void game_update_task(void* parms) {
    GameState* game_state = (GameState*) parms;
    while (true) {
        if (WiFi.status() == WL_CONNECTED) {
            xSemaphoreTake(game_state->mutex, portMAX_DELAY);
            bool game_running = game_state->game->game_running;
            xSemaphoreGive(game_state->mutex);
            
            // The document cannot get bigger than this with the current health and values of 250 and 25
            StaticJsonDocument<768> json;
            
            xSemaphoreTake(game_state->mutex, portMAX_DELAY);
            json["health"] = game_state->game->health;
            json["deaths"] = game_state->game->deaths;
            json["shots_fired"] = game_state->game->shots_fired;
            xSemaphoreGive(game_state->mutex);

            JsonArray hits = json.createNestedArray("hits");

            IrPacket ir_packet;
            while (xQueueReceive(game_state->ir_queue, &ir_packet, 0) == pdTRUE) {
                JsonObject json_packet = hits.createNestedObject();
                json_packet["shooter"] = ir_packet.gun_id;
                json_packet["damage"] = ir_packet.damage;
                if (ir_packet.kill) {
                    json_packet["kill"] = true;
                }
            }
            
            String json_str;
            serializeJson(json, json_str);
            serializeJson(json, Serial);
            Serial.println("");
            
            http.begin(rest_address + "embedded/" + token);
            http.addHeader("Content-Type", "application/json");
            http.useHTTP10(true);
            int code = http.POST(json_str);
            if (code == 201) {
                String response = http.getString();
                Serial.println(response);
                StaticJsonDocument<1024> r_json;
                deserializeJson(r_json, response);
                bool game_running = r_json["game_running"];

                JsonArray team = r_json["team"];
                
                xSemaphoreTake(game_state->mutex, portMAX_DELAY);
                game_state->game->team_fire = r_json["team_fire"];
                game_state->game->time_to_respawn = r_json["time_to_respawn"];
                if (!team.isNull()) {
                    int team_size = 0;
                    for (uint8_t x : team) {
                        game_state->game->team[team_size] = x;
                        team_size++;
                    }
                    game_state->game->team_size = team_size;
                }
                xSemaphoreGive(game_state->mutex);
            }
            http.end();
        }
        vTaskDelay(pdMS_TO_TICKS(10000));
    }
}
