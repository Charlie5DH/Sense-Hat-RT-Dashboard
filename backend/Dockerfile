# syntax=docker/dockerfile:1

FROM python:3.10

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    && apt-get install build-essential

RUN pip install --upgrade pip setuptools wheel

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app