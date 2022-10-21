# Loosely inspired by https://github.com/suculent/platformio-docker-build
FROM python:3.8-alpine

ENV DEBIAN_FRONTEND=noninteractive
ENV ESP_IDF_VERSION="v4.4"

RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -U platformio

#RUN pio platform install espressif32
RUN pio pkg install -p "platformio/espressif32" -l "platformio/framework-arduinoespressif32"
