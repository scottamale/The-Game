import React, { useState, useEffect } from 'react';
import { GameState, Universe, Team, Question } from './types';
import { POINTS_PER_QUESTION, HG_QUESTIONS, HP_QUESTIONS, MARVEL_QUESTIONS, LOTR_QUESTIONS, SW_QUESTIONS, ST_QUESTIONS, DIFFICULTY_DISTRIBUTION } from './constants';
import UniverseSelection from './components/UniverseSelection';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import GameOverScreen from './components/GameOverScreen';

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
  else sourceQuestions = ST_QUESTIONS;
  
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
        } else if (gameState.universe === 'Stranger Things') {
             bgElement.className = 'universe-bg universe-st';
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
      <main className="flex-grow flex flex-col items-center justify-start md:justify-center p-4 w-full">
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
        <p>Unofficial Fan Project - Not affiliated with Warner Bros, J.K. Rowling, Lionsgate, Suzanne Collins, Marvel Studios, the Tolkien Estate, Disney, Lucasfilm, Netflix or the Duffer Brothers.</p>
        <p className="mt-1 font-cinzel text-stone-400">Play responsibly.</p>
      </footer>
    </div>
  );
};

export default App;