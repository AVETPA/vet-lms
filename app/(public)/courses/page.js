import Link from 'next/link';
import { mockCourses, formatPrice } from '@/lib/mockData';

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {mockCourses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-sm transition-shadow flex flex-col"
          >
            {course.thumbnailUrl && (
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold mb-1">{course.title}</h2>
                <p className="text-xs text-slate-600 mb-2">
                  {course.subtitle}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-blue-700">
                  {formatPrice(course.price)}
                </span>
                <span className="text-slate-500">Self-paced</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
