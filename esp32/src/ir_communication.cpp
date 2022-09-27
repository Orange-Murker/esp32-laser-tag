#define TONE_PIN                27  // D27 25 & 26 are DAC0 and 1
#define APPLICATION_PIN         16  // RX2 pin
#define SEND_PWM_BY_TIMER

#define FLASHEND 0xFFFF // Dummy value for platforms where FLASHEND is not defined

#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)

#define NO_LED_FEEDBACK_CODE

#include "ir_communication.h"
#include "game.h"
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

            IrPacket ir_packet;

            ir_packet.gun_id = IrReceiver.decodedIRData.address & 0b11111111;
            ir_packet.damage = IrReceiver.decodedIRData.command & 0b11111111;

            int new_health = game_struct.health - ir_packet.damage;

            if (new_health < 0) {
                new_health = 0;
            }

            game_struct.health = new_health;

            // Queue the packet
            ir_queue.packets[ir_queue.last] = ir_packet;
            ir_queue.last++;

            IrReceiver.resume(); // Enable receiving of the next value
        }
        vTaskDelay(pdTICKS_TO_MS(20));
    }
}


void send_ir_packet(uint16_t address, uint8_t command) {
    IrSender.sendNEC(address, command, 0);
}

