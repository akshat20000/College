import type{ User, Course, Subject, ClassOffering, AttendanceRecord } from './types'

export const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', assignedClasses: ['c1'] },
  { id: 'u2', name: 'Bob Singh', email: 'bob@example.com', role: 'student', assignedClasses: ['c1'] },
  { id: 't1', name: 'Prof. Mehta', email: 'mehta@example.com', role: 'teacher', assignedClasses: ['c1'] },
]

export const courses: Course[] = [
  { id: 'p1', name: 'BE CSE', description: 'Computer Science and Engineering', duration: '4 Years', coordinator: 't1' },
]

export const subjects: Subject[] = [
  { id: 's1', name: 'Data Structures', code: 'CS301', program: 'p1', type: 'Theory', credits: 4 },
]

export const classOfferings: ClassOffering[] = [
  {
    id: 'c1',
    subject: 's1',
    program: 'p1',
    sectionName: 'CSE-A',
    primaryTeacher: 't1',
    students: ['u1', 'u2'],
    schedule: [
      { dayOfWeek: 'Monday', startTime: '09:00', endTime: '10:00', room: 'LH-101' },
      { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '10:00', room: 'LH-101' },
    ],
    academicYear: '2024-2025',
    semester: 'Odd',
    startDate: '2024-08-01',
    endDate: '2024-12-15',
  },
]

export const attendance: AttendanceRecord[] = [
  { id: 'a1', classId: 'c1', studentId: 'u1', date: '2024-09-04', status: 'present', markedBy: 't1' },
  { id: 'a2', classId: 'c1', studentId: 'u2', date: '2024-09-04', status: 'absent', markedBy: 't1' },
]