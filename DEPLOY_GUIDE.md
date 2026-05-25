# Deploy Guide for PowerShell 🚀

This guide explains how to organize your assets (like your game logo) and deploy **Sudoku Master - Classic Puzzle** directly to **GitHub** using **PowerShell**.

---

## 1. Where to Put Your Image Logo 🖼️

Standard static assets are served through Vite using the `/public` root-level directory.

### Quick Setup Steps:
1. **Create the public folder** at the root of your project directory:
   ```powershell
   New-Item -ItemType Directory -Path "public"
   ```
2. **Move or save your logo file** (e.g., `logo.png`) inside this new `public/` directory.
   - It will now be accessible directly at the local URL path: `http://localhost:3000/logo.png`.

3. **Update the browser Favicon/Title Icon**:
   Open `index.html` and add this code inside the `<head>` tag:
   ```html
   <link rel="icon" type="image/png" href="/logo.png" />
   ```

4. **Optionally display it in your component**:
   If you ever want to replace the custom inline SVG vector logo with your static image asset:
   ```tsx
   <img src="/logo.png" alt="Sudoku Master Logo" className="w-10 h-10 object-contain" />
   ```

---

## 2. Step-by-Step GitHub Deployment Guide (PowerShell) 💻

Follow these steps directly inside your PowerShell prompt to push your code to your GitHub page:

### Step A: Initialize Git Repository
If you haven't initialized Git yet, run these commands:
```powershell
# Initialise local repository
git init

# Stages all changed files (including source files and config)
git add .

# Save snapshot locally
git commit -m "feat: complete premium Sudoku Master build with MedySoft styling"
```

### Step B: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g. `sudoku-master-classic`).
3. Keep it Public or Private (do **not** check "Initialize with README" as we already have code).
4. Click **Create repository**.

### Step C: Link & Push to GitHub
Copy the remote repository URL (looks like `https://github.com/your-username/sudoku-master-classic.git`) and run the following in PowerShell:

```powershell
# Link your local code to your GitHub repository
git remote add origin https://github.com/your-username/sudoku-master-classic.git

# Rename main branch to 'main'
git branch -M main

# Upload master files
git push -u origin main
```

---

## 3. Custom GitHub Pages Hosting 🌐

If you want to host this web application compiled version directly on GitHub Pages for free:

1. **Install GitHub Pages deployment manager**:
   ```powershell
   npm install gh-pages --save-dev
   ```

2. **Open `package.json`** and add properties:
   - Add `"homepage": "https://your-username.github.io/sudoku-master-classic",` at the top level.
   - Add two convenient deployment scripts in `"scripts"`:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
     ```

3. **Deploy with 1-click**:
   ```powershell
   npm run deploy
   ```
Your premium Sudoku web application is now live on the internet! Let us know if you have any questions!
