// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Lock, Delete, ArrowRight, ShieldCheck, Sparkles, User, KeyRound, CheckCircle2, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credentials' | 'pin'>('credentials');
  const [usernameOrEmail, setUsernameOrEmail] = useState('principal_admin');
  const [password, setPassword] = useState('password123');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginWithCredentials, user } = useAuthStore();
  const navigate = useNavigate();

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await loginWithCredentials(usernameOrEmail, password);
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username/email or password. Please try again.');
    }
  };

  const handleQuickAdmin = async () => {
    setUsernameOrEmail('principal_admin');
    setPassword('password123');
    setLoading(true);
    const success = await loginWithCredentials('principal_admin', 'password123');
    setLoading(false);
    if (success) navigate('/teachers');
  };

  const handleQuickTeacher = async () => {
    setUsernameOrEmail('teacher_robert');
    setPassword('TeacherPassword123');
    setLoading(true);
    const success = await loginWithCredentials('teacher_robert', 'TeacherPassword123');
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (login(newPin)) {
          navigate('/dashboard');
        } else {
          setError('Invalid PIN. Try 1234');
          setPin('');
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError('');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-indigo-50/50 to-sky-50 flex items-center justify-center p-6 relative overflow-hidden text-slate-800">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="w-full max-w-lg rounded-3xl glass-panel border border-slate-200 p-8 shadow-2xl space-y-6 relative z-10 bg-white/95">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-sky-500 mx-auto flex items-center justify-center shadow-lg">
            <Monitor className="w-9 h-9 text-white" />
          </div>
          <h1 className="font-display font-black text-3xl text-slate-900 tracking-tight flex items-center justify-center gap-2">
            Digital Board <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
          </h1>
          <p className="text-xs text-indigo-600 font-extrabold tracking-wider uppercase">ERP Teacher & Principal Admin Workspace</p>
        </div>

        {/* Tab Toggle: Credentials (cURL Specs) vs Touch PIN */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => { setActiveTab('credentials'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'credentials'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-4 h-4 text-indigo-600" /> Account Credentials
          </button>
          <button
            onClick={() => { setActiveTab('pin'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'pin'
                ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4 text-indigo-600" /> Touch Screen PIN
          </button>
        </div>

        {/* Option 1: Credentials Form (cURL Specs) */}
        {activeTab === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            {/* Quick Demo Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Quick One-Click Logins</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleQuickAdmin}
                  className="p-3 rounded-2xl bg-amber-50 border border-amber-200 hover:border-amber-400 text-left transition flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-xs text-amber-900">Admin (Principal)</p>
                    <p className="text-[10px] text-amber-700 font-mono">principal_admin</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleQuickTeacher}
                  className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 hover:border-indigo-400 text-left transition flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-extrabold text-xs text-indigo-900">Teacher Login</p>
                    <p className="text-[10px] text-indigo-700 font-mono">teacher_robert</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Username or Email</label>
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="principal_admin or teacher_robert"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-sm"
                required
              />
            </div>

            {error && <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating JWT Token...</span>
              ) : (
                <>
                  Log In to Board <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Option 2: Touch PIN Mode */}
        {activeTab === 'pin' && (
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Enter Touch PIN (Default: 1234)</p>
              <div className="flex justify-center gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                      pin.length > idx
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-sm'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {pin.length > idx && <span className="w-3.5 h-3.5 rounded-full bg-indigo-600" />}
                  </div>
                ))}
              </div>

              {error && <p className="text-xs font-bold text-rose-600 animate-bounce">{error}</p>}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="h-14 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-900 font-display font-extrabold text-2xl active:scale-95 transition touch-target flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleDelete}
                className="h-14 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:border-rose-300 text-slate-600 hover:text-rose-600 transition touch-target flex items-center justify-center"
              >
                <Delete className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-14 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-900 font-display font-extrabold text-2xl active:scale-95 transition touch-target flex items-center justify-center"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleQuickTeacher}
                className="h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-bold text-xs shadow-md active:scale-95 transition touch-target flex items-center justify-center gap-1"
              >
                Bypass <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 font-mono">
            API Target: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">http://localhost:8080/api/v1/auth/login</code>
          </p>
        </div>
      </div>
    </div>
  );
};
