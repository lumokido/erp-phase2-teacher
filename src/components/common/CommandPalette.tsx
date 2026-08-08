// src/components/common/CommandPalette.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Presentation, UserCheck, Timer, BookOpen, FileText, Settings, X, Sparkles, Users } from 'lucide-react';
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
    { label: 'Teachers Directory & Admin API', icon: Users, action: () => navigate('/teachers') },
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl glass-panel border border-slate-200 shadow-2xl overflow-hidden bg-white">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
          <Search className="w-6 h-6 text-indigo-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search teachers, students, topics..."
            className="w-full bg-transparent text-slate-900 text-lg placeholder-slate-400 outline-none font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Command Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Quick Actions List */}
          {!query && (
            <div>
              <p className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider px-3 mb-2 flex items-center gap-1.5">
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
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl glass-card border border-slate-200/60 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-800 transition touch-target text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-base">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Student Search Results */}
          {query && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
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
                      className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-slate-200 hover:border-indigo-300 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-base">{student.name}</p>
                          <p className="text-xs text-slate-500">Roll #{student.rollNumber} • 10th Grade</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          student.status === 'present'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : student.status === 'absent'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-slate-500 text-sm font-medium">No matching records found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50 font-medium">
          Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700">ESC</kbd> to close
        </div>
      </div>
    </div>
  );
};
