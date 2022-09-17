#include <sys/cdefs.h>
#include "rmt.h"
#include <driver/rmt.h>

static rmt_channel_t rmt_tx_channel = RMT_CHANNEL_0;
static rmt_channel_t rmt_rx_channel = RMT_CHANNEL_2;

void initialise_rmt() {
    rmt_config_t rmt_tx_config = RMT_DEFAULT_CONFIG_TX(GPIO_NUM_0, rmt_tx_channel);
    rmt_tx_config.tx_config.carrier_en = true;

    ESP_ERROR_CHECK(rmt_config(&rmt_tx_config));
    ESP_ERROR_CHECK(rmt_driver_install(rmt_tx_config.channel, 0, 0));

    rmt_config_t rmt_rx_config = RMT_DEFAULT_CONFIG_RX(GPIO_NUM_1, rmt_rx_channel);
    rmt_rx_config.rx_config.filter_en = false;

    ESP_ERROR_CHECK(rmt_config(&rmt_rx_config));
    ESP_ERROR_CHECK(rmt_driver_install(rmt_rx_config.channel, 1000, 0));
}

void rmt_tx_task(void* parm) {

}

_Noreturn void rmt_rx_task(void* parm) {
    RingbufHandle_t rx_buffer = NULL;
    size_t size = 0;
    rmt_get_ringbuf_handle(rmt_rx_channel, &rx_buffer);
    while (true) {
        char* item = (char*) xRingbufferReceive(rx_buffer, &size, portMAX_DELAY);

        if (item != NULL) {
            for (int i = 0; i < size; i++) {
                printf("%c", item[i]);
                printf("\n");
                vRingbufferReturnItem(rx_buffer, (void*) item);
            }
        }

    }
}