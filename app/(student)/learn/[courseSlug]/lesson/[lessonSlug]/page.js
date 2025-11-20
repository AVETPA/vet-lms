import { notFound } from 'next/navigation';
import { mockCourses } from '@/lib/mockData';
import Link from 'next/link';

export default function LessonPage({ params }) {
  const course = mockCourses.find((c) => c.slug === params.courseSlug);
  if (!course) {
    notFound();
  }

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

  const flatLessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title })),
  );
  const currentLesson = flatLessons.find(
    (l) => l.slug === params.lessonSlug,
  );

  if (!currentLesson) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)]">
      {/* Left sidebar */}
      <aside className="w-72 border-r bg-slate-50 p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-3">{course.title}</h2>
        <nav className="space-y-4 text-sm">
          {modules.map((mod) => (
            <div key={mod.id}>
              <p className="font-semibold mb-1">{mod.title}</p>
              <ul className="space-y-1">
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.slug === params.lessonSlug;
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/learn/${course.slug}/lesson/${lesson.slug}`}
                        className={`block rounded px-2 py-1 ${
                          isActive
                            ? 'bg-blue-100 text-blue-800 font-medium'
                            : 'hover:bg-slate-200'
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-4 text-xs text-slate-500">
          <Link href="/dashboard" className="hover:underline">
            My Courses
          </Link>{' '}
          /{' '}
          <Link href={`/learn/${course.slug}`} className="hover:underline">
            {course.title}
          </Link>{' '}
          / <span>{currentLesson.title}</span>
        </div>

        <h1 className="text-2xl font-bold mb-3">{currentLesson.title}</h1>
        <p className="text-sm text-slate-600 mb-6">
          Demo lesson content. This will be replaced with real content from
          your database (video, text, downloads, quizzes).
        </p>

        <div className="aspect-video w-full rounded-lg bg-slate-200 flex items-center justify-center mb-6">
          <span className="text-slate-500 text-sm">
            Video player / interactive content placeholder
          </span>
        </div>

        <article className="prose prose-sm max-w-none">
          <h2>Lesson body content</h2>
          <p>
            This is placeholder content for the lesson. In the real version,
            we&apos;ll load HTML/Markdown content for each lesson from the
            database so you can build it in the admin interface.
          </p>
          <ul>
            <li>Key point 1</li>
            <li>Key point 2</li>
            <li>Key point 3</li>
          </ul>
        </article>
      </main>
    </div>
  );
}
