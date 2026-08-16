// src/components/board/LessonRecordingModule.tsx
import React, { useEffect } from 'react';
import { Mic, MicOff, Video, Square, Play, Pause, HardDrive, Film, Sparkles, MonitorCheck, Download } from 'lucide-react';
import { useRecordingStore } from '../../store/useRecordingStore';

export const LessonRecordingModule: React.FC = () => {
  const {
    isRecording,
    isPaused,
    durationSeconds,
    micEnabled,
    boardOverlayEnabled,
    recordingsList,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    toggleMic,
    toggleBoardOverlay,
    tickRecording,
  } = useRecordingStore();

  useEffect(() => {
    let timer: any = null;
    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        tickRecording();
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused, tickRecording]);

  const formatDuration = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Live Recording Console */}
      <div className="p-8 rounded-3xl glass-card-accent border-2 border-rose-500/40 shadow-neon-purple relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center border-2 ${
                  isRecording && !isPaused
                    ? 'bg-rose-500/20 border-rose-400 text-rose-400 shadow-neon-purple animate-pulse'
                    : 'bg-white/10 border-white/20 text-slate-300'
                }`}
              >
                <Video className="w-10 h-10" />
              </div>
              {isRecording && !isPaused && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-slate-900 animate-ping" />
              )}
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
                {isRecording ? (isPaused ? 'REC PAUSED' : 'LIVE CLASS RECORDING') : 'LESSON RECORDING CONSOLE'}
              </span>
              <h3 className="font-display font-extrabold text-3xl text-white mt-1">
                {formatDuration(durationSeconds)}
              </h3>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                <MonitorCheck className="w-4 h-4 text-cyan-400" />
                Capturing 4K Smart Board Display + Classroom Audio
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-extrabold text-base shadow-neon-purple hover:brightness-110 active:scale-95 transition touch-target"
              >
                <Video className="w-6 h-6 fill-white" /> Start Recording Session
              </button>
            ) : (
              <>
                <button
                  onClick={isPaused ? resumeRecording : pauseRecording}
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-bold text-sm transition touch-target"
                >
                  {isPaused ? <Play className="w-5 h-5 fill-amber-300" /> : <Pause className="w-5 h-5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>

                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-rose-600 text-white hover:bg-rose-500 font-bold text-sm transition touch-target shadow-neon-purple"
                >
                  <Square className="w-5 h-5 fill-white" /> Save Recording
                </button>
              </>
            )}

            {/* Mic & Overlay Toggles */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <button
                onClick={toggleMic}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition touch-target ${
                  micEnabled ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'bg-rose-500/20 text-rose-400 border border-rose-500'
                }`}
                title={micEnabled ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Audio Waveform Simulation Bar when recording */}
        {isRecording && !isPaused && (
          <div className="flex items-center justify-center gap-1 mt-6 pt-4 border-t border-white/10">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-cyan-400 animate-pulse"
                style={{
                  height: `${Math.floor(Math.random() * 28) + 8}px`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recorded Classes History Gallery */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Film className="w-5 h-5 text-cyan-400" /> Saved Classroom Video Archive ({recordingsList.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recordingsList.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-3xl glass-panel border border-white/10 hover:border-cyan-500/30 transition group overflow-hidden"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-3">
                <img
                  src={rec.thumbnailUrl || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300'}
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-14 h-14 rounded-full bg-cyan-500/80 hover:bg-cyan-400 text-white flex items-center justify-center shadow-neon-blue transition transform group-hover:scale-110">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </button>
                </div>
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/80 text-white font-mono text-xs font-bold">
                  {formatDuration(rec.durationSeconds)}
                </span>
              </div>

              <h4 className="font-bold text-white text-base truncate">{rec.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>{rec.startTime}</span>
                <span className="flex items-center gap-1 font-mono text-cyan-300">
                  <HardDrive className="w-3.5 h-3.5" /> {rec.fileSizeMb} MB
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
