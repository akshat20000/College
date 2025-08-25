
import { subjects, courses } from '../../mocks'
import type { JSX } from 'react'

export function AdminSubjects(): JSX.Element {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Subjects</h1>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Program</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(s => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-medium">{s.name}</td>
                <td className="px-3 py-2">{s.code ?? '-'}</td>
                <td className="px-3 py-2">{courses.find(c => c.id === s.program)?.name}</td>
                <td className="px-3 py-2">{s.type}</td>
                <td className="px-3 py-2">{s.credits ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}