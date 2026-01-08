import React, { useState, useEffect, useCallback } from 'react';
import { Universe, Team, GameState, HP_THEMES, HG_THEMES, MARVEL_THEMES, LOTR_THEMES, SW_THEMES, SPORTS_THEMES } from '../types';
import { TIMER_SECONDS } from '../constants';
import { Flame, Clock, CheckCircle, XCircle, Wand2, Star, Hexagon, Volume2, VolumeX, Shield, Zap, Circle, Sword, Globe, Trophy, Flag, Activity } from 'lucide-react';
import { playClick, playCorrect, playWrong, playTimeout, startAmbient, stopAmbient } from '../utils/audio';

interface QuizScreenProps {
  universe: Universe;
  team: Team;
  gameState: GameState;
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onGameEnd: () => void;
  onGameOver: (reason: 'timeout') => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ 
  universe,
  team, 
  gameState, 
  onAnswer, 
  onNextQuestion,
  onGameEnd,
  onGameOver
}) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Dynamic Theme
  let theme;
  if (universe === 'Harry Potter') theme = HP_THEMES[team as keyof typeof HP_THEMES];
  else if (universe === 'Hunger Games') theme = HG_THEMES[team as keyof typeof HG_THEMES];
  else if (universe === 'Marvel') theme = MARVEL_THEMES[team as keyof typeof MARVEL_THEMES];
  else if (universe === 'LotR') theme = LOTR_THEMES[team as keyof typeof LOTR_THEMES];
  else if (universe === 'Star Wars') theme = SW_THEMES[team as keyof typeof SW_THEMES];
  else theme = SPORTS_THEMES[team as keyof typeof SPORTS_THEMES];

  // Dynamic Icons and Text
  let MainIcon = Wand2;
  let ActionIcon = Star;
  let nextButtonText = "Next";
  let fontClass = "font-cinzel";

  if (universe === 'Harry Potter') {
    MainIcon = Wand2;
    ActionIcon = Star;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Reveal Destiny" : "Next Spell";
  } else if (universe === 'Hunger Games') {
    MainIcon = Flame;
    ActionIcon = Hexagon;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Finish" : "Next Challenge";
  } else if (universe === 'Marvel') {
    MainIcon = Shield;
    ActionIcon = Zap;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Endgame" : "Next Mission";
  } else if (universe === 'LotR') {
    MainIcon = Circle; // Represents the Ring
    ActionIcon = Star;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Destroy Ring" : "Journey On";
  } else if (universe === 'Star Wars') {
    MainIcon = Sword; // Lightsaber
    ActionIcon = Globe;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Rule Galaxy" : "Next Sector";
    fontClass = "font-orbitron";
  } else {
    MainIcon = Trophy;
    ActionIcon = Flag;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Championship" : "Next Quarter";
    fontClass = "font-stencil tracking-wide";
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  // Ambient Sound Effect Lifecycle
  useEffect(() => {
    if (!isMuted) {
      startAmbient(universe);
    } else {
      stopAmbient();
    }
    return () => {
      stopAmbient();
    };
  }, [universe, isMuted]);
  
  // Timer logic
  useEffect(() => {
    if (isAnswerRevealed) return;

    if (timeLeft === 0) {
      if (!isMuted) playTimeout();
      onGameOver('timeout');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswerRevealed, isMuted, onGameOver]);

  // Reset state on new question
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
  }, [gameState.currentQuestionIndex]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleOptionClick = useCallback((index: number) => {
    if (isAnswerRevealed) return;
    
    setSelectedOption(index);
    setIsAnswerRevealed(true);
    
    const correct = index === currentQuestion.correctAnswer;
    
    if (!isMuted) {
        if (correct) {
            playCorrect();
        } else {
            playWrong();
        }
    }

    onAnswer(correct);
  }, [isAnswerRevealed, currentQuestion, onAnswer, isMuted]);

  const handleNext = () => {
    if (!isMuted) playClick();
    if (gameState.currentQuestionIndex === gameState.questions.length - 1) {
      onGameEnd();
    } else {
      onNextQuestion();
    }
  };

  const progressPercentage = ((gameState.currentQuestionIndex) / gameState.questions.length) * 100;

  // Render Classes
  const timerClass = timeLeft <= 5 ? 'text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-stone-300';
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-scale-in relative z-10">
      
      {/* Header Info */}
      <div className={`flex justify-between items-center mb-8 px-6 py-4 rounded-full border backdrop-blur-md transition-all duration-500
        ${theme.primary}/20 ${theme.border}/40 shadow-lg
      `}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${theme.primary} border ${theme.border} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
            <MainIcon className={`${theme.iconColor} w-4 h-4`} />
          </div>
          <span className="text-lg text-stone-200 font-cinzel tracking-widest">
            {universe === 'Sports' ? 'QUARTER' : universe === 'Star Wars' ? 'SYSTEM' : 'ROUND'} <span className={`${theme.text} font-bold text-xl`}>{gameState.currentQuestionIndex + 1}</span>
            <span className="text-sm text-stone-500 mx-2">/</span>
            <span className="text-sm text-stone-500">{gameState.questions.length}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
             {/* Timer */}
            <div className={`flex items-center gap-2 font-mono text-2xl font-bold ${timerClass}`}>
            <Clock className="w-5 h-5" />
            {timeLeft}
            </div>

            {/* Mute Toggle */}
            <button 
                onClick={toggleMute}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${isMuted ? 'text-red-400' : 'text-stone-400'}`}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-1.5 rounded-full mb-8 overflow-hidden relative bg-black/40 border border-white/5`}>
        <div 
          className={`h-full transition-all duration-700 ease-out relative ${theme.secondary} shadow-[0_0_10px_currentColor]`} 
          style={{ width: `${progressPercentage}%` }}
        >
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[2px] bg-white/80`}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className={`rounded-2xl p-6 md:p-12 relative overflow-hidden transition-all duration-300 backdrop-blur-xl border
        ${theme.border}/30 bg-black/40
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
      `}>
        
        {/* Decorative corner accents based on theme */}
        <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${theme.gradient} opacity-10 blur-xl`}></div>
        <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${theme.gradient} opacity-10 blur-xl`}></div>

        <div className="absolute top-0 right-0 p-6">
             <span className={`text-[10px] px-3 py-1 rounded-full border tracking-[0.2em] uppercase font-bold backdrop-blur-sm
            ${currentQuestion.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30' :
            currentQuestion.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-950/30' :
            'text-red-500 border-red-500/30 bg-red-950/30 animate-pulse'}
          `}>
            {currentQuestion.difficulty}
          </span>
        </div>

        <h2 className={`text-2xl md:text-3xl text-center mb-12 leading-relaxed text-stone-100 mt-6 drop-shadow-md
           ${fontClass === 'font-cinzel' ? 'font-serif' : fontClass}
        `}>
          {currentQuestion.text}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            // Dynamic Button Styles
            let buttonStyle = `
               border transition-all duration-300 relative flex items-center justify-between group
               ${theme.border} border-opacity-20 bg-black/20
               hover:border-opacity-80 hover:bg-black/40 hover:pl-6 hover:shadow-[0_0_15px_-5px_currentColor]
            `;
            
            let textColor = "text-stone-300 group-hover:text-stone-100";
            let icon = <div className={`w-3 h-3 rounded-full border ${theme.border} opacity-50`} />;
            
            // Revealed Styles
            if (isAnswerRevealed) {
              if (idx === currentQuestion.correctAnswer) {
                buttonStyle = "bg-emerald-950/60 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] pl-6";
                textColor = "text-emerald-100 font-bold";
                icon = <CheckCircle className="w-5 h-5 text-emerald-400" />;
              } else if (idx === selectedOption) {
                buttonStyle = "bg-red-950/60 border-red-500 opacity-80 pl-6";
                textColor = "text-red-100";
                icon = <XCircle className="w-5 h-5 text-red-400" />;
              } else {
                buttonStyle = "bg-transparent border-transparent opacity-20 scale-95";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerRevealed}
                onClick={() => {
                   if (!isMuted) playClick();
                   handleOptionClick(idx);
                }}
                className={`w-full p-5 rounded-lg text-left ${buttonStyle} ${textColor}`}
              >
                <span className={`text-lg tracking-wide ${fontClass === 'font-cinzel' ? 'font-serif' : fontClass}`}>
                    {option}
                </span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <div className="h-28 flex justify-center items-center">
        {isAnswerRevealed && (
          <button
            onClick={handleNext}
            className={`
              px-12 py-4 rounded-sm text-xl font-bold tracking-[0.2em] shadow-2xl transform transition-all font-cinzel uppercase
              border border-white/10
              ${theme.button} ${theme.buttonHover} text-white
              hover:-translate-y-1 active:translate-y-0
              animate-fade-in flex items-center gap-3
              hover:shadow-[0_0_30px_-5px_currentColor]
            `}
          >
            {nextButtonText} <ActionIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;