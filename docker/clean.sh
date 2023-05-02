#!/bin/sh

# Use: "sudo ./clean.sh"

# Backend
rm -rf ../backend/node_modules/
rm ../backend/sync-package-lock/package-lock.json
rm ../backend/package-lock.json

# Frontend
rm -rf ../frontend/node_modules/
rm ../frontend/sync-package-lock/package-lock.json
rm ../frontend/package-lock.json