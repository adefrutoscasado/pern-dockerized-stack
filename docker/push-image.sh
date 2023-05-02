#!/bin/bash

# Use: "./push-image.sh {version}"
# Example: "./push-image.sh develop"

set -x
# Define your own
registry="registry_host:registry_port" # Example: localhost:5000
repository="repository_name" # Example: machine-repository
app="app_name" # Example: recipe-app
unset version

if [ $# -ne 1 ]; then
    echo "Missing version tag"
    exit 1
fi
version="$1"

# If the target machine and build machine are the same, use following part.

backend_tag=${registry}/${repository}/${app}-backend:${version}
frontend_tag=${registry}/${repository}/${app}-frontend:${version}

cd ../backend/
docker build \
    -f Dockerfile.prod \
    -t ${backend_tag} .
docker push ${backend_tag}

cd ../frontend/
docker build \
    -f Dockerfile.prod \
    -t ${frontend_tag} .
docker push ${frontend_tag}

# # If the target machine where the image runs is different from current image, use following part.
# # IMPORTANT: You need the "buildx" plugin.
# # For example, if you want to run your app in raspberry pi, you need to use "linux/arm64/v8" as platform.

# platform_tag="arm64v8" # Example for a raspberry pi: arm64v8
# platform_arg="linux/arm64/v8" # Example for a raspberry pi: linux/arm64/v8

# backend_tag=${registry}/${repository}/${app}-backend:${version}-${platform_tag}
# frontend_tag=${registry}/${repository}/${app}-frontend:${version}-${platform_tag}

# cd ../backend/
# docker buildx build \
#     -f Dockerfile.prod \
#     --platform ${platform_arg} \
#     -t ${backend_tag} .
# docker push ${backend_tag}

# cd ../frontend/
# docker buildx build \
#     -f Dockerfile.prod \
#     --platform ${platform_arg} \
#     -t ${frontend_tag} .
# docker push ${frontend_tag}