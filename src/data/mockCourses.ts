export type Course = { id: string; name: string; instructor: string; instructorId: string };
export const courses: Course[] = [
  { id: "c1", name: "CS 101", instructor: "Dr. Smith", instructorId: "prof-1" },
  { id: "c2", name: "Math 201", instructor: "Dr. Lee", instructorId: "prof-1" },
  { id: "c3", name: "Physics 301", instructor: "Dr. Brown", instructorId: "prof-2" },
  { id: "c4", name: "CMPUT 201", instructor: "R Hackman", instructorId: "prof-1" },
];
