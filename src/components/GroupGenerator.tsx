import React, { useMemo, useState } from "react";

export type Student = { id: string; name: string; gpa: number };

function distributeBalanced(students: Student[], groupSize: number) {
  const sorted = [...students].sort((a, b) => b.gpa - a.gpa);
  const numGroups = Math.max(1, Math.ceil(sorted.length / groupSize));
  const groups: Student[][] = Array.from({ length: numGroups }, () => []);
  let i = 0;
  for (const s of sorted) {
    groups[i % numGroups].push(s);
    i++;
  }
  return groups;
}

function distributeCluster(students: Student[], groupSize: number) {
  const sorted = [...students].sort((a, b) => b.gpa - a.gpa);
  const groups: Student[][] = [];
  for (let i = 0; i < sorted.length; i += groupSize) {
    groups.push(sorted.slice(i, i + groupSize));
  }
  return groups;
}

export default function GroupGenerator({ students }: { students: Student[] }) {
  const [size, setSize] = useState(3);
  const [mode, setMode] = useState<"balanced" | "cluster">("balanced");

  const groups = useMemo(
    () =>
      mode === "balanced"
        ? distributeBalanced(students, size)
        : distributeCluster(students, size),
    [students, size, mode]
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm">Group size</label>
        <input
          type="number"
          min={1}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-20 border rounded px-2 py-1 dark:bg-gray-700"
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
          className="border rounded px-2 py-1 dark:bg-gray-700"
        >
          <option value="balanced">Balanced (mix GPAs)</option>
          <option value="cluster">Cluster (similar GPAs)</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map((g, i) => (
          <div
            key={i}
            className="bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-300 dark:border-indigo-700 rounded-xl p-4 shadow"
          >
            <h3 className="font-bold mb-2">Group {i + 1}</h3>
            <ul className="space-y-1">
              {g.map((s) => (
                <li key={s.id} className="text-sm">
                  {s.name}{" "}
                  <span className="text-gray-600 dark:text-gray-400">
                    (GPA: {s.gpa})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
