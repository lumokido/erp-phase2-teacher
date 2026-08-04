// src/pages/WorksheetsPage.tsx
import React from 'react';
import { WorksheetViewerModule } from '../components/board/WorksheetViewerModule';

export const WorksheetsPage: React.FC = () => {
  return (
    <div className="p-8">
      <WorksheetViewerModule />
    </div>
  );
};
