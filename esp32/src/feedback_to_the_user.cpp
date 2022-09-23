#include "feedback_to_the_user.h"
#include <Arduino.h>

void vibrate() {
    digitalWrite(VIBRATOR_PIN, HIGH);
    vTaskDelay(pdTICKS_TO_MS(100));
    digitalWrite(VIBRATOR_PIN, LOW);
}