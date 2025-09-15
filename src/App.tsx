import React, { useState } from 'react'
import CourseList from './components/CourseList'
import StudentList from './components/StudentList'
import GroupGenerator from './components/GroupGenerator'
import { courses as mockCourses } from './data/mockCourses'
import { students as mockStudents } from './data/mockStudents'

function App() {
  const [courses, setCourses] = useState(mockCourses)
  const [students, setStudents] = useState(mockStudents)

  // Add course handler
  const addCourse = (name: string, instructor: string) => {
    const newCourse = {
      id: 'c' + (courses.length + 1),
      name,
      instructor
    }
    setCourses([...courses, newCourse])
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">UniLearn</h2>
        <nav className="space-y-4">
          <a href="#" className="block hover:text-blue-500">Courses</a>
          <a href="#" className="block hover:text-blue-500">Students</a>
          <a href="#" className="block hover:text-blue-500">Groups</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Add Course Form */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const target = e.target as typeof e.target & {
                name: { value: string }
                instructor: { value: string }
              }
              addCourse(target.name.value, target.instructor.value)
              target.name.value = ''
              target.instructor.value = ''
            }}
            className="space-y-2"
          >
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <input
              type="text"
              name="instructor"
              placeholder="Instructor Name"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Course
            </button>
          </form>
        </div>

        {/* Dynamic Lists */}
        <CourseList courses={courses} />
        <StudentList students={students} />
        <GroupGenerator students={students} groupSize={2} />
      </main>
    </div>
  )
}

export default App
