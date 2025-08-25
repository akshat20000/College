
import type { JSX } from 'react'
import { classOfferings, subjects, courses, users } from '../../mocks'

export function AdminClasses(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Classes</h1>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Program</th>
              <th className="px-3 py-2">Section</th>
              <th className="px-3 py-2">Teacher</th>
              <th className="px-3 py-2">Schedule</th>
              <th className="px-3 py-2">Term</th>
            </tr>
          </thead>
          <tbody>
            {classOfferings.map(cls => (
              <tr key={cls.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-medium">{subjects.find(s => s.id === cls.subject)?.name}</td>
                <td className="px-3 py-2">{courses.find(c => c.id === cls.program)?.name}</td>
                <td className="px-3 py-2">{cls.sectionName}</td>
                <td className="px-3 py-2">{users.find(u => u.id === cls.primaryTeacher)?.name}</td>
                <td className="px-3 py-2">
                  {cls.schedule.map((s, i) => (
                    <div key={i} className="text-xs text-gray-600">{s.dayOfWeek} {s.startTime}-{s.endTime} · {s.room}</div>
                  ))}
                </td>
                <td className="px-3 py-2">{cls.academicYear} · {cls.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}