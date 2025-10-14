#!/bin/bash

# 🚀 GitHub Setup Script
echo "🚀 Setting up GitHub repository for CI/CD deployment..."

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "❌ Not in a Git repository. Please run 'git init' first."
    exit 1
fi

# Get repository URL from user
echo ""
echo "📝 Please provide your GitHub repository URL:"
echo "   Example: https://github.com/yourusername/ecommerce-app.git"
echo ""
read -p "GitHub URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ No repository URL provided. Exiting."
    exit 1
fi

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin "$REPO_URL"

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ GitHub repository setup complete!"
echo "🎉 Your CI/CD pipeline is now ready!"
echo ""
echo "Next time you want to deploy, just run:"
echo "  ./scripts/deploy.sh 'Your commit message'"
