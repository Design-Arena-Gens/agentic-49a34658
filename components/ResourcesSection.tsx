import Link from 'next/link';
import { resources } from '@/data/resources';

const iconMap: Record<string, string> = {
  article: '📰',
  video: '🎥',
  guide: '🧭'
};

export function ResourcesSection() {
  return (
    <section id="resources" aria-labelledby="resources-heading" className="rounded-4xl bg-white px-4 py-16 shadow-lg ring-1 ring-slate-200/80 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">Resource hub</p>
        <h2 id="resources-heading" className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Level up with curated guides, videos, and tools
        </h2>
        <p className="mt-3 text-lg text-slate-600">
          Access hand-picked resources for resume building, interview prep, portfolio creation, and strategic career moves.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="card-hover-transition flex h-full flex-col justify-between rounded-3xl border border-slate-200/70 bg-slate-50 p-6 text-left shadow-sm"
          >
            <div className="space-y-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">
                {iconMap[resource.type]}
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">{resource.title}</h3>
                <p className="text-sm text-slate-600">{resource.description}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-700">{resource.source}</p>
                {resource.duration && <p>{resource.duration}</p>}
              </div>
              <Link
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ocean-600 transition hover:text-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
              >
                Open resource
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
