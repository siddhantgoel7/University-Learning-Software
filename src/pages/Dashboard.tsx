import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { listCourses, createCourse, deleteCourse, type DBCourse } from "../services/db";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<DBCourse[]>([]);
  const [name, setName] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    listCourses(user.id)
      .then(setCourses)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  async function onAdd() {
    if (!user || !name.trim()) return;
    try {
      setSaving(true);
      const created = await createCourse(user.id, name.trim(), term.trim() || undefined);
      setCourses((prev) => [created, ...prev]);
      setName("");
      setTerm("");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteCourse(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      setErr(e.message);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Courses</h1>

      {/* Add Course */}
      <div className="bg-white dark:bg-gray-800 border rounded-xl p-4 shadow max-w-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <input
            className="border rounded px-3 py-2 dark:bg-gray-700"
            placeholder="Course name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 dark:bg-gray-700"
            placeholder="Term (optional)"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button
            className="rounded px-3 py-2 bg-blue-600 text-white disabled:opacity-60"
            onClick={onAdd}
            disabled={saving || !name.trim()}
          >
            {saving ? "Adding…" : "Add course"}
          </button>
        </div>
        {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
      </div>

      {/* Course list */}
      {loading ? (
        <p>Loading…</p>
      ) : courses.length === 0 ? (
        <p>No courses yet. Add one above.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <li key={c.id} className="bg-white dark:bg-gray-800 border rounded-xl p-4 shadow flex justify-between">
              <div>
                <Link to={`/course/${c.id}`} className="font-semibold hover:underline">
                  {c.name}
                </Link>
                <div className="text-xs text-gray-500">{c.term || "—"}</div>
              </div>
              <button onClick={() => onDelete(c.id)} className="text-sm text-red-600">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
