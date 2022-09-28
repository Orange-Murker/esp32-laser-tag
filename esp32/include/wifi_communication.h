#include <Arduino.h>

void initialise_wifi();
bool send_wifi_packet(String address, String JSONdata);
bool get_game_status();
void wait_for_game_start();
void game_update_task(void*);