#!/usr/bin/env bash
# Deploy Firebase Storage security rules

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}Deploying Firebase Storage security rules...${NC}"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
  echo -e "${RED}Firebase CLI not found. Installing...${NC}"
  npm install -g firebase-tools
fi

# Check if logged in
if ! firebase projects:list &>/dev/null; then
  echo -e "${YELLOW}Firebase login required.${NC}"
  echo ""
  echo -e "${BLUE}Please run:${NC}"
  echo "  firebase login"
  echo ""
  echo -e "${YELLOW}Then run this script again.${NC}"
  echo ""
  echo -e "${BLUE}Or manually update rules in Firebase Console:${NC}"
  echo "  1. Go to: https://console.firebase.google.com/project/firegram-1r/storage/rules"
  echo "  2. Copy rules from: ${SCRIPT_DIR}/storage.rules"
  echo "  3. Paste and click 'Publish'"
  exit 1
fi

# Deploy rules
cd "${PROJECT_ROOT}"
echo -e "${YELLOW}Deploying storage rules...${NC}"
firebase deploy --only storage --project firegram-1r

echo ""
echo -e "${GREEN}OK Storage rules deployed successfully!${NC}"
echo ""
echo -e "${YELLOW}Refresh your browser to see the images load.${NC}"



