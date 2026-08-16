// src/store/useClassStore.ts
import { create } from 'zustand';
import {
  TimetableSlot,
  AttendanceRecord,
  AttendanceStatus,
  LessonPlan,
  Worksheet,
  HomeworkAssignment,
  DiaryEntry,
  SyllabusTopic,
  Announcement
} from '../types';
import {
  mockTimetable,
  mockAttendance10A,
  mockLessonPlan10A,
  mockWorksheet10A,
  mockHomeworkList,
  mockDiaryEntries,
  mockSyllabus,
  mockAnnouncements
} from '../services/mockData';

interface ClassState {
  activeSlot: TimetableSlot;
  timetable: TimetableSlot[];
  attendance: AttendanceRecord;
  lessonPlan: LessonPlan;
  worksheet: Worksheet;
  homeworkList: HomeworkAssignment[];
  diaryEntries: DiaryEntry[];
  syllabus: SyllabusTopic[];
  announcements: Announcement[];
  isOffline: boolean;
  isSyncing: boolean;

  setActiveSlot: (slot: TimetableSlot) => void;
  updateStudentAttendance: (studentId: string, status: AttendanceStatus) => void;
  bulkMarkAttendance: (status: AttendanceStatus) => void;
  toggleLessonStep: (stepNumber: number) => void;
  addHomework: (homework: Omit<HomeworkAssignment, 'id' | 'submittedCount' | 'evaluatedCount'>) => void;
  addDiaryEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  toggleSubtopicCompletion: (topicId: string, subtopicId: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  toggleOffline: () => void;
  triggerSync: () => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  activeSlot: mockTimetable[0],
  timetable: mockTimetable,
  attendance: mockAttendance10A,
  lessonPlan: mockLessonPlan10A,
  worksheet: mockWorksheet10A,
  homeworkList: mockHomeworkList,
  diaryEntries: mockDiaryEntries,
  syllabus: mockSyllabus,
  announcements: mockAnnouncements,
  isOffline: false,
  isSyncing: false,

  setActiveSlot: (slot) => set({ activeSlot: slot }),

  updateStudentAttendance: (studentId, status) => {
    set((state) => {
      const updatedStudents = state.attendance.students.map((student) =>
        student.id === studentId ? { ...student, status } : student
      );

      const presentCount = updatedStudents.filter((s) => s.status === 'present').length;
      const absentCount = updatedStudents.filter((s) => s.status === 'absent').length;
      const lateCount = updatedStudents.filter((s) => s.status === 'late').length;
      const excusedCount = updatedStudents.filter((s) => s.status === 'excused').length;

      return {
        attendance: {
          ...state.attendance,
          students: updatedStudents,
          presentCount,
          absentCount,
          lateCount,
          excusedCount,
        },
      };
    });
    get().triggerSync();
  },

  bulkMarkAttendance: (status) => {
    set((state) => {
      const updatedStudents = state.attendance.students.map((s) => ({ ...s, status }));
      const count = updatedStudents.length;

      return {
        attendance: {
          ...state.attendance,
          students: updatedStudents,
          presentCount: status === 'present' ? count : 0,
          absentCount: status === 'absent' ? count : 0,
          lateCount: status === 'late' ? count : 0,
          excusedCount: status === 'excused' ? count : 0,
        },
      };
    });
    get().triggerSync();
  },

  toggleLessonStep: (stepNumber) => {
    set((state) => ({
      lessonPlan: {
        ...state.lessonPlan,
        teachingSteps: state.lessonPlan.teachingSteps.map((step) =>
          step.stepNumber === stepNumber ? { ...step, completed: !step.completed } : step
        ),
      },
    }));
    get().triggerSync();
  },

  addHomework: (newHw) => {
    set((state) => {
      const hwObj: HomeworkAssignment = {
        ...newHw,
        id: `hw-${Date.now()}`,
        submittedCount: 0,
        evaluatedCount: 0,
      };
      return { homeworkList: [hwObj, ...state.homeworkList] };
    });
    get().triggerSync();
  },

  addDiaryEntry: (newEntry) => {
    set((state) => {
      const entryObj: DiaryEntry = {
        ...newEntry,
        id: `dir-${Date.now()}`,
      };
      return { diaryEntries: [entryObj, ...state.diaryEntries] };
    });
    get().triggerSync();
  },

  toggleSubtopicCompletion: (topicId, subtopicId) => {
    set((state) => {
      const updatedSyllabus = state.syllabus.map((topic) => {
        if (topic.id !== topicId) return topic;

        const updatedSubtopics = topic.subtopics.map((st) =>
          st.id === subtopicId ? { ...st, completed: !st.completed } : st
        );

        const completedCount = updatedSubtopics.filter((st) => st.completed).length;
        const progressPercent = Math.round((completedCount / updatedSubtopics.length) * 100);

        return {
          ...topic,
          subtopics: updatedSubtopics,
          progressPercent,
        };
      });

      return { syllabus: updatedSyllabus };
    });
    get().triggerSync();
  },

  addAnnouncement: (newAnn) => {
    set((state) => {
      const annObj: Announcement = {
        ...newAnn,
        id: `ann-${Date.now()}`,
        date: 'Just now',
      };
      return { announcements: [annObj, ...state.announcements] };
    });
    get().triggerSync();
  },

  toggleOffline: () => set((state) => ({ isOffline: !state.isOffline })),

  triggerSync: () => {
    set({ isSyncing: true });
    setTimeout(() => {
      set({ isSyncing: false });
    }, 600);
  },
}));
