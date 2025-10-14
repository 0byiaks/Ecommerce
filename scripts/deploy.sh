#!/bin/bash

# 🚀 Simple CI/CD Deployment Script
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}[INFO]${NC} Starting deployment..."

# Add all changes
git add .

# Commit with message
git commit -m "$1"

# Push to GitHub
git push origin main

echo -e "${GREEN}[SUCCESS]${NC} Deployed to GitHub! CI/CD pipeline will trigger automatically."
