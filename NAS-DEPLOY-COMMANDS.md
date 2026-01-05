# NAS Deployment Commands

## Problem: Port 8080 Already in Use

Run these commands on your NAS to fix:

### Option 1: Find and Kill Process Using Port 8080
```bash
# Find what's using port 8080
sudo lsof -i :8080

# Or use netstat
sudo netstat -tulpn | grep :8080

# Kill the process (replace PID with the actual process ID)
sudo kill -9 PID
```

### Option 2: Use a Different Port
Instead of port 8080, use port 8090:
```bash
cd /volume1/docker/begga.daniele.is
python3 -m http.server 8090
```

Then update your Cloudflare tunnel config to use port 8090:
```yaml
ingress:
  - hostname: begga.daniele.is
    service: http://localhost:8090
```

### Option 3: Use Docker (Recommended for NAS)
Create a simple Docker setup:

**Create docker-compose.yml:**
```yaml
version: '3'
services:
  wedding-site:
    image: nginx:alpine
    container_name: begga-wedding
    ports:
      - "8090:80"
    volumes:
      - ./:/usr/share/nginx/html:ro
    restart: unless-stopped
```

**Start it:**
```bash
cd /volume1/docker/begga.daniele.is
docker-compose up -d
```

**Check it's running:**
```bash
docker ps | grep begga
curl http://localhost:8090
```

### Option 4: Run in Background with nohup
```bash
cd /volume1/docker/begga.daniele.is
nohup python3 -m http.server 8090 > server.log 2>&1 &
echo $! > server.pid

# To stop later:
kill $(cat server.pid)
```

---

## Full Deployment Steps

1. **Check what's on port 8080:**
   ```bash
   sudo lsof -i :8080
   ```

2. **Choose a free port** (e.g., 8090):
   ```bash
   cd /volume1/docker/begga.daniele.is
   python3 -m http.server 8090
   ```

3. **Update Cloudflare tunnel config** (`~/.cloudflared/config.yml`):
   ```yaml
   tunnel: YOUR_TUNNEL_ID
   credentials-file: /path/to/credentials.json

   ingress:
     - hostname: begga.daniele.is
       service: http://localhost:8090  # Changed from 8080 to 8090

     - service: http_status:404
   ```

4. **Restart Cloudflare tunnel:**
   ```bash
   sudo systemctl restart cloudflared

   # Or if using Docker:
   docker restart cloudflared

   # Check status:
   sudo systemctl status cloudflared
   ```

5. **Verify it's working:**
   ```bash
   # Local test:
   curl http://localhost:8090

   # Check tunnel:
   cloudflared tunnel info

   # Test from outside:
   curl https://begga.daniele.is
   ```

---

## Troubleshooting

### Server won't start
```bash
# Check if port is free
sudo lsof -i :8090

# Check if files exist
ls -la /volume1/docker/begga.daniele.is/

# Check permissions
chmod -R 755 /volume1/docker/begga.daniele.is/
```

### Can't access from browser
```bash
# Check firewall
sudo iptables -L | grep 8090

# Check if server is running
ps aux | grep python3 | grep 8090

# Check Cloudflare tunnel
sudo journalctl -u cloudflared -n 50
```

### DNS not resolving
- Wait 5-10 minutes for DNS propagation
- Check Cloudflare DNS settings
- Try: `nslookup begga.daniele.is`
- Clear browser cache

---

## Quick Reference

**Start server:**
```bash
cd /volume1/docker/begga.daniele.is && python3 -m http.server 8090
```

**Stop server:**
```bash
# Find process: ps aux | grep "http.server 8090"
# Kill it: kill PID
```

**Restart tunnel:**
```bash
sudo systemctl restart cloudflared
```

**Check everything:**
```bash
curl http://localhost:8090  # Should show HTML
curl https://begga.daniele.is  # Should show website
```
