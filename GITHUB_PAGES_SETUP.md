# GitHub Pages Deployment Setup

## Quick Setup Steps

1. **Go to your repository on GitHub**: https://github.com/NOAMAN09/flapX

2. **Click on Settings** (in the repository navigation bar)

3. **Scroll down to "Pages"** (in the left sidebar under "Code and automation")

4. **Under "Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)` or `/build` 
   
   **IMPORTANT**: 
   - If you select `/ (root)`, you'll need to rebuild and move build files to root
   - **Recommended**: Use GitHub Actions to automatically deploy from `/build` folder

5. **Click Save**

6. **Wait a few minutes** for GitHub Pages to build and deploy

7. **Your game will be available at**: `https://noaman09.github.io/flapX/`

## Recommended: Automatic Deployment with GitHub Actions

Create a `.github/workflows/deploy.yml` file (already created for you) that will:
- Automatically build your React app
- Deploy to GitHub Pages whenever you push to main

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `build/` folder contains your production-ready files

3. Configure GitHub Pages to serve from `/build` directory

## Troubleshooting

- **404 Error**: Make sure GitHub Pages is configured to serve from `/build` folder
- **Blank Page**: Check browser console for errors (F12)
- **Assets Not Loading**: Ensure paths are relative (not absolute)
- **Build Errors**: Run `npm run build` locally to check for errors

