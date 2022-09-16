#include "rmt.h"
#include <driver/rmt.h>

void initialise_rmt() {
    rmt_config_t rmt_tx_config = RMT_DEFAULT_CONFIG_TX(GPIO_NUM_0, RMT_CHANNEL_0);
    rmt_tx_config.tx_config.carrier_en = true;

    ESP_ERROR_CHECK(rmt_config(&rmt_tx_config));
    ESP_ERROR_CHECK(rmt_driver_install(rmt_tx_config.channel, 0, 0));
}