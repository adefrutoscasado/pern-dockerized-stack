#!/bin/bash

# Use: "./push-image.sh {version}"
# Example: "./push-image.sh develop"

set -x
# Define your own
registry="registry_host:registry_port" # Example: localhost:5000
repository="registry_repository_name" # Example: machine-repository
app="app_name" # Example: recipe-app
unset version

if [ $# -ne 1 ]; then
    echo "Missing version tag"
    exit 1
fi
version="$1"
backend_tag=${registry}/${repository}/${app}-backend:${version}
frontend_tag=${registry}/${repository}/${app}-frontend:${version}

cd ../backend/
docker build \
    -f Dockerfile.prod  \
    -t ${backend_tag} .
docker push ${backend_tag}

cd ../frontend/
docker build \
    -f Dockerfile.prod  \
    -t ${frontend_tag} .
docker push ${frontend_tag}
