#include "pins.h"
#include "button_handler.h"
#include "ir_communication.h"
#include "wifi_communication.h"
#include "feedback_to_the_user.h"
#include <Arduino.h>

void setup() {
    // For debugging
    Serial.begin(115200);
    initialise_ir();
    xTaskCreate(ir_receive_task, "IR Receive Task", 10000, NULL, 1, NULL);
    xTaskCreate(trigger_task, "Trigger Task", 10000, NULL, 1, NULL);

    initialise_feedback();
    pinMode(IR_SEND_PIN, OUTPUT);
    digitalWrite(IR_SEND_PIN, LOW);

    attachInterrupt(TRIGGER_PIN, trigger_pressed_isr, CHANGE);
}

void loop() {
    feedback_update();
    vTaskDelay(50);
}