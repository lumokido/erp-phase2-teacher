// src/pages/DigitalBoardPage.tsx
import React, { useState } from 'react';
import {
  Presentation,
  BookOpen,
  UserCheck,
  Video,
  FolderOpen,
  FileSpreadsheet,
  BookOpenCheck,
  BookMarked,
  BarChart3,
  Megaphone,
  Timer,
  Info,
  StickyNote,
  Sparkles,
  Maximize2,
  Columns
} from 'lucide-react';
import { WhiteboardCanvas } from '../components/board/WhiteboardCanvas';
import { TodayLessonModule } from '../components/board/TodayLessonModule';
import { AttendanceGridModule } from '../components/board/AttendanceGridModule';
import { LessonRecordingModule } from '../components/board/LessonRecordingModule';
import { LearningMaterialsModule } from '../components/board/LearningMaterialsModule';
import { WorksheetViewerModule } from '../components/board/WorksheetViewerModule';
import { HomeworkManagerModule } from '../components/board/HomeworkManagerModule';
import { TeacherDiaryModule } from '../components/board/TeacherDiaryModule';
import { TopicCompletionModule } from '../components/board/TopicCompletionModule';
import { AnnouncementsModule } from '../components/board/AnnouncementsModule';
import { ClassTimerModule } from '../components/board/ClassTimerModule';
import { SubjectDetailsModule } from '../components/board/SubjectDetailsModule';
import { QuickNotesModule } from '../components/board/QuickNotesModule';
import { useClassStore } from '../store/useClassStore';

export type BoardTab =
  | 'whiteboard'
  | 'lesson'
  | 'attendance'
  | 'recording'
  | 'materials'
  | 'worksheets'
  | 'homework'
  | 'diary'
  | 'syllabus'
  | 'announcements'
  | 'timer'
  | 'subject'
  | 'notes';

export const DigitalBoardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BoardTab>('whiteboard');
  const [splitView, setSplitView] = useState(false);
  const { activeSlot } = useClassStore();

  const tabs: { id: BoardTab; label: string; icon: any; color: string }[] = [
    { id: 'whiteboard', label: 'Whiteboard', icon: Presentation, color: 'text-cyan-400' },
    { id: 'lesson', label: "Today's Lesson", icon: BookOpen, color: 'text-emerald-400' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, color: 'text-amber-400' },
    { id: 'recording', label: 'Recording', icon: Video, color: 'text-rose-400' },
    { id: 'materials', label: 'Materials', icon: FolderOpen, color: 'text-purple-400' },
    { id: 'worksheets', label: 'Worksheets', icon: FileSpreadsheet, color: 'text-indigo-400' },
    { id: 'homework', label: 'Homework', icon: BookOpenCheck, color: 'text-emerald-400' },
    { id: 'diary', label: 'Teacher Diary', icon: BookMarked, color: 'text-purple-400' },
    { id: 'syllabus', label: 'Topics', icon: BarChart3, color: 'text-cyan-400' },
    { id: 'announcements', label: 'Alerts', icon: Megaphone, color: 'text-rose-400' },
    { id: 'timer', label: 'Class Timer', icon: Timer, color: 'text-purple-400' },
    { id: 'subject', label: 'Subject Info', icon: Info, color: 'text-cyan-400' },
    { id: 'notes', label: 'Quick Notes', icon: StickyNote, color: 'text-amber-400' },
  ];

  const renderModuleContent = (tab: BoardTab) => {
    switch (tab) {
      case 'whiteboard':
        return <WhiteboardCanvas />;
      case 'lesson':
        return <TodayLessonModule />;
      case 'attendance':
        return <AttendanceGridModule />;
      case 'recording':
        return <LessonRecordingModule />;
      case 'materials':
        return <LearningMaterialsModule />;
      case 'worksheets':
        return <WorksheetViewerModule />;
      case 'homework':
        return <HomeworkManagerModule />;
      case 'diary':
        return <TeacherDiaryModule />;
      case 'syllabus':
        return <TopicCompletionModule />;
      case 'announcements':
        return <AnnouncementsModule />;
      case 'timer':
        return <ClassTimerModule />;
      case 'subject':
        return <SubjectDetailsModule />;
      case 'notes':
        return <QuickNotesModule />;
      default:
        return <WhiteboardCanvas />;
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      {/* Top Touch Tabs Toolbar */}
      <div className="flex items-center justify-between gap-3 p-2 rounded-2xl glass-panel border border-white/10 flex-shrink-0">
        {/* Scrollable Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1 px-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all font-bold text-xs flex-shrink-0 touch-target ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-neon-blue'
                    : 'glass-card border border-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Split View Toggle */}
        <button
          onClick={() => setSplitView(!splitView)}
          className={`hidden xl:flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex-shrink-0 touch-target ${
            splitView
              ? 'bg-purple-500 text-white shadow-neon-purple'
              : 'glass-card border border-white/10 text-slate-300 hover:text-white'
          }`}
          title="Toggle Split View Mode (Whiteboard + Module side-by-side)"
        >
          <Columns className="w-4 h-4" />
          <span>{splitView ? 'Single View' : 'Split Screen'}</span>
        </button>
      </div>

      {/* Main Board Module Area */}
      <div className="flex-1 w-full overflow-y-auto custom-scrollbar relative">
        {!splitView ? (
          <div className="h-full w-full">{renderModuleContent(activeTab)}</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 h-full w-full">
            <div className="h-full rounded-3xl overflow-hidden border border-cyan-500/30">
              <WhiteboardCanvas />
            </div>
            <div className="h-full overflow-y-auto p-4 glass-panel rounded-3xl border border-white/10">
              {activeTab === 'whiteboard' ? <TodayLessonModule /> : renderModuleContent(activeTab)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
