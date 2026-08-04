// src/pages/AttendancePage.tsx
import React from 'react';
import { AttendanceGridModule } from '../components/board/AttendanceGridModule';

export const AttendancePage: React.FC = () => {
  return (
    <div className="p-8">
      <AttendanceGridModule />
    </div>
  );
};
