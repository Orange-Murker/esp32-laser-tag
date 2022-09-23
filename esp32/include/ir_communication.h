#define IR_SEND_PIN 5
#define IR_RECEIVE_PIN 4
#define TONE_PIN                27  // D27 25 & 26 are DAC0 and 1
#define APPLICATION_PIN         16  // RX2 pin
#define SEND_PWM_BY_TIMER

#define FLASHEND 0xFFFF // Dummy value for platforms where FLASHEND is not defined

#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)

#define NO_LED_FEEDBACK_CODE

#include <Arduino.h>

void initialise_ir();
void ir_receive_task(void* parms);
void ir_transmit_task(void* parms);
void send_ir_packet(uint16_t address, uint8_t command);