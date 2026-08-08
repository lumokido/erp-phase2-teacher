// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { CommandPalette } from './components/common/CommandPalette';
import { ShortcutsModal } from './components/common/ShortcutsModal';
import { FloatingTimer } from './components/common/FloatingTimer';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TeachersPage } from './pages/TeachersPage';
import { TimetablePage } from './pages/TimetablePage';
import { DigitalBoardPage } from './pages/DigitalBoardPage';
import { HomeworkPage } from './pages/HomeworkPage';
import { WorksheetsPage } from './pages/WorksheetsPage';
import { FilesPage } from './pages/FilesPage';
import { DiaryPage } from './pages/DiaryPage';
import { AttendancePage } from './pages/AttendancePage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { useAuthStore } from './store/useAuthStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden text-slate-800 select-none">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          onOpenCommandPalette={() => setCmdOpen(true)}
          onOpenShortcuts={() => setShortcutsOpen(true)}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          {children}
        </main>
      </div>

      <FloatingTimer />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <ShortcutsModal isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/teachers" element={<TeachersPage />} />
                    <Route path="/timetable" element={<TimetablePage />} />
                    <Route path="/board" element={<DigitalBoardPage />} />
                    <Route path="/homework" element={<HomeworkPage />} />
                    <Route path="/worksheets" element={<WorksheetsPage />} />
                    <Route path="/files" element={<FilesPage />} />
                    <Route path="/diary" element={<DiaryPage />} />
                    <Route path="/attendance" element={<AttendancePage />} />
                    <Route path="/announcements" element={<AnnouncementsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
