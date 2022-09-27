#include <stdint.h>
#include <ArduinoJson.h>

struct {
    bool game_running;
    uint8_t team [256];
    uint8_t health;
} game_struct;