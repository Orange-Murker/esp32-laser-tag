#include "feedback_to_the_user.h"
#include "pins.h"
#include "game.h"
#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 10
CRGB leds[NUM_LEDS];

unsigned long vibrate_until = 0;
bool vibrating = false;

unsigned long show_leds_until = 0;
const CRGB black = CRGB::Black;
CRGB led_show_colour = CRGB::Black;

uint8_t health = 255;

void fill_leds_solid_colour(CRGB colour) {
    for (int i = 0; i < NUM_LEDS; i++) {
        leds[i] = colour;
    }
    FastLED.show();
}

void show_health() {
    uint8_t leds_to_show = (health * NUM_LEDS) / MAX_HEALTH;
    
    // Fill the LEDs with a healthy colour
    for (int i = 0; i < leds_to_show; i++) {
        leds[i] = CRGB::Green;
    }

    // Fill the LEDs with an unhealthy colour
    for (int i = leds_to_show; i < NUM_LEDS; i++) {
        leds[i] = CRGB::Black;
    }
    FastLED.setBrightness(50);

    FastLED.show();
}

void initialise_feedback() {
    pinMode(VIBRATOR_PIN, OUTPUT);
    digitalWrite(VIBRATOR_PIN, LOW);

    FastLED.addLeds<NEOPIXEL, LED_PIN>(leds, NUM_LEDS);
    show_health();
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

            // Return to displaying the health after a flash
            show_health();
        }
    }
} 

void trigger_pressed_feedback() {
    digitalWrite(VIBRATOR_PIN, HIGH);
    vibrating = true;
    vibrate_until = millis() + 80;

    led_show_colour = CRGB::Yellow;
    FastLED.setBrightness(255);
    fill_leds_solid_colour(led_show_colour);
    show_leds_until = millis() + 80;
}

void got_shot_feedback(uint8_t current_health) {
    health = current_health;

    digitalWrite(VIBRATOR_PIN, HIGH);
    vibrating = true;
    vibrate_until = millis() + 150;

    show_health();
}
