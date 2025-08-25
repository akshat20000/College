
import type { JSX } from 'react'
import { classOfferings, subjects, users } from '../mocks'
import { Link } from 'react-router-dom'

export function TeacherDashboard(): JSX.Element {
  const teacher = users.find(u => u.role === 'teacher')!
  const classes = classOfferings.filter(c => c.primaryTeacher === teacher.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Teacher Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Classes</h2>
          
          <div className="grid gap-4">
            {classes.map(cls => {
              const subj = subjects.find(s => s.id === cls.subject)
              const studentCount = cls.students.length
              return (
                <div key={cls.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="font-bold text-gray-900 text-lg">
                    {subj?.name} - {cls.academicYear}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {studentCount} students
                  </div>
                  <div className="mt-4">
                    <Link 
                      to="/teacher/mark" 
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-200"
                    >
                      Mark Attendance
                    </Link>
                  </div>
                </div>
              )
            })}
            
            {classes.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No classes assigned yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}