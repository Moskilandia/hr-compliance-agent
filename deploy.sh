#!/bin/bash
# One-Click Deploy Script
# Usage: ./deploy.sh

set -e

REPO_DIR="/opt/hr-compliance-agent"
cd $REPO_DIR

echo "=========================================="
echo "🚀 HR Compliance Agent - Quick Deploy"
echo "=========================================="
echo ""

# Check which platform to use
echo "Choose deployment platform:"
echo "1) Render (Recommended - Free, Easy)"
echo "2) Railway (Free, Good for fullstack)"
echo "3) Vercel (Frontend only, needs separate backend)"
echo "4) Fly.io (Docker-based, scalable)"
echo "5) Show me all options"
echo ""
read -p "Enter choice (1-5): " choice

deploy_render_quick() {
    echo ""
    echo "📦 Deploying to Render..."
    echo ""
    echo "Step 1: Go to https://dashboard.render.com"
    echo "Step 2: Sign up with GitHub/Google/Email"
    echo "Step 3: Click 'New +' → 'Blueprint'"
    echo "Step 4: Connect your GitHub repo"
    echo ""
    echo "Or use 'New +' → 'Web Service' and paste this repo URL:"
    echo "  https://github.com/YOUR_USERNAME/hr-compliance-agent"
    echo ""
    echo "Build Command:"
    echo "  cd frontend && npm install && npm run build && cd ../backend && npm install"
    echo ""
    echo "Start Command:"
    echo "  cd backend && node server.js"
    echo ""
    
    # Create a deploy-ready zip
    echo "Creating deploy package..."
    tar -czf deploy-package.tar.gz --exclude='node_modules' --exclude='.git' .
    echo "✅ Package created: deploy-package.tar.gz"
    echo ""
    echo "Download this file and upload to Render, or push to GitHub"
}

deploy_railway_quick() {
    echo ""
    echo "📦 Deploying to Railway..."
    echo ""
    echo "Step 1: Go to https://railway.app"
    echo "Step 2: Sign up with GitHub"
    echo "Step 3: Click 'New Project' → 'Deploy from GitHub repo'"
    echo "Step 4: Select your repo"
    echo ""
    echo "Railway will auto-detect the configuration!"
}

deploy_vercel_quick() {
    echo ""
    echo "📦 Deploying to Vercel..."
    echo ""
    echo "Step 1: Go to https://vercel.com/new"
    echo "Step 2: Sign up with GitHub"
    echo "Step 3: Import your GitHub repo"
    echo ""
    echo "⚠️  Note: Vercel is frontend-only."
    echo "   You'll need to deploy backend separately to Render/Railway"
    echo "   and update the API_URL in frontend/.env.production"
}

deploy_fly_quick() {
    echo ""
    echo "📦 Deploying to Fly.io..."
    echo ""
    echo "Step 1: Install Fly CLI:"
    echo "  curl -L https://fly.io/install.sh | sh"
    echo ""
    echo "Step 2: Sign up:"
    echo "  flyctl auth signup"
    echo ""
    echo "Step 3: Deploy:"
    echo "  flyctl launch"
    echo ""
}

show_all_options() {
    echo ""
    echo "=========================================="
    echo "📋 All Deployment Options"
    echo "=========================================="
    echo ""
    echo "1. RENDER (Recommended)"
    echo "   ✅ Free tier"
    echo "   ✅ Automatic HTTPS"
    echo "   ✅ Fullstack (frontend + backend)"
    echo "   ✅ Easy GitHub integration"
    echo "   🔗 https://render.com"
    echo ""
    echo "2. RAILWAY"
    echo "   ✅ Free tier ($5 credit)"
    echo "   ✅ Fullstack deployment"
    echo "   ✅ Great developer experience"
    echo "   🔗 https://railway.app"
    echo ""
    echo "3. VERCEL"
    echo "   ✅ Free tier"
    echo "   ✅ Global CDN"
    echo "   ⚠️  Frontend only (need separate backend)"
    echo "   🔗 https://vercel.com"
    echo ""
    echo "4. FLY.IO"
    echo "   ✅ Free tier (3 shared-cpu-1x VMs)"
    echo "   ✅ Docker-based"
    echo "   ✅ Edge deployment"
    echo "   🔗 https://fly.io"
    echo ""
    echo "5. NETLIFY"
    echo "   ✅ Free tier"
    echo "   ✅ Great for static sites"
    echo "   ⚠️  Frontend only"
    echo "   🔗 https://netlify.com"
    echo ""
}

case $choice in
    1)
        deploy_render_quick
        ;;
    2)
        deploy_railway_quick
        ;;
    3)
        deploy_vercel_quick
        ;;
    4)
        deploy_fly_quick
        ;;
    5)
        show_all_options
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "📁 Deploy Package Location:"
echo "  /opt/hr-compliance-agent/deploy-package.tar.gz"
echo ""
echo "Download it with:"
echo "  scp root@45.90.220.152:/opt/hr-compliance-agent/deploy-package.tar.gz ."
echo "=========================================="
