# HR Compliance Agent - Deployment Guide

## VPS Deployment Instructions

### 1. Server Setup (45.90.220.152)

```bash
# SSH into your VPS
ssh root@45.90.220.152

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx
```

### 2. Application Setup

```bash
# Navigate to the application directory
cd /opt/hr-compliance-agent/frontend

# Install dependencies
npm install

# Install additional dependency
npm install -D tailwindcss-animate

# Build the application
npm run build
```

### 3. Nginx Configuration

Create `/etc/nginx/sites-available/hr-compliance`:

```nginx
server {
    listen 80;
    server_name 45.90.220.152;
    
    root /opt/hr-compliance-agent/frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/hr-compliance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Alternative: Using PM2 + Serve

```bash
# Install serve
sudo npm install -g serve

# Start with PM2
pm2 start "serve -s dist -l 3000" --name hr-compliance

# Save PM2 config
pm2 save
pm2 startup
```

Then configure Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name 45.90.220.152;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL with Let's Encrypt (Optional)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com
```

### 6. Quick Start Commands

```bash
# Full deployment
cd /opt/hr-compliance-agent/frontend && npm install && npm run build

# Restart with PM2
pm2 restart hr-compliance || pm2 start "serve -s dist -l 3000" --name hr-compliance

# View logs
pm2 logs hr-compliance

# Monitor
pm2 monit
```

## Access the Application

Once deployed, access the application at:
- http://45.90.220.152

## Demo Login

Click "Get Started" or "View Demo" on the landing page to access the dashboard with demo data.

## Features Showcase

1. **Dashboard** - Interactive charts, stats cards, activity timeline
2. **Documents** - Drag-and-drop upload, preview modal, filtering
3. **Employees** - Grid/List toggle, bulk selection, compliance tracking
4. **E-Signature** - Step-by-step signing flow with signature pad
5. **Training** - Course catalog, progress tracking, certificates
6. **Settings** - Profile, notifications, security, appearance

## Troubleshooting

### Port already in use
```bash
# Find process using port
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm install -D tailwindcss-animate
npm run build
```

### Nginx errors
```bash
# Check configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```
