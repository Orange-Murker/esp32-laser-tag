#include <stdint.h>

struct IrPacket {
    uint8_t gun_id;
    uint8_t damage;
    bool kill;
};

void initialise_ir();
void ir_receive_task(void* parms);
void ir_transmit_task(void* parms);
void shoot_ir();
