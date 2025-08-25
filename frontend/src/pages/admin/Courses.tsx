import  { useState } from 'react'
import { courses } from '../../mocks'
import type { JSX } from 'react'

export function AdminCourses(): JSX.Element {
  const [filter, setFilter] = useState('')
  const visible = courses.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Programs</h1>
        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">New program</button>
      </div>

      <div className="flex items-center gap-3">
        <input value={filter} onChange={e => setFilter(e.target.value)} placeholder="Search programs..." className="w-72 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Duration</th>
              <th className="px-3 py-2">Coordinator</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(p => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-medium">{p.name}</td>
                <td className="px-3 py-2">{p.duration}</td>
                <td className="px-3 py-2">{p.coordinator ?? '-'}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <button className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50">Edit</button>
                    <button className="rounded-md border px-2 py-1 text-sm text-red-600 hover:bg-red-50">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}