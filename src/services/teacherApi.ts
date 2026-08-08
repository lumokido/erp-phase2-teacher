// src/services/teacherApi.ts
import axios from 'axios';
import { Teacher, AuthResponse, UserRole, UserProfile } from '../types';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Stateful initial teachers list for offline / fallback mode
export const initialTeachersList: Teacher[] = [
  {
    id: 1,
    username: 'principal_admin',
    email: 'principal@school.edu',
    firstName: 'Principal',
    lastName: 'Admin',
    phone: '+19876543210',
    dateOfBirth: '1975-04-12',
    employeeId: 'EMP-ADM-001',
    designation: 'Principal & School Administrator',
    specialization: 'Educational Leadership & Governance',
    joiningDate: '2015-08-01',
    homeRoomClassId: 0,
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    assignments: []
  },
  {
    id: 2,
    username: 'sarah_jenkins',
    email: 's.jenkins@school.edu',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    phone: '+19876543211',
    dateOfBirth: '1985-06-20',
    employeeId: 'EMP-T-001',
    designation: 'Senior Physics Lecturer',
    specialization: 'Theoretical & Quantum Physics',
    joiningDate: '2020-09-01',
    homeRoomClassId: 101,
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    assignments: [
      { classId: 101, subjectId: 1, academicYear: '2025-2026' }
    ]
  },
  {
    id: 3,
    username: 'teacher_robert',
    email: 'robert.brown@school.edu',
    firstName: 'Robert',
    lastName: 'Brown',
    phone: '+19876543299',
    dateOfBirth: '1988-12-15',
    employeeId: 'EMP-T-003',
    designation: 'Senior Chemistry Teacher',
    specialization: 'Organic Chemistry',
    joiningDate: '2024-05-10',
    homeRoomClassId: 1,
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    assignments: [
      { classId: 1, subjectId: 2, academicYear: '2025-2026' }
    ]
  }
];

// Local state container for fallback mode
let localTeachers: Teacher[] = [...initialTeachersList];

/**
 * Step 1 & 3: Admin / Teacher Login
 * POST http://localhost:8080/api/v1/auth/login
 */
export const loginUserApi = async (usernameOrEmail: string, password?: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      usernameOrEmail,
      password: password || 'password123'
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 3000
    });
    
    // If backend returns data
    const data = response.data;
    const token = data.accessToken || data.token || `jwt_token_${Date.now()}`;
    const role: UserRole = data.role || (usernameOrEmail.toLowerCase().includes('admin') || usernameOrEmail === 'principal_admin' ? 'ADMIN' : 'TEACHER');
    
    return {
      accessToken: token,
      tokenType: 'Bearer',
      role,
      user: data.user || buildUserProfileFromUsername(usernameOrEmail, role)
    };
  } catch (err) {
    console.warn('[API Warning] Backend unreachable or failed. Using fallback authentication mode.', err);
    
    // Fallback Mock authentication handling
    const isPrincipal = usernameOrEmail === 'principal_admin' || usernameOrEmail.toLowerCase().includes('admin');
    const role: UserRole = isPrincipal ? 'ADMIN' : 'TEACHER';
    const mockToken = `mock_jwt_${isPrincipal ? 'ADMIN' : 'TEACHER'}_${Date.now()}`;
    
    // Find teacher in local storage if exists
    const existing = localTeachers.find(
      t => t.username.toLowerCase() === usernameOrEmail.toLowerCase() || t.email.toLowerCase() === usernameOrEmail.toLowerCase()
    );

    const userProfile: UserProfile = existing ? {
      id: existing.id,
      name: `${existing.firstName} ${existing.lastName}`,
      title: existing.designation,
      email: existing.email,
      avatar: existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      department: existing.specialization,
      employeeId: existing.employeeId,
      assignedClasses: existing.assignments?.map(a => `Grade ${a.classId}`) || ['Grade 10-A'],
      role: existing.role || role,
      username: existing.username,
      firstName: existing.firstName,
      lastName: existing.lastName,
      phone: existing.phone,
      specialization: existing.specialization,
      joiningDate: existing.joiningDate,
      homeRoomClassId: existing.homeRoomClassId
    } : buildUserProfileFromUsername(usernameOrEmail, role);

    return {
      accessToken: mockToken,
      tokenType: 'Bearer',
      role,
      user: userProfile
    };
  }
};

/**
 * Step 2: Admin Add/Create a New Teacher
 * POST http://localhost:8080/api/v1/teachers
 */
export const createTeacherApi = async (teacherData: Partial<Teacher>, token?: string): Promise<Teacher> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/teachers`, teacherData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      timeout: 3000
    });
    return response.data;
  } catch (err) {
    console.warn('[API Warning] Backend unreachable. Storing teacher in local state.', err);
    const newId = localTeachers.length + 1;
    const newTeacher: Teacher = {
      id: newId,
      username: teacherData.username || `teacher_${Date.now()}`,
      password: teacherData.password || 'TeacherPassword123',
      email: teacherData.email || 'new.teacher@school.edu',
      firstName: teacherData.firstName || 'New',
      lastName: teacherData.lastName || 'Teacher',
      phone: teacherData.phone || '+19876543200',
      dateOfBirth: teacherData.dateOfBirth || '1990-01-01',
      employeeId: teacherData.employeeId || `EMP-T-00${newId}`,
      designation: teacherData.designation || 'Teacher',
      specialization: teacherData.specialization || 'General',
      joiningDate: teacherData.joiningDate || new Date().toISOString().split('T')[0],
      homeRoomClassId: teacherData.homeRoomClassId || 1,
      assignments: teacherData.assignments || [],
      role: 'TEACHER',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + (newId * 1000)}?auto=format&fit=crop&q=80&w=250`
    };
    localTeachers = [newTeacher, ...localTeachers];
    return newTeacher;
  }
};

/**
 * Step 4: Fetch Teacher Profile by ID
 * GET http://localhost:8080/api/v1/teachers/:id
 */
export const getTeacherByIdApi = async (id: string | number, token?: string): Promise<Teacher> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
      timeout: 3000
    });
    return response.data;
  } catch (err) {
    console.warn(`[API Warning] Backend unreachable for teacher #${id}. Returning from local state.`, err);
    const found = localTeachers.find(t => String(t.id) === String(id));
    if (found) return found;
    return localTeachers[0];
  }
};

/**
 * Step 5: Admin List All Teachers
 * GET http://localhost:8080/api/v1/teachers
 */
export const listTeachersApi = async (token?: string): Promise<Teacher[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teachers`, {
      headers: { 'Authorization': `Bearer ${token}` },
      timeout: 3000
    });
    return response.data;
  } catch (err) {
    console.warn('[API Warning] Backend unreachable. Returning local teachers list.', err);
    return localTeachers;
  }
};

/**
 * Step 6: Admin Update Teacher Details
 * PUT http://localhost:8080/api/v1/teachers/:id
 */
export const updateTeacherApi = async (id: string | number, teacherData: Partial<Teacher>, token?: string): Promise<Teacher> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/teachers/${id}`, teacherData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      timeout: 3000
    });
    return response.data;
  } catch (err) {
    console.warn(`[API Warning] Backend unreachable for updating teacher #${id}. Updating local state.`, err);
    localTeachers = localTeachers.map(t => {
      if (String(t.id) === String(id)) {
        return { ...t, ...teacherData };
      }
      return t;
    });
    const updated = localTeachers.find(t => String(t.id) === String(id));
    return updated || localTeachers[0];
  }
};

// Utility helper to build fallback profile
function buildUserProfileFromUsername(username: string, role: UserRole): UserProfile {
  if (role === 'ADMIN' || username === 'principal_admin') {
    return {
      id: '1',
      name: 'Principal Admin',
      title: 'Principal & School Administrator',
      email: 'principal@school.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      department: 'School Administration',
      employeeId: 'EMP-ADM-001',
      assignedClasses: ['All Grades'],
      role: 'ADMIN',
      username: 'principal_admin',
      firstName: 'Principal',
      lastName: 'Admin'
    };
  }
  return {
    id: '3',
    name: 'Robert Brown',
    title: 'Senior Chemistry Teacher',
    email: 'robert.brown@school.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'Organic Chemistry',
    employeeId: 'EMP-T-003',
    assignedClasses: ['Grade 10-A', 'Grade 11-C'],
    role: 'TEACHER',
    username: username,
    firstName: 'Robert',
    lastName: 'Brown',
    phone: '+19876543299',
    specialization: 'Organic Chemistry',
    joiningDate: '2024-05-10',
    homeRoomClassId: 1
  };
}
