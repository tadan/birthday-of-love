#!/bin/bash
# Quick deployment: Commit, push, and trigger NAS update

set -e

echo "🚀 Quick Deploy to begga.daniele.is"
echo ""

# Git operations on Mac
echo "📝 Committing changes..."
git add .

# Get commit message
if [ -z "$1" ]; then
    COMMIT_MSG="Update wedding website - $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$1"
fi

echo "Commit message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG" || echo "Nothing to commit"

echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Pushed to GitHub!"
echo ""
echo "Now SSH into your NAS and run:"
echo "  ~/update-wedding.sh"
echo ""
echo "Or run this to trigger it remotely:"
echo "  ssh daniele@NAS_Irisgatan '~/update-wedding.sh'"
