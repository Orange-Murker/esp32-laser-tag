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

#include <Arduino.h>

#include <IRremote.h>
#define DECODE_NEC


void initialise_ir() {
    IrReceiver.begin(IR_RECEIVE_PIN, DISABLE_LED_FEEDBACK);
    IrSender.begin(IR_SEND_PIN, DISABLE_LED_FEEDBACK);
}

void ir_receive_task(void* parms) {
    QueueHandle_t ir_queue = *((QueueHandle_t*) parms);
    while (true) {
        if (IrReceiver.decode()) {

            // Print a short summary of received data
            IrReceiver.printIRResultShort(&Serial);

            if (IrReceiver.decodedIRData.protocol == NEC 
            //&& IrReceiver.decodedIRData.address != GUN_ID
            ) {
                IrPacket ir_packet;

                ir_packet.gun_id = IrReceiver.decodedIRData.address;
                ir_packet.damage = IrReceiver.decodedIRData.command;

                int new_health = game_struct.health - ir_packet.damage;

                if (new_health < 0) {
                    new_health = 0;
                }

                game_struct.health = new_health;
                Serial.print("New health: ");
                Serial.println(new_health);

                // Queue the packet
                xQueueSend(ir_queue, &ir_packet, portMAX_DELAY);
            }

            IrReceiver.resume(); // Enable receiving of the next value
        }
        vTaskDelay(pdTICKS_TO_MS(20));
    }
}


void shoot_ir() {
    IrSender.sendNEC(GUN_ID, GUN_DAMAGE_DEALT, 0);
}

