#!/bin/sh

# copy node_modules to the shared volume node_modules_for_local_development so IDE can access them
cp -a /app/node_modules/* /app/node_modules_for_local_development
cp -a /app/node_modules/.bin /app/node_modules_for_local_development/

# copy package-lock.json to the shared volume "sync-package-lock" so its synced between images an development
cp -a /app/package-lock.json /app/sync-package-lock/


echo "Finised docker-entrypoint.sh (frontend)"

# Finish entrypoint. Run the CMD
exec "$@"