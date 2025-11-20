// src/lib/certificates.ts
import { supabase } from "./supabaseClient";

export async function generateCourseCertificate(courseId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase.functions.invoke(
    "generate-course-certificate",
    {
      body: {
        user_id: user.id,
        course_id: courseId,
      },
    }
  );

  if (error) {
    console.error(error);
    throw new Error(error.message || "Failed to generate certificate");
  }

  return data;
}
