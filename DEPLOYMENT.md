# Deployment Guide

## How It Works

This site deploys from your **local machine** to your **NAS** at `192.168.1.115`.

**Never** run the deploy script on the NAS. Always run it locally.

---

## Quick Deploy

```bash
./deploy.sh
```

Or with a custom commit message:
```bash
./deploy.sh "Update input padding"
```

---

## What Happens When You Deploy

1. **Commits** your local changes to git
2. **Pushes** to GitHub (`main` branch)
3. **SSH to NAS** at `192.168.1.115`
4. **Pulls** latest code on the NAS
5. **Installs** dependencies (`npm install`)
6. **Builds** the site (`npm run build`)
7. **Verifies** the site is live with a health check

---

## Development Workflow

### 1. Make Changes Locally
```bash
# Start dev server
npm run dev

# Open http://localhost:3000
# Make your changes
# Test in the browser
```

### 2. Deploy to Production
```bash
# Deploy (run this on your local machine, NOT on the NAS)
./deploy.sh "My commit message"

# Your site is now live at https://begga.daniele.is
```

---

## NAS Setup (Already Done)

The NAS has the following setup at `/volume1/docker/birthday-of-love-prod/`:
- Git repository cloned from GitHub
- Node.js and npm installed
- Build files served by nginx
- Accessible via Cloudflare tunnel at https://begga.daniele.is

You don't need to SSH to the NAS manually. The deploy script handles everything.

---

## Troubleshooting

### "Permission denied" when running deploy.sh
```bash
chmod +x deploy.sh
```

### Deploy script fails to SSH
Make sure you can SSH to the NAS:
```bash
ssh daniele@192.168.1.115
```

### Site not updating after deploy
Check NAS logs:
```bash
ssh daniele@192.168.1.115
cd /volume1/docker/birthday-of-love-prod
npm run build
```

### Need to manually rebuild on NAS
```bash
ssh daniele@192.168.1.115
cd /volume1/docker/birthday-of-love-prod
git pull
npm install
npm run build
```

---

## Files Structure

```
birthday-of-love/
├── src/                    # Source code
├── build/                  # Built files (gitignored)
├── deploy.sh              # Deployment script (run locally)
├── package.json           # Dependencies
└── DEPLOYMENT.md          # This file
```

---

## Important Reminders

- ✅ Run `./deploy.sh` **locally** on your machine
- ❌ Do NOT run the deploy script on the NAS
- ✅ Test with `npm run dev` before deploying
- ✅ The script automatically commits and pushes to GitHub
- ✅ The NAS pulls from GitHub and rebuilds automatically
