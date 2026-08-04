// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Lock, Delete, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (login(newPin)) {
          navigate('/dashboard');
        } else {
          setError('Invalid Security PIN. Try 1234');
          setPin('');
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  const handleQuickLogin = () => {
    login('1234');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-dark-base flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-black relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="w-full max-w-md rounded-3xl glass-panel border border-cyan-500/30 p-8 shadow-2xl space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 to-indigo-600 mx-auto flex items-center justify-center shadow-neon-blue">
            <Monitor className="w-9 h-9 text-white" />
          </div>
          <h1 className="font-display font-black text-3xl text-white tracking-tight flex items-center justify-center gap-2">
            Digital Board <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </h1>
          <p className="text-xs text-cyan-300 font-semibold tracking-wider uppercase">Smart Board Classroom Workspace</p>
        </div>

        {/* Teacher Avatar Card */}
        {user && (
          <div className="p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-xl object-cover border border-cyan-400"
            />
            <div className="text-left">
              <h2 className="font-bold text-white text-base leading-tight">{user.name}</h2>
              <p className="text-xs text-slate-400">{user.title}</p>
            </div>
          </div>
        )}

        {/* PIN Indicators */}
        <div className="space-y-3 text-center">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Enter Touch PIN (Default: 1234)</p>
          <div className="flex justify-center gap-4">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  pin.length > idx
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-neon-blue'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {pin.length > idx && <span className="w-3 h-3 rounded-full bg-cyan-400" />}
              </div>
            ))}
          </div>

          {error && <p className="text-xs font-bold text-rose-400 animate-bounce">{error}</p>}
        </div>

        {/* Touch Keypad (Big touch targets for Smart Board finger taps) */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-14 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 text-white font-display font-extrabold text-2xl active:scale-95 transition touch-target flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl glass-card border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 transition touch-target flex items-center justify-center"
          >
            <Delete className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 text-white font-display font-extrabold text-2xl active:scale-95 transition touch-target flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleQuickLogin}
            className="h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-neon-blue active:scale-95 transition touch-target flex items-center justify-center gap-1"
          >
            Pass <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={handleQuickLogin}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
          >
            Bypass PIN & Enter Classroom Workspace Directly
          </button>
        </div>
      </div>
    </div>
  );
};
