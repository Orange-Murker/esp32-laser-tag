#include "button_handler.h"
#include "pins.h"
#include "ir_communication.h"
#include "feedback_to_the_user.h"
#include <Arduino.h>

SemaphoreHandle_t trigger_semaphore = xSemaphoreCreateBinary();

unsigned long last_trigger_time;

void trigger_pressed_isr() {
    last_trigger_time = millis();
    xSemaphoreGiveFromISR(trigger_semaphore, 0);
}

void trigger_task(void* parms) {
    while (true) {
        xSemaphoreTake(trigger_semaphore, portMAX_DELAY);
        while (last_trigger_time + 50 > millis()) {
            vTaskDelay(pdMS_TO_TICKS(5));
        }
        // If trigger is down
        if (!digitalRead(TRIGGER_PIN)) {
            send_ir_packet(0x0, 0x0);
            trigger_pressed_feedback();
        }
    }
}