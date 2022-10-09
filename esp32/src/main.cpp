#include "pins.h"
#include "button_handler.h"
#include "ir_communication.h"
#include "wifi_communication.h"
#include "feedback_to_the_user.h"
#include "game.h"
#include <Arduino.h>

static Game game {
    .health = MAX_HEALTH,
    .ammo_remaining = MAX_AMMO,
};

void setup() {
    // For debugging
    Serial.begin(115200);
    initialise_ir();
    initialise_wifi();

    static GameState game_state {
        xSemaphoreCreateMutex(),
        xQueueCreate(256, sizeof(IrPacket)),
        &game,
    };

    xTaskCreate(ir_receive_task, "IR Receive Task", 1024, (void*) &game_state, 2, NULL);
    xTaskCreate(trigger_task, "Trigger Task", 1024, NULL, 2, NULL);
    xTaskCreate(reload_task, "Reload Task", 1024, (void*) &game_state, 2, NULL);
    xTaskCreate(game_update_task, "Game Update Task", 4096, (void*) &game_state, 1, NULL);

    initialise_feedback();
    pinMode(IR_SEND_PIN, OUTPUT);
    digitalWrite(IR_SEND_PIN, LOW);

    pinMode(TRIGGER_PIN, INPUT_PULLUP);
    attachInterrupt(TRIGGER_PIN, trigger_pressed_isr, CHANGE);

    pinMode(RELOAD_PIN, INPUT_PULLUP);
    attachInterrupt(RELOAD_PIN, reload_pressed_isr, CHANGE);
}

void loop() {
    feedback_update();
    vTaskDelay(20);
}