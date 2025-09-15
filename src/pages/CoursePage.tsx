import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { courses } from "../data/mockCourses";
import { students as allStudents } from "../data/mockStudents";
import { enrollments } from "../data/enrollments";
import GroupGenerator from "../components/GroupGenerator";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === id);
  const enrolled = useMemo(() => {
    const ids = new Set(enrollments.filter((e) => e.courseId === id).map((e) => e.userId));
    return allStudents.filter((s) => ids.has(s.id));
  }, [id]);

  const [syllabus, setSyllabus] = useState("");
  const [resources, setResources] = useState<File[]>([]);
  const [assignments, setAssignments] = useState<{ id: string; title: string; due: string }[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDue, setNewDue] = useState("");

  if (!course) return <div>Course not found.</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold">{course.name}</h1>
        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
      </header>

      <section className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Syllabus</h2>
        <textarea
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
          className="w-full h-32 border rounded p-2 dark:bg-gray-700"
          placeholder="Write or paste syllabus markdown..."
        />
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Lecture Resources</h2>
        <input type="file" multiple onChange={(e) => setResources(Array.from(e.target.files ?? []))} />
        {resources.length > 0 && (
          <ul className="mt-3 text-sm list-disc pl-5">
            {resources.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">Assignments</h2>
        <div className="flex gap-2 mb-3">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
            className="border rounded px-2 py-1 dark:bg-gray-700"
          />
          <input type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} className="border rounded px-2 py-1 dark:bg-gray-700" />
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => {
              if (!newTitle || !newDue) return;
              setAssignments((a) => [...a, { id: crypto.randomUUID(), title: newTitle, due: newDue }]);
              setNewTitle("");
              setNewDue("");
            }}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {assignments.map((a) => (
            <li key={a.id} className="border rounded p-2 flex items-center justify-between">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-gray-500">Due: {a.due}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
        <h2 className="font-semibold mb-2">Students Enrolled</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {enrolled.map((s) => (
            <div key={s.id} className="border rounded p-3">
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">GPA: {s.gpa}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 rounded-xl border">
        <h2 className="font-semibold mb-3">Group Allocation</h2>
        <GroupGenerator students={enrolled} />
      </section>
    </div>
  );
}
