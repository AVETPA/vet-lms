import Link from 'next/link';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Test LMS
          </Link>

          <nav className="flex gap-4 text-sm font-medium">
            <Link href="/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Test LMS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
