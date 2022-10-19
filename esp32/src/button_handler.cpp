#include "button_handler.h"
#include "pins.h"
#include "ir_communication.h"
#include "game.h"
#include <Arduino.h>

static TaskHandle_t trigger_task_handle = nullptr;
static unsigned long last_trigger_time;

void trigger_pressed_isr() {
    BaseType_t higher_priority_task_woken = pdFALSE;
    last_trigger_time = millis();
    vTaskNotifyGiveFromISR(trigger_task_handle, &higher_priority_task_woken);
    portYIELD_FROM_ISR(higher_priority_task_woken);
}

void trigger_task(void* parms) {
    trigger_task_handle = xTaskGetCurrentTaskHandle();
    while (true) {
        ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
        while (last_trigger_time + 50 > millis()) {
            vTaskDelay(pdMS_TO_TICKS(5));
        }

        // If the trigger is down
        if (!digitalRead(TRIGGER_PIN)) {
            shoot_ir();
        }

        // If the interrupt has already given another notification during the time we were processing the last one
        // Take it without blocking
        ulTaskNotifyTake(pdTRUE, 0);
    }
}

static TaskHandle_t reload_task_handle = nullptr;
static unsigned long last_reload_time;

void reload_pressed_isr() {
    BaseType_t higher_priority_task_woken = pdFALSE;
    last_reload_time = millis();
    vTaskNotifyGiveFromISR(reload_task_handle, &higher_priority_task_woken);
    portYIELD_FROM_ISR(higher_priority_task_woken);
}

void reload_task(void* parms) {
    reload_task_handle = xTaskGetCurrentTaskHandle();
    GameState* game_state = (GameState*) parms;
    while (true) {
        ulTaskNotifyTake(pdTRUE, portMAX_DELAY);
        while (last_reload_time + 50 > millis()) {
            vTaskDelay(pdMS_TO_TICKS(5));
        }

        // If the trigger is down
        if (!digitalRead(RELOAD_PIN)) {
            reload(game_state);
        }

        // If the interrupt has already given another notification during the time we were processing the last one
        // Take it without blocking
        ulTaskNotifyTake(pdTRUE, 0);
    }
}
