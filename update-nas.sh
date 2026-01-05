#!/bin/bash
# Script to run on NAS to update the website

set -e

echo "🔄 Updating wedding website..."

# Navigate to source directory
cd /volume1/docker/birthday-of-love || exit 1

# Pull latest changes
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies if package.json changed
echo "📦 Installing dependencies..."
npm install

# Build
echo "🔨 Building production version..."
npm run build

# Copy build to serving directory
echo "📋 Copying to web directory..."
rsync -av --delete build/ /volume1/docker/begga.daniele.is/

# Restart service
echo "🔄 Restarting web server..."
sudo systemctl restart begga-wedding

# Verify
echo "✅ Verifying..."
sleep 2
curl -s http://localhost:8090 > /dev/null && echo "✅ Server is responding!" || echo "❌ Server error!"

echo "✨ Update complete! https://begga.daniele.is"
