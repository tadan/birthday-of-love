# Debug Checklist - Website Not Showing

Your server is running on port 8090. Let's check everything:

## Step 1: Verify Files Are There
On your NAS, run:
```bash
ls -la /volume1/docker/begga.daniele.is/
```

You should see:
- `index.html`
- `assets/` directory

**If files are missing**, you need to upload them first!

---

## Step 2: Test Local Access
On your NAS, run:
```bash
curl http://localhost:8090
```

**Should return HTML.** If you get an error or wrong content, the files aren't in the right place.

---

## Step 3: Check Cloudflare Tunnel Config
On your NAS, check the config:
```bash
cat ~/.cloudflared/config.yml
```

**Must have this:**
```yaml
ingress:
  - hostname: begga.daniele.is
    service: http://localhost:8090
```

**If port 8080 is still there**, edit it:
```bash
nano ~/.cloudflared/config.yml
# Change 8080 to 8090
# Save: Ctrl+X, then Y, then Enter
```

Then restart:
```bash
sudo systemctl restart cloudflared
```

---

## Step 4: Check Tunnel is Running
```bash
sudo systemctl status cloudflared
```

Should say "**active (running)**"

Also check:
```bash
cloudflared tunnel list
cloudflared tunnel info <your-tunnel-name>
```

---

## Step 5: Check DNS in Cloudflare Dashboard
Go to Cloudflare Dashboard → DNS

**Must have:**
- Type: `CNAME`
- Name: `begga`
- Target: `<your-tunnel-id>.cfargotunnel.com`
- Proxy status: **Proxied (orange cloud)**

**If missing**, add it and wait 5 minutes for DNS propagation.

---

## Step 6: Check Tunnel Logs
```bash
sudo journalctl -u cloudflared -n 50
```

Look for errors or connection issues.

---

## Step 7: Test from Browser
Try these URLs:
1. `http://localhost:8090` (on the NAS - should work)
2. `https://begga.daniele.is` (from your computer - this is what we want)

---

## Common Issues

### Issue: Files not uploaded yet
**Fix:** Upload the build folder:
```bash
# From your Mac:
scp -r build/* daniele@NAS_Irisgatan:/volume1/docker/begga.daniele.is/
```

### Issue: Wrong directory
**Fix:** Make sure you're serving from the correct folder with the files:
```bash
cd /volume1/docker/begga.daniele.is
ls -la  # Should show index.html and assets/
python3 -m http.server 8090
```

### Issue: Tunnel config not updated
**Fix:** Edit config and restart:
```bash
nano ~/.cloudflared/config.yml  # Change port to 8090
sudo systemctl restart cloudflared
```

### Issue: DNS not set up
**Fix:** Add CNAME record in Cloudflare Dashboard:
- Name: `begga`
- Target: `<tunnel-id>.cfargotunnel.com`
- Proxy: ON

---

## Quick Test Commands
Run all these on your NAS:

```bash
# 1. Check files exist
ls /volume1/docker/begga.daniele.is/index.html

# 2. Test local access
curl http://localhost:8090 | head -20

# 3. Check tunnel status
sudo systemctl status cloudflared

# 4. Check tunnel config
cat ~/.cloudflared/config.yml | grep -A2 begga

# 5. Check tunnel logs
sudo journalctl -u cloudflared -n 20
```

---

## What to Report Back
After running the tests, share:
1. Output of: `ls -la /volume1/docker/begga.daniele.is/`
2. Output of: `curl http://localhost:8090`
3. Output of: `cat ~/.cloudflared/config.yml`
4. Whether DNS record exists in Cloudflare Dashboard
