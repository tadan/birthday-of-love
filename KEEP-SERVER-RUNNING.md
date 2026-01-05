# Keep Python Server Running on NAS

## Option 1: Systemd Service (Recommended)

Create a systemd service to automatically start and manage the server.

### Step 1: Create Service File
On your NAS, create the service file:
```bash
sudo nano /etc/systemd/system/begga-wedding.service
```

### Step 2: Add This Configuration
```ini
[Unit]
Description=Wedding Website - begga.daniele.is
After=network.target

[Service]
Type=simple
User=daniele
WorkingDirectory=/volume1/docker/begga.daniele.is
ExecStart=/usr/bin/python3 -m http.server 8090
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Step 3: Enable and Start Service
```bash
# Reload systemd to recognize new service
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable begga-wedding.service

# Start the service now
sudo systemctl start begga-wedding.service

# Check status
sudo systemctl status begga-wedding.service
```

### Useful Commands
```bash
# Start service
sudo systemctl start begga-wedding

# Stop service
sudo systemctl stop begga-wedding

# Restart service
sudo systemctl restart begga-wedding

# Check status
sudo systemctl status begga-wedding

# View logs
sudo journalctl -u begga-wedding -n 50

# Follow logs in real-time
sudo journalctl -u begga-wedding -f
```

---

## Option 2: Using nohup (Simple but less robust)

```bash
cd /volume1/docker/begga.daniele.is
nohup python3 -m http.server 8090 > server.log 2>&1 &
echo $! > server.pid
```

To stop:
```bash
kill $(cat /volume1/docker/begga.daniele.is/server.pid)
```

---

## Option 3: Using screen (Manual but flexible)

```bash
# Install screen if not available
sudo apt-get install screen  # or use Synology Package Center

# Start screen session
screen -S wedding-server

# Inside screen, start server
cd /volume1/docker/begga.daniele.is
python3 -m http.server 8090

# Detach from screen: Ctrl+A then D
```

To reattach:
```bash
screen -r wedding-server
```

---

## Option 4: Docker Container (Most Robust)

### Create docker-compose.yml
```bash
nano /volume1/docker/begga.daniele.is/docker-compose.yml
```

```yaml
version: '3'
services:
  wedding-site:
    image: nginx:alpine
    container_name: begga-wedding
    ports:
      - "8090:80"
    volumes:
      - .:/usr/share/nginx/html:ro
    restart: unless-stopped
```

### Start Container
```bash
cd /volume1/docker/begga.daniele.is
docker-compose up -d

# Check status
docker ps | grep begga

# View logs
docker logs begga-wedding

# Stop
docker-compose down
```

---

## Recommended: Systemd Service

**Why?**
- Automatically starts on boot
- Restarts if it crashes
- Easy to manage with systemctl
- Logs accessible via journalctl
- Same management style as cloudflared

**Setup takes 2 minutes:**
1. Create service file
2. Run `sudo systemctl enable begga-wedding`
3. Run `sudo systemctl start begga-wedding`
4. Done! Server runs forever

---

## Verify Everything is Working

After setting up any option:

```bash
# 1. Check server is responding
curl http://localhost:8090

# 2. Check from browser
# Visit: https://begga.daniele.is

# 3. Check cloudflared tunnel
sudo systemctl status cloudflared

# 4. Check wedding server (if using systemd)
sudo systemctl status begga-wedding
```

---

## Troubleshooting

### Server not starting
```bash
# Check if port is in use
sudo lsof -i :8090

# Check file permissions
ls -la /volume1/docker/begga.daniele.is/

# Check service logs
sudo journalctl -u begga-wedding -n 50
```

### Server stops randomly
```bash
# Check system logs
sudo journalctl -xe

# Check disk space
df -h

# Ensure restart is configured
sudo systemctl status begga-wedding | grep Restart
```

---

## Auto-Update Website

To update the website in the future:

```bash
# From your Mac, upload new build
scp -r build/* daniele@NAS_Irisgatan:/volume1/docker/begga.daniele.is/

# On NAS, restart server (if using systemd)
sudo systemctl restart begga-wedding

# Changes are live immediately!
```
