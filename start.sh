#!/bin/bash

SCREEN_NAME="linktree"

if [ "$STY" ]; then
  exit 1
fi

if screen -list | grep -q "\.${SCREEN_NAME}"; then
  
  if screen -list | grep -q "\.${SCREEN_NAME}.*(Attached)"; then
    screen -d ${SCREEN_NAME}
  fi
  
  exec screen -r ${SCREEN_NAME}
else
  screen -dmS ${SCREEN_NAME} bash -c "
    npm install;
    npm start;
    exec bash"
fi
