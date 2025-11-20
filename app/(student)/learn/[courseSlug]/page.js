import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockCourses } from '@/lib/mockData';

export default function LearnCoursePage({ params }) {
  const course = mockCourses.find((c) => c.slug === params.courseSlug);

  if (!course) {
    notFound();
  }

  // Demo data for now
  const modules = [
    {
      id: 'm1',
      title: 'Module 1: Foundations',
      lessons: [
        { id: 'l1', slug: 'welcome', title: 'Welcome & course overview' },
        { id: 'l2', slug: 'compliance-basics', title: 'Compliance basics' },
      ],
    },
    {
      id: 'm2',
      title: 'Module 2: Case Studies',
      lessons: [
        {
          id: 'l3',
          slug: 'case-study-1',
          title: 'Case study: small animal clinic',
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-sm text-slate-600 mb-6">{course.subtitle}</p>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div>
          <h2 className="text-lg font-semibold mb-3">Modules</h2>
          <div className="space-y-4">
            {modules.map((mod) => (
              <div key={mod.id} className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{mod.title}</h3>
                <ul className="space-y-1 text-sm">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${course.slug}/lesson/${lesson.slug}`}
                        className="text-blue-700 hover:underline"
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="bg-white border rounded-lg p-4 h-max">
          <h3 className="font-semibold mb-2">Course progress</h3>
          <p className="text-sm text-slate-600 mb-4">
            This is a demo. Progress tracking will connect to Supabase later.
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-xs text-slate-500">0% complete (demo)</p>
        </aside>
      </div>
    </div>
  );
}
