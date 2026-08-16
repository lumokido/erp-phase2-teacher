// src/pages/TeachersPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Eye,
  Shield,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  Award,
  Terminal,
  Copy,
  Check,
  X,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Teacher, TeacherAssignment } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import {
  listTeachersApi,
  createTeacherApi,
  updateTeacherApi,
  getTeacherByIdApi
} from '../services/teacherApi';

export const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showCurlConsole, setShowCurlConsole] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    username: 'teacher_robert',
    password: 'TeacherPassword123',
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
    assignments: [
      { classId: 1, subjectId: 2, academicYear: '2025-2026' }
    ]
  });

  const { token, role } = useAuthStore();

  const fetchTeachers = async () => {
    setLoading(true);
    const data = await listTeachersApi(token || undefined);
    setTeachers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, [token]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createTeacherApi(formData, token || undefined);
    await fetchTeachers();
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    setLoading(true);
    await updateTeacherApi(selectedTeacher.id, formData, token || undefined);
    await fetchTeachers();
    setIsEditModalOpen(false);
  };

  const handleViewTeacher = async (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewModalOpen(true);
    // Call GET /api/v1/teachers/:id
    const fetched = await getTeacherByIdApi(teacher.id, token || undefined);
    if (fetched) setSelectedTeacher(fetched);
  };

  const openEditModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      username: teacher.username || '',
      password: teacher.password || 'TeacherPassword123',
      email: teacher.email || '',
      firstName: teacher.firstName || '',
      lastName: teacher.lastName || '',
      phone: teacher.phone || '',
      dateOfBirth: teacher.dateOfBirth || '',
      employeeId: teacher.employeeId || '',
      designation: teacher.designation || '',
      specialization: teacher.specialization || '',
      joiningDate: teacher.joiningDate || '',
      homeRoomClassId: teacher.homeRoomClassId || 1,
      assignments: teacher.assignments || [{ classId: 1, subjectId: 2, academicYear: '2025-2026' }]
    });
    setIsEditModalOpen(true);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredTeachers = teachers.filter((t) => {
    const fullName = `${t.firstName} ${t.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      fullName.includes(query) ||
      t.username.toLowerCase().includes(query) ||
      t.email.toLowerCase().includes(query) ||
      t.designation.toLowerCase().includes(query) ||
      t.employeeId.toLowerCase().includes(query)
    );
  });

  const curlCommands = [
    {
      step: "1. Admin (Principal) Login",
      cmd: `curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "usernameOrEmail": "principal_admin",
    "password": "password123"
  }'`
    },
    {
      step: "2. Admin Add/Create a New Teacher",
      cmd: `curl -X POST http://localhost:8080/api/v1/teachers \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "teacher_robert",
    "password": "TeacherPassword123",
    "email": "robert.brown@school.edu",
    "firstName": "Robert",
    "lastName": "Brown",
    "phone": "+19876543299",
    "dateOfBirth": "1988-12-15",
    "employeeId": "EMP-T-003",
    "designation": "Senior Chemistry Teacher",
    "specialization": "Organic Chemistry",
    "joiningDate": "2024-05-10",
    "homeRoomClassId": 1,
    "assignments": [
      {
        "classId": 1,
        "subjectId": 2,
        "academicYear": "2025-2026"
      }
    ]
  }'`
    },
    {
      step: "3. Teacher Login (New Teacher)",
      cmd: `curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "usernameOrEmail": "teacher_robert",
    "password": "TeacherPassword123"
  }'`
    },
    {
      step: "4. Fetch Teacher Profile by ID",
      cmd: `curl -X GET http://localhost:8080/api/v1/teachers/3 \\
  -H "Authorization: Bearer $TEACHER_TOKEN"`
    },
    {
      step: "5. Admin List All Teachers",
      cmd: `curl -X GET http://localhost:8080/api/v1/teachers \\
  -H "Authorization: Bearer $ADMIN_TOKEN"`
    },
    {
      step: "6. Admin Update Teacher Details",
      cmd: `curl -X PUT http://localhost:8080/api/v1/teachers/3 \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "teacher_robert",
    "email": "robert.brown@school.edu",
    "firstName": "Robert",
    "lastName": "Brown",
    "phone": "+19876543299",
    "dateOfBirth": "1988-12-15",
    "employeeId": "EMP-T-003",
    "designation": "Head of Science Department",
    "specialization": "Advanced Organic Chemistry",
    "joiningDate": "2024-05-10",
    "homeRoomClassId": 1
  }'`
    }
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-200 text-slate-800">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-card-accent border border-indigo-200 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider border border-indigo-300">
              Admin & Teacher Management
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold flex items-center gap-1 border border-amber-300">
              <Shield className="w-3.5 h-3.5" /> Auth Role: {role}
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Teachers Directory & API Suite
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Manage teacher profiles, assign room classes, update staff designation, and execute backend JWT auth commands directly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowCurlConsole(!showCurlConsole)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            {showCurlConsole ? 'Hide cURL Console' : 'View 6 cURL Commands'}
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 transition"
          >
            <UserPlus className="w-5 h-5" /> Add New Teacher
          </button>
        </div>
      </div>

      {/* cURL Console Collapsible Box */}
      {showCurlConsole && (
        <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 space-y-4 shadow-xl border border-slate-700 animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> cURL Command Execution Reference (Base URL: http://localhost:8080/api/v1)
            </h3>
            <span className="text-xs font-mono text-slate-400">Target Endpoint: /api/v1/teachers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curlCommands.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">{item.step}</span>
                  <button
                    onClick={() => copyToClipboard(item.cmd, idx)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center gap-1 font-mono"
                  >
                    {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIndex === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900/90 rounded-xl whitespace-pre-wrap">
                  {item.cmd}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Refresh Control Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl glass-panel border border-slate-200 bg-white">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teacher by name, email, employee ID, or subject..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end text-xs font-bold text-slate-500">
          <span>Showing {filteredTeachers.length} Teachers</span>
          <button
            onClick={fetchTeachers}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
            title="Refresh Teachers List"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Teachers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-6 rounded-3xl glass-card border border-slate-200/80 hover:border-indigo-300 transition-all hover:shadow-lg bg-white space-y-4 relative group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={teacher.firstName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-300 shadow-sm"
                  />
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600">{teacher.designation}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {teacher.employeeId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialization Badge */}
              <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Specialization</span>
                <p className="text-xs font-extrabold text-slate-800">{teacher.specialization}</p>
              </div>

              {/* Contact & Assignment Metadata */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate font-medium">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="font-mono">{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Home Room Class: <strong className="text-slate-800">Class #{teacher.homeRoomClassId}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
              <button
                onClick={() => handleViewTeacher(teacher)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-indigo-600" /> View Profile
              </button>
              <button
                onClick={() => openEditModal(teacher)}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Edit className="w-4 h-4" /> Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal (Step 2 cURL Integration) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-slate-200 shadow-2xl overflow-hidden bg-white">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Admin Add New Teacher</h3>
                  <p className="text-xs text-slate-500 font-medium">Executes POST /api/v1/teachers (Bearer $ADMIN_TOKEN)</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Employee ID</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Joining Date</label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Home Room Class ID</label>
                  <input
                    type="number"
                    value={formData.homeRoomClassId}
                    onChange={(e) => setFormData({ ...formData, homeRoomClassId: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-sm font-extrabold shadow-md hover:brightness-105"
                >
                  Submit & Create Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal (Step 6 cURL Integration) */}
      {isEditModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl glass-panel border border-slate-200 shadow-2xl overflow-hidden bg-white">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Edit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">Admin Update Teacher #{selectedTeacher.id}</h3>
                  <p className="text-xs text-slate-500 font-medium">Executes PUT /api/v1/teachers/{selectedTeacher.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Specialization</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 text-white text-sm font-extrabold shadow-md hover:brightness-105"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Teacher Details Modal (Step 4 cURL Integration) */}
      {isViewModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl glass-panel border border-slate-200 shadow-2xl overflow-hidden bg-white p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTeacher.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'}
                  alt={selectedTeacher.firstName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md"
                />
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold">
                    GET /api/v1/teachers/{selectedTeacher.id}
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-900">
                    {selectedTeacher.firstName} {selectedTeacher.lastName}
                  </h3>
                  <p className="text-xs font-bold text-indigo-600">{selectedTeacher.designation}</p>
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Employee ID</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{selectedTeacher.employeeId}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Username</span>
                <span className="font-mono font-bold text-indigo-600 text-sm">{selectedTeacher.username}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Specialization</span>
                <span className="font-bold text-slate-900">{selectedTeacher.specialization}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 font-bold uppercase block text-[10px]">Home Room Class ID</span>
                <span className="font-bold text-slate-900">Class #{selectedTeacher.homeRoomClassId}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <h4 className="text-xs font-extrabold text-indigo-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Teaching Assignments
              </h4>
              {selectedTeacher.assignments && selectedTeacher.assignments.length > 0 ? (
                <div className="space-y-1">
                  {selectedTeacher.assignments.map((asg, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-medium text-slate-700 bg-white p-2 rounded-xl border border-indigo-100">
                      <span>Class #{asg.classId} • Subject #{asg.subjectId}</span>
                      <span className="font-mono text-indigo-600">{asg.academicYear}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No custom assignments configured.</p>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
