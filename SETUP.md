# Portfolio Site Setup Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Make it **Public** (required for GitHub Pages with free accounts)
4. **Do NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/elyaresmailzadeh/Downloads/CS-588-main-2/GITHUB/portfolio-site"
git remote add origin https://github.com/Elyar-es/portfolio.git
git push -u origin main
```

Or if you named it differently, replace `portfolio` with your repository name.

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

Your site will be available at:
- `https://elyar-es.github.io/portfolio/` (if repo is named `portfolio`)
- Or `https://elyar-es.github.io/YOUR_REPO_NAME/`

## Step 4: Customize (Optional)

- Edit `script.js` and change `GITHUB_USERNAME` if needed
- Customize colors in `styles.css`
- Update header text in `index.html`

## Alternative: Use username.github.io

If you want your portfolio at `https://elyar-es.github.io/` (without `/portfolio`):

1. Create a repository named exactly: `Elyar-es.github.io`
2. Follow the same push and Pages setup steps
3. Your site will be live at the root URL!

