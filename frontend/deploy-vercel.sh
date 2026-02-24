#!/bin/bash
# Deploy to Vercel

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
    npm install -g vercel
fi

# Deploy the dist folder
cd /opt/hr-compliance-agent/frontend
vercel --prod
