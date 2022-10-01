#define GUN_ID 0
#define GUN_DAMAGE_DEALT 25
#define MAX_HEALTH 250

#include <stdint.h>
#include <ArduinoJson.h>

struct Game {
    bool game_running;
    uint8_t team [256];
    uint8_t health = MAX_HEALTH;
};