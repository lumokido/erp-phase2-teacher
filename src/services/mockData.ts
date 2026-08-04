// src/services/mockData.ts

import {
  UserProfile,
  TimetableSlot,
  Student,
  AttendanceRecord,
  LessonPlan,
  LearningMaterial,
  Worksheet,
  HomeworkAssignment,
  DiaryEntry,
  SyllabusTopic,
  Announcement,
  QuickNote,
  RecordingSession
} from '../types';

export const mockUser: UserProfile = {
  id: 'usr-101',
  name: 'Dr. Sarah Jenkins',
  title: 'Senior Physics & Science Lead Teacher',
  email: 's.jenkins@oakridge-academy.edu',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  department: 'Department of Natural Sciences',
  employeeId: 'EMP-9824',
  assignedClasses: ['10-A Physics', '9-B Mathematics', '11-A Chemistry', '8-C English', '12-A Biology']
};

export const mockTimetable: TimetableSlot[] = [
  {
    id: 'slot-1',
    periodNumber: 1,
    startTime: '08:30 AM',
    endTime: '09:15 AM',
    subject: '10th Grade Physics',
    subjectCode: 'PHY-101',
    gradeSection: 'Grade 10-A',
    room: 'Smart Board Room 302',
    teacherName: 'Dr. Sarah Jenkins',
    status: 'ongoing',
    isCurrent: true,
    topic: 'Electromagnetic Induction & Faraday\'s Law',
    totalStudents: 28,
  },
  {
    id: 'slot-2',
    periodNumber: 2,
    startTime: '09:30 AM',
    endTime: '10:15 AM',
    subject: '9th Grade Mathematics',
    subjectCode: 'MTH-902',
    gradeSection: 'Grade 9-B',
    room: 'Mathematics Hall 105',
    teacherName: 'Dr. Sarah Jenkins',
    status: 'upcoming',
    topic: 'Solving Quadratic Equations via Quadratic Formula',
    totalStudents: 32,
  },
  {
    id: 'slot-3',
    periodNumber: 3,
    startTime: '10:30 AM',
    endTime: '11:15 AM',
    subject: '11th Grade Chemistry',
    subjectCode: 'CHM-110',
    gradeSection: 'Grade 11-A',
    room: 'Science Lab 2',
    teacherName: 'Dr. Sarah Jenkins',
    status: 'upcoming',
    topic: 'VSEPR Theory & Molecular Geometry',
    totalStudents: 25,
  },
  {
    id: 'slot-4',
    periodNumber: 4,
    startTime: '11:30 AM',
    endTime: '12:15 PM',
    subject: '8th Grade English',
    subjectCode: 'ENG-801',
    gradeSection: 'Grade 8-C',
    room: 'Humanities Wing 204',
    teacherName: 'Dr. Sarah Jenkins',
    status: 'upcoming',
    topic: 'Shakespearean Sonnets & Metaphorical Analysis',
    totalStudents: 30,
  },
  {
    id: 'slot-5',
    periodNumber: 5,
    startTime: '01:30 PM',
    endTime: '02:15 PM',
    subject: '12th Grade Biology',
    subjectCode: 'BIO-120',
    gradeSection: 'Grade 12-A',
    room: 'Advanced Bio Lab 1',
    teacherName: 'Dr. Sarah Jenkins',
    status: 'upcoming',
    topic: 'CRISPR Gene Editing & Recombinant DNA',
    totalStudents: 24,
  }
];

export const mockStudents10A: Student[] = [
  { id: 'st-01', rollNumber: 1, name: 'Alexander Wright', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', gender: 'M', status: 'present' },
  { id: 'st-02', rollNumber: 2, name: 'Amara Chen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', gender: 'F', status: 'present' },
  { id: 'st-03', rollNumber: 3, name: 'Benjamin Miller', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', gender: 'M', status: 'present' },
  { id: 'st-04', rollNumber: 4, name: 'Charlotte Davis', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', gender: 'F', status: 'late', notes: 'Arrived at 08:35 AM' },
  { id: 'st-05', rollNumber: 5, name: 'Daniel Martinez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', gender: 'M', status: 'present' },
  { id: 'st-06', rollNumber: 6, name: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', gender: 'F', status: 'present' },
  { id: 'st-07', rollNumber: 7, name: 'Ethan Thomas', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', gender: 'M', status: 'absent', notes: 'Medical note submitted' },
  { id: 'st-08', rollNumber: 8, name: 'Fiona Gallagher', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', gender: 'F', status: 'present' },
  { id: 'st-09', rollNumber: 9, name: 'Gabriel Rossi', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', gender: 'M', status: 'present' },
  { id: 'st-10', rollNumber: 10, name: 'Hannah Taylor', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', gender: 'F', status: 'excused' },
  { id: 'st-11', rollNumber: 11, name: 'Isaac Newton Jr.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', gender: 'M', status: 'present' },
  { id: 'st-12', rollNumber: 12, name: 'Jessica Alba', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', gender: 'F', status: 'present' },
  { id: 'st-13', rollNumber: 13, name: 'Kevin Durant', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150', gender: 'M', status: 'present' },
  { id: 'st-14', rollNumber: 14, name: 'Lily Collins', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150', gender: 'F', status: 'present' },
  { id: 'st-15', rollNumber: 15, name: 'Mason Mount', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', gender: 'M', status: 'present' },
  { id: 'st-16', rollNumber: 16, name: 'Nora Jones', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150', gender: 'F', status: 'present' },
  { id: 'st-17', rollNumber: 17, name: 'Oliver Twist', avatar: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=150', gender: 'M', status: 'present' },
  { id: 'st-18', rollNumber: 18, name: 'Penelope Cruz', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150', gender: 'F', status: 'present' },
  { id: 'st-19', rollNumber: 19, name: 'Quincy Adams', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', gender: 'M', status: 'present' },
  { id: 'st-20', rollNumber: 20, name: 'Rachel Green', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150', gender: 'F', status: 'present' },
  { id: 'st-21', rollNumber: 21, name: 'Samuel Jackson', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150', gender: 'M', status: 'present' },
  { id: 'st-22', rollNumber: 22, name: 'Tara Reid', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', gender: 'F', status: 'present' },
  { id: 'st-23', rollNumber: 23, name: 'Ulysses Grant', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', gender: 'M', status: 'present' },
  { id: 'st-24', rollNumber: 24, name: 'Victoria Beckham', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', gender: 'F', status: 'present' },
  { id: 'st-25', rollNumber: 25, name: 'William Shakespeare', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', gender: 'M', status: 'present' },
  { id: 'st-26', rollNumber: 26, name: 'Xena Warrior', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', gender: 'F', status: 'present' },
  { id: 'st-27', rollNumber: 27, name: 'Yusuf Islam', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', gender: 'M', status: 'present' },
  { id: 'st-28', rollNumber: 28, name: 'Zendaya Coleman', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', gender: 'F', status: 'present' }
];

export const mockAttendance10A: AttendanceRecord = {
  classId: 'slot-1',
  date: '2026-07-31',
  totalStudents: 28,
  presentCount: 25,
  absentCount: 1,
  lateCount: 1,
  excusedCount: 1,
  students: mockStudents10A,
  isSubmitted: true
};

export const mockLessonPlan10A: LessonPlan = {
  id: 'lp-101',
  classId: 'slot-1',
  subject: '10th Grade Physics',
  unitTitle: 'Unit 4: Electromagnetism & Induction',
  lessonTitle: 'Faraday\'s Law of Electromagnetic Induction',
  durationMinutes: 45,
  objectives: [
    'Understand how magnetic flux changes generate electromotive force (EMF).',
    'Formulate and apply Faraday\'s Equation: ε = -N (ΔΦ/Δt).',
    'Demonstrate Lenz\'s Law using the magnet & coil interactive Smart Board simulation.',
    'Solve 3 real-world quantitative problems on induction in transformers.'
  ],
  keyVocabulary: [
    'Magnetic Flux (Φ)',
    'Electromotive Force (EMF)',
    'Lenz\'s Law (Direction of induced current)',
    'Solenoid Induction',
    'Eddy Currents'
  ],
  teachingSteps: [
    { stepNumber: 1, title: 'Warm-up & Spark Question', description: 'Ask students how wireless phone chargers transfer power without wires.', duration: '5 min', completed: true },
    { stepNumber: 2, title: 'Interactive Smart Board Demo', description: 'Move virtual bar magnet through copper coil and observe galvanometer needle swing.', duration: '12 min', completed: true },
    { stepNumber: 3, title: 'Deriving Faraday\'s Law', description: 'Write ε = -dΦ/dt on Whiteboard; break down components N, B, Area, and angle θ.', duration: '15 min', completed: false },
    { stepNumber: 4, title: 'Group Problem Solving', description: 'Students solve Worksheet Question #3 in pairs using Smart Board touch stylus.', duration: '10 min', completed: false },
    { stepNumber: 5, title: 'Wrap-up & Exit Ticket', description: 'Quick 2-minute oral check on Lenz\'s Law minus sign physical meaning.', duration: '3 min', completed: false }
  ],
  discussionPrompts: [
    'Why does a magnet fall slower through a copper pipe than a plastic pipe?',
    'What happens to the induced voltage if we double the coil loop count?',
    'How do electric guitars use electromagnetic pick-ups?'
  ],
  summary: 'In this session, students explore how changing magnetic flux produces an electric field and current, forming the foundational principle behind electrical generators and transformers.'
};

export const mockMaterials10A: LearningMaterial[] = [
  {
    id: 'mat-1',
    classId: 'slot-1',
    title: 'Faraday Law Slide Deck (PDF)',
    type: 'presentation',
    size: '4.2 MB',
    uploadedAt: 'Today, 07:45 AM',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    tags: ['Slides', 'Faraday', 'Induction']
  },
  {
    id: 'mat-2',
    classId: 'slot-1',
    title: 'PhET Magnet & Coil Simulation',
    type: 'simulation',
    size: 'Interactive WebGL',
    uploadedAt: 'Yesterday',
    url: 'https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_all.html',
    tags: ['Interactive', 'Lab', 'Simulation']
  },
  {
    id: 'mat-3',
    classId: 'slot-1',
    title: 'Wireless Power & Eddy Currents Video',
    type: 'video',
    size: '18.5 MB',
    uploadedAt: '2 days ago',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tags: ['Video', 'Demo']
  },
  {
    id: 'mat-4',
    classId: 'slot-1',
    title: 'Formula Sheet - Physics Unit 4',
    type: 'pdf',
    size: '1.1 MB',
    uploadedAt: '3 days ago',
    url: '#',
    tags: ['Reference', 'Formulas']
  }
];

export const mockWorksheet10A: Worksheet = {
  id: 'ws-101',
  classId: 'slot-1',
  title: 'Electromagnetic Induction Practice Sheet #4',
  subject: '10th Grade Physics',
  gradeSection: 'Grade 10-A',
  totalQuestions: 4,
  estimatedMinutes: 15,
  assignedDate: '2026-07-31',
  questions: [
    {
      id: 'q1',
      number: 1,
      questionText: 'A circular coil of 50 turns with radius 0.1 m is placed perpendicular to a magnetic field of 0.4 T. If the field drops to 0 T in 0.02 seconds, calculate the magnitude of induced EMF.',
      type: 'numerical',
      answerKey: 'ε = 39.27 Volts (Φ = B * A = 0.4 * π * (0.1)^2 = 0.01257 Wb. ΔΦ/Δt = 0.628 V/turn * 50 turns = 39.27 V)',
      hint: 'First find the flux Φ = B * A, then multiply by N and divide by Δt.'
    },
    {
      id: 'q2',
      number: 2,
      questionText: 'According to Lenz\'s Law, the direction of an induced current always _____ the change in magnetic flux that produced it.',
      type: 'multiple-choice',
      options: ['A) Amplifies', 'B) Opposes', 'C) Equals', 'D) Ignores'],
      answerKey: 'B) Opposes',
      hint: 'Think about conservation of energy!'
    },
    {
      id: 'q3',
      number: 3,
      questionText: 'Explain why transformers only work with Alternating Current (AC) and NOT Direct Current (DC).',
      type: 'short-answer',
      answerKey: 'DC creates a static magnetic field (ΔΦ/Δt = 0), so no EMF is induced in the secondary coil. AC continuously changes current and flux, producing continuous induction.',
      hint: 'Consider what is required for ΔΦ/Δt to be greater than zero.'
    },
    {
      id: 'q4',
      number: 4,
      questionText: 'State 2 real-world applications of Eddy Currents in industrial technology.',
      type: 'short-answer',
      answerKey: '1. Magnetic braking systems in roller coasters/trains. 2. Induction cooking stoves.',
      hint: 'Think about heating and contactless braking.'
    }
  ]
};

export const mockHomeworkList: HomeworkAssignment[] = [
  {
    id: 'hw-1',
    classId: 'slot-1',
    subject: '10th Grade Physics',
    gradeSection: 'Grade 10-A',
    title: 'Faraday Law Quantitative Problems (Ex 4.2)',
    description: 'Solve questions 1 through 8 on page 142. Draw magnetic flux diagram for question 5.',
    assignedDate: '2026-07-31',
    dueDate: '2026-08-02',
    totalStudents: 28,
    submittedCount: 22,
    evaluatedCount: 18,
    hasVoiceInstruction: true,
    attachedWhiteboardSnapshots: ['whiteboard_snap_induction.png']
  },
  {
    id: 'hw-2',
    classId: 'slot-2',
    subject: '9th Grade Mathematics',
    gradeSection: 'Grade 9-B',
    title: 'Quadratic Formula Worksheet #3',
    description: 'Complete all odd numbered problems. State discriminant D for each equation.',
    assignedDate: '2026-07-30',
    dueDate: '2026-08-01',
    totalStudents: 32,
    submittedCount: 30,
    evaluatedCount: 25
  },
  {
    id: 'hw-3',
    classId: 'slot-3',
    subject: '11th Grade Chemistry',
    gradeSection: 'Grade 11-A',
    title: 'Molecular Geometry 3D Model Project',
    description: 'Build 3 VSEPR shapes using clay/balls and submit photos.',
    assignedDate: '2026-07-28',
    dueDate: '2026-08-04',
    totalStudents: 25,
    submittedCount: 15,
    evaluatedCount: 10
  }
];

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: 'dir-1',
    classId: 'slot-1',
    subject: '10th Grade Physics',
    date: '2026-07-31',
    reflectionText: 'Class grasped Faraday\'s Law concept very well with the PhET simulation. Alexander and Amara led the group calculation.',
    studentBehaviorNotes: 'Ethan was absent due to flu. Charlotte arrived 5 mins late but engaged actively.',
    homeworkAssigned: 'Page 142 Exercise 4.2 (Q1-Q8)',
    nextClassPrep: 'Prepare Lenz\'s Law physical aluminum ring experiment demo.',
    tags: ['Physics', 'Electromagnetism', 'Lab Success']
  },
  {
    id: 'dir-2',
    classId: 'slot-2',
    subject: '9th Grade Mathematics',
    date: '2026-07-30',
    reflectionText: 'Students needed additional practice with negative discriminants resulting in complex roots.',
    studentBehaviorNotes: 'Class attention was high. Group 3 finished early.',
    homeworkAssigned: 'Worksheet #3 Quadratic Formula',
    nextClassPrep: 'Review complex numbers intro for 10 minutes.',
    tags: ['Math', 'Algebra', 'Quadratic']
  }
];

export const mockSyllabus: SyllabusTopic[] = [
  {
    id: 'syl-1',
    subjectId: 'PHY-101',
    chapterNumber: 1,
    chapterTitle: 'Electrostatics & Electric Fields',
    progressPercent: 100,
    subtopics: [
      { id: 'sub-1', title: 'Coulomb\'s Law & Charge Interactions', completed: true, estimatedHours: 3 },
      { id: 'sub-2', title: 'Electric Field Strength & Vector Diagrams', completed: true, estimatedHours: 4 },
      { id: 'sub-3', title: 'Electric Potential & Capacitance', completed: true, estimatedHours: 5 }
    ]
  },
  {
    id: 'syl-2',
    subjectId: 'PHY-101',
    chapterNumber: 2,
    chapterTitle: 'Current Electricity & Circuits',
    progressPercent: 100,
    subtopics: [
      { id: 'sub-4', title: 'Ohm\'s Law & Resistance Factors', completed: true, estimatedHours: 3 },
      { id: 'sub-5', title: 'Kirchhoff\'s Circuit Laws (KVL & KCL)', completed: true, estimatedHours: 4 },
      { id: 'sub-6', title: 'Internal Resistance & EMF', completed: true, estimatedHours: 3 }
    ]
  },
  {
    id: 'syl-3',
    subjectId: 'PHY-101',
    chapterNumber: 3,
    chapterTitle: 'Magnetic Effects of Electric Current',
    progressPercent: 100,
    subtopics: [
      { id: 'sub-7', title: 'Biot-Savart Law & Solenoids', completed: true, estimatedHours: 4 },
      { id: 'sub-8', title: 'Lorentz Force & Cyclotron Motion', completed: true, estimatedHours: 4 }
    ]
  },
  {
    id: 'syl-4',
    subjectId: 'PHY-101',
    chapterNumber: 4,
    chapterTitle: 'Electromagnetic Induction & AC Circuits',
    progressPercent: 65,
    subtopics: [
      { id: 'sub-9', title: 'Magnetic Flux & Faraday\'s Law', completed: true, estimatedHours: 4 },
      { id: 'sub-10', title: 'Lenz\'s Law & Energy Conservation', completed: true, estimatedHours: 3 },
      { id: 'sub-11', title: 'Self & Mutual Inductance', completed: false, estimatedHours: 4 },
      { id: 'sub-12', title: 'AC Generators & Transformers', completed: false, estimatedHours: 5 }
    ]
  },
  {
    id: 'syl-5',
    subjectId: 'PHY-101',
    chapterNumber: 5,
    chapterTitle: 'Optics & Wave Physics',
    progressPercent: 0,
    subtopics: [
      { id: 'sub-13', title: 'Refraction & Total Internal Reflection', completed: false, estimatedHours: 4 },
      { id: 'sub-14', title: 'Wave Interference & Young\'s Double Slit', completed: false, estimatedHours: 5 }
    ]
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Mid-Term Physics Practical Lab Examination',
    content: 'The Mid-Term Practical Exam will take place in Science Lab 2 next Thursday at 09:00 AM. Ensure all lab journals are submitted by Wednesday 4:00 PM.',
    priority: 'high',
    date: 'Today, 08:00 AM',
    author: 'Dr. Sarah Jenkins',
    targetGrades: ['Grade 10-A', 'Grade 11-A'],
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'Annual STEM Science Fair Registration Open',
    content: 'Students interested in entering projects for the State STEM Fair should submit project abstracts to the Science Department office by August 10th.',
    priority: 'medium',
    date: 'Yesterday',
    author: 'Principal Office',
    targetGrades: ['All Grades']
  },
  {
    id: 'ann-3',
    title: 'Smart Board Software Update v2.4 Scheduled',
    content: 'Classroom Smart Boards will undergo routine cloud maintenance this Friday at 5:00 PM. No interruption to daytime teaching sessions.',
    priority: 'low',
    date: '3 days ago',
    author: 'IT Helpdesk',
    targetGrades: ['Teachers Only']
  }
];

export const mockQuickNotes: QuickNote[] = [
  {
    id: 'qn-1',
    title: 'Lab Supplies Reminder',
    content: 'Order 30 extra copper coil spools and neodymium bar magnets from Science Direct before Friday.',
    color: 'yellow',
    updatedAt: '10 mins ago',
    isPinned: true
  },
  {
    id: 'qn-2',
    title: 'Student Follow-up',
    content: 'Check Ethan Thomas\'s makeup quiz score for Chapter 3.',
    color: 'emerald',
    updatedAt: '1 hour ago',
    isPinned: false
  },
  {
    id: 'qn-3',
    title: 'Parent Meeting Note',
    content: 'Mrs. Davis requested a 10-min meeting regarding Charlotte\'s honors physics track.',
    color: 'purple',
    updatedAt: 'Yesterday',
    isPinned: true
  }
];

export const mockRecordings: RecordingSession[] = [
  {
    id: 'rec-1',
    classId: 'slot-1',
    title: 'Physics 10A - Induction & Magnetic Flux',
    startTime: '08:35 AM',
    durationSeconds: 2420, // 40m 20s
    fileSizeMb: 320,
    status: 'saved',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300'
  },
  {
    id: 'rec-2',
    classId: 'slot-1',
    title: 'Physics 10A - Oersted Experiment Demo',
    startTime: 'Yesterday 08:30 AM',
    durationSeconds: 2700, // 45m
    fileSizeMb: 380,
    status: 'saved',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300'
  }
];
