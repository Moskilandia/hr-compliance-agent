#!/bin/bash
# Render Build Script

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Copying frontend build to backend directory..."
mkdir -p backend/public
cp -r frontend/dist/* backend/public/

echo "Build complete!"
echo "Frontend files copied to: backend/public/"
ls -la backend/public/
