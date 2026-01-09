import React from 'react';
import { Universe } from '../types';
import { Wand2, Flame, Zap, Mountain, Sword, Radio } from 'lucide-react';

interface UniverseSelectionProps {
  onSelectUniverse: (universe: Universe) => void;
}

const UniverseSelection: React.FC<UniverseSelectionProps> = ({ onSelectUniverse }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-7xl mx-auto p-6 animate-fade-in relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-stone-200 to-stone-500 drop-shadow-2xl font-cinzel tracking-wider uppercase">
          Trivia Multiverse
        </h1>
        <p className="text-xl md:text-2xl text-stone-400 italic font-serif">
          "Choose your destiny..."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* Harry Potter Card */}
        <button
          onClick={() => onSelectUniverse('Harry Potter')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-slate-800 transition-all duration-700 bg-gradient-to-b from-slate-900 to-black card-hp"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Wand2 className="w-10 h-10 text-blue-400 mb-4 group-hover:rotate-12 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-cinzel font-bold text-blue-100 mb-2 group-hover:text-blue-300 transition-colors">Wizarding World</h3>
            <p className="text-blue-200/70 font-serif italic text-sm">Spells & Potions</p>
          </div>
        </button>

        {/* Hunger Games Card */}
        <button
          onClick={() => onSelectUniverse('Hunger Games')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-stone-800 transition-all duration-700 bg-gradient-to-b from-stone-900 to-black card-hg"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Flame className="w-10 h-10 text-orange-500 mb-4 group-hover:-translate-y-2 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-cinzel font-bold text-orange-100 mb-2 group-hover:text-orange-400 transition-colors">The Arena</h3>
            <p className="text-orange-200/70 font-serif italic text-sm">Districts & Survival</p>
          </div>
        </button>

        {/* Marvel Card */}
        <button
          onClick={() => onSelectUniverse('Marvel')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-sky-900 transition-all duration-700 bg-gradient-to-b from-slate-900 to-black card-marvel"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Zap className="w-10 h-10 text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-cinzel font-bold text-sky-100 mb-2 group-hover:text-sky-300 transition-colors">Marvel Universe</h3>
            <p className="text-sky-200/70 font-serif italic text-sm">Heroes & Infinity Stones</p>
          </div>
        </button>

        {/* LotR Card */}
        <button
          onClick={() => onSelectUniverse('LotR')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-yellow-900 transition-all duration-700 bg-gradient-to-b from-stone-900 to-black card-lotr"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Mountain className="w-10 h-10 text-yellow-500 mb-4 group-hover:-translate-y-1 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-cinzel font-bold text-yellow-100 mb-2 group-hover:text-yellow-400 transition-colors">Middle-earth</h3>
            <p className="text-yellow-200/70 font-serif italic text-sm">Rings & Hobbits</p>
          </div>
        </button>

        {/* Star Wars Card */}
        <button
          onClick={() => onSelectUniverse('Star Wars')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-blue-900 transition-all duration-700 bg-gradient-to-b from-slate-950 to-black card-sw"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472457897821-70d3819a0e24?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Sword className="w-10 h-10 text-blue-500 mb-4 group-hover:rotate-45 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-orbitron font-bold text-blue-100 mb-2 group-hover:text-blue-400 transition-colors">Galaxy Far Away</h3>
            <p className="text-blue-200/70 font-tech italic text-sm">Jedi & Sith</p>
          </div>
        </button>

        {/* Stranger Things Card */}
        <button
          onClick={() => onSelectUniverse('Stranger Things')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-red-900 transition-all duration-700 bg-gradient-to-b from-stone-900 to-black card-st"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Radio className="w-10 h-10 text-red-500 mb-4 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-cinzel font-bold text-red-100 mb-2 group-hover:text-red-400 transition-colors">Stranger Things</h3>
            <p className="text-red-200/70 font-serif italic text-sm">Upside Down & Eggos</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UniverseSelection;