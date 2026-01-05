# Deployment Guide - begga.daniele.is

## 🚀 Git-Based Deployment (Current Setup)

This project uses git-based deployment with separate staging and production environments.

### Quick Deploy

```bash
# Deploy to staging
./deploy.sh staging

# Deploy to production
./deploy.sh production
```

### Branches

- `main` → Production (begga.daniele.is)
- `staging` → Staging (staging.begga.daniele.is)

### Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Deploy to staging: `./deploy.sh staging`
4. Test on https://staging.begga.daniele.is
5. Deploy to production: `./deploy.sh production`

---

## 🔧 Initial NAS Setup

Run these commands on your NAS (SSH as `daniele@192.168.1.115`):

### 1. Backup Current Deployment
```bash
cd /volume1/docker
sudo mv begga.daniele.is begga.daniele.is.backup
```

### 2. Set Up Production Environment
```bash
# Clone main branch
sudo git clone -b main https://github.com/tadan/birthday-of-love.git birthday-of-love-prod

# Build production
cd birthday-of-love-prod
sudo npm install
sudo npm run build

# Create symlink for nginx
sudo ln -s /volume1/docker/birthday-of-love-prod/dist /volume1/docker/begga.daniele.is
```

### 3. Set Up Staging Environment
```bash
cd /volume1/docker

# Clone staging branch
sudo git clone -b staging https://github.com/tadan/birthday-of-love.git birthday-of-love-staging

# Build staging
cd birthday-of-love-staging
sudo npm install
sudo npm run build

# Create symlink for nginx
sudo ln -s /volume1/docker/birthday-of-love-staging/dist /volume1/docker/staging.begga.daniele.is
```

### 4. Configure Nginx for Staging

Check the existing nginx config:
```bash
cat /usr/local/etc/nginx/sites-enabled/server.webstation-vhost.conf
```

You'll need to add a staging subdomain configuration. Create or update the config to include `staging.begga.daniele.is` pointing to `/volume1/docker/staging.begga.daniele.is`.

### 5. Test the Setup
```bash
# Test production
curl http://localhost/begga.daniele.is

# Test staging
curl http://localhost/staging.begga.daniele.is
```

---

## ✅ Build Completed
The production build is ready in the `dist/` directory.

## Option 1: Deploy via Cloudflare Tunnel (Recommended)

Since you have a Cloudflare tunnel running on your NAS, follow these steps:

### Step 1: Copy Build Files to Your NAS

Copy the `build/` directory to your NAS. For example:
```bash
# Replace with your NAS path
scp -r build/* user@nas:/path/to/web/begga.daniele.is/
```

Or if you prefer rsync:
```bash
rsync -avz build/ user@nas:/path/to/web/begga.daniele.is/
```

### Step 2: Configure Cloudflare Tunnel

Update your Cloudflare tunnel config file (usually at `~/.cloudflared/config.yml` on your NAS):

```yaml
tunnel: <your-tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  # Add this new subdomain
  - hostname: begga.daniele.is
    service: http://localhost:8080

  # Your existing rules...
  - hostname: daniele.is
    service: http://localhost:3000

  # Catch-all rule (must be last)
  - service: http_status:404
```

### Step 3: Serve the Static Files

You have several options to serve the static files:

#### Option A: Using Python (Simple)
```bash
cd /path/to/web/begga.daniele.is/
python3 -m http.server 8080
```

#### Option B: Using Node.js `serve`
```bash
npm install -g serve
serve -s /path/to/web/begga.daniele.is -l 8080
```

#### Option C: Using Nginx (Production Ready)
Create nginx config at `/etc/nginx/sites-available/begga`:
```nginx
server {
    listen 8080;
    server_name localhost;

    root /path/to/web/begga.daniele.is;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/begga /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Restart Cloudflare Tunnel
```bash
sudo systemctl restart cloudflared
# or
cloudflared tunnel restart
```

### Step 5: Verify DNS
Make sure in your Cloudflare dashboard:
1. Go to DNS settings for `daniele.is`
2. Add CNAME record:
   - Name: `begga`
   - Target: `<your-tunnel-id>.cfargotunnel.com`
   - Proxy status: Proxied (orange cloud)

---

## Option 2: Deploy via Cloudflare Pages (Alternative)

If you prefer Cloudflare Pages instead:

### Step 1: Push to Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `build`
   - Root directory: `/`
5. Add custom domain: `begga.daniele.is`

---

## Quick Local Test

Before deploying, test the production build locally:
```bash
cd build
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Files Summary

- **Production build**: `build/` directory (ready to deploy)
- **Total size**: ~1.8 MB (including fonts and images)
- **Entry point**: `build/index.html`

---

## Troubleshooting

### Issue: Site not loading
- Check Cloudflare tunnel is running: `cloudflared tunnel info`
- Check service is running on port 8080: `curl http://localhost:8080`
- Check DNS propagation: `nslookup begga.daniele.is`

### Issue: Fonts not loading
- Verify CORS headers if serving from different domain
- Check browser console for 404s
- Ensure font files are in `build/assets/` directory

### Issue: Calendar download not working
- Check browser console for JavaScript errors
- Verify the calendar.ts utility is included in the build

---

## Need Help?

If you encounter issues, check:
1. Cloudflare tunnel logs: `cloudflared tunnel logs`
2. Web server logs
3. Browser console (F12)
