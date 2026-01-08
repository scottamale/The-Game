
import React, { useState, useEffect } from 'react';
import { Universe, Team, HP_THEMES, HG_THEMES, MARVEL_THEMES, LOTR_THEMES, SW_THEMES, SPORTS_THEMES, Theme, LeaderboardEntry } from '../types';
import { Target, Flame, Wand2, Shield, Sparkles, Zap, Rocket, Mountain, Sword, Trophy, Ticket, Activity, Crown, X } from 'lucide-react';

interface WelcomeScreenProps {
  universe: Universe;
  onSelectTeam: (team: Team) => void;
  onBack: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ universe, onSelectTeam, onBack }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  let themes: Record<string, Theme>;
  
  if (universe === 'Harry Potter') themes = HP_THEMES;
  else if (universe === 'Hunger Games') themes = HG_THEMES;
  else if (universe === 'Marvel') themes = MARVEL_THEMES;
  else if (universe === 'LotR') themes = LOTR_THEMES;
  else if (universe === 'Star Wars') themes = SW_THEMES;
  else themes = SPORTS_THEMES;
  
  // Dynamic Content based on Universe
  let title = "";
  let subTitle = "";
  let selectTitle = "";
  let footerText = "";
  let FooterIcon = Wand2;
  let fontClass = "font-cinzel";

  if (universe === 'Harry Potter') {
    title = "Hogwarts School";
    subTitle = "Draco Dormiens Nunquam Titillandus";
    selectTitle = "Select Your House";
    footerText = "The Sorting Hat awaits your choice";
    FooterIcon = Wand2;
  } else if (universe === 'Hunger Games') {
    title = "The Tribute Trials";
    subTitle = "May the odds be ever in your favor";
    selectTitle = "Volunteer as Tribute";
    footerText = "Panem today, Panem tomorrow, Panem forever";
    FooterIcon = Flame;
  } else if (universe === 'Marvel') {
    title = "Avengers Initiative";
    subTitle = "Earth's Mightiest Heroes";
    selectTitle = "Choose Your Allegiance";
    footerText = "Whatever it takes";
    FooterIcon = Shield;
  } else if (universe === 'LotR') {
    title = "Council of Elrond";
    subTitle = "One Ring to rule them all";
    selectTitle = "Choose Your Company";
    footerText = "Not all those who wander are lost";
    FooterIcon = Mountain;
  } else if (universe === 'Star Wars') {
    title = "Galactic Civil War";
    subTitle = "A long time ago in a galaxy far, far away...";
    selectTitle = "Choose Your Path";
    footerText = "May the Force be with you";
    FooterIcon = Sword;
    fontClass = "font-orbitron";
  } else {
    title = "The Big League";
    subTitle = "Blood, Sweat, and Glory";
    selectTitle = "Pick Your League";
    footerText = "Leave it all on the field";
    FooterIcon = Trophy;
    fontClass = "font-stencil tracking-wider";
  }

  // Thematic Classes
  let containerClass = "";
  let titleGradient = "";
  let buttonBorderClass = "";
  let themeAccentText = "";

  if (universe === 'Harry Potter') {
    containerClass = 'glass-panel-hp';
    titleGradient = 'bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600';
    buttonBorderClass = 'border-amber-500/20 hover:border-amber-400/60';
    themeAccentText = 'text-amber-400';
  } else if (universe === 'Hunger Games') {
    containerClass = 'glass-panel-hg';
    titleGradient = 'bg-gradient-to-b from-orange-400 via-red-500 to-red-800';
    buttonBorderClass = 'border-white/10 hover:border-orange-500/60';
    themeAccentText = 'text-orange-500';
  } else if (universe === 'Marvel') {
    containerClass = 'glass-panel-marvel';
    titleGradient = 'bg-gradient-to-b from-sky-300 via-blue-500 to-indigo-600';
    buttonBorderClass = 'border-sky-500/20 hover:border-sky-400/60';
    themeAccentText = 'text-sky-400';
  } else if (universe === 'LotR') {
    containerClass = 'glass-panel-lotr';
    titleGradient = 'bg-gradient-to-b from-yellow-100 via-yellow-500 to-amber-700';
    buttonBorderClass = 'border-yellow-500/20 hover:border-yellow-400/60';
    themeAccentText = 'text-yellow-500';
  } else if (universe === 'Star Wars') {
    containerClass = 'glass-panel-sw';
    titleGradient = 'bg-gradient-to-b from-blue-100 via-blue-400 to-violet-600';
    buttonBorderClass = 'border-blue-500/30 hover:border-blue-300/80';
    themeAccentText = 'text-blue-400';
  } else {
    containerClass = 'glass-panel-sports';
    titleGradient = 'bg-gradient-to-b from-white via-stone-200 to-stone-400';
    buttonBorderClass = 'border-white/30 hover:border-white/80';
    themeAccentText = 'text-white';
  }

  const getBackText = () => {
    if (universe === 'Harry Potter') return 'Apparate Back';
    if (universe === 'Hunger Games') return 'Return to Map';
    if (universe === 'Marvel') return 'Abort Mission';
    if (universe === 'LotR') return 'Return to Shire';
    if (universe === 'Star Wars') return 'Jump to Hyperspace';
    return 'Back to Locker Room';
  };

  useEffect(() => {
    if (showLeaderboard) {
      const key = `trivia_lb_${universe.replace(/\s+/g, '_').toLowerCase()}`;
      const stored = localStorage.getItem(key);
      const currentLb: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
      currentLb.sort((a, b) => b.score - a.score);
      setLeaderboard(currentLb);
    }
  }, [showLeaderboard, universe]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-6 animate-fade-in relative z-10">
      
      {/* Top Controls */}
      <div className="absolute top-0 w-full flex justify-between px-6 z-20">
        <button 
          onClick={onBack}
          className={`uppercase text-xs tracking-[0.2em] font-cinzel transition-all duration-300 flex items-center gap-2
            ${universe === 'Harry Potter' ? 'text-amber-200/60 hover:text-amber-100 hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : 
              universe === 'Hunger Games' ? 'text-stone-500 hover:text-orange-500 hover:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]' :
              universe === 'Marvel' ? 'text-sky-500/60 hover:text-sky-300 hover:drop-shadow-[0_0_5px_rgba(14,165,233,0.8)]' :
              universe === 'LotR' ? 'text-yellow-600/60 hover:text-yellow-400 hover:drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]' :
              universe === 'Star Wars' ? 'text-blue-400/60 hover:text-blue-200 hover:drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]' :
              'text-white/60 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]'
            }
          `}
        >
          <span>←</span> {getBackText()}
        </button>

        <button 
          onClick={() => setShowLeaderboard(true)}
          className={`uppercase text-xs tracking-[0.2em] font-cinzel transition-all duration-300 flex items-center gap-2
             ${themeAccentText} opacity-70 hover:opacity-100 hover:scale-105
          `}
        >
          <span>Hall of Fame</span> <Trophy className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-16 relative">
        {/* Decorative elements behind title */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 blur-3xl opacity-20 -z-10
          ${universe === 'Harry Potter' ? 'bg-blue-600' : 
            universe === 'Hunger Games' ? 'bg-red-900' : 
            universe === 'Marvel' ? 'bg-sky-600' : 
            universe === 'LotR' ? 'bg-yellow-700' :
            universe === 'Star Wars' ? 'bg-blue-800' :
            'bg-green-700'
          }
        `}></div>

        <h1 className={`text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text drop-shadow-lg ${fontClass} tracking-widest uppercase
          ${titleGradient}
        `}>
          {title}
        </h1>
        <p className={`text-xl md:text-2xl italic font-serif flex items-center justify-center gap-3
          ${universe === 'Harry Potter' ? 'text-blue-200/80' : 
            universe === 'Hunger Games' ? 'text-stone-400' : 
            universe === 'Marvel' ? 'text-sky-200/80' : 
            universe === 'LotR' ? 'text-amber-100/80' :
            universe === 'Star Wars' ? 'text-blue-100/80' :
            'text-stone-300'
          }
        `}>
          {universe === 'Harry Potter' && <Sparkles className="w-5 h-5 text-amber-400" />}
          "{subTitle}"
          {universe === 'Harry Potter' && <Sparkles className="w-5 h-5 text-amber-400" />}
        </p>
      </div>

      <div className={`p-8 md:p-12 rounded-xl w-full relative overflow-hidden backdrop-blur-xl transition-all duration-500 ${containerClass}`}>
        
        <h2 className={`text-2xl text-center mb-12 ${fontClass} tracking-[0.2em] uppercase relative inline-block left-1/2 -translate-x-1/2
           ${universe === 'Harry Potter' ? 'text-amber-100 border-b border-amber-500/30 pb-4' : 
             universe === 'Hunger Games' ? 'text-stone-200 border-b border-orange-500/30 pb-4' :
             universe === 'Marvel' ? 'text-sky-100 border-b border-sky-500/30 pb-4' :
             universe === 'LotR' ? 'text-yellow-100 border-b border-yellow-600/30 pb-4' :
             universe === 'Star Wars' ? 'text-blue-100 border-b border-blue-500/30 pb-4' :
             'text-white border-b border-white/30 pb-4'
           }
        `}>
          {selectTitle}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(themes).map(([team, theme]) => {
            // Dynamic Icons based on Universe
            let TeamIcon = Target;
            if (universe === 'Harry Potter') TeamIcon = Shield;
            else if (universe === 'Hunger Games') TeamIcon = Target;
            else if (universe === 'Marvel') TeamIcon = Rocket;
            else if (universe === 'LotR') TeamIcon = Mountain;
            else if (universe === 'Star Wars') TeamIcon = Sword;
            else TeamIcon = Activity;

            return (
              <button
                key={team}
                onClick={() => onSelectTeam(team as Team)}
                className={`
                  group relative p-8 rounded-lg border transition-all duration-500
                  flex items-center justify-between overflow-hidden
                  bg-gradient-to-br ${theme.gradient}
                  ${buttonBorderClass}
                  hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]
                `}
              >
                <div className="flex items-center space-x-6 z-10 relative">
                  <div className={`p-3 rounded-full border border-white/10 ${universe === 'Harry Potter' ? 'bg-black/30' : 'bg-black/50'}`}>
                    <TeamIcon className={`w-8 h-8 ${theme.iconColor} group-hover:scale-110 transition-transform duration-700 drop-shadow-md`} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-2xl font-bold ${fontClass} ${theme.text} ${
                        universe === 'Harry Potter' ? 'text-glow-gold' : 
                        universe === 'Hunger Games' ? 'text-glow-fire' : 
                        universe === 'Marvel' ? 'text-glow-tech' : 
                        universe === 'LotR' ? 'text-glow-ring' :
                        universe === 'Star Wars' ? 'text-glow-neon' :
                        'text-glow-stadium'
                    } uppercase tracking-wider`}>
                      {team}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1 group-hover:text-white/70 transition-colors">
                      {universe === 'Harry Potter' ? 'Select House' : universe === 'Hunger Games' ? 'Join District' : universe === 'Star Wars' ? 'Choose Side' : 'Select Team'}
                    </span>
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                {/* Background Pattern/Texture opacity on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
              </button>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <p className={`text-sm flex items-center justify-center gap-3 uppercase tracking-[0.2em] font-cinzel opacity-70
            ${universe === 'Harry Potter' ? 'text-amber-200' : 
              universe === 'Hunger Games' ? 'text-stone-500' : 
              universe === 'Marvel' ? 'text-sky-300' : 
              universe === 'LotR' ? 'text-yellow-400' :
              universe === 'Star Wars' ? 'text-blue-300' :
              'text-emerald-200'
            }
          `}>
            <FooterIcon className={`w-4 h-4 ${
                universe === 'Harry Potter' ? 'text-amber-400' : 
                universe === 'Hunger Games' ? 'text-orange-600' : 
                universe === 'Marvel' ? 'text-sky-500' : 
                universe === 'LotR' ? 'text-yellow-600' :
                universe === 'Star Wars' ? 'text-blue-500' :
                'text-white'
            }`} />
            {footerText}
            <FooterIcon className={`w-4 h-4 ${
                universe === 'Harry Potter' ? 'text-amber-400' : 
                universe === 'Hunger Games' ? 'text-orange-600' : 
                universe === 'Marvel' ? 'text-sky-500' : 
                universe === 'LotR' ? 'text-yellow-600' :
                universe === 'Star Wars' ? 'text-blue-500' :
                'text-white'
            }`} />
          </p>
        </div>
      </div>

      {/* Leaderboard Overlay */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className={`relative w-full max-w-lg rounded-xl overflow-hidden border ${buttonBorderClass} ${containerClass}`}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className={`text-2xl font-bold ${fontClass} uppercase tracking-widest flex items-center gap-2 ${themeAccentText}`}>
                <Crown className="w-6 h-6" /> Hall of Fame
              </h3>
              <button onClick={() => setShowLeaderboard(false)} className="text-stone-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-0 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {leaderboard.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-black/30 sticky top-0 backdrop-blur-md">
                    <tr className="text-xs uppercase text-stone-500 border-b border-white/5">
                      <th className="p-4 font-medium text-center">#</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.slice(0, 10).map((entry, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className={`p-4 text-center font-bold ${index < 3 ? themeAccentText : 'text-stone-500'}`}>
                          {index + 1}
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-stone-300 uppercase text-sm tracking-wider">
                            {entry.name}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-stone-400">
                          {entry.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-stone-500 italic font-serif">
                  No heroes have claimed victory yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreen;
