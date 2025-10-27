export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-gradient-to-br from-ocean-600 via-ocean-500 to-meadow-500 text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 opacity-20 mix-blend-screen">
        <svg
          aria-hidden="true"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
        >
          <defs>
            <radialGradient id="heroGradient" cx="50%" cy="50%" r="70%">
              <stop stopColor="#ffffff" stopOpacity="0.7" offset="0%" />
              <stop stopColor="#ffffff" stopOpacity="0" offset="100%" />
            </radialGradient>
          </defs>
          <circle fill="url(#heroGradient)" cx="400" cy="400" r="400" />
        </svg>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-24 sm:px-6 md:flex-row md:items-center md:py-32 lg:px-8">
        <div className="relative z-10 max-w-xl space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium tracking-wide">
            <span className="inline-flex h-2 w-2 rounded-full bg-meadow-200" aria-hidden="true" />
            Personalized career guidance for every stage
          </p>
          <div className="space-y-4">
            <h1 id="hero-heading" className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Navigate your future with clarity and confidence.
            </h1>
            <p className="text-lg text-slate-100 sm:text-xl">
              Discover careers tailored to your strengths, explore curated learning paths, and connect with resources that accelerate your growth.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#careers"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-ocean-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Careers
            </a>
            <a
              href="#quiz"
              className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 text-base font-semibold text-white shadow-inner transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Take the Career Quiz
            </a>
          </div>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="glass-panel rounded-2xl px-5 py-4 text-left">
              <dt className="text-sm text-slate-200">Career paths analyzed</dt>
              <dd className="text-2xl font-semibold">1500+</dd>
            </div>
            <div className="glass-panel rounded-2xl px-5 py-4 text-left">
              <dt className="text-sm text-slate-200">Learners guided</dt>
              <dd className="text-2xl font-semibold">86,000</dd>
            </div>
            <div className="glass-panel rounded-2xl px-5 py-4 text-left">
              <dt className="text-sm text-slate-200">Resource partners</dt>
              <dd className="text-2xl font-semibold">120+</dd>
            </div>
          </dl>
        </div>
        <div className="relative z-10 w-full md:max-w-md">
          <div className="glass-panel gradient-border relative rounded-3xl p-6 text-slate-900 shadow-2xl">
            <h2 className="text-lg font-semibold text-ocean-700">Get a personalized roadmap</h2>
            <p className="mt-2 text-sm text-slate-600">
              Answer a few questions and receive curated career insights, learning resources, and networking prompts within minutes.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean-100 text-ocean-600">
                  1
                </span>
                Discover roles aligned with your strengths and motivations.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-meadow-100 text-meadow-600">
                  2
                </span>
                Explore skill gaps and build a personalized learning sprint.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                  3
                </span>
                Connect with mentors, resources, and real-world experiences.
              </li>
            </ul>
            <a
              href="#resources"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ocean-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500"
            >
              Browse Resources
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
