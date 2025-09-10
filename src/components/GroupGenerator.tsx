import React from 'react'
import type { Student } from '../types/students'

type GroupGeneratorProps = {
  students: Student[]
  groupSize: number
}

function GroupGenerator({ students, groupSize }: GroupGeneratorProps) {
  // Shuffle students
  const shuffled = [...students].sort(() => Math.random() - 0.5)

  // Split into groups
  const groups: Student[][] = []
  for (let i = 0; i < shuffled.length; i += groupSize) {
    groups.push(shuffled.slice(i, i + groupSize))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Generated Groups</h2>
      <div className="space-y-4">
        {groups.map((group, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow"
          >
            <h3 className="font-medium mb-2">Group {idx + 1}</h3>
            <ul className="list-disc list-inside space-y-1">
              {group.map((student) => (
                <li key={student.id}>{student.name} (GPA: {student.gpa})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupGenerator
