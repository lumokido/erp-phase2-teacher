// src/components/common/CommandPalette.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Presentation, UserCheck, Timer, BookOpen, FileText, Settings, X, Sparkles } from 'lucide-react';
import { useClassStore } from '../../store/useClassStore';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const attendance = useClassStore((state) => state.attendance);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { label: 'Open Whiteboard Canvas', icon: Presentation, action: () => navigate('/board') },
    { label: 'Take Attendance Grid', icon: UserCheck, action: () => navigate('/attendance') },
    { label: 'Start 5-Min Quiz Timer', icon: Timer, action: () => navigate('/board') },
    { label: 'View Today\'s Lesson Plan', icon: BookOpen, action: () => navigate('/board') },
    { label: 'Open Practice Worksheet', icon: FileText, action: () => navigate('/worksheets') },
    { label: 'Classroom App Settings', icon: Settings, action: () => navigate('/settings') },
  ];

  const filteredStudents = attendance.students.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <Search className="w-6 h-6 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search students, topics, files..."
            className="w-full bg-transparent text-white text-lg placeholder-slate-400 outline-none font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Quick Actions List */}
          {!query && (
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-3 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Quick Board Commands
              </p>
              <div className="space-y-1">
                {quickActions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-slate-200 hover:text-white transition touch-target text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-base">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Student Search Results */}
          {query && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
                Students ({filteredStudents.length})
              </p>
              <div className="space-y-1">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => {
                        navigate('/attendance');
                        onClose();
                      }}
                      className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-white/5 hover:border-cyan-500/30 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-white text-base">{student.name}</p>
                          <p className="text-xs text-slate-400">Roll #{student.rollNumber} • 10th Grade</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                          student.status === 'present'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : student.status === 'absent'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-slate-400 text-sm">No matching records found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/10 text-center text-xs text-slate-400 bg-black/20">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd> to close or tap outside
        </div>
      </div>
    </div>
  );
};
