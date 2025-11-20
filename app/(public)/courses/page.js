// app/(public)/courses/page.js

import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; // adjust path if needed

function formatPrice(priceCents, currency) {
  if (!priceCents || priceCents === 0) return 'Free';
  const value = priceCents / 100;
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currency || 'AUD',
  }).format(value);
}

export default async function CoursesPage() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select(
      'id, slug, title, subtitle, short_description, thumbnail_url, price_cents, currency, is_published, pricing_type'
    )
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading courses:', error.message);
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">All Courses</h1>
        <p className="text-slate-600">No courses are published yet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-sm transition-shadow flex flex-col"
          >
            {course.thumbnail_url && (
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold mb-1">{course.title}</h2>
                <p className="text-xs text-slate-600 mb-2">
                  {course.subtitle || course.short_description}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-blue-700">
                  {formatPrice(course.price_cents, course.currency)}
                </span>
                <span className="text-slate-500">
                  {course.pricing_type === 'free' ? 'Online workshop' : 'Paid workshop'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
