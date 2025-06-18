#!/bin/bash

set -e
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR/.."

# Problem: Docker's entrypoint runs `bash` but it seems that the embedded .bashrc file stops prematurely before it could set the PATH for pnpm...
# Workaround: invoking pnpm directly

$HOME/.local/share/pnpm/pnpm $*