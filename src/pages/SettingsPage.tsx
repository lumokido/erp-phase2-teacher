// src/pages/SettingsPage.tsx
import React, { useState } from 'react';
import { Settings, Monitor, Wifi, Volume2, ShieldCheck, RefreshCw, Smartphone } from 'lucide-react';
import { useClassStore } from '../store/useClassStore';

export const SettingsPage: React.FC = () => {
  const { isOffline, toggleOffline } = useClassStore();
  const [resolution, setResolution] = useState('3840x2160');
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState('30');

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-8 rounded-3xl glass-card-accent border border-cyan-500/40 flex items-center justify-between">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            System Configuration
          </span>
          <h1 className="font-display font-black text-3xl text-white mt-2 flex items-center gap-2">
            Smart Board Application Settings <Settings className="w-6 h-6 text-cyan-400" />
          </h1>
          <p className="text-sm text-slate-300 mt-1">Configure display resolution, touch target calibration, & offline cloud sync.</p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display & Resolution Settings */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400" /> Display & Smart Board Calibration
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Target Smart Board Resolution</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="w-full mt-2 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none text-sm font-semibold"
            >
              <option value="3840x2160" className="bg-slate-900">4K Ultra HD (3840 x 2160) - Recommended</option>
              <option value="1920x1080" className="bg-slate-900">1080p Full HD (1920 x 1080)</option>
              <option value="2560x1440" className="bg-slate-900">2K QHD (2560 x 1440)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-white/5">
            <div>
              <p className="font-bold text-white text-sm">Touch Stylus Palm Rejection</p>
              <p className="text-xs text-slate-400">Ignore accidental palm touches during whiteboard drawing</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-400 cursor-pointer" />
          </div>
        </div>

        {/* Sync & Connectivity */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-5">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Wifi className="w-5 h-5 text-emerald-400" /> Network & Auto-Sync Engine
          </h3>

          <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-white/5">
            <div>
              <p className="font-bold text-white text-sm">Simulate Offline Mode</p>
              <p className="text-xs text-slate-400">Store changes locally and sync automatically on reconnect</p>
            </div>
            <button
              onClick={toggleOffline}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                isOffline ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              {isOffline ? 'Offline' : 'Online'}
            </button>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase">Auto-Save Queue Frequency</label>
            <select
              value={autoSaveInterval}
              onChange={(e) => setAutoSaveInterval(e.target.value)}
              className="w-full mt-2 p-3.5 rounded-2xl glass-card border border-white/10 text-white outline-none text-sm font-semibold"
            >
              <option value="15" className="bg-slate-900">Every 15 Seconds</option>
              <option value="30" className="bg-slate-900">Every 30 Seconds (Default)</option>
              <option value="60" className="bg-slate-900">Every 1 Minute</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
