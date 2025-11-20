import Link from 'next/link';

export default function AdminLayout({ children }) {
  // TODO: Add admin-only auth check
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-4 py-4 font-semibold text-lg border-b border-slate-800">
          Admin
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 text-sm">
          <Link
            href="/admin/courses"
            className="block rounded px-2 py-1 hover:bg-slate-800"
          >
            Courses
          </Link>
          <Link
            href="/admin/students"
            className="block rounded px-2 py-1 hover:bg-slate-800"
          >
            Students (coming)
          </Link>
          <Link
            href="/admin/coupons"
            className="block rounded px-2 py-1 hover:bg-slate-800"
          >
            Coupons (coming)
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-slate-100 p-6">{children}</main>
    </div>
  );
}
