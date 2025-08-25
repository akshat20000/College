
import type { JSX } from 'react'
import { attendance, classOfferings, subjects, users } from '../mocks'
import { Link } from 'react-router-dom'

export function StudentDashboard(): JSX.Element {
  const currentStudent = users.find(u => u.role === 'student')!
  const classes = classOfferings.filter(c => currentStudent.assignedClasses.includes(c.id))
  const studentAttendance = attendance.filter(a => a.studentId === currentStudent.id)
  
  // Calculate attendance statistics
  const presentCount = studentAttendance.filter(a => a.status === 'present').length
  const absentCount = studentAttendance.filter(a => a.status === 'absent').length
  const lateCount = studentAttendance.filter(a => a.status === 'late').length
  const excusedCount = studentAttendance.filter(a => a.status === 'excused').length
  const totalCount = studentAttendance.length || 1

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Overall Attendance Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Overall Attendance</h2>
            
            {/* Donut Chart */}
            <div className="flex justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Present - Green */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray={`${(presentCount / totalCount) * 251.2} 251.2`}
                    strokeDashoffset="0"
                  />
                  {/* Absent - Red */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="8"
                    strokeDasharray={`${(absentCount / totalCount) * 251.2} 251.2`}
                    strokeDashoffset={`-${(presentCount / totalCount) * 251.2}`}
                  />
                  {/* Late - Yellow */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="8"
                    strokeDasharray={`${(lateCount / totalCount) * 251.2} 251.2`}
                    strokeDashoffset={`-${((presentCount + absentCount) / totalCount) * 251.2}`}
                  />
                  {/* Excused - Blue */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    strokeDasharray={`${(excusedCount / totalCount) * 251.2} 251.2`}
                    strokeDashoffset={`-${((presentCount + absentCount + lateCount) / totalCount) * 251.2}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round((presentCount / totalCount) * 100)}%
                    </div>
                    <div className="text-sm text-gray-500">Present</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Present</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700">Absent</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-700">Late</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-700">Excused</span>
              </div>
            </div>
          </div>

          {/* My Classes Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">My Classes</h2>
            
            <div className="space-y-4">
              {classes.map(cls => {
                const subj = subjects.find(s => s.id === cls.subject)
                const teacher = users.find(u => u.id === cls.primaryTeacher)
                return (
                  <div key={cls.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="font-bold text-gray-900">
                      {subj?.name} - {cls.academicYear}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Teacher: {teacher?.name}
                    </div>
                    <div className="mt-3">
                      <Link 
                        to="/student/attendance" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition duration-200"
                      >
                        View Attendance
                      </Link>
                    </div>
                  </div>
                )
              })}
              
              {classes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No classes enrolled yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}