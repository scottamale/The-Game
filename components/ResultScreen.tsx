import React, { useState, useEffect } from 'react';
import { Universe, Team, HP_THEMES, HG_THEMES, MARVEL_THEMES, LOTR_THEMES, SW_THEMES, ST_THEMES, LeaderboardEntry } from '../types';
import { Trophy, RefreshCw, Flag, Scroll, Star, Activity, Feather, Sword, Medal, Crown, Save, Radio } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  maxScore: number;
  totalQuestions: number;
  universe: Universe;
  team: Team;
  onRestart: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, maxScore, totalQuestions, universe, team, onRestart, onHome }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isQualifying, setIsQualifying] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  let theme;
  if (universe === 'Harry Potter') theme = HP_THEMES[team as keyof typeof HP_THEMES];
  else if (universe === 'Hunger Games') theme = HG_THEMES[team as keyof typeof HG_THEMES];
  else if (universe === 'Marvel') theme = MARVEL_THEMES[team as keyof typeof MARVEL_THEMES];
  else if (universe === 'LotR') theme = LOTR_THEMES[team as keyof typeof LOTR_THEMES];
  else if (universe === 'Star Wars') theme = SW_THEMES[team as keyof typeof SW_THEMES];
  else theme = ST_THEMES[team as keyof typeof ST_THEMES];

  const percentage = (score / maxScore) * 100;
  const correctCount = Math.round(score / (maxScore / totalQuestions));

  // Determine Titles and Messages (Existing Logic)
  let title = "";
  let message = "";
  let fontClass = "font-cinzel";
  
  if (universe === 'Harry Potter') {
    if (percentage <= 30) {
      title = "Confused Muggle";
      message = "Are you sure you received a Hogwarts letter? You might want to check if you're actually a Muggle.";
    } else if (percentage <= 70) {
      title = "O.W.L. Student";
      message = "Not bad! You've definitely paid attention in History of Magic (mostly). Keep studying!";
    } else {
      title = "Head Boy/Girl";
      message = "Outstanding! Ten points to your House! You know the Wizarding World better than Dumbledore himself.";
    }
  } else if (universe === 'Hunger Games') {
    if (percentage <= 30) {
      title = "Tribute Fodder";
      message = "The cannon sounded before you even reached the Cornucopia. Better luck in the next life.";
    } else if (percentage <= 70) {
      title = "Career Tribute";
      message = "You survived the bloodbath and made it to the final eight. A respectable showing for the Capitol audience.";
    } else {
      title = "The Mockingjay";
      message = "Incredible. You didn't just survive the arena; you sparked a revolution. Panem is yours.";
    }
  } else if (universe === 'Marvel') {
    if (percentage <= 30) {
      title = "Civilian";
      message = "You are an innocent bystander waiting for an Avenger to save you. Stay away from falling buildings.";
    } else if (percentage <= 70) {
      title = "Avenger Recruit";
      message = "You have potential. Nick Fury might keep you on file, but you're not ready for Thanos yet.";
    } else {
      title = "Sorcerer Supreme";
      message = "You have seen 14 million outcomes and knew exactly what to do. The Multiverse is safe with you.";
    }
  } else if (universe === 'LotR') {
    if (percentage <= 30) {
      title = "Fool of a Took!";
      message = "Throw yourself in next time and rid us of your stupidity! You have alerted the Orcs.";
    } else if (percentage <= 70) {
      title = "Ranger of the North";
      message = "You know the wilds well and can track an Orc pack for days. Aragorn would be proud.";
    } else {
      title = "Ringbearer";
      message = "Even the smallest person can change the course of the future. You have saved Middle-earth.";
    }
  } else if (universe === 'Star Wars') {
    fontClass = "font-orbitron";
    if (percentage <= 30) {
      title = "Bantha Fodder";
      message = "The Force is not strong with this one. You're likely to be eaten by a Wampa.";
    } else if (percentage <= 70) {
      title = "Padawan Learner";
      message = "You have taken your first steps into a larger world, but you are not a Jedi yet.";
    } else {
      title = "Jedi Master";
      message = "Powerful you have become. The Force runs strong in your family. Pass on what you have learned.";
    }
  } else { // Stranger Things
    fontClass = "font-serif text-red-600 font-extrabold";
    if (percentage <= 30) {
      title = "Mouthbreather";
      message = "You're stuck in the Upside Down without a map. Watch out for the Demogorgon.";
    } else if (percentage <= 70) {
      title = "Hawkins Lab Tech";
      message = "You know the basics of the experiments, but the secrets of the gate elude you.";
    } else {
      title = "Dungeon Master";
      message = "You rolled a nat 20. Your knowledge of Hawkins and the Upside Down is legendary.";
    }
  }

  let FooterIcon = Star;
  let footerText = "";
  if (universe === 'Harry Potter') {
      FooterIcon = Scroll;
      footerText = "Results certified by the Ministry of Magic";
  } else if (universe === 'Hunger Games') {
      FooterIcon = Flag;
      footerText = "Sponsored by the Capitol";
  } else if (universe === 'Marvel') {
      FooterIcon = Activity;
      footerText = "S.H.I.E.L.D. Personnel File Updated";
  } else if (universe === 'LotR') {
      FooterIcon = Feather;
      footerText = "Recorded in the Red Book of Westmarch";
  } else if (universe === 'Star Wars') {
      FooterIcon = Sword;
      footerText = "Archived in the Jedi Temple";
  } else {
      FooterIcon = Radio;
      footerText = "Transmitted from Cerebro";
  }

  // Leaderboard Logic
  useEffect(() => {
    const key = `trivia_lb_${universe.replace(/\s+/g, '_').toLowerCase()}`;
    const stored = localStorage.getItem(key);
    const currentLb: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
    
    // Sort descending by score
    currentLb.sort((a, b) => b.score - a.score);
    
    setLeaderboard(currentLb);

    // Check if score qualifies for top 10
    // Qualifies if score > 0 AND (leaderboard has less than 10 entries OR score > lowest entry)
    const qualifies = score > 0 && (currentLb.length < 10 || score > currentLb[currentLb.length - 1].score);
    setIsQualifying(qualifies);
  }, [universe, score]);

  const handleSaveScore = () => {
    if (!playerName.trim()) return;

    const newEntry: LeaderboardEntry = {
      name: playerName.trim().substring(0, 12), // Limit name length
      score: score,
      date: new Date().toISOString(),
      team: team
    };

    const newLb = [...leaderboard, newEntry];
    newLb.sort((a, b) => b.score - a.score);
    const top10 = newLb.slice(0, 10);

    const key = `trivia_lb_${universe.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(top10));
    
    setLeaderboard(top10);
    setHasSubmitted(true);
    setIsQualifying(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-6 animate-scale-in relative z-10">
      
      <div className={`
        relative mt-16 p-8 md:p-12 w-full text-center rounded-lg backdrop-blur-xl
        border-2 ${theme.border}
        bg-black/60 shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)]
        grid grid-cols-1 ${leaderboard.length > 0 || isQualifying ? 'lg:grid-cols-2' : ''} gap-12 items-center
      `}>
        
        {/* Left Side: Score & Status */}
        <div className="flex flex-col items-center">
            {/* Floating Badge */}
            <div className="relative mb-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${theme.border} ${theme.primary} shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
                <Trophy className={`w-14 h-14 ${theme.text} drop-shadow-md relative z-10`} />
                <div className={`absolute inset-0 opacity-60 blur-xl animate-spin-slow bg-gradient-to-tr ${theme.gradient}`} style={{ animationDuration: '4s' }}></div>
              </div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${fontClass} uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 drop-shadow-sm`}>
                {title}
            </h2>
            
            <div className="flex justify-center items-baseline gap-2 mb-6 relative">
                <span className={`text-6xl md:text-7xl font-bold ${fontClass} drop-shadow-2xl ${theme.text} text-glow`}>
                    {score}
                </span>
                <span className="text-xl text-stone-500 font-cinzel">/ {maxScore}</span>
            </div>

            <p className={`text-lg italic mb-8 leading-relaxed font-serif max-w-xs mx-auto border-t border-b border-white/5 py-6 ${theme.accent}`}>
                "{message}"
            </p>

            <div className="flex flex-col gap-4 w-full">
                <button
                onClick={onRestart}
                className={`
                    flex items-center justify-center gap-3 px-6 py-3 rounded-sm text-base font-bold transition-all font-cinzel uppercase tracking-widest
                    border border-white/10 shadow-lg w-full
                    ${theme.button} ${theme.buttonHover} text-white
                    hover:shadow-[0_0_30px_-5px_currentColor] hover:-translate-y-1
                `}
                >
                <RefreshCw className="w-5 h-5" />
                {universe === 'Harry Potter' ? 'Re-Cast' : universe === 'Star Wars' ? 'Re-Launch' : universe === 'Stranger Things' ? 'Re-Roll' : 'Replay'}
                </button>
                <button
                onClick={onHome}
                className={`
                    flex items-center justify-center gap-3 px-6 py-3 rounded-sm text-base font-bold transition-all font-cinzel uppercase tracking-widest
                    border border-white/5 bg-black/60 hover:bg-black/80 text-stone-400 hover:text-white
                    hover:border-white/20 w-full
                `}
                >
                <Star className="w-4 h-4" />
                Universe Map
                </button>
            </div>
        </div>

        {/* Right Side: Leaderboard / Qualification Input */}
        {(isQualifying && !hasSubmitted) ? (
            <div className={`p-6 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center animate-fade-in`}>
                <Crown className={`w-12 h-12 ${theme.text} mb-4 animate-bounce`} />
                <h3 className={`text-2xl font-bold ${theme.text} mb-2 ${fontClass} uppercase tracking-widest`}>New High Score!</h3>
                <p className="text-stone-400 mb-6 text-sm italic font-serif">Enter your name to claim your glory.</p>
                
                <input 
                    type="text" 
                    maxLength={12}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Your Name"
                    className={`w-full bg-black/50 border ${theme.border} text-white p-3 rounded text-center font-bold tracking-widest outline-none focus:ring-2 focus:ring-white/20 mb-4 transition-all uppercase ${fontClass}`}
                />
                
                <button
                    onClick={handleSaveScore}
                    disabled={!playerName.trim()}
                    className={`
                        w-full flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-bold transition-all font-cinzel uppercase tracking-widest
                        ${playerName.trim() ? `${theme.button} text-white` : 'bg-stone-800 text-stone-500 cursor-not-allowed'}
                    `}
                >
                    <Save className="w-4 h-4" />
                    Save Record
                </button>
            </div>
        ) : (
            (leaderboard.length > 0 || hasSubmitted) && (
                <div className={`h-full flex flex-col rounded-lg border border-white/5 bg-black/30 overflow-hidden`}>
                    <div className={`p-4 border-b border-white/5 ${theme.secondary} bg-opacity-10`}>
                        <h3 className={`text-xl font-bold ${theme.text} text-center ${fontClass} uppercase tracking-widest flex items-center justify-center gap-2`}>
                            <Trophy className="w-4 h-4" /> Hall of Fame
                        </h3>
                    </div>
                    <div className="flex-grow overflow-y-auto max-h-[350px] p-2 custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs uppercase text-stone-500 border-b border-white/5">
                                    <th className="p-3 font-medium text-center">#</th>
                                    <th className="p-3 font-medium">Name</th>
                                    <th className="p-3 font-medium text-right">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((entry, index) => {
                                    const isCurrentPlayer = hasSubmitted && entry.score === score && entry.name === playerName && entry.team === team;
                                    return (
                                        <tr key={index} className={`
                                            border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors
                                            ${isCurrentPlayer ? 'bg-white/10' : ''}
                                        `}>
                                            <td className={`p-3 text-center font-bold ${index < 3 ? theme.text : 'text-stone-500'}`}>
                                                {index + 1}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        // Simple hash or lookup to match team colors roughly if themes weren't available here, 
                                                        // but we passed team in entry. We can't access all theme colors easily without huge map,
                                                        // so we just use the current theme text color for simplicity or white
                                                        'bg-stone-500' 
                                                    }`}></span> 
                                                    <span className={`font-medium ${isCurrentPlayer ? 'text-white' : 'text-stone-300'} uppercase text-sm tracking-wider`}>
                                                        {entry.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={`p-3 text-right font-mono font-bold ${isCurrentPlayer ? theme.text : 'text-stone-400'}`}>
                                                {entry.score}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {leaderboard.length === 0 && (
                            <div className="text-center p-8 text-stone-600 italic text-sm">
                                Be the first to claim victory!
                            </div>
                        )}
                    </div>
                </div>
            )
        )}
      </div>
      
      <div className={`mt-8 flex items-center gap-2 text-xs animate-fade-in opacity-60 uppercase tracking-widest ${theme.accent}`}>
        <FooterIcon className="w-4 h-4" />
        <span>{footerText}</span>
      </div>
    </div>
  );
};

export default ResultScreen;