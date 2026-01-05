#!/bin/bash
# Deployment script for birthday-of-love website
# Usage: ./deploy.sh [staging|production] [commit-message]

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
NAS_USER="daniele"
NAS_HOST="192.168.1.115"
NAS_PORT="22"

# Determine environment
ENV=${1:-production}

if [ "$ENV" = "staging" ]; then
    BRANCH="staging"
    NAS_REPO_PATH="/volume1/docker/birthday-of-love-staging"
    NAS_BUILD_PATH="/volume1/docker/birthday-of-love-staging/build"
    DOMAIN="staging.begga.daniele.is"
    echo -e "${YELLOW}🚀 Deploying to STAGING${NC}"
elif [ "$ENV" = "production" ]; then
    BRANCH="main"
    NAS_REPO_PATH="/volume1/docker/birthday-of-love-prod"
    NAS_BUILD_PATH="/volume1/docker/birthday-of-love-prod/build"
    DOMAIN="begga.daniele.is"
    echo -e "${GREEN}🚀 Deploying to PRODUCTION${NC}"
else
    echo -e "${RED}❌ Invalid environment. Use: ./deploy.sh [staging|production]${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Environment: $ENV${NC}"
echo -e "${BLUE}🌿 Branch: $BRANCH${NC}"
echo -e "${BLUE}🌐 Domain: https://$DOMAIN${NC}"
echo ""

# Step 1: Commit local changes if provided
COMMIT_MSG="${2:-Update wedding website - $(date '+%Y-%m-%d %H:%M')}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${BLUE}📝 Committing changes...${NC}"
    git add .
    git commit -m "$COMMIT_MSG" || echo "Nothing to commit"
fi

# Step 2: Push to GitHub
echo -e "${BLUE}🔄 Pushing to GitHub ($BRANCH)...${NC}"
git checkout $BRANCH
git merge main --no-edit || true
git push origin $BRANCH

# Step 3: Deploy on NAS via SSH
echo -e "${BLUE}🚀 Deploying on NAS...${NC}"
ssh -p${NAS_PORT} ${NAS_USER}@${NAS_HOST} << EOF
cd $NAS_REPO_PATH || exit 1
echo "⬇️  Pulling latest from $BRANCH..."
git fetch origin
git reset --hard origin/$BRANCH
echo "📥 Installing dependencies..."
npm install
echo "🔨 Building..."
npm run build
echo "✅ Build complete!"
EOF

# Step 4: Verify
echo -e "${BLUE}✅ Verifying deployment...${NC}"
sleep 2
curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200" && \
    echo -e "${GREEN}✅ Server is responding${NC}" || \
    echo -e "${RED}❌ Server error!${NC}"

echo ""
echo -e "${GREEN}✨ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Website is live at: https://$DOMAIN${NC}"
