import Link from 'next/link';
import { mockCourses, formatPrice } from '@/lib/mockData';

export default function AdminCoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link
          href="/admin/courses/new"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          New Course
        </Link>
      </div>

      <table className="w-full text-sm bg-white border rounded-lg overflow-hidden">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="text-left px-3 py-2">Title</th>
            <th className="text-left px-3 py-2">Slug</th>
            <th className="text-left px-3 py-2">Price</th>
            <th className="text-left px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockCourses.map((course) => (
            <tr key={course.id} className="border-b last:border-b-0">
              <td className="px-3 py-2">{course.title}</td>
              <td className="px-3 py-2 text-xs text-slate-500">
                {course.slug}
              </td>
              <td className="px-3 py-2">{formatPrice(course.price)}</td>
              <td className="px-3 py-2">
                <Link
                  href={`/admin/courses/${course.id}`}
                  className="text-blue-700 hover:underline text-xs"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
