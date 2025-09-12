import React from 'react'
import type { Student } from '../types/students'

type Props = {
  students: Student[]
}

const StudentList: React.FC<Props> = ({ students }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-medium">{student.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              GPA: {student.gpa}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentList
