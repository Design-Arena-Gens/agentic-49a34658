"use client";

import { useState } from 'react';
import { faqs } from '@/data/resources';

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faqs" aria-labelledby="faq-heading" className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">Questions</p>
        <h2 id="faq-heading" className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-lg text-slate-600">
          Quick answers to help you make the most of Career Compass and plan your next steps with confidence.
        </p>
      </div>
      <div className="mx-auto max-w-4xl divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200/80 bg-white">
        {faqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div key={faq.id} className="p-6">
              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isOpen}
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-button`}
              >
                <span className="text-lg font-semibold text-slate-900">{faq.question}</span>
                <span
                  className={`ml-4 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 text-ocean-600 transition ${
                    isOpen ? 'rotate-45 bg-ocean-50 border-ocean-200' : 'bg-white'
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                id={`${faq.id}-content`}
                role="region"
                aria-labelledby={`${faq.id}-button`}
                className={`mt-4 text-sm text-slate-600 transition-all ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                }`}
              >
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
