#!/bin/bash

echo "🚀 Deployment started..."

cd /root/nible-tech || exit

git pull origin main

npm install

npm run build

pm2 reload next-app

echo "✅ Deployment completed"
