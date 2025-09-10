import React from 'react'
import { courses } from './data/mockCourses'
import { students } from './data/mockStudents'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        University Learning Prototype
      </h1>

      {/* Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Courses</h2>
        <ul className="space-y-2">
          {courses.map((course) => (
            <li
              key={course.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow"
            >
              <p className="font-medium">{course.name}</p>
              <p className="text-sm text-gray-500">
                Instructor: {course.instructor}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Students Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Students</h2>
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow flex justify-between"
            >
              <span>{student.name}</span>
              <span className="text-gray-500">GPA: {student.gpa}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
