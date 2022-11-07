#define GUN_ID 1
#define GUN_DAMAGE_DEALT 25
#define MAX_HEALTH 250
#define MAX_AMMO 4

#include <stdint.h>
#include <Arduino.h>

struct Game {
    bool game_running;
    uint8_t team [256];
    uint8_t team_size;
    bool team_fire;
    int16_t time_to_respawn;
    uint8_t health;
    uint8_t ammo_remaining;
    uint16_t deaths;
    uint32_t shots_fired;
};

struct GameState {
    SemaphoreHandle_t mutex;
    QueueHandle_t ir_queue;
    Game* game;
};

void reload(GameState* game_state);
void respawn(GameState* game_state);
void despawn(GameState* game_state);
bool check_shot_id(GameState* game_state, uint16_t id);
void respawn_task(void* parms);
