
export type Universe = 'Harry Potter' | 'Hunger Games' | 'Marvel' | 'LotR' | 'Star Wars' | 'Stranger Things';

export type HP_House = 'Gryffindor' | 'Slytherin' | 'Ravenclaw' | 'Hufflepuff';
export type HG_Faction = 'District 12' | 'District 2' | 'District 4' | 'The Capitol';
export type Marvel_Faction = 'Avengers' | 'Guardians' | 'Wakanda' | 'Asgard';
export type LotR_Faction = 'The Fellowship' | 'Mordor' | 'Elves of Rivendell' | 'Dwarves of Erebor';
export type SW_Faction = 'Jedi Order' | 'The Sith' | 'Rebel Alliance' | 'Galactic Empire';
export type ST_Faction = 'The Party' | 'Scoops Ahoy' | 'Hellfire Club' | 'Hawkins High';

export type Team = HP_House | HG_Faction | Marvel_Faction | LotR_Faction | SW_Faction | ST_Faction;

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

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  team: Team;
}

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

export const ST_THEMES: Record<ST_Faction, Theme> = {
  'The Party': {
    primary: 'bg-purple-900',
    secondary: 'bg-red-500',
    border: 'border-purple-500',
    text: 'text-purple-300',
    accent: 'text-red-400',
    button: 'bg-gradient-to-r from-purple-900 to-purple-700',
    buttonHover: 'hover:from-purple-800 hover:to-purple-600',
    gradient: 'from-purple-950 via-indigo-900 to-black',
    iconColor: 'text-purple-400'
  },
  'Scoops Ahoy': {
    primary: 'bg-blue-800',
    secondary: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-white',
    accent: 'text-red-400',
    button: 'bg-gradient-to-r from-blue-700 to-blue-600',
    buttonHover: 'hover:from-blue-600 hover:to-blue-500',
    gradient: 'from-blue-900 via-white/10 to-red-900',
    iconColor: 'text-white'
  },
  'Hellfire Club': {
    primary: 'bg-black',
    secondary: 'bg-red-600',
    border: 'border-red-600',
    text: 'text-red-500',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-red-900 to-black',
    buttonHover: 'hover:from-red-800 hover:to-stone-900',
    gradient: 'from-black via-red-950 to-black',
    iconColor: 'text-red-500'
  },
  'Hawkins High': {
    primary: 'bg-green-800',
    secondary: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-400',
    accent: 'text-white',
    button: 'bg-gradient-to-r from-green-900 to-green-700',
    buttonHover: 'hover:from-green-800 hover:to-green-600',
    gradient: 'from-green-950 via-orange-900 to-black',
    iconColor: 'text-orange-400'
  }
};
