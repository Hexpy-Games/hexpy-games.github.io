# NanaChan AI - Legal Documents

Automated legal document system for NanaChan AI with markdown source files and automated HTML generation via GitHub Actions.

## 🌐 Live Site

**Production URL:** https://pages.hexpy.games/

## 📄 Available Documents

### Privacy Policy
- **English:** https://pages.hexpy.games/nanachanai/terms/privacy-policy-en
- **Korean:** https://pages.hexpy.games/nanachanai/terms/privacy-policy-ko

### Terms of Use
- **English:** https://pages.hexpy.games/nanachanai/terms/terms-of-use-en
- **Korean:** https://pages.hexpy.games/nanachanai/terms/terms-of-use-ko

## 🏗️ Repository Structure

### Main Branch (Source)
```
/
├── .github/workflows/
│   └── build-and-deploy.yml    # Automated build and deploy
├── nanachanai/
│   └── terms/
│       ├── privacy-policy-en.md
│       ├── privacy-policy-ko.md
│       ├── terms-of-use-en.md
│       └── terms-of-use-ko.md
├── build/
│   ├── convert.js              # Markdown-to-HTML converter
│   └── assets/
│       └── css/
│           └── style.css       # Minimal styling
├── CNAME                       # pages.hexpy.games
├── .nojekyll                   # Disable Jekyll
└── README.md
```

### GH-Pages Branch (Published - Auto-generated)
```
/
├── nanachanai/
│   └── terms/
│       ├── privacy-policy-en.html
│       ├── privacy-policy-ko.html
│       ├── terms-of-use-en.html
│       └── terms-of-use-ko.html
├── assets/
│   └── css/
│       └── style.css
├── CNAME
└── .nojekyll
```

## 🚀 Automated Workflow

The repository uses GitHub Actions for automated builds:

1. **Edit markdown files** in `/nanachanai/terms/`
2. **Commit and push** to main branch
3. **GitHub Actions automatically:**
   - Detects changes to `.md` files
   - Runs the converter script
   - Generates HTML files
   - Deploys to `gh-pages` branch
4. **GitHub Pages publishes** the updated site

## 🔄 Updating Documents

### Method 1: Direct Edit (Recommended)

1. Edit markdown files in `/nanachanai/terms/`
2. Commit changes to main branch
3. GitHub Actions will automatically build and deploy

### Method 2: Sync from Main App

If updating from `/Users/yeonwoo/dev/NanaChanAI/docs/`:

```bash
# Copy updated markdown files
cp /Users/yeonwoo/dev/NanaChanAI/docs/PRIVACY_POLICY_EN.md nanachanai/terms/privacy-policy-en.md
cp /Users/yeonwoo/dev/NanaChanAI/docs/PRIVACY_POLICY_KO.md nanachanai/terms/privacy-policy-ko.md
cp /Users/yeonwoo/dev/NanaChanAI/docs/TERMS_OF_USE_EN.md nanachanai/terms/terms-of-use-en.md
cp /Users/yeonwoo/dev/NanaChanAI/docs/TERMS_OF_USE_KO.md nanachanai/terms/terms-of-use-ko.md

# Commit and push
git add nanachanai/terms/
git commit -m "Update legal documents"
git push origin main
```

## 🛠️ Local Development

### Build HTML Locally

```bash
# Build to default output (./dist)
cd build
node convert.js

# Build to custom output
node convert.js /path/to/output
```

### Test Locally

```bash
# Using Python
cd dist
python3 -m http.server 8000

# Using Node.js
npx http-server dist -p 8000

# Visit: http://localhost:8000/nanachanai/terms/
```

## 🎨 Design Philosophy

The site uses a minimal, "dry" design approach:
- Clean, professional legal document styling
- No fancy headers, footers, or navigation
- Focus on readability and accessibility
- Simple, semantic HTML with minimal CSS
- Mobile-responsive layout
- Print-friendly formatting

## 📝 Converter Features

The markdown-to-HTML converter (`build/convert.js`) supports:
- **Block elements:** Headers, paragraphs, lists, tables, horizontal rules
- **Inline elements:** Bold text, links
- **Tables:** Full markdown table support with proper HTML generation
- **Multiple languages:** English and Korean
- **Flexible output:** Configurable output directory

## 📜 Document Metadata

**Effective Date:** October 11, 2025
**Last Updated:** October 14, 2025
**Version:** 2.0

## 📧 Contact

- **Email:** yeonwoo.jo@hexpy.games
- **Company:** HexpyGames
- **Response Time:** Within 48 hours

## 🔒 Security

- All pages served over HTTPS
- No tracking scripts or cookies
- Content hosted securely on GitHub Pages
- Automated builds run in isolated GitHub Actions environment

## 📱 Integration with NanaChan AI App

These URLs are integrated into the NanaChan AI mobile app at:

**File:** `src/modals/AboutModal.tsx`

Update URLs to:
```typescript
const handlePrivacyPolicy = async () => {
  const url = currentLanguage === 'ko'
    ? 'https://pages.hexpy.games/nanachanai/terms/privacy-policy-ko'
    : 'https://pages.hexpy.games/nanachanai/terms/privacy-policy-en';
  await InAppBrowser.open(url, { /* config */ });
};

const handleTermsOfService = async () => {
  const url = currentLanguage === 'ko'
    ? 'https://pages.hexpy.games/nanachanai/terms/terms-of-use-ko'
    : 'https://pages.hexpy.games/nanachanai/terms/terms-of-use-en';
  await InAppBrowser.open(url, { /* config */ });
};
```

## 🔗 Related Repositories

- **Main App:** [NanaChanAI](https://github.com/Hexpy-Games/NanaChanAI) (Private)
- **Legal Docs:** [nanachan-ai-terms](https://github.com/Hexpy-Games/nanachan-ai-terms) (This repo)

## 📚 Technical Details

### GitHub Actions Workflow

The workflow (`.github/workflows/build-and-deploy.yml`) triggers on:
- Push to main branch
- Changes to files in `nanachanai/terms/**/*.md`
- Changes to `build/**` directory
- Changes to the workflow file itself

The workflow:
1. Checks out the repository
2. Sets up Node.js environment
3. Runs the converter script
4. Prepares deployment directory with HTML files and assets
5. Deploys to `gh-pages` branch using `peaceiris/actions-gh-pages@v3`

### CSS Path Handling

The converter generates HTML with CSS path: `../../../assets/css/style.css`

This works because:
- HTML files are at: `/nanachanai/terms/*.html`
- CSS file is at: `/assets/css/style.css`
- Relative path: `../../../` goes up 3 levels (terms → nanachanai → root)

---

**Maintained by:** HexpyGames Development Team
**Repository:** https://github.com/Hexpy-Games/nanachan-ai-terms

© 2025 HexpyGames. All rights reserved.
