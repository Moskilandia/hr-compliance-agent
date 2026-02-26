# Deployment Guide

## Automatic Deployment Setup

### Option 1: Vercel Git Integration (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Git
4. Ensure "Auto-deploy on push" is enabled

Now every push to GitHub automatically deploys!

### Option 2: GitHub Actions (Advanced)

1. Get Vercel credentials:
   - Go to https://vercel.com/account/tokens
   - Create new token
   - Copy the token

2. Add secrets to GitHub:
   - Go to https://github.com/Moskilandia/hr-compliance-agent/settings/secrets
   - Add `VERCEL_TOKEN` with your token
   - Add `VERCEL_ORG_ID` (from Vercel project settings)
   - Add `VERCEL_PROJECT_ID` (from Vercel project settings)

3. Push to GitHub → Auto-deploys via GitHub Actions

## Manual Deployment

If automatic deployment fails:

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click "Redeploy"

## URLs

- Production: https://hr-compliance-agent.vercel.app
- API Backend: https://hr-compliance-api.onrender.com
