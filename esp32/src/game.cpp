#include "game.h"

void set_health(GameState* game_state, uint8_t health) {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    game_state->game->health = health;
    xSemaphoreGive(game_state->mutex);
}

uint8_t get_health(GameState* game_state) {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    uint8_t health = game_state->game->health;
    xSemaphoreGive(game_state->mutex);
    return health;
}

void add_shot_fired(GameState* game_state) {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    (game_state->game->shots_fired)++;
    xSemaphoreGive(game_state->mutex);
}

void reload(GameState* game_state) {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    game_state->game->ammo_remaining = MAX_AMMO;
    xSemaphoreGive(game_state->mutex);
}

// Not thread safe
void respawn(GameState* game_state) {
    game_state->game->health = MAX_HEALTH;
    game_state->game->ammo_remaining = MAX_AMMO;
}

// Not thread safe
bool check_shot_id(GameState* game_state, uint16_t id) {
    if (!game_state->game->team_fire) {
        for (int i = 0; i < game_state->game->team_size; i++) {
            if (game_state->game->team[i] == id) {
                return false;
            }
        }
    }
    return true;
}
void respawn_task(void* parms) {
    bool waiting_for_respawn = false;
    uint32_t respawn_after;
    GameState* game_state = (GameState*) parms;
    
    while (true) {
        xSemaphoreTake(game_state->mutex, portMAX_DELAY);
        if (game_state->game->health <= 0) {
            // Check the respawn condition
            switch (game_state->game->time_to_respawn) {
                case -1:
                    break;
                case 0:
                    respawn(game_state);
                    break;
                default:
                    if (!waiting_for_respawn) {
                        waiting_for_respawn = true;
                        respawn_after = millis() + game_state->game->time_to_respawn * 1000;
                    } else if (millis() > respawn_after || game_state->game->time_to_respawn == 0) {
                        waiting_for_respawn = false;
                        respawn(game_state);
                    }
                    break;
            }
        }
        xSemaphoreGive(game_state->mutex);
        vTaskDelay(pdMS_TO_TICKS(1000));
    }
}
