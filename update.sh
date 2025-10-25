#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo -e " Astolfo Depot Manager - Quick Update"
echo -e "==========================================${NC}"
echo ""

echo -e "${YELLOW}[1/4] Fetching latest changes from GitHub...${NC}"
if ! git fetch origin; then
    echo -e "${RED}ERROR: Failed to fetch updates!${NC}"
    echo "Make sure you have internet connection."
    exit 1
fi

echo ""
echo -e "${YELLOW}[2/4] Pulling latest code...${NC}"
if ! git pull origin main; then
    echo -e "${RED}ERROR: Failed to pull updates!${NC}"
    echo "You may have local changes. Run 'git stash' first."
    exit 1
fi

echo ""
echo -e "${YELLOW}[3/4] Installing/updating dependencies...${NC}"
if ! npm install; then
    echo -e "${RED}ERROR: Failed to install dependencies!${NC}"
    echo "Make sure Node.js and npm are installed."
    exit 1
fi

echo ""
echo -e "${YELLOW}[4/4] Update complete!${NC}"
echo ""
echo -e "${GREEN}=========================================="
echo -e " Successfully updated!"
echo -e "==========================================${NC}"
echo ""
echo "Recent changes:"
git log --oneline -5
echo ""
read -p "Press Enter to start Astolfo Depot Manager..."

echo ""
echo -e "${BLUE}Starting application...${NC}"
npm start
