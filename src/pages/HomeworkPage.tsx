// src/pages/HomeworkPage.tsx
import React from 'react';
import { HomeworkManagerModule } from '../components/board/HomeworkManagerModule';

export const HomeworkPage: React.FC = () => {
  return (
    <div className="p-8">
      <HomeworkManagerModule />
    </div>
  );
};
