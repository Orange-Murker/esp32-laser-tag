#include <stdint.h>

typedef struct ir_packet_t {
    uint8_t gun_id;
    uint8_t damage;
} IrPacket;

struct {
    uint8_t first = 0;
    uint8_t last = 0;
    IrPacket packets[256];
} ir_queue;


void initialise_ir();
void ir_receive_task(void* parms);
void ir_transmit_task(void* parms);
void send_ir_packet(uint16_t address, uint8_t command);