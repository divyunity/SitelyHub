#!/bin/bash

# Sitely Website Deployment Script for Cloudflare Pages
echo "🚀 Deploying Sitely website to Cloudflare Pages..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin https://github.com/yourusername/sitely-website.git"
    exit 1
fi

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo "🌐 Your site will be available at: https://sitely-website.pages.dev"
echo "⏱️  Deployment usually takes 2-5 minutes"
echo ""
echo "📊 Monitor progress at: https://dash.cloudflare.com/pages"
