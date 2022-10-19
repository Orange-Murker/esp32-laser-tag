#include "ir_communication.h"
#include "feedback_to_the_user.h"
#include "game.h"
#include "pins.h"

#include <Arduino.h>

#include <IRremote.h>
#define TONE_PIN                27  // D27 25 & 26 are DAC0 and 1
#define APPLICATION_PIN         16  // RX2 pin
#define SEND_PWM_BY_TIMER
#define FLASHEND 0xFFFF // Dummy value for platforms where FLASHEND is not defined
#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)
#define NO_LED_FEEDBACK_CODE
#define DECODE_NEC

static GameState* game_state;

void initialise_ir() {
    IrReceiver.begin(IR_RECEIVE_PIN, DISABLE_LED_FEEDBACK);
    IrSender.begin(IR_SEND_PIN, DISABLE_LED_FEEDBACK);
}

void ir_receive_task(void* parms) {
    game_state = (GameState*) parms;

    while (true) {
        if (IrReceiver.decode()) {
            // Print a short summary of received data
            IrReceiver.printIRResultShort(&Serial);

            xSemaphoreTake(game_state->mutex, portMAX_DELAY);
            
            if (IrReceiver.decodedIRData.protocol == NEC 
                //&& IrReceiver.decodedIRData.address != GUN_ID
                && game_state->game->health > 0
            ) {
                IrPacket ir_packet {
                    .kill = false,
                };

                ir_packet.gun_id = IrReceiver.decodedIRData.address;
                ir_packet.damage = IrReceiver.decodedIRData.command;

                int new_health = game_state->game->health - ir_packet.damage;

                // Cap the range
                if (new_health <= 0) {
                    new_health = 0;
                    ir_packet.kill = true;
                }

                game_state->game->health = new_health;

                got_shot_feedback(game_state->game->health);
                
                xSemaphoreGive(game_state->mutex);

                // Queue the packet
                xQueueSend(game_state->ir_queue, &ir_packet, portMAX_DELAY);
            } else {
                xSemaphoreGive(game_state->mutex);
            }

            // Enable receiving of the next value
            IrReceiver.resume();
        }
        vTaskDelay(pdTICKS_TO_MS(20));
    }
}


void shoot_ir() {
    xSemaphoreTake(game_state->mutex, portMAX_DELAY);
    if (game_state->game->health != 0 && game_state->game->ammo_remaining != 0) {
        trigger_pressed_feedback();
        game_state->game->shots_fired++;
        game_state->game->ammo_remaining--;
        xSemaphoreGive(game_state->mutex);
        
        IrSender.sendNEC(GUN_ID, GUN_DAMAGE_DEALT, 0);
    } else {
        xSemaphoreGive(game_state->mutex);
    }
}
