#include <stdint.h>

typedef struct ir_packet_t {
    uint8_t gun_id;
    uint8_t damage;
} IrPacket;

void initialise_ir();
void ir_receive_task(void* parms);
void ir_transmit_task(void* parms);
void shoot_ir();