# Additional Files Documentation

This document lists all additional files (images, sounds, styles) used in the game and where they are referenced in `index.tsx`.

## Image Assets

### Game Sprites
- **bird.png** - Imported at line 6, used for the player character (line 570)
- **sky.png** - Imported at line 7, used as background (line 554)
- **land.png** - Imported at line 8, used as ground element (line 669)
- **ceiling.png** - Imported at line 9, used as ceiling element (line 560)
- **splash.png** - Imported at line 10, used for splash screen (line 580)
- **scoreboard.png** - Imported at line 11, used for score display (line 590)
- **replay.png** - Imported at line 12, used for replay button (line 614)

### Pipe Assets
- **pipe.png** - Imported at line 13, used for pipe body (lines 632, 649)
- **pipe-down.png** - Imported at line 14, used for top pipe cap (line 641)
- **pipe-up.png** - Imported at line 15, used for bottom pipe cap (line 658)

### Font Assets (Big Numbers)
- **font_big_0.png** through **font_big_9.png** - Imported at lines 17-26, used for in-game score display (line 511)

### Font Assets (Small Numbers)
- **font_small_0.png** through **font_small_9.png** - Imported at lines 28-37, used for scoreboard scores (lines 522, 533)

### Medal Assets
- **medal_bronze.png** - Imported at line 39, used for bronze medal (line 541)
- **medal_silver.png** - Imported at line 40, used for silver medal (line 542)
- **medal_gold.png** - Imported at line 41, used for gold medal (line 543)
- **medal_platinum.png** - Imported at line 42, used for platinum medal (line 544)

## Sound Assets

All sound files are located in `./assets/sounds/` directory:

- **sfx_wing.ogg** - Imported at line 45, used for jump sound effect (line 151, 264)
- **sfx_point.ogg** - Imported at line 46, used for scoring sound effect (line 152, 273)
- **sfx_hit.ogg** - Imported at line 47, used for collision sound effect (line 153, 299)
- **sfx_die.ogg** - Imported at line 48, used for death sound effect (line 154, 303)
- **sfx_swooshing.ogg** - Imported at line 49, used for UI transition sound (line 155, 200, 233, 247, 452)

## Style Assets

- **styles.css** - Imported at line 3, contains all game styling and animations

## Changes Made to index.tsx

1. **Consolidated Structure**: All game logic, imports, and rendering code are now in a single `index.tsx` file (previously split across `index.tsx`, `App.tsx`, and `FlappyBird.tsx`)

2. **Complete Game Implementation**: The file now contains:
   - All React imports (lines 1-2)
   - All asset imports (lines 5-49)
   - Complete game component with all logic (lines 51-673)
   - React DOM rendering code (lines 675-686)

3. **Dependency Fixes**: Updated callback dependencies to ensure proper functionality:
   - `gameLoop` now includes `playerDead` and `playerScore` in dependencies (line 418)
   - `startGame` now includes `gameLoop`, `updatePipes`, and `playerJump` in dependencies (line 339)

4. **Self-Contained**: The file can now run independently without requiring `App.tsx` or `FlappyBird.tsx` files

## File Locations

All assets are located in the `src/assets/` directory:
- Images: `src/assets/*.png`
- Sounds: `src/assets/sounds/*.ogg`
- Styles: `src/styles.css`

