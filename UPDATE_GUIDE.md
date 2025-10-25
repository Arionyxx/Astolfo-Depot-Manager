# How to Update Astolfo Depot Manager

## 🔄 Update Without Redownloading Everything

Instead of cloning the entire repository again, use Git to pull only the changes:

### Method 1: Simple Update (Recommended)

```bash
# Navigate to your project folder
cd Astolfo-Depot-Manager

# Pull the latest changes from main branch
git pull origin main

# Install any new dependencies
npm install

# Run the app
npm start
```

### Method 2: Update Specific Branch

```bash
# Navigate to your project folder
cd Astolfo-Depot-Manager

# Check which branch you're on
git branch

# Switch to main branch if needed
git checkout main

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run the app
npm start
```

### Method 3: Update and Merge PR Changes

```bash
# Navigate to your project folder
cd Astolfo-Depot-Manager

# Fetch all changes from remote
git fetch origin

# Merge the PR branch (fix/steamdb-403-and-ui-improvements)
git merge origin/fix/steamdb-403-and-ui-improvements

# Or pull specific branch
git pull origin fix/steamdb-403-and-ui-improvements

# Install dependencies
npm install

# Run the app
npm start
```

### Method 4: Force Update (If You Have Local Changes)

```bash
# Navigate to your project folder
cd Astolfo-Depot-Manager

# Save your local changes (optional)
git stash

# Pull latest changes
git pull origin main

# Restore your local changes (if you stashed)
git stash pop

# Install dependencies
npm install

# Run the app
npm start
```

## 🆕 What Gets Updated

When you run `git pull`:
- ✅ Only **changed files** are downloaded
- ✅ New files are added
- ✅ Deleted files are removed
- ✅ Much faster than re-cloning
- ✅ Preserves your settings and data

## 📦 When to Run `npm install`

Run this command when:
- ✅ After pulling updates
- ✅ If `package.json` changed
- ✅ If you see dependency errors
- ✅ After switching branches

## 🔍 Check What Will Be Updated

Before updating, see what changed:

```bash
# See what commits are new
git fetch origin
git log HEAD..origin/main --oneline

# See which files changed
git fetch origin
git diff HEAD..origin/main --name-only

# See detailed changes
git fetch origin
git diff HEAD..origin/main
```

## ⚠️ Common Issues & Solutions

### Issue 1: "Local changes would be overwritten"

**Solution:**
```bash
# Option A: Save your changes
git stash
git pull origin main
git stash pop

# Option B: Discard your changes (be careful!)
git reset --hard origin/main
```

### Issue 2: "Already up to date"

**Solution:**
```bash
# You're already on the latest version!
# Just run the app
npm start
```

### Issue 3: Merge conflicts

**Solution:**
```bash
# Pull changes
git pull origin main

# Git will tell you which files have conflicts
# Open those files and look for:
# <<<<<<< HEAD
# your changes
# =======
# incoming changes
# >>>>>>> origin/main

# Edit the files to resolve conflicts
# Then:
git add .
git commit -m "Resolved merge conflicts"
```

### Issue 4: "fatal: not a git repository"

**Solution:**
```bash
# You're not in the right folder
# Navigate to your project:
cd path/to/Astolfo-Depot-Manager

# Or if you don't have the repo yet:
git clone https://github.com/Arionyxx/Astolfo-Depot-Manager.git
cd Astolfo-Depot-Manager
npm install
```

## 🎯 Quick Reference

| Command | What It Does |
|---------|-------------|
| `git pull origin main` | Update from main branch |
| `git fetch origin` | Download info without merging |
| `git status` | Check current state |
| `git log` | See recent commits |
| `git branch` | See which branch you're on |
| `git checkout main` | Switch to main branch |
| `git stash` | Temporarily save changes |
| `git stash pop` | Restore saved changes |
| `npm install` | Update dependencies |
| `npm start` | Run the app |

## 📋 Step-by-Step Update Process

1. **Open Command Prompt / Terminal**
   ```bash
   # Windows: Press Win+R, type 'cmd', press Enter
   # Or use PowerShell / Git Bash
   ```

2. **Navigate to Project Folder**
   ```bash
   cd C:\path\to\Astolfo-Depot-Manager
   # or wherever you cloned it
   ```

3. **Pull Latest Changes**
   ```bash
   git pull origin main
   ```

4. **Update Dependencies**
   ```bash
   npm install
   ```

5. **Run the App**
   ```bash
   npm start
   ```

## 🔄 Automatic Update Script

Create a file `update.bat` (Windows) or `update.sh` (Mac/Linux):

**Windows (update.bat):**
```batch
@echo off
echo Updating Astolfo Depot Manager...
git pull origin main
echo Installing dependencies...
npm install
echo Update complete!
echo.
echo Press any key to start the app...
pause > nul
npm start
```

**Mac/Linux (update.sh):**
```bash
#!/bin/bash
echo "Updating Astolfo Depot Manager..."
git pull origin main
echo "Installing dependencies..."
npm install
echo "Update complete!"
echo ""
read -p "Press Enter to start the app..."
npm start
```

Then just double-click the file to update and run!

## 📊 Update Size Comparison

| Method | Download Size | Time |
|--------|--------------|------|
| **Git Pull** | ~100 KB - 5 MB | Seconds |
| **Full Clone** | ~50+ MB | Minutes |

Git pull only downloads what changed, making it **much faster**!

## 🎓 Understanding Git Pull

```
Before Pull:          After Pull:
Your Repo             Your Repo
  │                     │
  ├─ file1.js          ├─ file1.js (updated)
  ├─ file2.js          ├─ file2.js
  └─ file3.js          ├─ file3.js (updated)
                       └─ file4.js (new)

Only the changes are downloaded! ⚡
```

## 💡 Pro Tips

1. **Always pull before making changes**
   ```bash
   git pull origin main
   # Then make your changes
   ```

2. **Check what's new**
   ```bash
   git log --oneline -5
   # See the last 5 commits
   ```

3. **Keep your fork updated**
   ```bash
   git remote add upstream https://github.com/original/repo.git
   git fetch upstream
   git merge upstream/main
   ```

4. **Create a backup branch**
   ```bash
   git branch backup-$(date +%Y%m%d)
   # Now you can safely experiment
   ```

## 🚀 Next Steps After Update

1. **Check the CHANGELOG.md** to see what's new
2. **Read FIXES.md** for bug fixes
3. **Test the new features**
4. **Report any issues** on GitHub

## 📞 Need Help?

If you run into issues:
1. Check this guide first
2. Look at GitHub Issues
3. Create a new issue with:
   - Error message
   - Steps you took
   - Your OS and Node version

---

**Remember:** Git pull is like clicking "Update" in an app store - it only downloads what changed! 🎯
