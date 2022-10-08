#define GUN_ID 0
#define GUN_DAMAGE_DEALT 25
#define MAX_HEALTH 250

#include <stdint.h>
#include <Arduino.h>

struct Game {
    bool game_running;
    uint8_t team [256];
    uint8_t health;
    uint16_t deaths;
    uint32_t shots_fired;
};

struct GameState {
    SemaphoreHandle_t mutex;
    QueueHandle_t ir_queue;
    Game* game;
};


void set_health(GameState* game_state, uint8_t health);
uint8_t get_health(GameState* game_state);
void add_shot_fired(GameState* game_state);