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
    { id: 'whiteboard', label: 'Whiteboard', icon: Presentation, color: 'text-indigo-600' },
    { id: 'lesson', label: "Today's Lesson", icon: BookOpen, color: 'text-emerald-600' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, color: 'text-amber-600' },
    { id: 'recording', label: 'Recording', icon: Video, color: 'text-rose-600' },
    { id: 'materials', label: 'Materials', icon: FolderOpen, color: 'text-purple-600' },
    { id: 'worksheets', label: 'Worksheets', icon: FileSpreadsheet, color: 'text-sky-600' },
    { id: 'homework', label: 'Homework', icon: BookOpenCheck, color: 'text-emerald-600' },
    { id: 'diary', label: 'Teacher Diary', icon: BookMarked, color: 'text-purple-600' },
    { id: 'syllabus', label: 'Topics', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'announcements', label: 'Alerts', icon: Megaphone, color: 'text-rose-600' },
    { id: 'timer', label: 'Class Timer', icon: Timer, color: 'text-purple-600' },
    { id: 'subject', label: 'Subject Info', icon: Info, color: 'text-sky-600' },
    { id: 'notes', label: 'Quick Notes', icon: StickyNote, color: 'text-amber-600' },
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
    <div className="p-4 sm:p-6 space-y-4 h-[calc(100vh-5rem)] flex flex-col overflow-hidden text-slate-800">
      {/* Top Touch Tabs Toolbar */}
      <div className="flex items-center justify-between gap-3 p-2 rounded-2xl glass-panel border border-slate-200 bg-white flex-shrink-0">
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
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md'
                    : 'glass-card border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50'
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
              ? 'bg-purple-600 text-white shadow-md'
              : 'glass-card border border-slate-200 text-slate-700 hover:text-slate-900'
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
            <div className="h-full rounded-3xl overflow-hidden border border-indigo-200 shadow-sm">
              <WhiteboardCanvas />
            </div>
            <div className="h-full overflow-y-auto p-4 glass-panel rounded-3xl border border-slate-200 bg-white">
              {activeTab === 'whiteboard' ? <TodayLessonModule /> : renderModuleContent(activeTab)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
