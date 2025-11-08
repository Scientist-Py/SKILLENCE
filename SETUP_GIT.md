# Setup Git Before Pushing to GitHub

## Step 1: Configure Git (Required)

Before you can commit, Git needs to know who you are. Run these commands:

```bash
# Set your name (use your real name or GitHub username)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Tushar Chauhan"
git config --global user.email "tushar@example.com"
```

**Note**: Use the email associated with your GitHub account for better integration.

---

## Step 2: Verify Configuration

Check if it's set correctly:
```bash
git config --global user.name
git config --global user.email
```

---

## Step 3: Now Commit

After setting up your identity, you can commit:

```bash
git commit -m "Initial commit: Skillence AI coaching website with admin panel"
```

---

## Step 4: Create GitHub Repository & Push

1. **Create a new repository on GitHub** (see `GITHUB_PUSH_GUIDE.md` for details)
2. **Add remote and push:**

```bash
# Add your GitHub repository
git remote add origin https://github.com/yourusername/Skillence.git

# Push to GitHub
git push -u origin main
```

---

**Quick Setup Commands** (replace with your info):

```bash
# 1. Configure Git
git config --global user.name "Tushar Chauhan"
git config --global user.email "your-email@example.com"

# 2. Commit
git commit -m "Initial commit: Skillence AI coaching website with admin panel"

# 3. Add remote (after creating GitHub repo)
git remote add origin https://github.com/yourusername/Skillence.git

# 4. Push
git push -u origin main
```

---

**Need help?** Let me know your GitHub username/email and I can help you set it up! 🚀

