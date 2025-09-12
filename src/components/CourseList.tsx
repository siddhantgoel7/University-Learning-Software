import React from 'react'
import type { Course } from '../types/course'

type Props = {
  courses: Course[]
}

const CourseList: React.FC<Props> = ({ courses }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Instructor: {course.instructor}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList
