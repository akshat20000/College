import type { JSX } from 'react'
import { attendance, classOfferings, subjects, users } from '../mocks'
import { Link } from 'react-router-dom'

export function StudentAttendanceRecord(): JSX.Element {
  const currentStudent = users.find(u => u.role === 'student')!
  const classId = 'c1' // Mock class ID
  const cls = classOfferings.find(c => c.id === classId)!
  const subj = subjects.find(s => s.id === cls.subject)!
  const studentAttendance = attendance.filter(a => a.studentId === currentStudent.id && a.classId === classId)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Back Button */}
          <Link 
            to="/student" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>

          {/* Course Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {subj.name} - {cls.academicYear}
            </h1>
            <h2 className="text-xl font-bold text-gray-900">Your Attendance Record</h2>
          </div>

          {/* Attendance Table */}
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b">
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600">
                <div>DATE</div>
                <div>STATUS</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {studentAttendance.map(record => (
                <div key={record.id} className="px-4 py-3">
                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        record.status === 'present' 
                          ? 'bg-green-500 text-white' 
                          : record.status === 'absent' 
                            ? 'bg-red-500 text-white' 
                            : record.status === 'late' 
                              ? 'bg-yellow-500 text-white' 
                              : 'bg-blue-500 text-white'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {studentAttendance.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500">
                  No attendance records found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
