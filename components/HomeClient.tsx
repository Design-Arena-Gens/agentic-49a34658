"use client";

import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { Career } from '@/data/careers';
import { SearchBar } from '@/components/SearchBar';
import { CareerGrid } from '@/components/CareerGrid';
import { QuizSection } from '@/components/QuizSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';

type HomeClientProps = {
  careers: Career[];
};

export function HomeClient({ careers }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [priorityIds, setPriorityIds] = useState<string[]>([]);

  const filteredCareers = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    const matches = careers.filter((career) => {
      if (!normalized) return true;
      return [career.title, career.description, career.skills.join(' '), career.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });

    if (!priorityIds.length) return matches;

    const prioritySet = new Set(priorityIds);
    const prioritized = matches.filter((career) => prioritySet.has(career.id));
    const others = matches.filter((career) => !prioritySet.has(career.id));
    return [...prioritized, ...others];
  }, [careers, priorityIds, searchQuery]);

  useEffect(() => {
    if (!highlightedId) return;
    const element = document.querySelector<HTMLElement>(`[data-career-id="${highlightedId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus({ preventScroll: true });
    }
  }, [highlightedId]);

  const handleSearchSelect = (careerId: string) => {
    setPriorityIds([careerId]);
    setHighlightedId(careerId);
  };

  const handleRecommend = (careerIds: string[]) => {
    setPriorityIds(careerIds);
    setHighlightedId(careerIds[0] ?? null);
    setSearchQuery('');
  };

  return (
    <>
      <section
        id="careers"
        className="mx-auto -mt-20 max-w-6xl rounded-4xl border border-slate-200/70 bg-white px-4 py-10 shadow-xl ring-1 ring-black/5 sm:px-6 lg:px-8"
        aria-labelledby="search-heading"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">
              Discover opportunities
            </p>
            <h2 id="search-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Search 21st-century careers aligned with your strengths
            </h2>
            <p className="text-lg text-slate-600">
              Start typing to explore roles, skills, and learning paths. Save matches to revisit anytime.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <SearchBar
              careers={careers}
              query={searchQuery}
              onQueryChange={(value) => {
                setSearchQuery(value);
                setHighlightedId(null);
                if (!value) {
                  setPriorityIds((prev) => prev.slice(0, 3));
                }
              }}
              onSelectCareer={handleSearchSelect}
            />
          </div>
          <div
            aria-live="polite"
            className="text-sm text-slate-500"
          >
            Showing {filteredCareers.length} of {careers.length} careers
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200/70 pt-10">
          <CareerGrid careers={filteredCareers} highlightedId={highlightedId} />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl space-y-8 px-4 sm:px-6 lg:px-8">
        <QuizSection careers={careers} onRecommend={handleRecommend} />
      </section>

      <section className="mx-auto mt-16 max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <ResourcesSection />
      </section>

      <section className="mx-auto mt-16 max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <FAQSection />
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
        <ContactSection />
      </section>

      <div className={clsx('pointer-events-none mx-auto mt-20 h-32 max-w-6xl rounded-full bg-gradient-to-r from-ocean-200/40 via-meadow-200/40 to-slate-200/40 blur-3xl')} aria-hidden="true" />
    </>
  );
}
