import { supabase } from "../lib/supabase";

export type DBCourse = {
  id: string;
  owner_id: string;
  name: string;
  term: string | null;
  created_at: string;
};

export async function listCourses(ownerId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as DBCourse[];
}

export async function createCourse(ownerId: string, name: string, term?: string) {
  const { data, error } = await supabase
    .from("courses")
    .insert([{ owner_id: ownerId, name, term: term ?? null }])
    .select()
    .single();
  if (error) throw error;
  return data as DBCourse;
}

export async function deleteCourse(id: string) {
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw error;
}
