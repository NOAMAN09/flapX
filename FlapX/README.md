# FlapX 🐦

A modern remake of the classic Flappy Bird game, built with React and TypeScript.

**Created by [NOAMAN09](https://github.com/NOAMAN09)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Installation Guide](#-installation-guide-step-by-step)
- [Running the Game](#-running-the-game-step-by-step)
- [Testing the Game](#-testing-the-game-step-by-step)
- [How to Play](#-how-to-play)
- [Project Structure](#-project-structure)
- [Hackathon Submission](#-hackathon-submission)

---

## 🎮 Features

- 🎯 Classic Flappy Bird gameplay
- ⚛️ Built with React 18 and TypeScript
- 📱 Fully mobile-friendly and touch-enabled
- 🎨 Original game assets and smooth animations
- 🔊 Complete sound effects system
- 🏆 Score tracking with persistent high scores
- 🥇 Medal system (Bronze, Silver, Gold, Platinum)
- 🚀 Single-screen mini game - perfect for quick sessions

---

## 🚀 Installation Guide (Step by Step)

### Step 1: Check Prerequisites

Before installing, make sure you have the required software:

**Check Node.js version:**
```bash
node --version
```
**Required:** Node.js v14 or higher

**Check npm version:**
```bash
npm --version
```
**Required:** npm comes with Node.js (usually v6+)

**If Node.js is not installed:**
- Download from: https://nodejs.org/
- Install the LTS (Long Term Support) version
- Restart your terminal after installation

### Step 2: Navigate to Project Directory

Open your terminal/command prompt and navigate to the FlapX project folder:

```bash
cd /path/to/FlapX/FlapX
```

**Example on Linux/Mac:**
```bash
cd /home/noaman/FlapX/FlapX
```

**Example on Windows:**
```bash
cd C:\Users\YourName\FlapX\FlapX
```

### Step 3: Install Dependencies

Install all required packages:

```bash
npm install
```

**What this does:**
- Downloads and installs all dependencies listed in `package.json`
- Creates `node_modules/` folder with all packages
- Creates `package-lock.json` to lock dependency versions

**Expected output:**
- You'll see a progress bar
- May take 1-3 minutes depending on your internet speed
- You should see: `added 1307 packages` at the end

**If installation fails:**
```bash
# Clear cache and retry
rm -rf node_modules package-lock.json
npm install
```

---

## ▶️ Running the Game (Step by Step)

### Method 1: Development Mode (Recommended for Testing)

**Step 1: Start the Development Server**

```bash
npm start
```

**What happens:**
- React development server starts
- Webpack compiles the code
- Browser should automatically open to `http://localhost:3000`
- If browser doesn't open, manually go to: `http://localhost:3000`

**Expected output:**
```
Compiled successfully!

You can now view FlapX in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Step 2: Play the Game**

- The game will load in your browser
- Click/tap anywhere to start
- Use click/tap or spacebar to make the bird jump
- Try to pass through pipes without hitting them!

**Step 3: Stop the Server**

Press `Ctrl + C` in the terminal to stop the development server.

---

### Method 2: Production Build (For Final Testing)

**Step 1: Create Production Build**

```bash
npm run build
```

**What this does:**
- Creates optimized production files
- Minifies JavaScript and CSS
- Generates `build/` folder with production-ready files

**Expected output:**
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:
  58.61 kB  build/static/js/main.xxxxx.js
  970 B     build/static/css/main.xxxxx.css

The project was built assuming it is hosted at /.
The build folder is ready to be deployed.
```

**Step 2: Test Production Build Locally**

Install a simple HTTP server (if not already installed):

```bash
npm install -g serve
```

**Step 3: Serve the Build**

```bash
serve -s build
```

**Step 4: Open in Browser**

- Go to: `http://localhost:3000` (or the port shown in terminal)
- Test the production version of the game

---

## 🧪 Testing the Game (Step by Step)

### Test 1: Verify Installation

```bash
# Check if dependencies are installed
ls node_modules

# Should show many folders (react, react-dom, etc.)
```

### Test 2: Check for Compilation Errors

```bash
# Try to build the project
npm run build

# Should complete without errors
# If errors occur, check the error messages
```

### Test 3: Verify All Assets Exist

```bash
# Check if all image assets are present
ls src/assets/*.png | wc -l
# Should show: 30+ files

# Check if all sound assets are present
ls src/assets/sounds/*.ogg | wc -l
# Should show: 5 files
```

### Test 4: Run Development Server

```bash
npm start
```

**Checklist:**
- [ ] Server starts without errors
- [ ] Browser opens automatically (or manually go to localhost:3000)
- [ ] Game loads and shows splash screen
- [ ] No console errors in browser (press F12 to check)

### Test 5: Test Game Functionality

**In the browser, test:**

1. **Splash Screen:**
   - [ ] Splash screen appears on load
   - [ ] Click/tap starts the game

2. **Gameplay:**
   - [ ] Bird appears and falls with gravity
   - [ ] Click/tap makes bird jump
   - [ ] Spacebar makes bird jump (desktop)
   - [ ] Pipes appear and move from right to left
   - [ ] Score increases when passing pipes
   - [ ] Sound effects play (jump, score, hit, die)

3. **Collision Detection:**
   - [ ] Bird dies when hitting pipes
   - [ ] Bird dies when hitting ground
   - [ ] Bird stops at ceiling

4. **Game Over:**
   - [ ] Scoreboard appears after death
   - [ ] High score is displayed
   - [ ] Medal appears if score is high enough
   - [ ] Replay button is clickable

5. **Restart:**
   - [ ] Click replay button restarts game
   - [ ] Spacebar on score screen restarts game
   - [ ] Game resets to splash screen

6. **Mobile/Touch:**
   - [ ] Touch events work on mobile devices
   - [ ] Game is responsive to screen size
   - [ ] No horizontal scrolling

### Test 6: Production Build Test

```bash
# Build production version
npm run build

# Serve it
serve -s build

# Test in browser
# Should work exactly like development version
```

---

## 🎮 How to Play

### Controls

- **Click/Tap** - Make the bird jump (works on desktop and mobile)
- **Spacebar** - Make the bird jump (desktop only)
- **Click Replay Button** - Restart the game after game over

### Objective

Navigate the bird through pipes without hitting them or the ground/ceiling. Each pipe you pass increases your score!

### Scoring System

- **Score** - Increases by 1 for each pipe passed
- **High Score** - Automatically saved in browser localStorage
- **Medals** - Earned based on your score:
  - 🥉 **Bronze** - Score 10+
  - 🥈 **Silver** - Score 20+
  - 🥇 **Gold** - Score 30+
  - 💎 **Platinum** - Score 40+

---

## 📁 Project Structure

```
FlapX/
├── src/
│   ├── index.tsx          # Main submission file (COMPLETE GAME - 689 lines)
│   ├── styles.css         # Game styles and animations
│   ├── react-app-env.d.ts # TypeScript declarations
│   └── assets/            # Game assets (images, sounds)
│       ├── *.png          # Game sprites, fonts, medals (30+ files)
│       └── sounds/        # Sound effects (.ogg files - 5 files)
├── public/
│   └── index.html         # HTML template
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── tsconfig.json          # TypeScript configuration
├── ADDITIONAL_FILES.md     # Asset documentation
└── README.md              # This file
```

---

## 🎯 Hackathon Submission

### Main Submission File

**`src/index.tsx`** - This is the complete game file containing:
- ✅ All React imports and setup
- ✅ Complete game logic (physics, collision detection, scoring)
- ✅ All UI components (bird, pipes, scoreboard, splash screen)
- ✅ Game state management using React hooks
- ✅ Sound effects using HTML5 Audio API
- ✅ Mobile/touch support
- ✅ React DOM rendering code
- ✅ **689 lines of complete, production-ready code**

### Requirements Met

✅ **Main File (MANDATORY)**: `index.tsx` contains complete working game  
✅ **Final Logic**: No placeholders, all mechanics implemented  
✅ **Final UI**: Complete UI with animations and transitions  
✅ **Mobile-Friendly**: Touch support (`onTouchStart`) and responsive design  
✅ **Single-Screen**: All gameplay on one screen  
✅ **Additional Files Documented**: See `ADDITIONAL_FILES.md`  
✅ **Playable**: Fully functional game  
✅ **Stable**: No crashes, proper error handling  
✅ **Controls Work**: Tap/click and keyboard support  
✅ **Restart Works**: Replay functionality implemented  

---

## 🎨 Technical Details

### Technology Stack

- **Framework:** React 18.2.0
- **Language:** TypeScript 4.9.5
- **Styling:** CSS with keyframe animations
- **Build Tool:** Create React App
- **Package Manager:** npm

### Key Features Implementation

- **Physics Engine:** Custom gravity and velocity system
- **Collision Detection:** Bounding box calculations with rotation
- **State Management:** React hooks (useState, useEffect, useRef, useCallback)
- **Audio System:** HTML5 Audio API with volume control
- **Animations:** CSS keyframes for smooth gameplay
- **Local Storage:** High score persistence
- **Mobile Support:** Touch events and responsive viewport

---

## 📦 Assets

All game assets are located in `src/assets/`:

- **Images:** Bird, sky, land, pipes, fonts (big & small), medals, UI elements
- **Sounds:** Jump, score, hit, die, swoosh effects (5 sound files)
- All assets are imported as ES6 modules in `index.tsx`

**For detailed asset documentation, see `ADDITIONAL_FILES.md`**

---

## 🐛 Troubleshooting

### Game won't start

1. **Check Node.js version:**
   ```bash
   node --version
   # Should be v14 or higher
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

### Port 3000 already in use

```bash
# Find and kill the process using port 3000
# On Linux/Mac:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Assets not loading

- Verify all files exist in `src/assets/` folder
- Check browser console for import errors (Press F12)
- Ensure asset paths in `index.tsx` are correct
- Clear browser cache and reload

### Sounds not playing

- Some browsers require user interaction before playing audio
- Click/tap the screen first to enable audio
- Check browser audio permissions
- Try a different browser (Chrome, Firefox, Edge)

### Build errors

```bash
# Clear build folder
rm -rf build

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npx tsc --noEmit
```

### Module not found errors

```bash
# Ensure you're in the correct directory
pwd
# Should show: .../FlapX/FlapX

# Reinstall dependencies
npm install
```

---

## ✅ Pre-Submission Checklist

Before submitting, verify:

- [x] `src/index.tsx` opens and contains complete game
- [x] Game starts instantly when opened
- [x] Controls work (tap/click and keyboard)
- [x] Restart functionality works
- [x] No missing imports or assets
- [x] All additional files documented in `ADDITIONAL_FILES.md`
- [x] Production build works: `npm run build`
- [x] Game is playable and stable
- [x] No console errors in browser
- [x] All assets load correctly

---

## 📝 Credits

**Developer:** [NOAMAN09](https://github.com/NOAMAN09)

**Original Game Concept:** Flappy Bird by Dong Nguyen (.GEARS games)

**Note:** The visual assets (images) used in this game are from the original Flappy Bird game. This is a fan-made recreation for educational and hackathon purposes.

**Development Method:** Built using AI-assisted development tools.

---

## 📄 License

This project is open source and available for educational use.

---

## 🔗 Links

- **GitHub:** [https://github.com/NOAMAN09](https://github.com/NOAMAN09)
- **Developer:** NOAMAN 

Enjoy playing FlapX! 🎮
