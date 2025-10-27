"use client";

import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { Career } from '@/data/careers';

type SearchBarProps = {
  careers: Career[];
  query: string;
  onQueryChange: (value: string) => void;
  onSelectCareer: (careerId: string) => void;
};

export function SearchBar({ careers, query, onQueryChange, onSelectCareer }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return careers.slice(0, 5);
    }

    const normalized = query.trim().toLowerCase();
    return careers
      .filter((career) =>
        [career.title, career.description, career.skills.join(' '), career.tags.join(' ')].some((field) =>
          field.toLowerCase().includes(normalized)
        )
      )
      .slice(0, 7);
  }, [careers, query]);

  const hasSuggestions = suggestions.length > 0;

  const handleSelect = (careerId: string, value: string) => {
    onQueryChange(value);
    onSelectCareer(careerId);
    setIsFocused(false);
  };

  return (
    <div className="relative" role="search">
      <label htmlFor="career-search" className="sr-only">
        Search careers
      </label>
      <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-lg ring-1 ring-slate-200/70 focus-within:ring-2 focus-within:ring-ocean-400">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-ocean-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
          />
        </svg>
        <input
          id="career-search"
          type="search"
          role="combobox"
          className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          placeholder="Search roles, skills, or industries..."
          autoComplete="off"
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setActiveIndex(0);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (!hasSuggestions) return;

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setActiveIndex((prev) => (prev + 1) % suggestions.length);
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
            } else if (event.key === 'Enter') {
              const selected = suggestions[activeIndex];
              if (selected) {
                event.preventDefault();
                handleSelect(selected.id, selected.title);
              }
            } else if (event.key === 'Escape') {
              setIsFocused(false);
            }
          }}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-controls="career-suggestions"
          aria-expanded={isFocused && hasSuggestions}
        />
        <div className="hidden text-sm text-slate-500 md:block" aria-hidden="true">
          ⌘K
        </div>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {hasSuggestions ? `${suggestions.length} suggestions available` : 'No suggestions available'}
      </div>
      {isFocused && hasSuggestions && (
        <ul
          id="career-suggestions"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
        >
          {suggestions.map((career, index) => (
            <li key={career.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(career.id, career.title)}
                className={clsx(
                  'flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500',
                  index === activeIndex ? 'bg-ocean-50 text-ocean-700' : 'hover:bg-slate-50'
                )}
              >
                <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean-100 text-xs font-semibold text-ocean-600">
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold">{career.title}</span>
                  <span className="mt-1 block text-slate-500">
                    {career.skills.slice(0, 2).join(' • ')}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
