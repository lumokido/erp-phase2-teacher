// src/types/index.ts

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface Student {
  id: string;
  rollNumber: number;
  name: string;
  avatar: string;
  gender: 'M' | 'F';
  status: AttendanceStatus;
  notes?: string;
  parentContact?: string;
}

export interface AttendanceRecord {
  classId: string;
  date: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  students: Student[];
  isSubmitted: boolean;
}

export interface TimetableSlot {
  id: string;
  periodNumber: number;
  startTime: string;
  endTime: string;
  subject: string;
  subjectCode: string;
  gradeSection: string;
  room: string;
  teacherName: string;
  isCurrent?: boolean;
  status: 'upcoming' | 'ongoing' | 'completed';
  topic: string;
  totalStudents: number;
}

export interface LessonPlan {
  id: string;
  classId: string;
  subject: string;
  unitTitle: string;
  lessonTitle: string;
  durationMinutes: number;
  objectives: string[];
  keyVocabulary: string[];
  teachingSteps: {
    stepNumber: number;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
  }[];
  discussionPrompts: string[];
  summary: string;
}

export interface LearningMaterial {
  id: string;
  classId: string;
  title: string;
  type: 'pdf' | 'video' | 'presentation' | 'simulation' | 'image';
  size: string;
  uploadedAt: string;
  url: string;
  thumbnail?: string;
  tags: string[];
}

export interface Worksheet {
  id: string;
  classId: string;
  title: string;
  subject: string;
  gradeSection: string;
  totalQuestions: number;
  estimatedMinutes: number;
  questions: {
    id: string;
    number: number;
    questionText: string;
    type: 'multiple-choice' | 'short-answer' | 'numerical';
    options?: string[];
    answerKey: string;
    hint: string;
  }[];
  assignedDate: string;
}

export interface HomeworkAssignment {
  id: string;
  classId: string;
  subject: string;
  gradeSection: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  totalStudents: number;
  submittedCount: number;
  evaluatedCount: number;
  hasVoiceInstruction?: boolean;
  attachedWhiteboardSnapshots?: string[];
}

export interface DiaryEntry {
  id: string;
  classId: string;
  subject: string;
  date: string;
  reflectionText: string;
  studentBehaviorNotes: string;
  homeworkAssigned: string;
  nextClassPrep: string;
  tags: string[];
}

export interface SyllabusTopic {
  id: string;
  subjectId: string;
  chapterNumber: number;
  chapterTitle: string;
  progressPercent: number;
  subtopics: {
    id: string;
    title: string;
    completed: boolean;
    estimatedHours: number;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
  targetGrades: string[];
  isPinned?: boolean;
}

export interface TimerPreset {
  label: string;
  seconds: number;
  color: string;
}

export interface QuickNote {
  id: string;
  title: string;
  content: string;
  color: 'yellow' | 'blue' | 'emerald' | 'purple' | 'rose';
  updatedAt: string;
  isPinned: boolean;
}

export interface RecordingSession {
  id: string;
  classId: string;
  title: string;
  startTime: string;
  durationSeconds: number;
  fileSizeMb: number;
  status: 'recording' | 'paused' | 'saved';
  thumbnailUrl?: string;
}

export type UserRole = 'ADMIN' | 'TEACHER';

export interface UserProfile {
  id: string | number;
  name: string;
  title: string;
  email: string;
  avatar: string;
  department: string;
  employeeId: string;
  assignedClasses: string[];
  role?: UserRole;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  specialization?: string;
  joiningDate?: string;
  homeRoomClassId?: number;
}

export interface TeacherAssignment {
  classId: number;
  subjectId: number;
  academicYear: string;
}

export interface Teacher {
  id: string | number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  employeeId: string;
  designation: string;
  specialization: string;
  joiningDate: string;
  homeRoomClassId: number;
  assignments?: TeacherAssignment[];
  password?: string;
  role?: UserRole;
  avatar?: string;
}

export interface AuthLoginPayload {
  usernameOrEmail: string;
  password?: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType?: string;
  user?: UserProfile | Teacher;
  role?: UserRole;
}

