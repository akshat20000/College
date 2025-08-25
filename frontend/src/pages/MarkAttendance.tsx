import { useMemo, useState } from 'react'
import type { JSX } from 'react'
import { attendance as initialAttendance, classOfferings, users } from '../mocks'
import type { AttendanceRecord, AttendanceStatus } from '../types'
import { Link } from 'react-router-dom'

export function MarkAttendance(): JSX.Element {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialAttendance)
  const classId = 'c1'
  const cls = classOfferings.find(c => c.id === classId)!
  const students = users.filter(u => cls.students.includes(u.id))

  const today = new Date().toISOString().slice(0, 10)
  const todayFormatted = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const mapKey = (studentId: string) => `${classId}-${studentId}-${today}`

  const currentMap = useMemo(() => new Map(records
    .filter(r => r.classId === classId && r.date.startsWith(today))
    .map(r => [r.studentId, r.status as AttendanceStatus])), [records])

  const setStatus = (studentId: string, status: AttendanceStatus) => {
    const existingIndex = records.findIndex(r => r.id === mapKey(studentId))
    const base: AttendanceRecord = {
      id: mapKey(studentId),
      classId,
      studentId,
      date: today,
      status,
      markedBy: 't1',
    }
    if (existingIndex >= 0) {
      const next = [...records]
      next[existingIndex] = { ...next[existingIndex], status }
      setRecords(next)
    } else {
      setRecords(prev => [...prev, base])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Back Button */}
          <Link 
            to="/teacher" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>

          {/* Title and Date */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Mark Attendance: Intro to Calculus
            </h1>
            <p className="text-gray-600">{todayFormatted}</p>
          </div>

          {/* Student Attendance Section */}
          <div className="space-y-6">
            {students.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{s.name}</div>
                <div className="flex gap-2">
                  {(['present', 'absent', 'late'] as AttendanceStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => setStatus(s.id, st)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        currentMap.get(s.id) === st 
                          ? st === 'present' 
                            ? 'bg-green-500 text-white' 
                            : st === 'absent' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md font-medium transition duration-200">
              Submit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}