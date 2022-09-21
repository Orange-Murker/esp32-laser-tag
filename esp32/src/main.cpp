#include <Arduino.h>
#include "ir_communication.h"

void setup() {
    // For debugging
    Serial.begin(115200);
    initialise_ir();
    xTaskCreate(ir_receive_task, "IR Receive Task", 10000, NULL, 1, NULL);
}

void loop() {
}