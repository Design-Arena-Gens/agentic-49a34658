"use client";

import { FormEvent, useState } from 'react';

type ContactFormState = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

const initialState: ContactFormState = {
  name: '',
  email: '',
  topic: 'career-coaching',
  message: ''
};

export function ContactSection() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Please add an email address.';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(formState.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Please share a brief message or question.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setFormState(initialState);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="rounded-4xl bg-slate-900 px-6 py-16 text-white shadow-2xl sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-meadow-300">Connect</p>
        <h2 id="contact-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
          Personalized support when you need it
        </h2>
        <p className="mt-3 text-lg text-slate-200">
          Share your goals or questions and our career coaches will reach out with tailored guidance.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto mt-10 max-w-3xl space-y-6 rounded-3xl bg-white/10 p-6 shadow-inner backdrop-blur-md"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-100">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-300 focus:border-meadow-300 focus:outline-none focus:ring-2 focus:ring-meadow-300/60"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-meadow-200">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-100">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-300 focus:border-meadow-300 focus:outline-none focus:ring-2 focus:ring-meadow-300/60"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-meadow-200">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="topic" className="block text-sm font-semibold text-slate-100">
            How can we help?
          </label>
          <select
            id="topic"
            name="topic"
            value={formState.topic}
            onChange={(event) => setFormState((prev) => ({ ...prev, topic: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white focus:border-meadow-300 focus:outline-none focus:ring-2 focus:ring-meadow-300/60"
          >
            <option value="career-coaching">Career coaching session</option>
            <option value="resume-review">Resume or portfolio review</option>
            <option value="interview-prep">Interview preparation</option>
            <option value="job-search">Job search strategy</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-100">
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formState.message}
            onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-slate-300 focus:border-meadow-300 focus:outline-none focus:ring-2 focus:ring-meadow-300/60"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-meadow-200">
              {errors.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-meadow-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg transition hover:bg-meadow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-meadow-200"
        >
          Submit message
        </button>
        <div role="status" aria-live="polite" className="text-center text-sm">
          {status === 'success' && (
            <p className="text-meadow-200">
              Thank you for reaching out! A Career Compass mentor will contact you within 24 hours.
            </p>
          )}
          {status === 'error' && Object.keys(errors).length > 0 && (
            <p className="text-yellow-200">
              Please address the highlighted fields so we can follow up with you quickly.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
