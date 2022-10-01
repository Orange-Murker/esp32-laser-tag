#include "feedback_to_the_user.h"
#include "pins.h"
#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 10
CRGB leds[NUM_LEDS];

unsigned long vibrate_until = 0;
bool vibrating = false;

unsigned long show_leds_until = 0;
const CRGB black = CRGB::Black;
CRGB led_show_colour = CRGB::Black;

void fill_leds_solid_colour(CRGB colour) {
    for (int i = 0; i < NUM_LEDS; i++) {
        leds[i] = colour;
    }
    FastLED.show();
}

void initialise_feedback() {
    pinMode(VIBRATOR_PIN, OUTPUT);
    digitalWrite(VIBRATOR_PIN, LOW);

    FastLED.addLeds<NEOPIXEL, LED_PIN>(leds, NUM_LEDS);
    fill_leds_solid_colour(CRGB::Black);    
}



void feedback_update() {
    if (millis() > vibrate_until) {
        if (vibrating) {
            digitalWrite(VIBRATOR_PIN, LOW);
            vibrating = false;
        }
    }

    if (millis() > show_leds_until) {
        if (led_show_colour != black) {
            led_show_colour = CRGB::Black;
            fill_leds_solid_colour(led_show_colour);
        }
    }
} 


void trigger_pressed_feedback() {
    digitalWrite(VIBRATOR_PIN, HIGH);
    vibrating = true;
    vibrate_until = millis() + 80;

    led_show_colour = CRGB::Yellow;
    fill_leds_solid_colour(led_show_colour);
    show_leds_until = millis() + 80;
}