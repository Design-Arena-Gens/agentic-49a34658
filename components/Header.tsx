"use client";

import { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Careers', href: '#careers' },
  { name: 'Career Quiz', href: '#quiz' },
  { name: 'Resources', href: '#resources' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact', href: '#contact' }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="#hero"
          aria-label="Career Compass homepage"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ocean-700 transition hover:text-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-ocean-500 to-meadow-400 text-white shadow-md">
            CC
          </span>
          Career Compass
        </Link>
        <nav aria-label="Main navigation" className="hidden gap-8 text-sm font-medium text-slate-700 md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-full px-3 py-2 transition-colors hover:text-ocean-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex">
          <a
            href="#quiz"
            className="rounded-full bg-ocean-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
          >
            Take the Quiz
          </a>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <div
        id="mobile-menu"
        className={clsx(
          'md:hidden',
          isOpen ? 'origin-top animate-[fade-in-up_280ms_ease]' : 'hidden'
        )}
      >
        <nav aria-label="Mobile navigation" className="space-y-1 border-t border-slate-200/60 bg-white px-4 py-4 shadow-lg">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#quiz"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg bg-ocean-600 px-4 py-3 text-base font-semibold text-white shadow-md transition hover:bg-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
          >
            Take the Quiz
          </a>
        </nav>
      </div>
    </header>
  );
}
