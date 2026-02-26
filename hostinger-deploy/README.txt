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
