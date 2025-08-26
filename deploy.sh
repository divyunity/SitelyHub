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

# Check for image files and ensure they exist
echo "🔍 Checking image files..."
required_images=("image.png" "image copy.png" "portfolio1.jpg" "portfolio2.jpg" "testimonial1.jpg" "testimonial2.jpg" "testimonial3.jpg")
for img in "${required_images[@]}"; do
    if [ ! -f "$img" ]; then
        echo "⚠️  Warning: $img not found"
    else
        echo "✅ $img found"
    fi
done

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S') - Fixed image paths and updated Cloudflare config"
else
    echo "📝 No changes to commit"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Push successful!"
else
    echo "❌ Push failed. Please check your git configuration."
    exit 1
fi

echo "✅ Deployment initiated!"
echo "🌐 Your site will be available at: https://sitely-website.pages.dev"
echo "⏱️  Deployment usually takes 2-5 minutes"
echo ""
echo "📊 Monitor progress at: https://dash.cloudflare.com/pages"
echo ""
echo "🔧 Recent updates:"
echo "   - Fixed NarayanaAstra image path"
echo "   - Updated Cloudflare headers for better caching"
echo "   - Added security headers"
echo "   - Improved performance configuration"
