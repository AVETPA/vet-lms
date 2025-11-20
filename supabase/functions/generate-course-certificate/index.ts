// supabase/functions/generate-course-certificate/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { user_id, course_id } = await req.json();

    if (!user_id || !course_id) {
      return new Response(
        JSON.stringify({ error: "Missing user_id or course_id" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1. Find enrolment
    const { data: enrolment, error: enrolErr } = await supabase
      .from("course_enrolments")
      .select(
        `
        id,
        status,
        progress_percent,
        course_id,
        user_id,
        certificate_issued
      `
      )
      .eq("user_id", user_id)
      .eq("course_id", course_id)
      .single();

    if (enrolErr || !enrolment) {
      return new Response(
        JSON.stringify({ error: "Enrolment not found for this user/course" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (enrolment.status !== "completed" || enrolment.progress_percent < 100) {
      return new Response(
        JSON.stringify({
          error: "Course not completed – cannot issue certificate",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (enrolment.certificate_issued) {
      return new Response(
        JSON.stringify({
          message: "Certificate already issued for this enrolment",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Get some course and user info for the certificate
    const [{ data: course }, { data: profile }] = await Promise.all([
      supabase
        .from("courses")
        .select("id, title, duration_hours")
        .eq("id", course_id)
        .single(),
      supabase.from("users").select("id, first_name, last_name").eq("id", user_id).single(), // adjust to your actual users table/cols
    ]);

    if (!course || !profile) {
      return new Response(
        JSON.stringify({ error: "Course or user profile not found" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hoursCompleted = course.duration_hours ?? 0;

    // 3. Generate certificate number
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    const certNumber = `COURSE-${now.getFullYear()}${pad(
      now.getMonth() + 1
    )}${pad(now.getDate())}-${String(enrolment.id).slice(0, 8)}`;

    // 4. Generate a dummy PDF buffer (replace with real PDF generation)
    const pdfContent = `
      Certificate of Completion
      
      This is to certify that ${profile.first_name} ${profile.last_name}
      has successfully completed the course:
      "${course.title}"
      
      Hours completed: ${hoursCompleted}
      Date: ${now.toDateString()}
      Certificate No: ${certNumber}
    `;

    const pdfBytes = new TextEncoder().encode(pdfContent); // placeholder "pdf"

    // 5. Upload to Storage
    const bucket = "course-certificates"; // create this in Supabase Storage
    const fileName = `${user_id}/${enrolment.id}.pdf`;
    const storagePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, pdfBytes, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Failed to upload certificate PDF" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get public URL (if the bucket is public; otherwise use signed URLs later)
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(storagePath);

    // 6. Insert into course_certificates
    const { data: certRow, error: insertError } = await supabase
      .from("course_certificates")
      .insert({
        user_id,
        course_id,
        enrolment_id: enrolment.id,
        certificate_number: certNumber,
        hours_completed: hoursCompleted,
        storage_path: storagePath,
        evidence_url: publicUrl,
        has_evidence: true,
        created_by: user_id, // or admin if you call it from admin panel
      })
      .select("*")
      .single();

    if (insertError || !certRow) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save certificate record" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7. Update enrolment row
    const { error: updateError } = await supabase
      .from("course_enrolments")
      .update({
        certificate_issued: true,
        certificate_id: certRow.id,
      })
      .eq("id", enrolment.id);

    if (updateError) {
      console.error("Update enrolment error:", updateError);
      return new Response(
        JSON.stringify({
          error: "Certificate created but failed to update enrolment",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Certificate generated successfully",
        certificate: certRow,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Unexpected error generating certificate" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
