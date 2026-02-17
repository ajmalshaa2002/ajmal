# Portfolio Setup Guide - Images & Resume

## 📁 Folder Structure

Your portfolio now has the following structure for images and documents:

```
public/
├── projects/          👈 Add project images here
│   ├── mpact.png
│   ├── restaurant-billing.png
│   ├── hospital-management.png
│   └── parallax-website.png
│
└── resume/            👈 Resume is here
    └── AJMAL-SHA-N-S.pdf
```

## 🖼️ Adding Project Images

### Where to Add Images
Place project images in: `public/projects/`

### File Naming Convention
- `mpact.png` or `mpact.jpg` → MPact E-Commerce project
- `restaurant-billing.png` or `restaurant-billing.jpg` → Restaurant Billing System
- `hospital-management.png` or `hospital-management.jpg` → Hospital Management System
- `parallax-website.png` or `parallax-website.jpg` → Static Parallax Website

### Image Specifications
- **Dimensions**: 800x600px or any 16:9 aspect ratio
- **File Size**: 100-300KB (optimized for web)
- **Format**: 
  - JPG for photographs/screenshots
  - PNG for graphics with transparency
  - WebP for modern browsers (best compression)

### How Images Display
1. The portfolio automatically loads images from the `public/projects/` folder
2. If an image is found, it displays at the top of the project card
3. If no image is found, a placeholder appears with the project title
4. Images have a hover effect that scales slightly and brightens on interaction

## 📥 Resume Download

### Resume Location
Your resume is located at: `public/resume/AJMAL-SHA-N-S.pdf`

### Download Options
1. **Hero Section**: "Download CV" button (top of page)
2. **Contact Section**: "Download CV" link (bottom of page)

### Resume Features
- ✅ Opens in new tab when clicked
- ✅ Can be downloaded directly from browser
- ✅ Accessible from multiple locations on the portfolio

## 🎯 Step-by-Step Setup

### Step 1: Add Project Images
1. Take screenshots or find images for each project
2. Edit them to 800x600px (recommended)
3. Optimize file size (200KB max)
4. Save with the correct names in `public/projects/`:
   - `mpact.png`
   - `restaurant-billing.png`
   - `hospital-management.png`
   - `parallax-website.png`

### Step 2: Test in Browser
1. Run `npm run dev`
2. Navigate to Projects section
3. You should see:
   - Images displayed in project cards (if files exist)
   - Placeholder text if image file is missing
   - Hover effects on images

### Step 3: Update Resume
1. If you need to update the resume:
   - Replace `public/resume/AJMAL-SHA-N-S.pdf` with new version
   - Keep the same filename
   - No code changes needed, it will auto-update

## 📸 Image Creation Tips

### For E-Commerce Project (MPact)
- Show product listing page
- Display shopping cart feature
- Show checkout process
- Include responsive design view

### For Billing System
- Show main dashboard
- Display invoice generation
- Show order management interface
- Include sales analytics view

### For Hospital Management
- Show patient records interface
- Display appointment scheduling
- Show dashboard/admin panel
- Include reporting features

### For Parallax Website
- Show full-page scrolling effect
- Capture parallax animation moment
- Show responsive layout
- Include interactive elements

## 🎨 Image Styling in Portfolio

### Image Properties
- **Display**: Shows in project card (before title)
- **Size**: Full width, 200px height
- **Style**: Border with subtle opacity
- **Hover Effect**: 
  - Opacity increases to 100%
  - Border becomes brighter
  - Image scales up slightly (1.02x)

### CSS Classes Used
- `.project-image` - Main image styling
- `.project-image-placeholder` - Fallback when image missing
- `.project-card:hover .project-image` - Hover effects

## 🔄 Responsive Behavior

### Desktop (768px+)
- Images display at full resolution
- 200px height with object-fit: cover
- Smooth hover animations

### Tablet (640px - 768px)
- Images scale appropriately
- Same height (200px)
- Touch-friendly interactions

### Mobile (<640px)
- Images respond to screen size
- Maintains 200px height
- Optimized for touch

## 🐛 Troubleshooting

### Image Not Showing?
1. Check file location: `public/projects/mpact.png`
2. Verify spelling matches exactly
3. Check file extension (.png or .jpg)
4. Ensure file size is reasonable
5. Try hard-refresh browser (Ctrl+Shift+R)

### Resume Won't Download?
1. Verify file exists: `public/resume/AJMAL-SHA-N-S.pdf`
2. Check if PDF is corrupted
3. Try right-click → Save as
4. Use different browser
5. Check browser download settings

### Image Quality Issues?
1. Original image too small (resize to 800x600)
2. File compression too high (reduce optimization)
3. Blurry screenshot (take higher quality screenshot)
4. Format issue (convert to PNG or JPG)

## ✨ Advanced Features

### Add Project Links
Update the project button to link to live projects:
```jsx
<a href="https://your-project-url.com" className="project-link interactive">
  View Project <span>→</span>
</a>
```

### Add YouTube Demo Links
Link to project demo videos:
```jsx
<a href="https://youtube.com/your-video" className="project-link interactive">
  Watch Demo <span>→</span>
</a>
```

### Add GitHub Repository Links
Link to project source code:
```jsx
<a href="https://github.com/your-repo" className="project-link interactive">
  Source Code <span>→</span>
</a>
```

## 📋 Checklist

- [ ] Create project images (800x600px)
- [ ] Save images in `public/projects/` folder
- [ ] Name files correctly (mpact.png, etc.)
- [ ] Optimize file sizes (<300KB each)
- [ ] Test portfolio in browser
- [ ] Verify images display correctly
- [ ] Check resume download works
- [ ] Test on mobile/tablet
- [ ] Test hover effects
- [ ] Deploy to production

## 🚀 Deployment

Before deploying ensure:
1. All images are in `public/projects/` folder
2. Resume PDF is in `public/resume/` folder
3. Files are committed to git
4. Build runs without errors: `npm run build`
5. Preview build: `npm run preview`

## 📞 Support

If images or resume don't display:
1. Check browser console for errors (F12)
2. Verify file paths are correct
3. Check file permissions
4. Ensure Vite dev server is running
5. Try clearing browser cache

---

Happy showcasing! Your portfolio is ready for your projects and experience! 🎉
