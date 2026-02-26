#!/bin/bash
# Hostinger Deployment Script
# Usage: ./deploy-hostinger.sh [vps|shared|hpanel]

set -e

PLATFORM=${1:-vps}
REPO_DIR="/opt/hr-compliance-agent"

echo "=========================================="
echo "🚀 Deploy to Hostinger - $PLATFORM"
echo "=========================================="

cd $REPO_DIR

deploy_vps() {
    echo ""
    echo "📦 Hostinger VPS Deployment"
    echo "=========================================="
    echo ""
    echo "Since you already have a VPS (45.90.220.152),"
    echo "we just need to open the firewall ports."
    echo ""
    echo "Steps:"
    echo ""
    echo "1. Log into Hostinger Control Panel:"
    echo "   https://hpanel.hostinger.com"
    echo ""
    echo "2. Go to VPS → Manage → Security Group"
    echo ""
    echo "3. Add these inbound rules:"
    echo "   ┌──────────────┬───────────┬─────────────┐"
    echo "   │ Type         │ Port      │ Source      │"
    echo "   ├──────────────┼───────────┼─────────────┤"
    echo "   │ HTTP         │ 80        │ 0.0.0.0/0   │"
    echo "   │ HTTPS        │ 443       │ 0.0.0.0/0   │"
    echo "   │ Custom       │ 8080      │ 0.0.0.0/0   │"
    echo "   │ Custom       │ 3002      │ 0.0.0.0/0   │"
    echo "   └──────────────┴───────────┴─────────────┘"
    echo ""
    echo "4. Once ports are open, your app will be at:"
    echo "   http://hr.moski.cloud"
    echo "   https://hr.moski.cloud (SSL auto-enabled)"
    echo ""
    echo "The app is ALREADY running on this server!"
    echo "Just need to open the firewall."
    echo ""
}

deploy_shared() {
    echo ""
    echo "📦 Hostinger Shared Hosting Deployment"
    echo "=========================================="
    echo ""
    echo "⚠️  Shared hosting has limitations:"
    echo "   - No Node.js runtime (usually PHP only)"
    echo "   - Can't run backend server"
    echo ""
    echo "For shared hosting, you need to:"
    echo ""
    echo "1. Use Hostinger's 'Website Builder' or WordPress"
    echo ""
    echo "2. OR upgrade to VPS/Business plan"
    echo ""
    echo "3. OR deploy frontend-only to Hostinger + backend elsewhere"
    echo ""
    echo "Recommended: Use Hostinger VPS instead"
    echo ""
}

deploy_hpanel() {
    echo ""
    echo "📦 Hostinger hPanel Git Deployment"
    echo "=========================================="
    echo ""
    echo "Hostinger offers Git deployment on some plans:"
    echo ""
    echo "1. Log into hPanel: https://hpanel.hostinger.com"
    echo ""
    echo "2. Go to 'Website' → 'Git'"
    echo ""
    echo "3. Connect your GitHub repository"
    echo ""
    echo "4. Set deployment settings:"
    echo "   - Repository: your-repo/hr-compliance-agent"
    echo "   - Branch: main"
    echo "   - Deploy path: public_html"
    echo ""
    echo "⚠️  Note: This only works for static frontend."
    echo "   Backend still needs separate hosting."
    echo ""
}

create_hostinger_config() {
    echo ""
    echo "📝 Creating Hostinger configuration files..."
    echo ""
    
    # Create .htaccess for Apache (Hostinger uses Apache)
    cat > .htaccess << 'EOF'
# Hostinger Apache Configuration
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Redirect HTTP to HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # SPA routing - send all requests to index.html
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^ index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOF

    # Create PHP wrapper for Node.js backend (if using shared hosting with Node support)
    cat > index.php << 'EOF'
<?php
// Hostinger PHP wrapper for Node.js backend
// This file redirects API calls to the Node backend

$request_uri = $_SERVER['REQUEST_URI'];

// API calls go to Node backend
if (strpos($request_uri, '/api/') === 0) {
    $backend_url = 'http://localhost:3002' . $request_uri;
    
    // Forward the request
    $ch = curl_init($backend_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    
    // Forward request method
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
    
    // Forward headers
    $headers = array();
    foreach (getallheaders() as $key => $value) {
        $headers[] = "$key: $value";
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    // Forward body for POST/PUT
    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents('php://input'));
    }
    
    $response = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $header_size);
    $body = substr($response, $header_size);
    
    curl_close($ch);
    
    // Forward response headers
    $header_lines = explode("\n", $headers);
    foreach ($header_lines as $header) {
        if (strpos($header, 'HTTP/') === 0) {
            header($header);
        } elseif (strpos($header, 'Content-Type:') === 0) {
            header($header);
        }
    }
    
    echo $body;
    exit;
}

// Serve the React app
include 'index.html';
EOF

    echo "✅ Created:"
    echo "   - .htaccess (Apache config)"
    echo "   - index.php (PHP wrapper for API)"
    echo ""
}

create_hostinger_package() {
    echo ""
    echo "📦 Creating Hostinger deployment package..."
    echo ""
    
    # Create a public_html folder structure
    mkdir -p hostinger-deploy/public_html
    
    # Copy frontend build
    cp -r frontend/dist/* hostinger-deploy/public_html/
    
    # Copy .htaccess and index.php
    cp .htaccess hostinger-deploy/public_html/
    cp index.php hostinger-deploy/public_html/
    
    # Create backend folder for VPS deployment
    mkdir -p hostinger-deploy/backend
    cp -r backend/* hostinger-deploy/backend/
    
    # Create deployment instructions
    cat > hostinger-deploy/README.txt << 'EOF'
HOSTINGER DEPLOYMENT INSTRUCTIONS
==================================

FOR VPS (Recommended):
----------------------
1. Upload all files to your VPS via SFTP/SSH
2. Install Node.js: sudo apt install nodejs npm
3. Run: cd backend && npm install && node server.js
4. Configure domain to point to your VPS IP
5. Open ports 80, 443 in Hostinger firewall

FOR SHARED HOSTING (Limited):
-----------------------------
1. Upload public_html contents to your Hostinger public_html
2. Backend won't work - use external backend service
3. Or upgrade to VPS plan

FOR HPANEL GIT DEPLOYMENT:
--------------------------
1. Push this repo to GitHub
2. In hPanel: Website → Git
3. Connect your GitHub repo
4. Set deploy path to public_html
EOF

    # Create zip
    cd hostinger-deploy
    zip -r ../hostinger-deploy.zip .
    cd ..
    
    echo "✅ Package created: hostinger-deploy.zip"
    echo ""
    ls -lh hostinger-deploy.zip
}

# Main
case $PLATFORM in
    vps)
        deploy_vps
        ;;
    shared)
        deploy_shared
        ;;
    hpanel)
        deploy_hpanel
        ;;
    package)
        create_hostinger_config
        create_hostinger_package
        ;;
    *)
        echo "Usage: ./deploy-hostinger.sh [vps|shared|hpanel|package]"
        echo ""
        echo "Options:"
        echo "  vps     - Deploy to Hostinger VPS (you already have one)"
        echo "  shared  - Info about shared hosting (limited)"
        echo "  hpanel  - Git deployment via hPanel"
        echo "  package - Create deployment package"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "Need help? Run: ./deploy-hostinger.sh package"
echo "=========================================="
