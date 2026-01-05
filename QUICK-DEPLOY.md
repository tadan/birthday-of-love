# Quick Deploy to begga.daniele.is

## ✅ Build is Ready
The production build is in `build/` directory (1.9MB total).

---

## 🚀 Deploy to Your NAS via Cloudflare Tunnel

### Step 1: Copy Build to NAS
```bash
# Replace with your NAS details
scp -r build/* user@your-nas:/path/to/web/begga.daniele.is/
```

### Step 2: Start Web Server on NAS
SSH into your NAS and run:
```bash
cd /path/to/web/begga.daniele.is/
python3 -m http.server 8080
```

Or use the included script:
```bash
./serve-static.sh
```

### Step 3: Update Cloudflare Tunnel Config
Edit your tunnel config on NAS (`~/.cloudflared/config.yml`):
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /path/to/credentials.json

ingress:
  - hostname: begga.daniele.is
    service: http://localhost:8080

  - service: http_status:404
```

### Step 4: Restart Tunnel
```bash
sudo systemctl restart cloudflared
```

### Step 5: Add DNS Record
In Cloudflare Dashboard → DNS:
- Type: `CNAME`
- Name: `begga`
- Target: `YOUR_TUNNEL_ID.cfargotunnel.com`
- Proxy: ✅ Proxied

---

## 🧪 Test Locally First
```bash
./serve-static.sh
# Visit http://localhost:8080
```

---

## 📁 Files to Copy
Only copy the `build/` directory:
- `build/index.html`
- `build/assets/` (fonts, images, CSS, JS)

Total size: **1.9 MB**

---

## ✨ What's Included
- ✅ Responsive wedding website
- ✅ Calendar download functionality (.ics)
- ✅ Gyst font for headlines
- ✅ Times New Roman for body text
- ✅ Optimized assets
- ✅ Mobile-friendly design

---

Need detailed instructions? See **DEPLOYMENT.md**
