#include "ir_communication.h"

#define SEND_PWM_BY_TIMER
#define DECODE_NEC

#include <Arduino.h>
#include <IRremote.h>

void initialise_ir() {
    IrReceiver.begin(4, DISABLE_LED_FEEDBACK);
}

void ir_receive_task(void* parms) {
    while (true) {
        if (IrReceiver.decode()) {

            // Print a short summary of received data
            IrReceiver.printIRResultShort(&Serial);
            IrReceiver.printIRSendUsage(&Serial);
            Serial.println();

            IrReceiver.resume(); // Enable receiving of the next value

            if (IrReceiver.decodedIRData.command == 0x10) {
                // do something
            } else if (IrReceiver.decodedIRData.command == 0x11) {
                // do something else
            }
        }
        vTaskDelay(100 / MICROS_PER_TICK);
    }
}