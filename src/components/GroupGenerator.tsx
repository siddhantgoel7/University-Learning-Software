import React from 'react'
import type { Student } from '../types/students'

type Props = {
  students: Student[]
  groupSize: number
}

const GroupGenerator: React.FC<Props> = ({ students, groupSize }) => {
  const shuffled = [...students].sort(() => Math.random() - 0.5)
  const groups = []
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Generated Groups</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((group, index) => (
          <div
            key={index}
            className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded-xl p-4 shadow"
          >
            <h3 className="font-bold mb-2">Group {index + 1}</h3>
            <ul className="space-y-1">
              {group.map((student) => (
                <li key={student.id} className="text-sm">
                  {student.name} <span className="text-gray-600 dark:text-gray-400">(GPA: {student.gpa})</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupGenerator
