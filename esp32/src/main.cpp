#define TRIGGER_PIN 13

#include "wifi_communication.h"
#include "ir_communication.h"
#include "feedback_to_the_user.h"
#include <Arduino.h>

unsigned long last_trigger_time = 0;
bool trigger_pressed = true;
bool shot_queued = false;

void trigger_pressed_isr() {
    if (!digitalRead(TRIGGER_PIN)) {
        // Check for debounce
        if (millis() - last_trigger_time > 100) {
            shot_queued = true;
        }
    }
    
    last_trigger_time = millis();
}

void setup() {
    // For debugging
    Serial.begin(115200);
    initialise_ir();
    xTaskCreate(ir_receive_task, "IR Receive Task", 10000, NULL, 1, NULL);
    xTaskCreate(ir_transmit_task, "IR Transmit Task", 10000, (void*) &shot_queued, 1, NULL);

    pinMode(TRIGGER_PIN, INPUT_PULLUP);
    pinMode(VIBRATOR_PIN, OUTPUT);
    attachInterrupt(TRIGGER_PIN, trigger_pressed_isr, CHANGE);
}

void loop() {

}