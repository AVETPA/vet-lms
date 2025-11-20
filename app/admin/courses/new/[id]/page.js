export default function EditCoursePage({ params }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Edit Course (ID: {params.id})
      </h1>
      <p className="text-sm text-slate-600 mb-4">
        This is a placeholder. We&apos;ll fetch the course from Supabase and
        allow editing of modules & lessons.
      </p>
      <div className="bg-white border rounded-lg p-4 text-sm text-slate-500">
        Course builder UI coming soon.
      </div>
    </div>
  );
}
