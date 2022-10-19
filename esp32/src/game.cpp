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

void respawn(GameState* game_state) {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    game_state->game->health = MAX_HEALTH;
    game_state->game->ammo_remaining = MAX_AMMO;
    xSemaphoreGive(game_state->mutex);
}
