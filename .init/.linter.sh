#!/bin/bash
cd /home/kavia/workspace/code-generation/schedulemaster-93818/calendar_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

