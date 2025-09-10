import React from 'react'
import type { Student } from '../types/students'

type StudentListProps = {
  students: Student[]
}

function StudentList({ students }: StudentListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
          >
            <p className="font-medium">{student.name}</p>
            <p className="text-sm text-gray-500">GPA: {student.gpa}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentList
