# Git Workflow & Automated Deployment

## 🎯 Quick Deploy (Everything in One Command)

```bash
./deploy.sh
```

This single command will:
1. ✅ Build the production version
2. ✅ Commit your changes to git
3. ✅ Push to GitHub
4. ✅ Deploy to NAS
5. ✅ Restart the web server
6. ✅ Verify it's working

---

## 📝 Manual Git Workflow

### First Time Setup (Already Done!)

Your project already has git initialized with a remote. Just commit and push:

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Complete wedding website with Gyst fonts and calendar"

# Push to GitHub
git push origin main
```

### Making Updates

```bash
# 1. Make your changes in the code
# 2. Test locally
npm run dev

# 3. Build production version
npm run build

# 4. Commit changes
git add .
git commit -m "Update: description of changes"

# 5. Push to GitHub
git push origin main

# 6. Deploy to NAS (manual method)
scp -r build/* daniele@NAS_Irisgatan:/volume1/docker/begga.daniele.is/
ssh daniele@NAS_Irisgatan "sudo systemctl restart begga-wedding"
```

---

## 🚀 Deploy from NAS (Git Pull Method)

### One-Time Setup on NAS

```bash
# SSH into NAS
ssh daniele@NAS_Irisgatan

# Navigate to web directory
cd /volume1/docker/begga.daniele.is

# Initialize as git repository
git init

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/birthday-of-love.git

# Or if using SSH:
git remote add origin git@github.com:YOUR_USERNAME/birthday-of-love.git

# Pull the repo
git pull origin main

# Install dependencies (if needed)
npm install

# Build
npm run build
```

### Future Updates on NAS

```bash
cd /volume1/docker/begga.daniele.is
git pull origin main
npm install  # Only if dependencies changed
npm run build
sudo systemctl restart begga-wedding
```

Or create a simple update script on the NAS:

```bash
nano ~/update-wedding.sh
```

```bash
#!/bin/bash
cd /volume1/docker/begga.daniele.is
echo "Pulling latest changes..."
git pull origin main
echo "Building..."
npm run build
echo "Restarting service..."
sudo systemctl restart begga-wedding
echo "Done! Website updated."
```

Make it executable:
```bash
chmod +x ~/update-wedding.sh
```

Then just run:
```bash
~/update-wedding.sh
```

---

## 🔄 Recommended Workflow

### Option A: Deploy Script (Fastest)
```bash
# From your Mac
./deploy.sh
```

### Option B: Git Pull on NAS (Clean)
```bash
# From your Mac - commit and push
git add .
git commit -m "Update website"
git push origin main

# From NAS - pull and rebuild
~/update-wedding.sh
```

### Option C: Manual SCP (Simple)
```bash
# Build and copy
npm run build
scp -r build/* daniele@NAS_Irisgatan:/volume1/docker/begga.daniele.is/
ssh daniele@NAS_Irisgatan "sudo systemctl restart begga-wedding"
```

---

## 📊 Git Best Practices

### Commit Often
```bash
git add .
git commit -m "Add calendar button"
git push
```

### Use Descriptive Commit Messages
```bash
✅ Good:
- "Add calendar download functionality"
- "Update location image to venue photo"
- "Fix Times New Roman font on buttons"

❌ Bad:
- "update"
- "fix"
- "changes"
```

### Branch for Experiments
```bash
# Create feature branch
git checkout -b feature/new-rsvp-form

# Work on feature
git add .
git commit -m "Add RSVP form"

# Merge back to main
git checkout main
git merge feature/new-rsvp-form
git push
```

---

## 🔐 SSH Setup (Optional but Recommended)

To avoid entering password every time:

### On Your Mac
```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

### Add to GitHub
1. Go to GitHub Settings → SSH Keys
2. Click "New SSH Key"
3. Paste your public key

### Add to NAS
```bash
ssh-copy-id daniele@NAS_Irisgatan
```

Now you can push/deploy without passwords!

---

## 📋 Daily Workflow Example

```bash
# Morning: Make updates
npm run dev  # Test changes

# Noon: Deploy
./deploy.sh  # Commits, pushes, deploys

# Done! ✨
```

---

## 🆘 Troubleshooting

### "Repository not found"
```bash
git remote -v  # Check remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/birthday-of-love.git
```

### "Permission denied"
```bash
# Set up SSH keys (see above)
# Or use HTTPS with personal access token
```

### "Merge conflicts"
```bash
git status  # See conflicting files
# Edit files to resolve conflicts
git add .
git commit -m "Resolve merge conflicts"
```

### Deploy script fails
```bash
# Check SSH connection
ssh daniele@NAS_Irisgatan "echo 'Connection works'"

# Check if you can sudo
ssh daniele@NAS_Irisgatan "sudo systemctl status begga-wedding"
```

---

## 📚 Summary

**Fastest deployment:**
```bash
./deploy.sh
```

**Most control:**
```bash
git add . && git commit -m "Update" && git push
~/update-wedding.sh  # Run on NAS
```

**No git needed:**
```bash
npm run build && scp -r build/* daniele@NAS_Irisgatan:/volume1/docker/begga.daniele.is/
```

Choose what works best for you!
