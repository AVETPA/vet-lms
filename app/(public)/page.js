import Link from 'next/link';
import { mockCourses, formatPrice } from '@/lib/mockData';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Online Training LMS Starter
        </h1>
        <p className="text-lg text-slate-600 mb-6 max-w-2xl">
          Your Canvas-style learning platform built with Next.js.
        </p>
        <Link
          href="/courses"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
        >
          Browse Courses
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
            >
              {course.thumbnailUrl && (
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-1">{course.title}</h3>
                <p className="text-sm text-slate-600 mb-2">
                  {course.subtitle}
                </p>
                <p className="text-sm font-semibold text-blue-700">
                  {formatPrice(course.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
