#!/bin/bash

docker compose pull backend frontend
docker compose stop backend frontend
docker compose rm -f backend frontend
docker compose up -d backend frontend
