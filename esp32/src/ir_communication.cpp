#include "ir_communication.h"
#include "feedback_to_the_user.h"

#define DECODE_NEC

#include <IRremote.h>


void initialise_ir() {
    IrReceiver.begin(IR_RECEIVE_PIN, DISABLE_LED_FEEDBACK);
    IrSender.begin(IR_SEND_PIN, DISABLE_LED_FEEDBACK);
}

void ir_receive_task(void* parms) {
    while (true) {
        if (IrReceiver.decode()) {

            // Print a short summary of received data
            IrReceiver.printIRResultShort(&Serial);
            IrReceiver.printIRSendUsage(&Serial);
            Serial.println();

            IrReceiver.resume(); // Enable receiving of the next value
        }
        vTaskDelay(pdTICKS_TO_MS(70));
    }
}

void ir_transmit_task(void* shot_queued) {
    while (true) {
        if (*((bool*) shot_queued)) {
            send_ir_packet(0x0, 0x0);
            *((bool*) shot_queued) = false;
        } else {
            vTaskDelay(pdMS_TO_TICKS(70));
        }
    } 
}

void send_ir_packet(uint16_t address, uint8_t command) {
    IrSender.sendNEC(address, command, 0);
    vibrate();
}

