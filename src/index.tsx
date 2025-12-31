import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Import assets
import birdImg from './assets/bird.png';
import skyImg from './assets/sky.png';
import landImg from './assets/land.png';
import ceilingImg from './assets/ceiling.png';
import splashImg from './assets/splash.png';
import scoreboardImg from './assets/scoreboard.png';
import replayImg from './assets/replay.png';
import pipeImg from './assets/pipe.png';
import pipeDownImg from './assets/pipe-down.png';
import pipeUpImg from './assets/pipe-up.png';

// Import font images
import fontBig0 from './assets/font_big_0.png';
import fontBig1 from './assets/font_big_1.png';
import fontBig2 from './assets/font_big_2.png';
import fontBig3 from './assets/font_big_3.png';
import fontBig4 from './assets/font_big_4.png';
import fontBig5 from './assets/font_big_5.png';
import fontBig6 from './assets/font_big_6.png';
import fontBig7 from './assets/font_big_7.png';
import fontBig8 from './assets/font_big_8.png';
import fontBig9 from './assets/font_big_9.png';

import fontSmall0 from './assets/font_small_0.png';
import fontSmall1 from './assets/font_small_1.png';
import fontSmall2 from './assets/font_small_2.png';
import fontSmall3 from './assets/font_small_3.png';
import fontSmall4 from './assets/font_small_4.png';
import fontSmall5 from './assets/font_small_5.png';
import fontSmall6 from './assets/font_small_6.png';
import fontSmall7 from './assets/font_small_7.png';
import fontSmall8 from './assets/font_small_8.png';
import fontSmall9 from './assets/font_small_9.png';

import medalBronzeImg from './assets/medal_bronze.png';
import medalSilverImg from './assets/medal_silver.png';
import medalGoldImg from './assets/medal_gold.png';
import medalPlatinumImg from './assets/medal_platinum.png';

// Import sounds
import soundWing from './assets/sounds/sfx_wing.ogg';
import soundPoint from './assets/sounds/sfx_point.ogg';
import soundHit from './assets/sounds/sfx_hit.ogg';
import soundDie from './assets/sounds/sfx_die.ogg';
import soundSwoosh from './assets/sounds/sfx_swooshing.ogg';

// Game states
enum GameState {
  SplashScreen = 0,
  GameScreen = 1,
  ScoreScreen = 2
}

// Font mapping
const fontBigMap: { [key: string]: string } = {
  '0': fontBig0, '1': fontBig1, '2': fontBig2, '3': fontBig3, '4': fontBig4,
  '5': fontBig5, '6': fontBig6, '7': fontBig7, '8': fontBig8, '9': fontBig9
};

const fontSmallMap: { [key: string]: string } = {
  '0': fontSmall0, '1': fontSmall1, '2': fontSmall2, '3': fontSmall3, '4': fontSmall4,
  '5': fontSmall5, '6': fontSmall6, '7': fontSmall7, '8': fontSmall8, '9': fontSmall9
};

interface Pipe {
  id: number;
  topHeight: number;
  bottomHeight: number;
  left: number;
}

const FlappyBird: React.FC = () => {
  // Game constants
  const GRAVITY = 0.25;
  const JUMP = -4.6;
  const PIPE_HEIGHT = 90;
  const PIPE_WIDTH = 52;
  const FLY_AREA = 420;
  const VOLUME = 0.3;

  // Game state
  const [gameState, setGameState] = useState<GameState>(GameState.SplashScreen);
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(180);
  const [rotation, setRotation] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [splashOpacity, setSplashOpacity] = useState(0);
  const [scoreboardVisible, setScoreboardVisible] = useState(false);
  const [scoreboardOpacity, setScoreboardOpacity] = useState(0);
  const [scoreboardY, setScoreboardY] = useState(40);
  const [replayOpacity, setReplayOpacity] = useState(0);
  const [replayY, setReplayY] = useState(40);
  const [medal, setMedal] = useState<string | null>(null);
  const [medalOpacity, setMedalOpacity] = useState(0);
  const [medalScale, setMedalScale] = useState(2);
  const [replayClickable, setReplayClickable] = useState(false);
  const [animationPlaying, setAnimationPlaying] = useState(true);

  // Refs
  const gameLoopRef = useRef<number | null>(null);
  const pipeLoopRef = useRef<number | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const flyAreaRef = useRef<HTMLDivElement>(null);
  const landRef = useRef<HTMLDivElement>(null);
  const ceilingRef = useRef<HTMLDivElement>(null);
  const pipeIdCounter = useRef(0);
  
  // Refs for current state values (to avoid stale closures)
  const velocityRef = useRef(velocity);
  const positionRef = useRef(position);
  const gameStateRef = useRef(gameState);
  const pipesRef = useRef(pipes);
  const scoreRef = useRef(score);
  
  // Update refs when state changes
  useEffect(() => {
    velocityRef.current = velocity;
  }, [velocity]);
  
  useEffect(() => {
    positionRef.current = position;
  }, [position]);
  
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);
  
  useEffect(() => {
    pipesRef.current = pipes;
  }, [pipes]);
  
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Audio refs
  const soundJumpRef = useRef<HTMLAudioElement | null>(null);
  const soundScoreRef = useRef<HTMLAudioElement | null>(null);
  const soundHitRef = useRef<HTMLAudioElement | null>(null);
  const soundDieRef = useRef<HTMLAudioElement | null>(null);
  const soundSwooshRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  // Initialize audio
  useEffect(() => {
    soundJumpRef.current = new Audio(soundWing);
    soundScoreRef.current = new Audio(soundPoint);
    soundHitRef.current = new Audio(soundHit);
    soundDieRef.current = new Audio(soundDie);
    soundSwooshRef.current = new Audio(soundSwoosh);

    [soundJumpRef.current, soundScoreRef.current, soundHitRef.current, 
     soundDieRef.current, soundSwooshRef.current].forEach(audio => {
      if (audio) {
        audio.volume = VOLUME;
      }
    });

    return () => {
      [soundJumpRef.current, soundScoreRef.current, soundHitRef.current,
       soundDieRef.current, soundSwooshRef.current].forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  // Helper function to safely play audio (only after user interaction)
  const playAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (!audio) return;
    
    // If audio is not unlocked, try to unlock it
    if (!audioUnlockedRef.current) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioUnlockedRef.current = true;
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => {
            // Audio not unlocked yet, ignore
          });
      }
      return;
    }

    // Audio is unlocked, play normally
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore playback errors
    });
  }, []);

  // Load high score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('highscore');
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
  }, []);

  // Show splash screen
  const showSplash = useCallback(() => {
    setGameState(GameState.SplashScreen);
    setVelocity(0);
    setPosition(180);
    setRotation(0);
    setScore(0);
    setPipes([]);
    setAnimationPlaying(true);
    setSplashOpacity(0);
    setScoreboardVisible(false);
    setMedal(null);
    setReplayClickable(false);

    // Fade in splash
    setTimeout(() => setSplashOpacity(1), 100);
    
    // Don't play audio on initial splash - wait for user interaction
  }, []);

  // Show score (defined early so playerDead can use it)
  const showScore = useCallback(() => {
    // Update high score
    const currentScore = scoreRef.current;
    if (currentScore > highScore) {
      const newHighScore = currentScore;
      setHighScore(newHighScore);
      localStorage.setItem('highscore', newHighScore.toString());
    }

    // Determine medal
    let medalType: string | null = null;
    if (currentScore >= 40) medalType = 'platinum';
    else if (currentScore >= 30) medalType = 'gold';
    else if (currentScore >= 20) medalType = 'silver';
    else if (currentScore >= 10) medalType = 'bronze';
    setMedal(medalType);

    setScoreboardVisible(true);
    setScoreboardY(40);
    setScoreboardOpacity(0);
    setReplayY(40);
    setReplayOpacity(0);
    setMedalOpacity(0);
    setMedalScale(2);

    // Play swoosh
    playAudio(soundSwooshRef.current);

    // Animate scoreboard in
    setTimeout(() => {
      setScoreboardY(0);
      setScoreboardOpacity(1);
    }, 100);

    // Animate replay button in
    setTimeout(() => {
      playAudio(soundSwooshRef.current);
      setReplayY(0);
      setReplayOpacity(1);
      if (medalType) {
        setMedalOpacity(1);
        setMedalScale(1);
      }
      setReplayClickable(true);
    }, 700);
  }, [highScore]);

  // Player jump
  const playerJump = useCallback(() => {
    setVelocity(JUMP);
    playAudio(soundJumpRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playAudio]);

  // Player score
  const playerScore = useCallback(() => {
    setScore(prev => prev + 1);
    playAudio(soundScoreRef.current);
  }, [playAudio]);

  // Player dead
  const playerDead = useCallback(() => {
    setAnimationPlaying(false);
    setGameState(GameState.ScoreScreen);

    // Stop game loops
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    if (pipeLoopRef.current) {
      clearInterval(pipeLoopRef.current);
      pipeLoopRef.current = null;
    }

    // Drop bird to floor
    setRotation(90);

    // Play sounds and show score
    const playSounds = async () => {
      if (soundHitRef.current && audioUnlockedRef.current) {
        soundHitRef.current.currentTime = 0;
        try {
          await soundHitRef.current.play();
          soundHitRef.current.onended = () => {
            if (soundDieRef.current) {
              soundDieRef.current.currentTime = 0;
              soundDieRef.current.play().catch(() => {});
              soundDieRef.current.onended = () => {
                showScore();
              };
            } else {
              showScore();
            }
          };
        } catch {
          // If play fails, continue anyway
          if (soundDieRef.current && audioUnlockedRef.current) {
            soundDieRef.current.currentTime = 0;
            soundDieRef.current.play().catch(() => {});
            soundDieRef.current.onended = () => {
              showScore();
            };
          } else {
            showScore();
          }
        }
      } else {
        showScore();
      }
    };
    playSounds();
  }, [showScore]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== GameState.GameScreen || !playerRef.current) return;

    // Update physics using refs for current values
    const currentVelocity = velocityRef.current;
    const currentPosition = positionRef.current;
    const newVelocity = currentVelocity + GRAVITY;
    const newPosition = currentPosition + newVelocity;
    const newRotation = Math.min((newVelocity / 10) * 90, 90);

    setVelocity(newVelocity);
    setPosition(newPosition);
    setRotation(newRotation);

    // Get player bounding box
    const playerRect = playerRef.current.getBoundingClientRect();
    const origWidth = 34.0;
    const origHeight = 24.0;
    const boxWidth = origWidth - (Math.sin(Math.abs(newRotation) / 90) * 8);
    const boxHeight = (origHeight + playerRect.height) / 2;
    const boxLeft = ((playerRect.width - boxWidth) / 2) + playerRect.left;
    const boxTop = ((playerRect.height - boxHeight) / 2) + playerRect.top;
    const boxRight = boxLeft + boxWidth;
    const boxBottom = boxTop + boxHeight;

    // Check ground collision
    if (landRef.current) {
      const landRect = landRef.current.getBoundingClientRect();
      if (playerRect.bottom >= landRect.top) {
        playerDead();
        return;
      }
    }

    // Check ceiling collision
    if (ceilingRef.current) {
      const ceilingRect = ceilingRef.current.getBoundingClientRect();
      if (boxTop <= (ceilingRect.top + ceilingRect.height)) {
        setPosition(0);
      }
    }

    // Check pipe collisions
    const currentPipes = pipesRef.current;
    if (currentPipes.length > 0 && flyAreaRef.current) {
      // Find the first pipe element in DOM
      const pipeElements = flyAreaRef.current.querySelectorAll('.pipe');
      if (pipeElements.length > 0) {
        const firstPipeElement = pipeElements[0] as HTMLElement;
        const pipeRect = firstPipeElement.getBoundingClientRect();
        const pipeLeft = pipeRect.left;
        const pipeRight = pipeLeft + PIPE_WIDTH;
        
        // Get pipe heights from state
        const nextPipe = currentPipes[0];
        const pipeTop = nextPipe.topHeight;
        
        // Convert pipe top/bottom to screen coordinates
        const flyAreaRect = flyAreaRef.current.getBoundingClientRect();
        const pipeTopScreen = flyAreaRect.top + pipeTop;
        const pipeBottomScreen = pipeTopScreen + PIPE_HEIGHT;

        // Check if player is inside pipe
        if (boxRight > pipeLeft && boxLeft < pipeRight) {
          if (!(boxTop > pipeTopScreen && boxBottom < pipeBottomScreen)) {
            playerDead();
            return;
          }
        }

        // Check if passed pipe
        if (boxLeft > pipeRight) {
          setPipes(prev => prev.slice(1));
          playerScore();
        }
      }
    }
  }, [playerDead, playerScore]);

  // Update pipes
  const updatePipes = useCallback(() => {
    if (gameStateRef.current !== GameState.GameScreen) return;

    const padding = 80;
    const constraint = FLY_AREA - PIPE_HEIGHT - (padding * 2);
    const topHeight = Math.floor((Math.random() * constraint) + padding);
    const bottomHeight = (FLY_AREA - PIPE_HEIGHT) - topHeight;

    setPipes(prev => {
      // Keep only recent pipes (CSS animation handles visual removal)
      // Limit to 6 pipes max (pipes take ~7.5s to cross, new one every 1.4s)
      const maxPipes = 6;
      const recentPipes = prev.slice(-maxPipes);
      
      return [
        ...recentPipes,
        {
          id: pipeIdCounter.current++,
          topHeight,
          bottomHeight,
          left: 900
        }
      ];
    });
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setGameState(GameState.GameScreen);
    setSplashOpacity(0);
    setScoreboardVisible(false);

    // Start game loop
    const updaterate = 1000.0 / 60.0;
    gameLoopRef.current = window.setInterval(() => {
      gameLoop();
    }, updaterate);

    // Start pipe loop
    pipeLoopRef.current = window.setInterval(() => {
      updatePipes();
    }, 1400);

    // Initial jump
    playerJump();
  }, [gameLoop, updatePipes, playerJump]);

  // Handle replay
  const handleReplay = useCallback(() => {
    if (!replayClickable) return;
    setReplayClickable(false);

    if (soundSwooshRef.current) {
      soundSwooshRef.current.currentTime = 0;
      soundSwooshRef.current.play().catch(() => {});
    }

    setScoreboardY(-40);
    setScoreboardOpacity(0);

    setTimeout(() => {
      setScoreboardVisible(false);
      showSplash();
    }, 1000);
  }, [replayClickable, showSplash]);

  // Handle screen click/touch
  const handleScreenClick = useCallback(() => {
    // Unlock audio on first user interaction
    if (!audioUnlockedRef.current) {
      audioUnlockedRef.current = true;
      // Try to play a silent sound to unlock audio
      if (soundJumpRef.current) {
        soundJumpRef.current.play().then(() => {
          soundJumpRef.current?.pause();
          soundJumpRef.current!.currentTime = 0;
        }).catch(() => {});
      }
    }

    if (gameState === GameState.GameScreen) {
      playerJump();
    } else if (gameState === GameState.SplashScreen) {
      startGame();
    }
  }, [gameState, playerJump, startGame]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 32) { // Spacebar
        e.preventDefault();
        if (gameState === GameState.ScoreScreen) {
          handleReplay();
        } else {
          handleScreenClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleScreenClick, handleReplay]);

  // Initialize splash screen
  useEffect(() => {
    showSplash();
  }, [showSplash]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (pipeLoopRef.current) clearInterval(pipeLoopRef.current);
    };
  }, []);

  // Render score digits
  const renderBigScore = () => {
    const digits = score.toString().split('');
    return (
      <div className="bigscore">
        {digits.map((digit, i) => (
          <img key={i} src={fontBigMap[digit]} alt={digit} />
        ))}
      </div>
    );
  };

  const renderSmallScore = () => {
    const digits = score.toString().split('');
    return (
      <div className="currentscore">
        {digits.map((digit, i) => (
          <img key={i} src={fontSmallMap[digit]} alt={digit} />
        ))}
      </div>
    );
  };

  const renderHighScore = () => {
    const digits = highScore.toString().split('');
    return (
      <div className="highscore">
        {digits.map((digit, i) => (
          <img key={i} src={fontSmallMap[digit]} alt={digit} />
        ))}
      </div>
    );
  };

  const getMedalImage = () => {
    switch (medal) {
      case 'bronze': return medalBronzeImg;
      case 'silver': return medalSilverImg;
      case 'gold': return medalGoldImg;
      case 'platinum': return medalPlatinumImg;
      default: return null;
    }
  };

  return (
    <div className="gamecontainer" onClick={handleScreenClick} onTouchStart={handleScreenClick}>
      <div className="gamescreen">
        <div 
          className={`sky animated ${animationPlaying ? '' : 'paused'}`}
          style={{ backgroundImage: `url(${skyImg})` }}
        >
          <div className="flyarea" ref={flyAreaRef}>
            <div 
              className={`ceiling animated ${animationPlaying ? '' : 'paused'}`}
              ref={ceilingRef}
              style={{ backgroundImage: `url(${ceilingImg})` }}
            />
            
            <div
              ref={playerRef}
              className={`bird animated ${animationPlaying ? '' : 'paused'}`}
              style={{
                left: '60px',
                top: `${position}px`,
                transform: `rotate(${rotation}deg)`,
                backgroundImage: `url(${birdImg})`
              }}
            />

            {gameState === GameState.GameScreen && renderBigScore()}

            <div
              className="splash"
              style={{
                opacity: splashOpacity,
                backgroundImage: `url(${splashImg})`
              }}
            />

            {scoreboardVisible && (
              <div
                className="scoreboard"
                style={{
                  opacity: scoreboardOpacity,
                  transform: `translateY(${scoreboardY}px)`,
                  backgroundImage: `url(${scoreboardImg})`
                }}
              >
                {medal && (
                  <div
                    className="medal"
                    style={{
                      opacity: medalOpacity,
                      transform: `scale(${medalScale})`,
                      backgroundImage: `url(${getMedalImage()})`
                    }}
                  />
                )}
                {renderSmallScore()}
                {renderHighScore()}
                <div
                  className="replay"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReplay();
                  }}
                  style={{
                    opacity: replayOpacity,
                    transform: `translateY(${replayY}px)`,
                    backgroundImage: `url(${replayImg})`
                  }}
                />
              </div>
            )}

            {pipes.map(pipe => (
              <div
                key={pipe.id}
                className={`pipe animated ${animationPlaying ? '' : 'paused'}`}
                style={{
                  left: `${pipe.left}px`
                }}
              >
                <div
                  className="pipe_upper"
                  style={{
                    height: `${pipe.topHeight}px`,
                    backgroundImage: `url(${pipeImg})`
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: PIPE_WIDTH,
                      height: 26,
                      backgroundImage: `url(${pipeDownImg})`
                    }}
                  />
                </div>
                <div
                  className="pipe_lower"
                  style={{
                    height: `${pipe.bottomHeight}px`,
                    backgroundImage: `url(${pipeImg})`
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: PIPE_WIDTH,
                      height: 26,
                      backgroundImage: `url(${pipeUpImg})`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={landRef}
          className={`land animated ${animationPlaying ? '' : 'paused'}`}
          style={{ backgroundImage: `url(${landImg})` }}
        />
      </div>
    </div>
  );
};

// Render the game
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <FlappyBird />
    </div>
  </React.StrictMode>
);
