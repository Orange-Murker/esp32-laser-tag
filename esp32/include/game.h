#define GUN_ID 0
#define GUN_DAMAGE_DEALT 10

#include <stdint.h>
#include <ArduinoJson.h>

struct {
    bool game_running;
    uint8_t team [256];
    uint8_t health = 255;
} game_struct;