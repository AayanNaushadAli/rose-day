
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Calendar,
  Quote,
  MessageCircleHeart,
  Music,
  ChevronRight,
  Send,
  Play,
  Pause
} from 'lucide-react';
import { RoseScene } from './components/RoseScene';
import { FloatingHearts } from './components/FloatingHearts';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('love');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder music
    audio.loop = true;
    audioRef.current = audio;

    // Attempt to play on mount (usually blocked)
    const playAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked:", err);
      });
    };

    playAudio();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0055', '#ff77aa', '#ffffff']
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Love Level", value: "Infinity", icon: <Heart className="text-red-500" size={18} /> },
    { label: "Today's Date", value: "Feb 7", icon: <Calendar className="text-pink-500" size={18} /> },
    { label: "Status", value: "Falling for U", icon: <Sparkles className="text-yellow-400" size={18} /> },
  ];

  const loveNotes = [
    "You are the most beautiful rose in the garden of my life.",
    "Every petal of this 3D rose represents a reason why I love you.",
    "Happy Rose Day to my sunshine, my moonlight, and my everything.",
    "Life with you is a bed of roses, without the thorns."
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0f0507] text-white overflow-hidden">
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <RoseScene />
        </Canvas>
      </div>

      {/* Floating Particles */}
      <FloatingHearts />

      {/* Overlay UI */}
      <div className="relative z-10 p-4 md:p-8 flex flex-col min-h-screen pointer-events-none">

        {/* Header Section */}
        <header className="flex justify-between items-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center border border-white/20">
              <Heart fill="currentColor" className="text-red-500 animate-pulse" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Rose Day</h1>
              <p className="text-[10px] uppercase tracking-widest text-pink-400/80 font-medium">Edition 2025</p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerConfetti}
            className="glass px-4 py-2 rounded-full text-xs flex items-center gap-2 border border-white/20 pointer-events-auto"
          >
            <Sparkles size={14} className="text-yellow-400" />
            Surprise!
          </motion.button>
        </header>

        {/* Center Content Spacer */}
        <div className="flex-1 flex items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="font-cursive text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-500 to-pink-300 drop-shadow-2xl">
              For My Love
            </h2>
            <p className="mt-4 text-pink-200/60 font-light tracking-[0.2em] uppercase text-xs">
              Beautiful as a rose, gentle as a breeze
            </p>
          </motion.div>
        </div>

        {/* Bottom Dashboard Area */}
        <main className="grid grid-cols-1 md:grid-cols-3 gap-4 pointer-events-auto">

          {/* Left Column: Stats Panel */}
          <section className="space-y-4">
            <AnimatePresence>
              {showCard && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass p-5 rounded-3xl"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-4 flex items-center gap-2">
                    <Quote size={14} /> Our Love Stats
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {stats.map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-pink-500/10">
                            {stat.icon}
                          </div>
                          <span className="text-sm font-medium text-white/70">{stat.label}</span>
                        </div>
                        <span className="text-sm font-bold text-pink-300">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              onClick={togglePlay}
              className="glass p-4 rounded-3xl flex items-center gap-4 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors group"
            >
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-lg shadow-pink-500/20 overflow-hidden">
                <Music className={`text-white transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`} size={20} />
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex gap-1 items-end h-4">
                    <div className="w-1 bg-white animate-music-bar-1" />
                    <div className="w-1 bg-white animate-music-bar-2" />
                    <div className="w-1 bg-white animate-music-bar-3" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Now Playing</p>
                <p className="text-sm font-semibold truncate">Perfect - Ed Sheeran</p>
                <p className="text-[9px] text-white/40">{isPlaying ? 'Playing...' : 'Paused'}</p>
              </div>
            </motion.div>
          </section>

          {/* Middle Column: Interaction/Letter Area */}
          <section className="md:col-span-2 space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('love')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'love' ? 'glass bg-pink-500/20 text-pink-300 border-pink-500/30' : 'bg-white/5 text-white/40'}`}
              >
                LOVE NOTES
              </button>
              <button
                onClick={() => setActiveTab('message')}
                className={`flex-1 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'message' ? 'glass bg-red-500/20 text-red-300 border-red-500/30' : 'bg-white/5 text-white/40'}`}
              >
                SAY SOMETHING
              </button>
            </div>

            <motion.div
              layout
              className="glass-card p-6 rounded-3xl min-h-[180px] flex flex-col justify-between"
            >
              {activeTab === 'love' ? (
                <motion.div
                  key="love-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <Quote className="text-pink-500/40" size={32} />
                  <p className="text-lg font-serif italic text-pink-100 leading-relaxed">
                    "{loveNotes[Math.floor(Date.now() / 10000) % loveNotes.length]}"
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-pink-500/40 to-transparent" />
                    <span className="text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em]">Forever Yours</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="msg-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MessageCircleHeart className="text-red-400" />
                    <h4 className="text-sm font-bold">Write your feelings...</h4>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a sweet message for her..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-pink-500/50 transition-colors resize-none placeholder:text-white/20"
                  />
                  <button
                    className="mt-4 w-full bg-gradient-to-r from-pink-600 to-red-600 p-3 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-red-500/20"
                    onClick={() => {
                      if (message.trim()) {
                        triggerConfetti();
                        setMessage('');
                      }
                    }}
                  >
                    Send Love <Send size={16} />
                  </button>
                </motion.div>
              )}
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-3xl flex flex-col gap-2 group cursor-pointer border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xs font-bold text-white/40 group-hover:text-pink-400">Virtual Hug</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🫂</span>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              </div>
              <div className="glass p-4 rounded-3xl flex flex-col gap-2 group cursor-pointer border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-xs font-bold text-white/40 group-hover:text-red-400">Hidden Kiss</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">💋</span>
                  <ChevronRight size={16} className="text-white/20" />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-8 text-center">
          <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase">
            Created with love • Rose Day 2025
          </p>
        </footer>
      </div>

      {/* Interactive Floating Sparkles Mouse Follower - Optional addition if user had pointer */}
      <div className="fixed inset-0 pointer-events-none radial-gradient-glow" />
      <style>{`
        .radial-gradient-glow {
            background: radial-gradient(circle at 50% 50%, rgba(255, 45, 85, 0.05) 0%, transparent 70%);
        }

        @keyframes music-bar {
            0%, 100% { height: 4px; }
            50% { height: 16px; }
        }

        .animate-music-bar-1 { animation: music-bar 1s ease-in-out infinite; }
        .animate-music-bar-2 { animation: music-bar 0.8s ease-in-out infinite 0.2s; }
        .animate-music-bar-3 { animation: music-bar 1.2s ease-in-out infinite 0.1s; }
      `}</style>
    </div>
  );
};

export default App;
