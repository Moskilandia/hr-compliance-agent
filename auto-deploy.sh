#!/bin/bash
# Auto-Deploy Script for HR Compliance Agent
# Usage: ./auto-deploy.sh [platform]
# Platforms: render, railway, vercel, fly

set -e

PLATFORM=${1:-render}
APP_NAME="hr-compliance-agent"
REPO_DIR="/opt/hr-compliance-agent"

echo "=========================================="
echo "🚀 Auto-Deploy to $PLATFORM"
echo "=========================================="

cd $REPO_DIR

# Function to deploy to Render
deploy_render() {
    echo "📦 Preparing for Render deployment..."
    
    # Check if render CLI is installed
    if ! command -v render &> /dev/null; then
        echo "Installing Render CLI..."
        curl -fsSL https://raw.githubusercontent.com/render-oss/render-cli/main/install.sh | bash
        export PATH="$HOME/.render/bin:$PATH"
    fi
    
    # Login to Render (requires API key)
    if [ -z "$RENDER_API_KEY" ]; then
        echo "⚠️  RENDER_API_KEY not set"
        echo "Get your API key from: https://dashboard.render.com/settings/api-keys"
        echo "Then run: export RENDER_API_KEY=your_key"
        exit 1
    fi
    
    render login --api-key "$RENDER_API_KEY"
    
    # Create blueprint deploy
    render blueprint apply --file render.yaml
    
    echo "✅ Deployed to Render!"
    echo "🌐 Check dashboard: https://dashboard.render.com"
}

# Function to deploy to Railway
deploy_railway() {
    echo "📦 Preparing for Railway deployment..."
    
    # Install Railway CLI if needed
    if ! command -v railway &> /dev/null; then
        echo "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login
    if [ -z "$RAILWAY_TOKEN" ]; then
        echo "⚠️  RAILWAY_TOKEN not set"
        echo "Get your token from: https://railway.app/account/tokens"
        exit 1
    fi
    
    railway login --token "$RAILWAY_TOKEN"
    
    # Link and deploy
    railway link || railway init
    railway up --detach
    
    echo "✅ Deployed to Railway!"
    echo "🌐 Check dashboard: https://railway.app/dashboard"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "📦 Preparing for Vercel deployment..."
    
    cd frontend
    
    # Install Vercel CLI if needed
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy
    if [ -z "$VERCEL_TOKEN" ]; then
        echo "⚠️  VERCEL_TOKEN not set"
        echo "Get your token from: https://vercel.com/account/tokens"
        exit 1
    fi
    
    vercel --token "$VERCEL_TOKEN" --prod --yes
    
    echo "✅ Deployed to Vercel!"
    echo "🌐 Check dashboard: https://vercel.com/dashboard"
}

# Function to deploy to Fly.io
deploy_fly() {
    echo "📦 Preparing for Fly.io deployment..."
    
    # Install Fly CLI if needed
    if ! command -v flyctl &> /dev/null; then
        echo "Installing Fly CLI..."
        curl -L https://fly.io/install.sh | sh
        export PATH="$HOME/.fly/bin:$PATH"
    fi
    
    # Login
    if [ -z "$FLY_API_TOKEN" ]; then
        echo "⚠️  FLY_API_TOKEN not set"
        echo "Get your token from: https://fly.io/user/personal_access_tokens"
        exit 1
    fi
    
    flyctl auth token "$FLY_API_TOKEN"
    
    # Launch or deploy
    if [ ! -f "fly.toml" ]; then
        flyctl launch --name "$APP_NAME" --region lax --dockerfile Dockerfile --now
    else
        flyctl deploy
    fi
    
    echo "✅ Deployed to Fly.io!"
    echo "🌐 Check dashboard: https://fly.io/dashboard"
}

# Main deployment logic
case $PLATFORM in
    render)
        deploy_render
        ;;
    railway)
        deploy_railway
        ;;
    vercel)
        deploy_vercel
        ;;
    fly)
        deploy_fly
        ;;
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Usage: ./auto-deploy.sh [render|railway|vercel|fly]"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
