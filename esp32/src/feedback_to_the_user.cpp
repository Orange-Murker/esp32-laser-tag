#include "feedback_to_the_user.h"
#include "pins.h"
#include "game.h"
#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 10
CRGB leds[NUM_LEDS];

unsigned long vibrate_until = 0;
bool vibrating = false;

const CRGB black = CRGB::Black;
CRGB led_show_colour = CRGB::Black;

const unsigned long animation_delay = 700;
const unsigned long ms_per_led = animation_delay / NUM_LEDS;
unsigned long show_led_until = 0;

boolean shooting = false;
int shoot_anim_index = 0;

boolean shot = false;
boolean dead = false;
boolean death_animation = false;
const unsigned long ms_per_led_dead = 10 * ms_per_led;
unsigned long shot_until = 0;
unsigned int led_death_decay = 255 / NUM_LEDS;
int dead_anim_index = 9;

uint8_t health = 255;

void fill_leds_solid_colour(CRGB colour) {
    for (int i = 0; i < NUM_LEDS; i++)
    {
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
    if(shot) {
        if(millis() > shot_until) {
            if (health > 0) {
                shot = false;
                show_health();
            }
            else {
                if (dead_anim_index >= 0) {
                    if ((millis() <= show_led_until)
                    && !death_animation) {
                        FastLED.setBrightness(FastLED.getBrightness() - led_death_decay); 
                        leds[dead_anim_index] = black;
                        FastLED.show();
                        death_animation = true;
                    }
                    else {
                        death_animation = false;
                        show_led_until = show_led_until + ms_per_led_dead;
                        dead_anim_index--;
                    }
                }
                else {
                    fill_leds_solid_colour(CRGB::Red);
                    FastLED.show();
                    shot = false;
                // useless unless respawns implemented:
                    // dead_anim_index = NUM_LEDS - 1;
                    // show_led_until = 0;
                }
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
        if (((millis() <= show_led_until)|| shoot_anim_index == 0)
        && shoot_anim_index != NUM_LEDS) {
            if (shoot_anim_index != 0) {
                leds[shoot_anim_index - 1] = black;
            }

            leds[shoot_anim_index] = CRGB::Yellow;
            shoot_anim_index++;
            show_led_until = millis() + ms_per_led;

            FastLED.show();
        }
        else {
            leds[NUM_LEDS - 1] = black;
            FastLED.show();
            shoot_anim_index = 0;
            show_led_until = 0;
            show_health();
            shooting = false;
        }
    }
}

void trigger_pressed_feedback() {
    if (!dead) {
        digitalWrite(VIBRATOR_PIN, HIGH);
        vibrating = true;
        vibrate_until = millis() + 20;
        
        FastLED.setBrightness(255);
        fill_leds_solid_colour(black);
        shoot_anim_index = 0;
        shooting = true;
    }
}

void got_shot_feedback(uint8_t current_health) {
    health = current_health;

    if (!dead) {
        if (health <= 0) {

            dead = true;

        }

        digitalWrite(VIBRATOR_PIN, HIGH);
        vibrating = true;
        vibrate_until = millis() + 150;

        FastLED.setBrightness(255);
        fill_leds_solid_colour(CRGB::Red);
        FastLED.show();
        shot = true;
        shot_until = millis() + ms_per_led;
        show_led_until = millis() + ms_per_led + 10;
    }
}