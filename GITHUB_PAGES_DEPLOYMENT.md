# GitHub Pages Deployment Guide

## 🚀 Your Portfolio is Ready to Deploy!

Your portfolio can be deployed to **GitHub Pages** for FREE! Here's how to set it up:

## 📋 Deployment Options

### Option 1: Automatic Deployment (GitHub Actions) ✅ RECOMMENDED
Your portfolio is configured with automatic deployment. Every time you push to `main`, it automatically builds and deploys!

**What happens:**
1. You push code to GitHub
2. GitHub Actions automatically builds your project
3. Built files deploy to GitHub Pages
4. Your site is live at: `https://ajmalshaa2002.github.io/ajmal/`

### Option 2: Manual Deployment
If you prefer to build locally and upload manually.

---

## ✅ Step-by-Step Setup

### Step 1: Enable GitHub Pages
1. Go to your GitHub repository: https://github.com/ajmalshaa2002/ajmal
2. Click **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### Step 2: Enable GitHub Actions (if not auto-enabled)
1. Go to **Settings** → **Actions** → **General**
2. Under "Actions permissions", select "Allow all actions and reusable workflows"
3. Click **Save**

### Step 3: Push to Trigger Deployment
1. Make sure all changes are committed:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   ```

2. Push to main branch:
   ```bash
   git push origin main
   ```

3. Wait 2-5 minutes for deployment to complete

### Step 4: View Your Site
Your portfolio will be live at:
```
https://ajmalshaa2002.github.io/ajmal/
```

---

## 📊 Deployment Status

### Check Deployment Progress
1. Go to your repository
2. Click **Actions** tab
3. You'll see the deployment workflow running
4. Once it's green ✅, your site is live!

### View Deployment Details
- Click on the workflow run to see build logs
- Check for any errors
- View deployment history

---

## 🔄 After Deployment

### Your Site Updates Automatically
- Make changes to code
- Commit and push to `main`
- Deployment runs automatically
- Site updates in 2-5 minutes

### No Manual Upload Needed
Once set up, everything is automatic! No FTP, no manual builds, no manual uploads.

---

## 📱 What Gets Deployed

Your GitHub Pages site will include:
- ✅ HTML, CSS, JavaScript (optimized build)
- ✅ All 3D components and animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Resume PDF download
- ✅ Project images
- ✅ All interactive features

---

## 🎯 Current Configuration

### Vite Base Path
```javascript
base: '/ajmal/'  // Already configured in vite.config.js
```

### GitHub Actions Workflow
- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Every push to `main` branch
- **Build output**: `dist/` folder
- **Deploy to**: `gh-pages` branch

---

## 🔍 Troubleshooting

### Site Not Showing?
1. Wait 5 minutes for GitHub Pages to propagate
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh page (Ctrl+Shift+R)
4. Check GitHub Actions tab for build errors

### Build Failed?
1. Check the Actions tab for error messages
2. Common issues:
   - Node modules not installed
   - Missing dependencies
   - CSS/JS syntax errors
3. Fix errors locally and push again

### Images/Assets Not Loading?
1. Ensure images are in `public/` folder
2. Check file paths use `/ajmal/` prefix
3. All relative paths already configured!

### Resume Not Downloading?
1. Verify file exists: `public/resume/AJMAL-SHA-N-S.pdf`
2. Path should work automatically with deployment
3. Test download in deployed site

---

## 💡 Advanced Options

### Use Custom Domain (Optional)
If you have your own domain (like `ajmal.dev`):
1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Follow DNS setup instructions
4. Your site will be at: `https://yourdomain.com`

### Environment Configuration
To use different configs for dev/production:
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ajmal/' : '/',
  // ... rest of config
})
```

---

## 📚 Useful Commands

### Build Locally (for testing)
```bash
npm run build
npm run preview
```

### Clean Build
```bash
rm -r dist
npm run build
```

### Check Git Status
```bash
git status
git log --oneline -5
```

---

## 🎉 You're All Set!

Your portfolio is configured for automatic GitHub Pages deployment!

### Next Steps:
1. ✅ Ensure all files are committed
2. ✅ Push to main branch: `git push origin main`
3. ✅ Wait 5 minutes for deployment
4. ✅ Visit: `https://ajmalshaa2002.github.io/ajmal/`
5. ✅ Share your portfolio with the world!

### Your Portfolio URL
```
https://ajmalshaa2002.github.io/ajmal/
```

---

## 📞 Support

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Site not live | Wait 5 minutes, clear cache, hard refresh |
| Build is failing | Check GitHub Actions tab for errors |
| Old version showing | Clear cache with Ctrl+Shift+Delete |
| Images not showing | Verify files in `public/projects/` |
| Resume not working | Check `public/resume/` folder |

---

## 🚀 Performance Tips

Your site will be:
- ✅ Fast (optimized build)
- ✅ Secure (HTTPS by default)
- ✅ CDN-backed (global distribution)
- ✅ Searchable (SEO friendly)
- ✅ Always available (99.99% uptime)

---

**Happy deploying! Your portfolio is ready for the world! 🌍**
