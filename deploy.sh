#!/bin/bash

echo "🚀 Deployment started..."

cd /root/nible-tech || exit

git pull origin main

npm install

npm run build

pm2 restart next-app

echo "✅ Deployment completed"
