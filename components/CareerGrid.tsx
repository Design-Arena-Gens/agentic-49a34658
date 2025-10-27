import Image from 'next/image';
import type { Career } from '@/data/careers';

type CareerGridProps = {
  careers: Career[];
  highlightedId?: string | null;
};

export function CareerGrid({ careers, highlightedId }: CareerGridProps) {
  if (!careers.length) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-8 text-center text-sm text-slate-500 shadow-sm">
        We couldn’t find matching careers right now. Try adjusting your search terms or explore skills you’d like to grow.
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {careers.map((career, index) => (
        <article
          key={career.id}
          data-career-id={career.id}
          id={career.id}
          tabIndex={-1}
          aria-labelledby={`${career.id}-title`}
          className={`card-hover-transition group flex flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ocean-400 ${
            highlightedId === career.id ? 'ring-2 ring-inset ring-ocean-400' : 'ring-0'
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-ocean-50">
            <Image
              src={career.image}
              alt=""
              width={480}
              height={320}
              className="h-44 w-full object-cover"
              priority={index < 3}
            />
          </div>
          <div className="mt-5 flex-1 space-y-4">
            <header className="space-y-2">
              <h3 id={`${career.id}-title`} className="text-xl font-semibold text-slate-900">
                {career.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{career.description}</p>
            </header>
            <dl className="grid grid-cols-1 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">Salary range</dt>
                <dd className="font-medium text-slate-800">{career.salaryRange}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">Key skills</dt>
                <dd className="font-medium text-slate-800">{career.skills.join(' • ')}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-wide text-slate-500">Education</dt>
                <dd className="font-medium text-slate-800">{career.education}</dd>
              </div>
            </dl>
          </div>
          <footer className="mt-5 flex items-center justify-between text-sm">
            <div className="flex flex-wrap gap-2">
              {career.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold text-ocean-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-ocean-600 transition hover:text-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
            >
              <span>Connect</span>
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </a>
          </footer>
        </article>
      ))}
    </div>
  );
}
