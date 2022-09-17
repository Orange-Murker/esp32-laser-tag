#include <sys/cdefs.h>

void initialise_rmt();
void rmt_tx_task(void *parm);

_Noreturn
void rmt_rx_task(void *parm);