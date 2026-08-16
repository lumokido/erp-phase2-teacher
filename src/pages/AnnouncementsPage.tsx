// src/pages/AnnouncementsPage.tsx
import React from 'react';
import { AnnouncementsModule } from '../components/board/AnnouncementsModule';

export const AnnouncementsPage: React.FC = () => {
  return (
    <div className="p-8">
      <AnnouncementsModule />
    </div>
  );
};
