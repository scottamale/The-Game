import React, { useEffect } from 'react';
import { Universe, Team, HP_THEMES, HG_THEMES, MARVEL_THEMES, LOTR_THEMES, SW_THEMES, ST_THEMES } from '../types';
import { Skull, RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { playGameOver } from '../utils/audio';

interface GameOverScreenProps {
  universe: Universe;
  team: Team;
  reason: 'timeout' | 'all-wrong';
  onRestart: () => void;
  onHome: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ universe, team, reason, onRestart, onHome }) => {
  let theme;
  if (universe === 'Harry Potter') theme = HP_THEMES[team as keyof typeof HP_THEMES];
  else if (universe === 'Hunger Games') theme = HG_THEMES[team as keyof typeof HG_THEMES];
  else if (universe === 'Marvel') theme = MARVEL_THEMES[team as keyof typeof MARVEL_THEMES];
  else if (universe === 'LotR') theme = LOTR_THEMES[team as keyof typeof LOTR_THEMES];
  else if (universe === 'Star Wars') theme = SW_THEMES[team as keyof typeof SW_THEMES];
  else theme = ST_THEMES[team as keyof typeof ST_THEMES];

  useEffect(() => {
    // Play specific game over sound on mount
    playGameOver();
  }, []);

  let title = "";
  let message = "";
  let subText = "";

  if (universe === 'Harry Potter') {
    if (reason === 'timeout') {
      title = "Petrified!";
      message = "You hesitated too long. In the face of dark magic, hesitation is fatal.";
      subText = "The Dementors are closing in...";
    } else {
      title = "Expelled!";
      message = "You have failed every single class. Hand in your wand immediately.";
      subText = "The Ministry has snapped your wand.";
    }
  } else if (universe === 'Hunger Games') {
    if (reason === 'timeout') {
      title = "Cannon Fire";
      message = "You failed to act. In the arena, standing still makes you a target.";
      subText = "A hovercraft is collecting your remains.";
    } else {
      title = "Eliminated";
      message = "You survived nothing. The Capitol is laughing at your performance.";
      subText = "Your District has been shamed.";
    }
  } else if (universe === 'Marvel') {
    if (reason === 'timeout') {
      title = "Snapped!";
      message = "You ran out of time. Thanos has clicked his fingers.";
      subText = "I don't feel so good...";
    } else {
      title = "Hydra Agent";
      message = "You got everything wrong. We suspect you are a double agent working for the enemy.";
      subText = "S.H.I.E.L.D. clearance revoked.";
    }
  } else if (universe === 'LotR') {
    if (reason === 'timeout') {
      title = "The Eye Sees You";
      message = "You lingered too long in the open. The Nazgûl have found the Ring.";
      subText = "Ash nazg durbatulûk...";
    } else {
      title = "You Shall Not Pass!";
      message = "You have fallen into shadow. The Balrog awaits you in the deep.";
      subText = "Fly, you fools!";
    }
  } else if (universe === 'Star Wars') {
    if (reason === 'timeout') {
      title = "Frozen in Carbonite";
      message = "You were too slow. Jabba the Hutt has added you to his wall art collection.";
      subText = "You should have paid him back.";
    } else {
      title = "Turned to the Dark Side";
      message = "Your failure has led to anger, fear, and aggression. The Emperor is pleased.";
      subText = "Order 66 executed.";
    }
  } else {
    // Stranger Things
    if (reason === 'timeout') {
      title = "The Gate Closed";
      message = "You ran out of time. You're trapped in the Upside Down forever.";
      subText = "The Mind Flayer found you.";
    } else {
      title = "Demogorgon Chow";
      message = "You failed the party. Friends don't lie, but you just died.";
      subText = "Hawkins Lab is covering it up.";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-6 animate-scale-in relative z-10">
      
      <div className={`
        relative p-10 md:p-14 w-full text-center rounded-2xl backdrop-blur-2xl
        border-2 ${universe === 'Star Wars' ? 'border-blue-900/50' : universe === 'Stranger Things' ? 'border-red-900/50' : 'border-red-900/50'}
        bg-black/80 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] overflow-hidden
      `}>
        
        {/* Background pulses */}
        <div className={`absolute inset-0 opacity-20 animate-pulse ${universe === 'Stranger Things' ? 'bg-red-950' : universe === 'Star Wars' ? 'bg-blue-950' : 'bg-red-950'}`}></div>

        {/* Icon */}
        <div className="relative z-10 mb-8">
            <div className={`
              mx-auto w-24 h-24 rounded-full flex items-center justify-center
              border-4 ${universe === 'Star Wars' ? 'border-blue-800' : universe === 'Stranger Things' ? 'border-red-800' : 'border-red-900'}
              bg-black shadow-[0_0_40px_rgba(220,38,38,0.4)]
            `}>
                {reason === 'timeout' ? (
                     <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                ) : (
                     <Skull className="w-10 h-10 text-stone-400" />
                )}
            </div>
        </div>

        <h2 className={`relative z-10 text-5xl md:text-6xl font-bold mb-6 ${universe === 'Star Wars' ? 'font-orbitron' : universe === 'Stranger Things' ? 'font-serif' : 'font-cinzel'} text-red-600 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]`}>
          {title}
        </h2>

        <p className="relative z-10 text-xl text-stone-300 font-serif mb-4 leading-relaxed">
          {message}
        </p>
        
        <p className="relative z-10 text-sm text-red-400/80 font-mono uppercase tracking-widest mb-12">
            {subText}
        </p>

        <div className="relative z-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className={`
              flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-lg font-bold transition-all font-cinzel uppercase tracking-widest
              border border-white/10 shadow-lg
              bg-red-900/80 hover:bg-red-800 text-white
              hover:shadow-[0_0_30px_-5px_rgba(220,38,38,0.6)] hover:-translate-y-1
            `}
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={onHome}
            className={`
              flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-lg font-bold transition-all font-cinzel uppercase tracking-widest
              border border-white/5 bg-black/60 hover:bg-black/80 text-stone-400 hover:text-white
              hover:border-white/20
            `}
          >
            <Home className="w-4 h-4" />
            Universe Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;