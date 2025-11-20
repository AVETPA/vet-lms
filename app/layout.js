import './globals.css';

export const metadata = {
  title: 'Test LMS',
  description: 'Canvas-style online LMS example project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}
