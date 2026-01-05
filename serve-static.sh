#!/bin/bash
# Simple script to serve the wedding website
# Usage: ./serve-static.sh

PORT=8080
BUILD_DIR="./build"

echo "🚀 Starting wedding website on port $PORT..."
echo "📁 Serving files from: $BUILD_DIR"
echo "🌐 Access at: http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Error: build directory not found!"
    echo "   Run 'npm run build' first"
    exit 1
fi

cd "$BUILD_DIR"

# Try different server options
if command -v python3 &> /dev/null; then
    echo "Using Python HTTP server..."
    python3 -m http.server $PORT
elif command -v npx &> /dev/null; then
    echo "Using npx serve..."
    npx serve -s . -l $PORT
else
    echo "❌ Error: No suitable web server found!"
    echo "   Install Python 3 or Node.js"
    exit 1
fi
