#!/bin/bash
set -e
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR/.."

# Normally, it should be the username, but I strangely see that Docker mounts target folder under the name "ubuntu" when running in WSL2...
# So let's allow customizing the username at runtime.
# username="$1"
# curr_uid=`id -u`
# curr_gid=`id -g`

# docker build -D \
#     --build-arg USERNAME=${username} \
#     --build-arg UID=${curr_uid} \
#     --build-arg GID=${curr_gid} \
#     -t threejs-demo .

docker build -D -t threejs-demo .

# docker run --rm -it --mount "type=bind,src=$(realpath .),dst=/home/me/app" --user $curr_uid:$curr_gid threejs-demo
docker run \
  --mount "type=bind,src=$(realpath .),dst=/home/ubuntu/app" \
  -p 3000:3000 \
  --rm \
  -it \
  threejs-demo
