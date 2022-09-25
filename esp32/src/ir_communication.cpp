#include "ir_communication.h"
#include "pins.h"

#include <IRremote.h>
#define DECODE_NEC


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
        vTaskDelay(pdTICKS_TO_MS(20));
    }
}


void send_ir_packet(uint16_t address, uint8_t command) {
    IrSender.sendNEC(address, command, 0);
}

