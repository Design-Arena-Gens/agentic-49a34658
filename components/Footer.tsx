export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 bg-white py-8 text-sm text-slate-600">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <p className="font-semibold text-slate-700">© {year} Career Compass. Navigate what’s next with clarity.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="text-ocean-600 transition hover:text-ocean-500">
            Contact support
          </a>
          <a href="#faqs" className="text-ocean-600 transition hover:text-ocean-500">
            FAQ
          </a>
          <a href="#resources" className="text-ocean-600 transition hover:text-ocean-500">
            Resource library
          </a>
        </div>
      </div>
    </footer>
  );
}
