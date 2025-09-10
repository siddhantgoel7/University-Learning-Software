import React from 'react'
import CourseList from './components/CourseList'
import StudentList from './components/StudentList'
import GroupGenerator from './components/GroupGenerator'
import { courses } from './data/mockCourses'
import { students } from './data/mockStudents'

function App() {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">University Learning Platform</h1>
      <CourseList courses={courses} />
      <StudentList students={students} />
      <GroupGenerator students={students} groupSize={2} />
    </div>
  )
}

export default App
