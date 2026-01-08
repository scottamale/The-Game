import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Wand2, Flame, Zap, Mountain, Sword, Trophy, Target, Shield, Sparkles, Rocket, Ticket, Activity, Clock, Volume2, VolumeX, Star, Hexagon, Circle, Globe, Flag, CheckCircle, XCircle, RefreshCw, Home, AlertTriangle, Skull, Scroll, Feather, Medal } from 'lucide-react';

// --- TYPES ---
export type Universe = 'Harry Potter' | 'Hunger Games' | 'Marvel' | 'LotR' | 'Star Wars' | 'Sports';

export type HP_House = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
export type HG_Faction = 'District 12' | 'District 2' | 'District 4' | 'The Capitol';
export type Marvel_Faction = 'Avengers' | 'Guardians' | 'Wakanda' | 'Asgard';
export type LotR_Faction = 'The Fellowship' | 'Mordor' | 'Elves of Rivendell' | 'Dwarves of Erebor';
export type SW_Faction = 'Jedi Order' | 'The Sith' | 'Rebel Alliance' | 'Galactic Empire';
export type Sports_League = 'Gridiron' | 'Hardwood' | 'Diamond' | 'The Bleachers';

export type Team = HP_House | HG_Faction | Marvel_Faction | LotR_Faction | SW_Faction | Sports_League;

export interface Theme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  accent: string;
  button: string;
  buttonHover: string;
  gradient: string;
  iconColor: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'Easy' | 'Medium' | 'Insane';
}

export interface GameState {
  status: 'universe-select' | 'team-select' | 'playing' | 'result' | 'game-over';
  universe: Universe | null;
  team: Team | null;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: boolean[];
  gameOverReason?: 'timeout' | 'all-wrong';
}

// --- CONSTANTS ---
export const HP_THEMES: Record<HP_House, Theme> = {
  Gryffindor: {
    primary: 'bg-red-950',
    secondary: 'bg-yellow-600',
    border: 'border-red-600',
    text: 'text-yellow-500',
    accent: 'text-red-400',
    button: 'bg-gradient-to-r from-red-900 to-red-800',
    buttonHover: 'hover:from-red-800 hover:to-red-700',
    gradient: 'from-red-950 via-red-900 to-black',
    iconColor: 'text-yellow-500'
  },
  Slytherin: {
    primary: 'bg-green-950',
    secondary: 'bg-stone-300',
    border: 'border-green-600',
    text: 'text-green-400',
    accent: 'text-green-300',
    button: 'bg-gradient-to-r from-green-900 to-green-800',
    buttonHover: 'hover:from-green-800 hover:to-green-700',
    gradient: 'from-green-950 via-green-900 to-black',
    iconColor: 'text-green-400'
  },
  Ravenclaw: {
    primary: 'bg-blue-950',
    secondary: 'bg-amber-100',
    border: 'border-blue-500',
    text: 'text-blue-300',
    accent: 'text-blue-200',
    button: 'bg-gradient-to-r from-blue-900 to-blue-800',
    buttonHover: 'hover:from-blue-800 hover:to-blue-700',
    gradient: 'from-blue-950 via-blue-900 to-black',
    iconColor: 'text-blue-300'
  },
  Hufflepuff: {
    primary: 'bg-yellow-950',
    secondary: 'bg-neutral-900',
    border: 'border-yellow-600',
    text: 'text-yellow-400',
    accent: 'text-yellow-200',
    button: 'bg-gradient-to-r from-yellow-700 to-yellow-600',
    buttonHover: 'hover:from-yellow-600 hover:to-yellow-500',
    gradient: 'from-yellow-950 via-yellow-900 to-black',
    iconColor: 'text-yellow-400'
  }
};

export const HG_THEMES: Record<HG_Faction, Theme> = {
  'District 12': {
    primary: 'bg-stone-900',
    secondary: 'bg-orange-600',
    border: 'border-orange-700',
    text: 'text-orange-500',
    accent: 'text-stone-400',
    button: 'bg-gradient-to-r from-stone-800 to-stone-700',
    buttonHover: 'hover:from-stone-700 hover:to-stone-600',
    gradient: 'from-stone-900 via-stone-800 to-black',
    iconColor: 'text-orange-500'
  },
  'District 2': {
    primary: 'bg-red-950',
    secondary: 'bg-stone-400',
    border: 'border-red-800',
    text: 'text-red-500',
    accent: 'text-stone-300',
    button: 'bg-gradient-to-r from-red-900 to-red-800',
    buttonHover: 'hover:from-red-800 hover:to-red-700',
    gradient: 'from-red-950 via-red-900 to-black',
    iconColor: 'text-red-500'
  },
  'District 4': {
    primary: 'bg-cyan-950',
    secondary: 'bg-teal-400',
    border: 'border-cyan-700',
    text: 'text-cyan-400',
    accent: 'text-teal-200',
    button: 'bg-gradient-to-r from-cyan-900 to-cyan-800',
    buttonHover: 'hover:from-cyan-800 hover:to-cyan-700',
    gradient: 'from-cyan-950 via-cyan-900 to-black',
    iconColor: 'text-cyan-400'
  },
  'The Capitol': {
    primary: 'bg-fuchsia-950',
    secondary: 'bg-purple-900',
    border: 'border-fuchsia-600',
    text: 'text-fuchsia-400',
    accent: 'text-pink-200',
    button: 'bg-gradient-to-r from-fuchsia-900 to-fuchsia-800',
    buttonHover: 'hover:from-fuchsia-800 hover:to-fuchsia-700',
    gradient: 'from-fuchsia-950 via-purple-900 to-black',
    iconColor: 'text-fuchsia-300'
  }
};

export const MARVEL_THEMES: Record<Marvel_Faction, Theme> = {
  'Avengers': {
    primary: 'bg-blue-900',
    secondary: 'bg-red-600',
    border: 'border-blue-500',
    text: 'text-blue-400',
    accent: 'text-red-400',
    button: 'bg-gradient-to-r from-blue-800 to-blue-700',
    buttonHover: 'hover:from-blue-700 hover:to-blue-600',
    gradient: 'from-blue-950 via-slate-900 to-black',
    iconColor: 'text-blue-400'
  },
  'Guardians': {
    primary: 'bg-purple-950',
    secondary: 'bg-pink-500',
    border: 'border-purple-500',
    text: 'text-purple-400',
    accent: 'text-pink-300',
    button: 'bg-gradient-to-r from-purple-900 to-purple-800',
    buttonHover: 'hover:from-purple-800 hover:to-purple-700',
    gradient: 'from-purple-950 via-indigo-900 to-black',
    iconColor: 'text-purple-300'
  },
  'Wakanda': {
    primary: 'bg-stone-900',
    secondary: 'bg-violet-600',
    border: 'border-violet-500',
    text: 'text-violet-400',
    accent: 'text-stone-300',
    button: 'bg-gradient-to-r from-stone-800 to-stone-700',
    buttonHover: 'hover:from-stone-700 hover:to-stone-600',
    gradient: 'from-black via-stone-900 to-violet-950',
    iconColor: 'text-violet-400'
  },
  'Asgard': {
    primary: 'bg-slate-900',
    secondary: 'bg-yellow-500',
    border: 'border-yellow-600',
    text: 'text-yellow-500',
    accent: 'text-yellow-200',
    button: 'bg-gradient-to-r from-yellow-700 to-yellow-600',
    buttonHover: 'hover:from-yellow-600 hover:to-yellow-500',
    gradient: 'from-slate-950 via-slate-900 to-yellow-950',
    iconColor: 'text-yellow-400'
  }
};

export const LOTR_THEMES: Record<LotR_Faction, Theme> = {
  'The Fellowship': {
    primary: 'bg-emerald-900',
    secondary: 'bg-emerald-600',
    border: 'border-emerald-500',
    text: 'text-emerald-300',
    accent: 'text-yellow-200',
    button: 'bg-gradient-to-r from-emerald-800 to-emerald-700',
    buttonHover: 'hover:from-emerald-700 hover:to-emerald-600',
    gradient: 'from-emerald-950 via-stone-900 to-black',
    iconColor: 'text-emerald-400'
  },
  'Mordor': {
    primary: 'bg-red-950',
    secondary: 'bg-orange-600',
    border: 'border-red-700',
    text: 'text-red-500',
    accent: 'text-orange-500',
    button: 'bg-gradient-to-r from-red-900 to-red-800',
    buttonHover: 'hover:from-red-800 hover:to-red-700',
    gradient: 'from-black via-red-950 to-orange-950',
    iconColor: 'text-red-500'
  },
  'Elves of Rivendell': {
    primary: 'bg-teal-900',
    secondary: 'bg-cyan-200',
    border: 'border-teal-400',
    text: 'text-teal-200',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-teal-800 to-teal-700',
    buttonHover: 'hover:from-teal-700 hover:to-teal-600',
    gradient: 'from-teal-950 via-slate-900 to-black',
    iconColor: 'text-teal-300'
  },
  'Dwarves of Erebor': {
    primary: 'bg-amber-900',
    secondary: 'bg-yellow-600',
    border: 'border-amber-600',
    text: 'text-amber-500',
    accent: 'text-yellow-500',
    button: 'bg-gradient-to-r from-amber-800 to-amber-700',
    buttonHover: 'hover:from-amber-700 hover:to-amber-600',
    gradient: 'from-stone-950 via-amber-950 to-black',
    iconColor: 'text-amber-500'
  }
};

export const SW_THEMES: Record<SW_Faction, Theme> = {
  'Jedi Order': {
    primary: 'bg-blue-900',
    secondary: 'bg-blue-400',
    border: 'border-blue-400',
    text: 'text-blue-300',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-blue-800 to-blue-600',
    buttonHover: 'hover:from-blue-700 hover:to-blue-500',
    gradient: 'from-blue-950 via-slate-900 to-black',
    iconColor: 'text-blue-400'
  },
  'The Sith': {
    primary: 'bg-red-950',
    secondary: 'bg-red-600',
    border: 'border-red-600',
    text: 'text-red-500',
    accent: 'text-red-200',
    button: 'bg-gradient-to-r from-red-900 to-red-800',
    buttonHover: 'hover:from-red-800 hover:to-red-700',
    gradient: 'from-red-950 via-black to-red-900',
    iconColor: 'text-red-500'
  },
  'Rebel Alliance': {
    primary: 'bg-orange-900',
    secondary: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-400',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-orange-800 to-orange-700',
    buttonHover: 'hover:from-orange-700 hover:to-orange-600',
    gradient: 'from-orange-950 via-stone-900 to-black',
    iconColor: 'text-orange-500'
  },
  'Galactic Empire': {
    primary: 'bg-zinc-900',
    secondary: 'bg-white',
    border: 'border-zinc-500',
    text: 'text-zinc-300',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-zinc-800 to-zinc-700',
    buttonHover: 'hover:from-zinc-700 hover:to-zinc-600',
    gradient: 'from-zinc-950 via-black to-zinc-900',
    iconColor: 'text-white'
  }
};

export const SPORTS_THEMES: Record<Sports_League, Theme> = {
  'Gridiron': {
    primary: 'bg-emerald-900',
    secondary: 'bg-white',
    border: 'border-emerald-400',
    text: 'text-emerald-100',
    accent: 'text-yellow-400',
    button: 'bg-gradient-to-r from-emerald-800 to-emerald-700',
    buttonHover: 'hover:from-emerald-700 hover:to-emerald-600',
    gradient: 'from-emerald-950 via-green-900 to-black',
    iconColor: 'text-white'
  },
  'Hardwood': {
    primary: 'bg-orange-900',
    secondary: 'bg-orange-500',
    border: 'border-orange-600',
    text: 'text-orange-100',
    accent: 'text-black',
    button: 'bg-gradient-to-r from-orange-800 to-orange-700',
    buttonHover: 'hover:from-orange-700 hover:to-orange-600',
    gradient: 'from-orange-950 via-amber-900 to-black',
    iconColor: 'text-orange-300'
  },
  'Diamond': {
    primary: 'bg-blue-900',
    secondary: 'bg-red-600',
    border: 'border-white',
    text: 'text-white',
    accent: 'text-red-500',
    button: 'bg-gradient-to-r from-blue-800 to-blue-700',
    buttonHover: 'hover:from-blue-700 hover:to-blue-600',
    gradient: 'from-blue-950 via-slate-900 to-black',
    iconColor: 'text-white'
  },
  'The Bleachers': {
    primary: 'bg-indigo-900',
    secondary: 'bg-yellow-400',
    border: 'border-indigo-500',
    text: 'text-indigo-200',
    accent: 'text-yellow-300',
    button: 'bg-gradient-to-r from-indigo-800 to-indigo-700',
    buttonHover: 'hover:from-indigo-700 hover:to-indigo-600',
    gradient: 'from-indigo-950 via-purple-900 to-black',
    iconColor: 'text-yellow-400'
  }
};

export const HG_QUESTIONS: Question[] = [
  { id: 1, text: "What is the name of Katniss Everdeen's sister?", options: ["Primrose", "Rue", "Effie", "Clove"], correctAnswer: 0, difficulty: 'Easy' },
  { id: 2, text: "Which District is Katniss from?", options: ["District 1", "District 11", "District 12", "District 4"], correctAnswer: 2, difficulty: 'Easy' },
  { id: 3, text: "What weapon is Katniss famous for using?", options: ["Sword", "Trident", "Spear", "Bow and Arrow"], correctAnswer: 3, difficulty: 'Easy' },
  { id: 4, text: "What is the name of the nation where the Hunger Games take place?", options: ["Panem", "Narnia", "Westeros", "Gondor"], correctAnswer: 0, difficulty: 'Easy' },
  { id: 5, text: "What poisonous berries do Katniss and Peeta threaten to eat?", options: ["Hemlock", "Nightlock", "Wolfsbane", "Belladonna"], correctAnswer: 1, difficulty: 'Easy' },
  { id: 6, text: "Who is the male tribute from District 12 in the 74th Games?", options: ["Gale Hawthorne", "Cato", "Peeta Mellark", "Thresh"], correctAnswer: 2, difficulty: 'Easy' },
  { id: 7, text: "What gesture represents District 12?", options: ["Three-finger salute", "Fist bump", "Hand on heart", "Two-finger wave"], correctAnswer: 0, difficulty: 'Easy' },
  { id: 8, text: "Who is Katniss's stylist?", options: ["Caesar Flickerman", "Haymitch Abernathy", "Cinna", "Effie Trinket"], correctAnswer: 2, difficulty: 'Easy' },
  { id: 9, text: "What is the name of Katniss's childhood friend?", options: ["Peeta", "Gale", "Marvel", "Finnick"], correctAnswer: 1, difficulty: 'Easy' },
  { id: 10, text: "What bird becomes the symbol of the rebellion?", options: ["Phoenix", "Eagle", "Jabberjay", "Mockingjay"], correctAnswer: 3, difficulty: 'Easy' },
  { id: 11, text: "Who was the Head Gamemaker for the 74th Hunger Games?", options: ["Plutarch Heavensbee", "Seneca Crane", "President Snow", "Claudius Templesmith"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 12, text: "Which District does Finnick Odair come from?", options: ["District 1", "District 2", "District 4", "District 10"], correctAnswer: 2, difficulty: 'Medium' },
  { id: 13, text: "What industry is District 11 responsible for?", options: ["Mining", "Fishing", "Agriculture", "Luxury Goods"], correctAnswer: 2, difficulty: 'Medium' },
  { id: 14, text: "Who gives Katniss the Mockingjay pin in the books?", options: ["Prim", "Madge Undersee", "Gale", "Greasy Sae"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 15, text: "What is the name of the cat Prim owns?", options: ["Buttercup", "Crookshanks", "Tiger", "Lily"], correctAnswer: 0, difficulty: 'Medium' },
  { id: 16, text: "Which tribute saves Katniss from Clove at the Cornucopia?", options: ["Peeta", "Thresh", "Rue", "Cato"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 17, text: "What time does the lightning strike the tree in the Quarter Quell arena?", options: ["Midnight and Noon", "10am and 10pm", "Every hour", "Sunset"], correctAnswer: 0, difficulty: 'Medium' },
  { id: 18, text: "Who won the 65th Hunger Games at age 14?", options: ["Haymitch Abernathy", "Johanna Mason", "Finnick Odair", "Annie Cresta"], correctAnswer: 2, difficulty: 'Medium' },
  { id: 19, text: "What is the name of the 'Career' girl from District 1?", options: ["Glimmer", "Clove", "Cashmere", "Enobaria"], correctAnswer: 0, difficulty: 'Medium' },
  { id: 20, text: "How did Haymitch win his Hunger Games (the 50th)?", options: ["Hiding", "Using the force field", "Killing everyone", "Swimming"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 21, text: "What was Mags's weapon of choice?", options: ["Trident", "Fishhook", "Net", "Knife"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 22, text: "Who is the host of the Hunger Games interviews?", options: ["Claudius Templesmith", "Caesar Flickerman", "Cinna", "Seneca Crane"], correctAnswer: 1, difficulty: 'Medium' },
  { id: 23, text: "What is the name of the Avox girl Katniss recognizes?", options: ["Lavinia", "Darius", "Portia", "Venia"], correctAnswer: 0, difficulty: 'Insane' },
  { id: 24, text: "Which District is responsible for Textiles?", options: ["District 6", "District 8", "District 9", "District 10"], correctAnswer: 1, difficulty: 'Insane' },
  { id: 25, text: "What was the name of the morphling addict who sacrificed herself for Peeta?", options: ["She has no name given", "Cecelia", "Seeder", "Wiress"], correctAnswer: 0, difficulty: 'Insane' },
  { id: 26, text: "Who designed the arena for the 75th Hunger Games (Quarter Quell)?", options: ["Seneca Crane", "Plutarch Heavensbee", "Volumnia Gaul", "Dr. Kay"], correctAnswer: 1, difficulty: 'Insane' },
  { id: 27, text: "What specific knot did Katniss learn from Finnick?", options: ["Bowline", "Square Knot", "Noose", "Slip Knot"], correctAnswer: 2, difficulty: 'Insane' },
  { id: 28, text: "What brand of makeup did Cinna ask for when prepping Katniss?", options: ["Capitol Colors", "Mockingjay Mist", "None", "Just Chapstick"], correctAnswer: 2, difficulty: 'Insane' },
  { id: 29, text: "Who was the female tribute from District 2 in the 74th Games?", options: ["Glimmer", "Clove", "Cashmere", "Enobaria"], correctAnswer: 1, difficulty: 'Insane' },
  { id: 30, text: "What is the Mayor of District 12's name?", options: ["Mayor Undersee", "Mayor Everdeen", "Mayor Lipp", "Mayor Pringle"], correctAnswer: 0, difficulty: 'Insane' },
  { id: 31, text: "Which Victor had their teeth filed into fangs?", options: ["Johanna Mason", "Enobaria", "Brutus", "Chaff"], correctAnswer: 1, difficulty: 'Insane' },
  { id: 32, text: "How many Victors died during the 75th Hunger Games arena events?", options: ["12", "15", "18", "6"], correctAnswer: 3, difficulty: 'Insane' }
];

export const HP_QUESTIONS: Question[] = [
    { id: 101, text: "What is the name of Harry Potter's owl?", options: ["Errol", "Hedwig", "Scabbers", "Buckbeak"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 102, text: "Which platform does the Hogwarts Express depart from?", options: ["Platform 9 3/4", "Platform 10", "Platform 42", "Platform 11 1/2"], correctAnswer: 0, difficulty: 'Easy' },
    { id: 103, text: "What position does Harry play on his Quidditch team?", options: ["Keeper", "Chaser", "Beater", "Seeker"], correctAnswer: 3, difficulty: 'Easy' },
    { id: 104, text: "Who was the Half-Blood Prince?", options: ["Tom Riddle", "Sirius Black", "Severus Snape", "Albus Dumbledore"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 105, text: "What is the form of Hermione Granger's Patronus?", options: ["Otter", "Doe", "Cat", "Phoenix"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 106, text: "Who are the creators of the Marauder's Map?", options: ["Fred, George, Ron, Harry", "Moony, Wormtail, Padfoot, Prongs", "Godric, Helga, Rowena, Salazar", "Dumbledore, Grindelwald, Newt"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 107, text: "How do you free a House-Elf?", options: ["Give them a wand", "Give them gold", "Give them clothes", "Shake their hand"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 108, text: "Monkshood and Wolfsbane are the same plant, also known as what?", options: ["Mandrake", "Aconite", "Fluxweed", "Wormwood"], correctAnswer: 1, difficulty: 'Insane' },
    { id: 109, text: "What is the core of the Elder Wand?", options: ["Phoenix Feather", "Dragon Heartstring", "Unicorn Hair", "Thestral Tail Hair"], correctAnswer: 3, difficulty: 'Insane' },
    { id: 110, text: "Who was the original master of the Resurrection Stone (one of the Peverell brothers)?", options: ["Antioch Peverell", "Cadmus Peverell", "Ignotus Peverell", "Salazar Slytherin"], correctAnswer: 1, difficulty: 'Insane' },
    { id: 111, text: "Who is the Headmaster of Hogwarts when Harry arrives?", options: ["Severus Snape", "Minerva McGonagall", "Albus Dumbledore", "Remus Lupin"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 112, text: "What animal can Harry talk to?", options: ["Dogs", "Snakes", "Owls", "Dragons"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 113, text: "Which house does Draco Malfoy belong to?", options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"], correctAnswer: 3, difficulty: 'Easy' },
    { id: 114, text: "What is the name of the Weasley's house?", options: ["The Shack", "The Burrow", "The Rookery", "The Nest"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 115, text: "How many balls are used in Quidditch?", options: ["One", "Two", "Three", "Four"], correctAnswer: 3, difficulty: 'Easy' }
];

export const MARVEL_QUESTIONS: Question[] = [
    { id: 301, text: "What is Tony Stark's superhero alias?", options: ["Iron Man", "War Machine", "Hawkeye", "Ant-Man"], correctAnswer: 0, difficulty: 'Easy' },
    { id: 302, text: "What is Captain America's shield made of?", options: ["Adamantium", "Vibranium", "Steel", "Titanium"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 303, text: "Who is the God of Thunder?", options: ["Loki", "Odin", "Thor", "Heimdall"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 304, text: "What is the name of the group Star-Lord leads?", options: ["The Avengers", "The Defenders", "The Revengers", "Guardians of the Galaxy"], correctAnswer: 3, difficulty: 'Easy' },
    { id: 305, text: "Which Stone is in Vision's head?", options: ["Soul Stone", "Time Stone", "Mind Stone", "Power Stone"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 306, text: "What is the name of Black Panther's home country?", options: ["Zamunda", "Wakanda", "Sokovia", "Latveria"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 307, text: "Who is the first Avenger?", options: ["Iron Man", "Thor", "Captain America", "Hulk"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 308, text: "What is the name of Thor's hammer?", options: ["Stormbreaker", "Mjolnir", "Gungnir", "Hofund"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 309, text: "Who directed the first Avengers movie?", options: ["Russo Brothers", "Jon Favreau", "Joss Whedon", "James Gunn"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 310, text: "What is the name of the AI Tony Stark created that became a villain?", options: ["J.A.R.V.I.S.", "F.R.I.D.A.Y.", "Ultron", "Zola"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 311, text: "What song does Star-Lord dance to in the intro of Guardians Vol. 1?", options: ["Hooked on a Feeling", "Come and Get Your Love", "Mr. Blue Sky", "Cherry Bomb"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 312, text: "Who is the Winter Soldier?", options: ["Steve Rogers", "Sam Wilson", "Bucky Barnes", "Clint Barton"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 320, text: "In 'Iron Man', what is the name of the terrorist group?", options: ["The Ten Rings", "The Hand", "Hydra", "AIM"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 321, text: "What video game is Korg playing in Endgame?", options: ["Call of Duty", "Halo", "Fortnite", "Minecraft"], correctAnswer: 2, difficulty: 'Insane' },
    { id: 322, text: "Who is the first character to speak in Infinity War?", options: ["Thanos", "Loki", "Thor", "Ebony Maw"], correctAnswer: 3, difficulty: 'Insane' }
];

export const LOTR_QUESTIONS: Question[] = [
    { id: 401, text: "Who is the bearer of the One Ring in 'The Fellowship of the Ring'?", options: ["Samwise Gamgee", "Frodo Baggins", "Bilbo Baggins", "Meriadoc Brandybuck"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 402, text: "What is the name of the wizard who guides the Fellowship?", options: ["Saruman", "Radagast", "Gandalf", "Alatar"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 403, text: "What creature is Gollum obsessed with?", options: ["The Arkenstone", "The One Ring", "Sting", "Mithril"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 408, text: "What is the name of Frodo's sword?", options: ["Orcrist", "Glamdring", "Sting", "Anduril"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 409, text: "What is the Elvish name for the Fellowship's bread?", options: ["Cram", "Lembas", "Miruvor", "Ent-draught"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 410, text: "Who is the Lord of the Nazgûl?", options: ["The Witch-king of Angmar", "Khamûl", "Gothmog", "Sauron"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 420, text: "Who was the first Dark Lord, master of Sauron?", options: ["Melkor (Morgoth)", "Ungoliant", "Gothmog", "Ancalagon"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 421, text: "What was the name of the sword that cut the Ring from Sauron's hand?", options: ["Narsil", "Anduril", "Gurthang", "Anglachel"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 422, text: "Who are the Blue Wizards?", options: ["Alatar and Pallando", "Gandalf and Saruman", "Radagast and Curumo", "Olorin and Aiwendil"], correctAnswer: 0, difficulty: 'Insane' }
];

export const SW_QUESTIONS: Question[] = [
    { id: 501, text: "What is the name of Han Solo's ship?", options: ["Star Destroyer", "X-Wing", "Millennium Falcon", "TIE Fighter"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 502, text: "Who is Luke Skywalker's father?", options: ["Obi-Wan Kenobi", "Palpatine", "Anakin Skywalker", "Han Solo"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 503, text: "What color is Yoda's lightsaber?", options: ["Blue", "Red", "Green", "Purple"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 504, text: "Who built C-3PO?", options: ["Anakin Skywalker", "Luke Skywalker", "Padme Amidala", "Obi-Wan Kenobi"], correctAnswer: 0, difficulty: 'Easy' },
    { id: 505, text: "What is the weapon of a Jedi?", options: ["Blaster", "Lightsaber", "Phaser", "Bowcaster"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 506, text: "Which bounty hunter captures Han Solo?", options: ["Jango Fett", "Bossk", "Boba Fett", "Dengar"], correctAnswer: 2, difficulty: 'Easy' },
    
    { id: 507, text: "What is the name of Boba Fett's ship?", options: ["Slave I", "Razor Crest", "Ghost", "Falcon"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 508, text: "Who killed Qui-Gon Jinn?", options: ["Darth Vader", "Darth Sidious", "Count Dooku", "Darth Maul"], correctAnswer: 3, difficulty: 'Medium' },
    { id: 509, text: "What planet is Chewbacca from?", options: ["Endor", "Kashyyyk", "Tatooine", "Hoth"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 510, text: "Who is the Supreme Leader of the First Order in Episode VII?", options: ["Kylo Ren", "Snoke", "Hux", "Palpatine"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 511, text: "What species is Admiral Ackbar?", options: ["Mon Calamari", "Twi'lek", "Rodian", "Bothan"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 512, text: "Which order commanded the Clones to kill the Jedi?", options: ["Order 66", "Order 99", "Order 1", "Order 77"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 513, text: "Who is the pilot of the Ghost in 'Rebels'?", options: ["Ezra", "Kanan", "Hera", "Sabine"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 514, text: "What is the name of the Ewok who finds Leia?", options: ["Logray", "Teebo", "Wicket", "Chirpa"], correctAnswer: 2, difficulty: 'Medium' },

    { id: 515, text: "What is the name of the planet where the clones were created?", options: ["Geonosis", "Kamino", "Coruscant", "Naboo"], correctAnswer: 1, difficulty: 'Insane' },
    { id: 516, text: "Who was Count Dooku's padawan?", options: ["Qui-Gon Jinn", "Obi-Wan Kenobi", "Mace Windu", "Yoda"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 517, text: "What is the name of the Sith wayfinder planet in 'Rise of Skywalker'?", options: ["Exegol", "Ahch-To", "Mustafar", "Moraband"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 518, text: "Who is the only non-Jedi to use a lightsaber in the original trilogy?", options: ["Han Solo", "Chewbacca", "Lando", "Leia"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 519, text: "What was Finn's stormtrooper ID?", options: ["FN-2187", "TK-421", "FN-1138", "CT-5555"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 520, text: "Who created the Rule of Two?", options: ["Darth Bane", "Darth Revan", "Darth Plagueis", "Darth Sidious"], correctAnswer: 0, difficulty: 'Insane' }
];

export const SPORTS_QUESTIONS: Question[] = [
    { id: 601, text: "How many points is a touchdown worth in the NFL?", options: ["3", "7", "6", "2"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 602, text: "Which NBA player is known as 'King James'?", options: ["Kobe Bryant", "Michael Jordan", "LeBron James", "Shaq"], correctAnswer: 2, difficulty: 'Easy' },
    { id: 603, text: "What sport is played in the Super Bowl?", options: ["Baseball", "Basketball", "Soccer", "Football"], correctAnswer: 3, difficulty: 'Easy' },
    { id: 604, text: "How many innings are in a standard MLB game?", options: ["7", "9", "4", "10"], correctAnswer: 1, difficulty: 'Easy' },
    { id: 605, text: "Which team has the most NBA championships (tied)?", options: ["Lakers & Celtics", "Bulls & Warriors", "Knicks & Heat", "Spurs & Pistons"], correctAnswer: 0, difficulty: 'Easy' },
    { id: 606, text: "What is it called when a bowler knocks down all pins in the first roll?", options: ["Spare", "Strike", "Turkey", "Split"], correctAnswer: 1, difficulty: 'Easy' },

    { id: 607, text: "Who holds the record for most career home runs in MLB?", options: ["Babe Ruth", "Barry Bonds", "Hank Aaron", "Alex Rodriguez"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 608, text: "Which NFL team went undefeated in the 1972 season?", options: ["New England Patriots", "Chicago Bears", "Miami Dolphins", "Pittsburgh Steelers"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 609, text: "How many players are on the field for one NFL team?", options: ["10", "11", "12", "9"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 610, text: "Who is the NBA logo silhouette based on?", options: ["Michael Jordan", "Jerry West", "Wilt Chamberlain", "Kareem Abdul-Jabbar"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 611, text: "Which city has two MLB teams?", options: ["Chicago", "Boston", "Philadelphia", "Houston"], correctAnswer: 0, difficulty: 'Medium' },
    { id: 612, text: "What is the maximum number of clubs a golfer can carry?", options: ["12", "13", "14", "15"], correctAnswer: 2, difficulty: 'Medium' },
    { id: 613, text: "Who won the first Super Bowl?", options: ["Dallas Cowboys", "Green Bay Packers", "Kansas City Chiefs", "New York Jets"], correctAnswer: 1, difficulty: 'Medium' },
    { id: 614, text: "Which NBA team plays in Madison Square Garden?", options: ["Brooklyn Nets", "New York Knicks", "Boston Celtics", "Philadelphia 76ers"], correctAnswer: 1, difficulty: 'Medium' },

    { id: 615, text: "Who is the only player to win the Super Bowl MVP for a losing team?", options: ["Chuck Howley", "Peyton Manning", "Tom Brady", "Jerry Rice"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 616, text: "Which pitcher threw the only perfect game in World Series history?", options: ["Sandy Koufax", "Don Larsen", "Cy Young", "Roy Halladay"], correctAnswer: 1, difficulty: 'Insane' },
    { id: 617, text: "Who holds the NBA record for most points in a single game?", options: ["Kobe Bryant", "Michael Jordan", "Wilt Chamberlain", "LeBron James"], correctAnswer: 2, difficulty: 'Insane' },
    { id: 618, text: "Which NFL team has never played in a Super Bowl?", options: ["Detroit Lions", "Minnesota Vikings", "Buffalo Bills", "Cincinnati Bengals"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 619, text: "What year was the first World Series played?", options: ["1903", "1912", "1899", "1921"], correctAnswer: 0, difficulty: 'Insane' },
    { id: 620, text: "Who is the all-time leading scorer in NBA history (as of 2024)?", options: ["Kareem Abdul-Jabbar", "LeBron James", "Karl Malone", "Kobe Bryant"], correctAnswer: 1, difficulty: 'Insane' }
];

export const POINTS_PER_QUESTION = 10;
export const TIMER_SECONDS = 15;
export const DIFFICULTY_DISTRIBUTION = {
  Easy: 4,
  Medium: 7,
  Insane: 4
};

// --- AUDIO UTILS ---
let audioCtx: AudioContext | null = null;
let ambientNodes: AudioNode[] = [];
let ambientGain: GainNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClick = () => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const playCorrect = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    const startTime = now + (i * 0.05);
    const duration = 0.8;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};

export const playWrong = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';
  
  osc1.frequency.value = 150;
  osc2.frequency.value = 110; 
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.4);
  
  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  
  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.4);
  osc2.stop(now + 0.4);
};

export const playTimeout = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + 0.5);
};

export const playGameOver = () => {
  const ctx = initAudio();
  const now = ctx.currentTime;
  
  const notes = [392.00, 311.13, 261.63]; 
  
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = freq;
    
    const startTime = now + (i * 0.5);
    const duration = 2.0;
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  });
};

export const startAmbient = (universe: 'Harry Potter' | 'Hunger Games' | 'Marvel' | 'LotR' | 'Star Wars' | 'Sports') => {
  const ctx = initAudio();
  stopAmbient();

  ambientGain = ctx.createGain();
  ambientGain.connect(ctx.destination);
  ambientGain.gain.value = 0.05; 

  if (universe === 'Harry Potter') {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    
    osc1.frequency.value = 110; 
    osc2.frequency.value = 112; 
    
    lfo.frequency.value = 0.2; 
    lfoGain.gain.value = 0.02;
    
    lfo.connect(lfoGain);
    lfoGain.connect(ambientGain.gain);
    
    osc1.connect(ambientGain);
    osc2.connect(ambientGain);
    
    osc1.start();
    osc2.start();
    lfo.start();
    
    ambientNodes.push(osc1, osc2, lfo, lfoGain, ambientGain);

  } else if (universe === 'Hunger Games') {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1; 
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200; 
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    noise.connect(filter);
    filter.connect(ambientGain);
    
    noise.start();
    lfo.start();
    
    ambientNodes.push(noise, filter, lfo, lfoGain, ambientGain);
  } else if (universe === 'Marvel') {
    const osc = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    osc.frequency.value = 60; 
    
    mod.type = 'square';
    mod.frequency.value = 4; 
    
    const modGain = ctx.createGain();
    modGain.gain.value = 100;
    
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    mod.connect(modGain);
    modGain.connect(filter.frequency);
    
    osc.connect(filter);
    filter.connect(ambientGain);
    
    osc.start();
    mod.start();
    
    ambientNodes.push(osc, mod, modGain, filter, ambientGain);
  } else if (universe === 'LotR') {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc1.frequency.value = 65.41; 
    
    osc2.type = 'triangle';
    osc2.frequency.value = 77.78; 
    
    osc3.type = 'sine';
    osc3.frequency.value = 98.00; 
    
    filter.type = 'lowpass';
    filter.frequency.value = 150; 

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(ambientGain);

    osc1.start();
    osc2.start();
    osc3.start();

    ambientNodes.push(osc1, osc2, osc3, filter, ambientGain);
  } else if (universe === 'Star Wars') {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.value = 100; 
    
    osc2.type = 'sine';
    osc2.frequency.value = 103; 
    
    gainNode.gain.value = 0.5;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ambientGain);
    
    osc1.start();
    osc2.start();
    
    ambientNodes.push(osc1, osc2, gainNode, filter, ambientGain);
  } else if (universe === 'Sports') {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let lastOut = 0;
    
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; 
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 0.5;
    
    noise.connect(filter);
    filter.connect(ambientGain);
    
    noise.start();
    
    ambientNodes.push(noise, filter, ambientGain);
  }
};

export const stopAmbient = () => {
  ambientNodes.forEach(node => {
    try {
      if (node instanceof AudioScheduledSourceNode) {
        node.stop();
      }
      node.disconnect();
    } catch (e) {
      // Ignore errors if already stopped
    }
  });
  ambientNodes = [];
  if (ambientGain) {
    ambientGain.disconnect();
    ambientGain = null;
  }
};

// --- COMPONENTS ---

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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
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

        {/* Sports Card */}
        <button
          onClick={() => onSelectUniverse('Sports')}
          className="group relative h-80 rounded-2xl overflow-hidden border-2 border-green-800 transition-all duration-700 bg-gradient-to-b from-green-950 to-black card-sports"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-10">
            <Trophy className="w-10 h-10 text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-700 ease-in-out" />
            <h3 className="text-2xl font-stencil font-bold text-yellow-100 mb-2 group-hover:text-yellow-400 transition-colors">Pro Sports</h3>
            <p className="text-yellow-200/70 font-sans italic text-sm">NFL, NBA & MLB</p>
          </div>
        </button>
      </div>
    </div>
  );
};

interface WelcomeScreenProps {
  universe: Universe;
  onSelectTeam: (team: Team) => void;
  onBack: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ universe, onSelectTeam, onBack }) => {
  let themes: Record<string, Theme>;
  
  if (universe === 'Harry Potter') themes = HP_THEMES;
  else if (universe === 'Hunger Games') themes = HG_THEMES;
  else if (universe === 'Marvel') themes = MARVEL_THEMES;
  else if (universe === 'LotR') themes = LOTR_THEMES;
  else if (universe === 'Star Wars') themes = SW_THEMES;
  else themes = SPORTS_THEMES;
  
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

  let containerClass = "";
  let titleGradient = "";
  let buttonBorderClass = "";

  if (universe === 'Harry Potter') {
    containerClass = 'glass-panel-hp';
    titleGradient = 'bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600';
    buttonBorderClass = 'border-amber-500/20 hover:border-amber-400/60';
  } else if (universe === 'Hunger Games') {
    containerClass = 'glass-panel-hg';
    titleGradient = 'bg-gradient-to-b from-orange-400 via-red-500 to-red-800';
    buttonBorderClass = 'border-white/10 hover:border-orange-500/60';
  } else if (universe === 'Marvel') {
    containerClass = 'glass-panel-marvel';
    titleGradient = 'bg-gradient-to-b from-sky-300 via-blue-500 to-indigo-600';
    buttonBorderClass = 'border-sky-500/20 hover:border-sky-400/60';
  } else if (universe === 'LotR') {
    containerClass = 'glass-panel-lotr';
    titleGradient = 'bg-gradient-to-b from-yellow-100 via-yellow-500 to-amber-700';
    buttonBorderClass = 'border-yellow-500/20 hover:border-yellow-400/60';
  } else if (universe === 'Star Wars') {
    containerClass = 'glass-panel-sw';
    titleGradient = 'bg-gradient-to-b from-blue-100 via-blue-400 to-violet-600';
    buttonBorderClass = 'border-blue-500/30 hover:border-blue-300/80';
  } else {
    containerClass = 'glass-panel-sports';
    titleGradient = 'bg-gradient-to-b from-white via-stone-200 to-stone-400';
    buttonBorderClass = 'border-white/30 hover:border-white/80';
  }

  const getBackText = () => {
    if (universe === 'Harry Potter') return 'Apparate Back';
    if (universe === 'Hunger Games') return 'Return to Map';
    if (universe === 'Marvel') return 'Abort Mission';
    if (universe === 'LotR') return 'Return to Shire';
    if (universe === 'Star Wars') return 'Jump to Hyperspace';
    return 'Back to Locker Room';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-6 animate-fade-in relative z-10">
      <button 
        onClick={onBack}
        className={`absolute top-0 left-6 uppercase text-xs tracking-[0.2em] font-cinzel transition-all duration-300 flex items-center gap-2
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

      <div className="text-center mb-16 relative">
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
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
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
    </div>
  );
};

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

  let theme;
  if (universe === 'Harry Potter') theme = HP_THEMES[team as keyof typeof HP_THEMES];
  else if (universe === 'Hunger Games') theme = HG_THEMES[team as keyof typeof HG_THEMES];
  else if (universe === 'Marvel') theme = MARVEL_THEMES[team as keyof typeof MARVEL_THEMES];
  else if (universe === 'LotR') theme = LOTR_THEMES[team as keyof typeof LOTR_THEMES];
  else if (universe === 'Star Wars') theme = SW_THEMES[team as keyof typeof SW_THEMES];
  else theme = SPORTS_THEMES[team as keyof typeof SPORTS_THEMES];

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
    MainIcon = Circle; 
    ActionIcon = Star;
    nextButtonText = gameState.currentQuestionIndex === gameState.questions.length - 1 ? "Destroy Ring" : "Journey On";
  } else if (universe === 'Star Wars') {
    MainIcon = Sword; 
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

  const timerClass = timeLeft <= 5 ? 'text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-stone-300';
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-scale-in relative z-10">
      
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
            <div className={`flex items-center gap-2 font-mono text-2xl font-bold ${timerClass}`}>
            <Clock className="w-5 h-5" />
            {timeLeft}
            </div>

            <button 
                onClick={toggleMute}
                className={`p-2 rounded-full hover:bg-white/10 transition-colors ${isMuted ? 'text-red-400' : 'text-stone-400'}`}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
        </div>
      </div>

      <div className={`w-full h-1.5 rounded-full mb-8 overflow-hidden relative bg-black/40 border border-white/5`}>
        <div 
          className={`h-full transition-all duration-700 ease-out relative ${theme.secondary} shadow-[0_0_10px_currentColor]`} 
          style={{ width: `${progressPercentage}%` }}
        >
          <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[2px] bg-white/80`}></div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 md:p-12 relative overflow-hidden transition-all duration-300 backdrop-blur-xl border
        ${theme.border}/30 bg-black/40
        shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]
      `}>
        
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
            let buttonStyle = `
               border transition-all duration-300 relative flex items-center justify-between group
               ${theme.border} border-opacity-20 bg-black/20
               hover:border-opacity-80 hover:bg-black/40 hover:pl-6 hover:shadow-[0_0_15px_-5px_currentColor]
            `;
            
            let textColor = "text-stone-300 group-hover:text-stone-100";
            let icon = <div className={`w-3 h-3 rounded-full border ${theme.border} opacity-50`} />;
            
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
  let theme;
  if (universe === 'Harry Potter') theme = HP_THEMES[team as keyof typeof HP_THEMES];
  else if (universe === 'Hunger Games') theme = HG_THEMES[team as keyof typeof HG_THEMES];
  else if (universe === 'Marvel') theme = MARVEL_THEMES[team as keyof typeof MARVEL_THEMES];
  else if (universe === 'LotR') theme = LOTR_THEMES[team as keyof typeof LOTR_THEMES];
  else if (universe === 'Star Wars') theme = SW_THEMES[team as keyof typeof SW_THEMES];
  else theme = SPORTS_THEMES[team as keyof typeof SPORTS_THEMES];

  const percentage = (score / maxScore) * 100;
  const correctCount = Math.round(score / (maxScore / totalQuestions));

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
  } else { // Sports
    fontClass = "font-stencil";
    if (percentage <= 30) {
      title = "Benchwarmer";
      message = "You're cut from the team. Maybe try selling hot dogs in the stands instead?";
    } else if (percentage <= 70) {
      title = "Starter";
      message = "You make the plays and keep the team in the game, but you're not in the Hall of Fame just yet.";
    } else {
      title = "League MVP";
      message = "Unstoppable! You're breaking records left and right. They'll retire your jersey number.";
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
      FooterIcon = Medal;
      footerText = "Official League Statistics";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-3xl mx-auto p-6 animate-scale-in relative z-10">
      
      <div className={`
        relative mt-16 p-8 md:p-12 w-full text-center rounded-lg backdrop-blur-xl
        border-2 ${theme.border}
        bg-black/60 shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)]
      `}>
        
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${theme.border} ${theme.primary} shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            <Trophy className={`w-14 h-14 ${theme.text} drop-shadow-md relative z-10`} />
            
            <div className={`absolute inset-0 opacity-60 blur-xl animate-spin-slow bg-gradient-to-tr ${theme.gradient}`} style={{ animationDuration: '4s' }}></div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${fontClass} uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 drop-shadow-sm`}>
            {title}
          </h2>
          
          <div className="flex justify-center items-baseline gap-2 mb-8 relative">
            <span className={`text-8xl font-bold ${fontClass} drop-shadow-2xl ${theme.text} text-glow`}>
                {score}
            </span>
             <span className="text-2xl text-stone-500 font-cinzel">/ {maxScore}</span>
          </div>

          <p className={`text-xl italic mb-10 leading-relaxed font-serif max-w-xl mx-auto border-t border-b border-white/5 py-8 ${theme.accent}`}>
            "{message}"
          </p>

          <div className="grid grid-cols-2 gap-6 text-stone-300 mb-12 max-w-md mx-auto">
            <div className={`p-5 rounded-lg border flex flex-col items-center backdrop-blur-sm
              ${theme.border} border-opacity-30 bg-black/20
            `}>
              <span className="block font-bold text-4xl text-emerald-400 mb-1 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{correctCount}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">{universe === 'Sports' ? 'Wins' : 'Correct'}</span>
            </div>
            <div className={`p-5 rounded-lg border flex flex-col items-center backdrop-blur-sm
               ${theme.border} border-opacity-30 bg-black/20
            `}>
              <span className="block font-bold text-4xl text-red-400 mb-1 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">{totalQuestions - correctCount}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">{universe === 'Sports' ? 'Losses' : 'Failed'}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
             <button
              onClick={onRestart}
              className={`
                flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-lg font-bold transition-all font-cinzel uppercase tracking-widest
                border border-white/10 shadow-lg
                ${theme.button} ${theme.buttonHover} text-white
                hover:shadow-[0_0_30px_-5px_currentColor] hover:-translate-y-1
              `}
            >
              <RefreshCw className="w-5 h-5" />
              {universe === 'Harry Potter' ? 'Re-Cast' : universe === 'Star Wars' ? 'Re-Launch' : universe === 'Sports' ? 'Rematch' : 'Replay'}
            </button>
             <button
              onClick={onHome}
              className={`
                flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-lg font-bold transition-all font-cinzel uppercase tracking-widest
                border border-white/5 bg-black/60 hover:bg-black/80 text-stone-400 hover:text-white
                hover:border-white/20
              `}
            >
              <Star className="w-4 h-4" />
              Universe Map
            </button>
          </div>
         
        </div>
      </div>
      
      <div className={`mt-8 flex items-center gap-2 text-xs animate-fade-in opacity-60 uppercase tracking-widest ${theme.accent}`}>
        <FooterIcon className="w-4 h-4" />
        <span>{footerText}</span>
      </div>
    </div>
  );
};

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
  else theme = SPORTS_THEMES[team as keyof typeof SPORTS_THEMES];

  useEffect(() => {
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
    if (reason === 'timeout') {
      title = "Delay of Game";
      message = "The shot clock expired. You froze under the pressure of the big moment.";
      subText = "Turnover on downs.";
    } else {
      title = "Relegated";
      message = "Your performance was embarrassing. The coach has cut you from the roster.";
      subText = "Sent down to the minor leagues.";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto p-6 animate-scale-in relative z-10">
      
      <div className={`
        relative p-10 md:p-14 w-full text-center rounded-2xl backdrop-blur-2xl
        border-2 ${universe === 'Star Wars' ? 'border-blue-900/50' : universe === 'Sports' ? 'border-green-900/50' : 'border-red-900/50'}
        bg-black/80 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] overflow-hidden
      `}>
        
        <div className={`absolute inset-0 opacity-20 animate-pulse ${universe === 'Sports' ? 'bg-green-950' : universe === 'Star Wars' ? 'bg-blue-950' : 'bg-red-950'}`}></div>

        <div className="relative z-10 mb-8">
            <div className={`
              mx-auto w-24 h-24 rounded-full flex items-center justify-center
              border-4 ${universe === 'Star Wars' ? 'border-blue-800' : universe === 'Sports' ? 'border-green-800' : 'border-red-900'}
              bg-black shadow-[0_0_40px_rgba(220,38,38,0.4)]
            `}>
                {reason === 'timeout' ? (
                     <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                ) : (
                     <Skull className="w-10 h-10 text-stone-400" />
                )}
            </div>
        </div>

        <h2 className={`relative z-10 text-5xl md:text-6xl font-bold mb-6 ${universe === 'Star Wars' ? 'font-orbitron' : universe === 'Sports' ? 'font-stencil' : 'font-cinzel'} text-red-600 uppercase tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]`}>
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

// --- APP COMPONENT ---

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to generate game questions based on universe
const generateGameQuestions = (universe: Universe): Question[] => {
  let sourceQuestions: Question[];
  if (universe === 'Harry Potter') sourceQuestions = HP_QUESTIONS;
  else if (universe === 'Hunger Games') sourceQuestions = HG_QUESTIONS;
  else if (universe === 'Marvel') sourceQuestions = MARVEL_QUESTIONS;
  else if (universe === 'LotR') sourceQuestions = LOTR_QUESTIONS;
  else if (universe === 'Star Wars') sourceQuestions = SW_QUESTIONS;
  else sourceQuestions = SPORTS_QUESTIONS;
  
  const easy = shuffleArray(sourceQuestions.filter(q => q.difficulty === 'Easy')).slice(0, DIFFICULTY_DISTRIBUTION.Easy);
  const medium = shuffleArray(sourceQuestions.filter(q => q.difficulty === 'Medium')).slice(0, DIFFICULTY_DISTRIBUTION.Medium);
  const insane = shuffleArray(sourceQuestions.filter(q => q.difficulty === 'Insane')).slice(0, DIFFICULTY_DISTRIBUTION.Insane);
  
  return [...easy, ...medium, ...insane];
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'universe-select',
    universe: null,
    team: null,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: []
  });

  // Effect to update body background based on universe
  useEffect(() => {
    const bgElement = document.getElementById('bg-canvas');
    if (bgElement) {
        if (gameState.universe === 'Harry Potter') {
            bgElement.className = 'universe-bg universe-hp';
        } else if (gameState.universe === 'Hunger Games') {
             bgElement.className = 'universe-bg universe-hg';
        } else if (gameState.universe === 'Marvel') {
             bgElement.className = 'universe-bg universe-marvel';
        } else if (gameState.universe === 'LotR') {
             bgElement.className = 'universe-bg universe-lotr';
        } else if (gameState.universe === 'Star Wars') {
             bgElement.className = 'universe-bg universe-sw';
        } else if (gameState.universe === 'Sports') {
             bgElement.className = 'universe-bg universe-sports';
        } else {
             bgElement.className = 'universe-bg universe-neutral';
        }
    }
  }, [gameState.universe]);

  const handleSelectUniverse = (universe: Universe) => {
      setGameState(prev => ({
          ...prev,
          universe,
          status: 'team-select'
      }));
  };

  const handleSelectTeam = (team: Team) => {
    if (!gameState.universe) return;

    const gameQuestions = generateGameQuestions(gameState.universe);
    setGameState(prev => ({
      ...prev,
      team,
      questions: gameQuestions,
      status: 'playing',
      currentQuestionIndex: 0,
      score: 0,
      answers: []
    }));
  };

  const handleAnswer = (isCorrect: boolean) => {
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + POINTS_PER_QUESTION : prev.score,
      answers: [...prev.answers, isCorrect]
    }));
  };

  const handleNextQuestion = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  };

  const handleGameEnd = () => {
    // Check if player failed all questions (score 0)
    if (gameState.score === 0) {
      setGameState(prev => ({
        ...prev,
        status: 'game-over',
        gameOverReason: 'all-wrong'
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        status: 'result'
      }));
    }
  };

  const handleGameOver = (reason: 'timeout') => {
    setGameState(prev => ({
        ...prev,
        status: 'game-over',
        gameOverReason: reason
    }));
  };

  const handleRestart = () => {
    setGameState(prev => ({
      ...prev,
      status: 'team-select',
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      gameOverReason: undefined
    }));
  };

  const handleHome = () => {
      setGameState({
        status: 'universe-select',
        universe: null,
        team: null,
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        gameOverReason: undefined
      });
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative z-10">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {gameState.status === 'universe-select' && (
            <UniverseSelection onSelectUniverse={handleSelectUniverse} />
        )}

        {gameState.status === 'team-select' && gameState.universe && (
          <WelcomeScreen 
            universe={gameState.universe}
            onSelectTeam={handleSelectTeam} 
            onBack={handleHome}
          />
        )}
        
        {gameState.status === 'playing' && gameState.universe && gameState.team && gameState.questions.length > 0 && (
          <QuizScreen 
            universe={gameState.universe}
            team={gameState.team}
            gameState={gameState}
            onAnswer={handleAnswer}
            onNextQuestion={handleNextQuestion}
            onGameEnd={handleGameEnd}
            onGameOver={handleGameOver}
          />
        )}
        
        {gameState.status === 'result' && gameState.universe && gameState.team && (
          <ResultScreen 
            score={gameState.score}
            universe={gameState.universe}
            team={gameState.team}
            maxScore={gameState.questions.length * POINTS_PER_QUESTION}
            totalQuestions={gameState.questions.length}
            onRestart={handleRestart}
            onHome={handleHome}
          />
        )}

        {gameState.status === 'game-over' && gameState.universe && gameState.team && gameState.gameOverReason && (
            <GameOverScreen
                universe={gameState.universe}
                team={gameState.team}
                reason={gameState.gameOverReason}
                onRestart={handleRestart}
                onHome={handleHome}
            />
        )}
      </main>

      <footer className="w-full p-4 text-center text-stone-600 text-[10px] md:text-xs border-t border-white/5 bg-black/60 backdrop-blur-md">
        <p>Unofficial Fan Project - Not affiliated with Warner Bros, J.K. Rowling, Lionsgate, Suzanne Collins, Marvel Studios, the Tolkien Estate, Disney, Lucasfilm, NFL, NBA, or MLB.</p>
        <p className="mt-1 font-cinzel text-stone-400">Play responsibly.</p>
      </footer>
    </div>
  );
};

// --- MOUNT ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);