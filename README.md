# NanaChan AI - Legal Documents

This repository hosts the legal documents for NanaChan AI, including Privacy Policy and Terms of Use, served via GitHub Pages.

## 🌐 Live Site

**Production URL:** https://hexpy-games.github.io/nanachan-ai-terms/

## 📄 Available Documents

### Privacy Policy
- **English:** `/privacy-policy.html` → https://hexpy-games.github.io/nanachan-ai-terms/privacy-policy
- **Korean:** `/privacy-policy-ko.html` → https://hexpy-games.github.io/nanachan-ai-terms/privacy-policy-ko

### Terms of Use
- **English:** `/terms-of-use.html` → https://hexpy-games.github.io/nanachan-ai-terms/terms-of-use
- **Korean:** `/terms-of-use-ko.html` → https://hexpy-games.github.io/nanachan-ai-terms/terms-of-use-ko

## 🏗️ Repository Structure

```
nanachan-ai-terms/
├── index.html                    # Landing page
├── privacy-policy.html           # Privacy Policy (English)
├── privacy-policy-ko.html        # Privacy Policy (Korean)
├── terms-of-use.html            # Terms of Use (English)
├── terms-of-use-ko.html         # Terms of Use (Korean)
├── assets/
│   └── css/
│       └── style.css            # Responsive stylesheet
├── convert.js                    # Markdown to HTML converter
├── .nojekyll                    # Disable Jekyll processing
└── README.md                     # This file
```

## 🚀 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / (root)
   - Save

2. **Verify Deployment:**
   - Wait 1-2 minutes for GitHub Actions to complete
   - Visit: https://hexpy-games.github.io/nanachan-ai-terms/

### Custom Domain (Optional)

To use a custom domain like `legal.nanachan.ai`:

1. Add `CNAME` file with your domain
2. Configure DNS:
   ```
   CNAME legal.nanachan.ai hexpy-games.github.io
   ```
3. Update GitHub Pages settings with custom domain

## 🔄 Updating Documents

### Method 1: Automated Conversion

1. Update markdown source files in `/Users/yeonwoo/dev/NanaChanAI/docs/`
2. Run the converter:
   ```bash
   cd /path/to/nanachan-ai-terms
   node convert.js
   ```
3. Commit and push changes

### Method 2: Manual Update

Directly edit the HTML files and commit changes.

## 🎨 Styling

The site uses a mobile-first responsive design with:
- Clean, professional legal document styling
- Dark mode support (auto-detected)
- Print-friendly layout
- Accessible navigation
- Smooth scrolling and transitions

### Color Scheme
- Primary: `#FF69B4` (Hot Pink - NanaChan brand color)
- Background: `#FFFFFF` (Light) / `#1a1a1a` (Dark)
- Text: `#333333` (Light) / `#E0E0E0` (Dark)

## 📝 Document Metadata

**Effective Date:** October 11, 2025
**Last Updated:** October 11, 2025
**Version:** 1.0

## 📧 Contact

- **Email:** yeonwoo.jo@hexpy.games
- **Company:** HexpyGames
- **Response Time:** Within 48 hours

## 🔒 Security

- All pages served over HTTPS
- No tracking scripts or cookies
- Content hosted securely on GitHub Pages
- Regular security updates via GitHub

## 📜 License

© 2025 HexpyGames. All rights reserved.

Legal documents are proprietary and protected by copyright law.

## 🛠️ Development

### Local Testing

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

### File Generation

The `convert.js` script automatically converts markdown files to HTML with:
- Proper semantic HTML5 structure
- Responsive navigation
- Meta tags for SEO
- Consistent styling
- Accessibility features

## 📱 Integration with NanaChan AI App

These URLs are integrated into the NanaChan AI mobile app at:

**File:** `src/modals/AboutModal.tsx`

```typescript
const handlePrivacyPolicy = async () => {
  const url = currentLanguage === 'ko'
    ? 'https://hexpy-games.github.io/nanachan-ai-terms/privacy-policy-ko'
    : 'https://hexpy-games.github.io/nanachan-ai-terms/privacy-policy';
  await InAppBrowser.open(url, { /* config */ });
};

const handleTermsOfService = async () => {
  const url = currentLanguage === 'ko'
    ? 'https://hexpy-games.github.io/nanachan-ai-terms/terms-of-use-ko'
    : 'https://hexpy-games.github.io/nanachan-ai-terms/terms-of-use';
  await InAppBrowser.open(url, { /* config */ });
};
```

## 🔗 Related Repositories

- **Main App:** [NanaChanAI](https://github.com/Hexpy-Games/NanaChanAI) (Private)
- **Legal Docs:** [nanachan-ai-terms](https://github.com/Hexpy-Games/nanachan-ai-terms) (This repo)

---

**Maintained by:** HexpyGames Development Team
**Repository:** https://github.com/Hexpy-Games/nanachan-ai-terms
