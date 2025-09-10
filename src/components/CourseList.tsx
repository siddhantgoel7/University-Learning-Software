import React from 'react'
import type { Course } from '../types/course'
import { courses } from '../data/mockCourses'
type CourseListProps = {
  courses: Course[]
}

function CourseList({ courses }: CourseListProps) {
  return (
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
  )
}

export default CourseList
