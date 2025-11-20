import Link from 'next/link';

export default function StudentLayout({ children }) {
  // TODO: add real auth check; for now this just wraps the student area
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Test LMS
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:text-blue-600">
              My Courses
            </Link>
            <Link href="/logout" className="hover:text-blue-600">
              Logout
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-slate-100">{children}</main>
    </div>
  );
}
