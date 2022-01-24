#!/bin/bash
cd /home/ubuntu/solutionist/server/dist/src
authbind --deep pm2 stop index.js 2> /dev/null || true
authbind --deep pm2 delete index.js 2> /dev/null || true