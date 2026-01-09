import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { Wand2, Flame, Zap, Mountain, Sword, Trophy, Target, Shield, Sparkles, Rocket, Ticket, Activity, Clock, Volume2, VolumeX, Star, Hexagon, Circle, Globe, Flag, CheckCircle, XCircle, RefreshCw, Home, AlertTriangle, Skull, Scroll, Feather, Medal, Ghost, Radio } from 'lucide-react';
import App from './App';

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