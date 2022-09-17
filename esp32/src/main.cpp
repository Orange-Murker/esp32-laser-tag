#include <Arduino.h>
#include "rmt.h"
#include <freertos/task.h>

void setup() {
    initialise_rmt();
    //xTaskCreate(rmt_tx_task, "TX Task", 2048, nullptr, 10, nullptr);
    xTaskCreate(rmt_rx_task, "RX Task", 2048, nullptr, 10, nullptr);
}

void loop() {

}