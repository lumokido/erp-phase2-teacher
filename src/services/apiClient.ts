// src/services/apiClient.ts
import axios from 'axios';
import { mockTimetable, mockAttendance10A, mockLessonPlan10A, mockMaterials10A, mockWorksheet10A, mockHomeworkList, mockDiaryEntries, mockSyllabus, mockAnnouncements, mockQuickNotes, mockRecordings } from './mockData';

// Simulated API Client for Digital Board
export const apiClient = axios.create({
  baseURL: 'https://api.digitalboard.edu/v1',
  timeout: 5000,
});

// Mock network delay helper
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTimetable = async () => {
  await delay(250);
  return mockTimetable;
};

export const fetchAttendanceRecord = async (classId: string) => {
  await delay(200);
  return mockAttendance10A;
};

export const submitAttendance = async (attendanceData: any) => {
  await delay(400);
  return { success: true, timestamp: new Date().toISOString() };
};

export const fetchLessonPlan = async (classId: string) => {
  await delay(200);
  return mockLessonPlan10A;
};

export const fetchLearningMaterials = async (classId: string) => {
  await delay(200);
  return mockMaterials10A;
};

export const fetchWorksheet = async (classId: string) => {
  await delay(200);
  return mockWorksheet10A;
};

export const fetchHomework = async () => {
  await delay(200);
  return mockHomeworkList;
};

export const fetchDiaryEntries = async () => {
  await delay(200);
  return mockDiaryEntries;
};

export const fetchSyllabus = async (subjectId: string) => {
  await delay(200);
  return mockSyllabus;
};

export const fetchAnnouncements = async () => {
  await delay(200);
  return mockAnnouncements;
};

export const fetchQuickNotes = async () => {
  await delay(150);
  return mockQuickNotes;
};

export const fetchRecordings = async () => {
  await delay(200);
  return mockRecordings;
};
