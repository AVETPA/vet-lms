import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockCourses, formatPrice } from '@/lib/mockData';

export default function CourseDetailPage({ params }) {
  const course = mockCourses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-slate-600 mb-4">{course.subtitle}</p>

          {course.thumbnailUrl && (
            <div className="mb-6 overflow-hidden rounded-lg border">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <h2 className="text-xl font-semibold mb-2">About this course</h2>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {course.description}
          </p>
        </div>

        <aside className="bg-white border rounded-lg p-5 h-max">
          <p className="text-sm text-slate-600 mb-1">Course price</p>
          <p className="text-3xl font-bold mb-2">
            {formatPrice(course.price)}
          </p>

          <Link
            href="/login"
            className="block text-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 mb-3"
          >
            Enrol Now
          </Link>

          <p className="text-xs text-slate-500">
            You’ll be asked to log in or create an account.
          </p>
        </aside>
      </div>
    </div>
  );
}
