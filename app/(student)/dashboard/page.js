import Link from 'next/link';
import { mockCourses } from '@/lib/mockData';

export default function DashboardPage() {
  // TODO: Replace with real enrolments from Supabase
  const enrolledCourses = mockCourses;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p className="text-sm text-slate-600">
          You&apos;re not enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {enrolledCourses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/${course.slug}`}
              className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <h2 className="font-semibold mb-1">{course.title}</h2>
              <p className="text-xs text-slate-600 mb-2">
                {course.subtitle}
              </p>
              <p className="text-xs text-slate-500">
                Progress: <span className="font-medium">0% (demo)</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
