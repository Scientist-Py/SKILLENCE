# How to Push to GitHub

## ✅ Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `Skillence` (or any name you like)
   - **Description**: "AI Coaching Website with Admin Panel"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

## ✅ Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a URL like:
- `https://github.com/yourusername/Skillence.git` (HTTPS)
- `git@github.com:yourusername/Skillence.git` (SSH)

**Copy the HTTPS URL** (easier for first-time setup)

## ✅ Step 3: Add Remote and Push

Run these commands in your terminal (in the project directory):

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/Skillence.git

# Push to GitHub
git push -u origin main
```

**Replace `yourusername/Skillence` with your actual GitHub username and repository name!**

## ✅ Step 4: Verify

1. Go to your GitHub repository page
2. You should see all your files there
3. ✅ Done!

---

## 🔒 Important Security Notes

✅ **Good**: Your `.env` file is **NOT** in the repository (it's in `.gitignore`)
✅ **Good**: Your `google-apps-script.js` is **NOT** in the repository (it's in `.gitignore`)

⚠️ **Remember**: 
- Never commit `.env` file (contains passwords and API keys)
- Never commit `google-apps-script.js` (contains your Google Apps Script URL)

---

## 🚀 Future Updates

After making changes, use these commands:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## ❓ Troubleshooting

### If you get "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/Skillence.git
```

### If you get authentication errors:
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys

### If you need to change the remote URL:
```bash
git remote set-url origin https://github.com/yourusername/Skillence.git
```

---

**Need help?** Let me know and I can guide you through any step! 🎯

