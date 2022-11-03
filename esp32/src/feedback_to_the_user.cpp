#include "feedback_to_the_user.h"
#include "pins.h"
#include "game.h"
#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 10
CRGB leds[NUM_LEDS];

const unsigned long animation_delay = 700;
const unsigned long ms_per_led = animation_delay / NUM_LEDS;
const unsigned long ms_per_led_dead = 10 * ms_per_led;
const unsigned int led_death_decay = 255 / NUM_LEDS;

unsigned long vibrate_until = 0;
bool vibrating = false;

const CRGB black = CRGB::Black;
const CRGB health_color = CRGB::Green;
const CRGB shooting_color = CRGB::Yellow;
const CRGB hit_color = CRGB::Red;

boolean shooting = false;
unsigned long show_led_until = 0;
int shoot_anim_index = 0;

boolean shot = false;
boolean death_animation = false;
unsigned long shot_until = 0;
int dead_anim_index = NUM_LEDS - 1;

boolean revived = false;
int revive_anim_index = NUM_LEDS - 1;

uint8_t health = MAX_HEALTH;

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
        leds[i] = health_color;
    }

    // Fill the LEDs with an unhealthy colour
    for (int i = leds_to_show; i < NUM_LEDS; i++) {
        leds[i] = black;
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
    if(shot && (millis() > shot_until)) {
        if (health > 0) {
            shot = false;
            show_health();
        } else {
            if (dead_anim_index >= 0) {
                if ((millis() <= show_led_until)
                && !death_animation) {
                    FastLED.setBrightness(FastLED.getBrightness() - led_death_decay); 
                    leds[dead_anim_index] = black;
                    FastLED.show();
                    death_animation = true;
                } else {
                    death_animation = false;
                    show_led_until = show_led_until + ms_per_led_dead;
                    dead_anim_index--;
                }
            } else {
                fill_leds_solid_colour(hit_color);
                FastLED.show();
                shot = false;
                dead_anim_index = NUM_LEDS - 1;
                show_led_until = 0;
            }
        }
    }

    if (millis() > vibrate_until) {
        if (vibrating) {
            digitalWrite(VIBRATOR_PIN, LOW);
            vibrating = false;
        }
    }

    if (shooting) {
        if (((millis() <= show_led_until) || shoot_anim_index == 0)
        && shoot_anim_index != NUM_LEDS) {
            if (shoot_anim_index != 0) {
                leds[shoot_anim_index - 1] = black;
            }

            leds[shoot_anim_index] = shooting_color;
            shoot_anim_index++;
            show_led_until = millis() + ms_per_led;

            FastLED.show();
        } else {
            leds[NUM_LEDS - 1] = black;
            FastLED.show();
            shoot_anim_index = 0;
            show_led_until = 0;
            show_health();
            shooting = false;
        }
    }

    if (revived) {
        if (((millis() <= show_led_until) || revive_anim_index == NUM_LEDS - 1)
        && revive_anim_index >= 0) {
            if (revive_anim_index != 9) {
                leds[revive_anim_index + 1] = health_color;
            }

            leds[revive_anim_index] = shooting_color;
            revive_anim_index--;
            show_led_until = millis() + ms_per_led;

            FastLED.show();
        } else {
            leds[0] = health_color;
            FastLED.show();
            revive_anim_index = NUM_LEDS - 1;
            show_led_until = 0;
            show_health();
            revived = false;

            digitalWrite(VIBRATOR_PIN, HIGH);
            vibrating = true;
            vibrate_until = millis() + 150;

            health = MAX_HEALTH;
        }
    }
}

void trigger_pressed_feedback() {
    digitalWrite(VIBRATOR_PIN, HIGH);
    vibrating = true;
    vibrate_until = millis() + 20;
    
    FastLED.setBrightness(255);
    fill_leds_solid_colour(black);
    shoot_anim_index = 0;
    shooting = true;
}

void got_shot_feedback(uint8_t current_health) {
    health = current_health;

    digitalWrite(VIBRATOR_PIN, HIGH);
    vibrating = true;
    vibrate_until = millis() + 150;

    FastLED.setBrightness(255);
    fill_leds_solid_colour(hit_color);
    FastLED.show();
    shot = true;
    shot_until = millis() + ms_per_led;
    show_led_until = millis() + ms_per_led + 10;
}

void revived_feedback() {
    health = MAX_HEALTH;
    FastLED.setBrightness(255);
    revived = true;
}
