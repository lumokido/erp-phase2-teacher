// src/pages/DiaryPage.tsx
import React from 'react';
import { TeacherDiaryModule } from '../components/board/TeacherDiaryModule';

export const DiaryPage: React.FC = () => {
  return (
    <div className="p-8">
      <TeacherDiaryModule />
    </div>
  );
};
