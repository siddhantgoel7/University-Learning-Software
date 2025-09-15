
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { courses as allCourses } from "../data/mockCourses";

export default function Dashboard() {
  const { user } = useAuth();
  const courses = allCourses.filter((c) => c.instructorId === user?.id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link
            key={c.id}
            to={`/course/${c.id}`}
            className="bg-white dark:bg-gray-800 border rounded-xl p-4 shadow hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Instructor: {c.instructor}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
