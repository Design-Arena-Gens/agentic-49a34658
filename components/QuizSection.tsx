"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Career } from '@/data/careers';
import { quizQuestions, type QuizOption } from '@/data/quiz';

type QuizSectionProps = {
  careers: Career[];
  onRecommend?: (careerIds: string[]) => void;
};

type AnswerMap = Record<string, QuizOption>;

export function QuizSection({ careers, onRecommend }: QuizSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showResults, setShowResults] = useState(false);

  const totalSteps = quizQuestions.length;
  const isLastStep = currentStep === totalSteps - 1;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const recommendations = useMemo(() => {
    if (Object.keys(answers).length !== totalSteps) {
      return [];
    }

    const tagScores = new Map<string, number>();

    Object.values(answers).forEach((option) => {
      option.tags.forEach((tag) => {
        tagScores.set(tag, (tagScores.get(tag) ?? 0) + 2);
      });
    });

    return careers
      .map((career) => {
        const score = career.tags.reduce((acc, tag) => acc + (tagScores.get(tag) ?? 0), 0);
        return { career, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ career }) => career);
  }, [answers, careers, totalSteps]);

  useEffect(() => {
    if (showResults && recommendations.length && onRecommend) {
      onRecommend(recommendations.map((career) => career.id));
    }
  }, [onRecommend, recommendations, showResults]);

  const handleOptionSelect = (questionId: string, option: QuizOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const goToNext = () => {
    if (isLastStep) {
      setShowResults(true);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const goToPrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  return (
    <section
      id="quiz"
      aria-labelledby="quiz-heading"
      className="relative overflow-hidden rounded-4xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80 sm:p-8 lg:p-10"
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-slate-200" aria-hidden="true">
        <div
          className="h-full rounded-t-3xl bg-gradient-to-r from-ocean-500 via-meadow-400 to-slate-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="relative mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:max-w-xs">
          <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">Career quiz</p>
          <h2 id="quiz-heading" className="mt-2 text-3xl font-bold text-slate-900">
            Discover aligned career paths
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tell us about your motivations and strengths. We’ll suggest roles that match your energy, learning style, and desired impact.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-500">
            <p>
              <span className="font-semibold text-ocean-600">{currentStep + 1}</span> of {totalSteps} questions
            </p>
            <p>Progress: {progressPercent}% complete</p>
          </div>
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean-600 transition hover:text-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0112.87-4.95M19.5 12a7.5 7.5 0 01-12.87 4.95M4.5 12H9m6 0h4.5" />
            </svg>
            Restart quiz
          </button>
        </div>
        <div className="flex-1">
          {!showResults ? (
            <div className="space-y-6">
              {quizQuestions.slice(currentStep, currentStep + 1).map((question) => {
                const selectedOption = answers[question.id]?.id;
                return (
                  <div key={question.id}>
                    <div className="space-y-2">
                      <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
                        Question {currentStep + 1}
                      </p>
                      <h3 className="text-2xl font-semibold text-slate-900">{question.prompt}</h3>
                      {question.helper && <p className="text-sm text-slate-600">{question.helper}</p>}
                    </div>
                    <div
                      role="radiogroup"
                      aria-label={question.prompt}
                      className="mt-6 grid gap-4 sm:grid-cols-2"
                    >
                      {question.options.map((option) => {
                        const isSelected = option.id === selectedOption;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => handleOptionSelect(question.id, option)}
                            className={`card-hover-transition relative flex h-full flex-col rounded-3xl border ${
                              isSelected
                                ? 'border-ocean-400 bg-ocean-50 shadow-lg'
                                : 'border-slate-200/80 bg-white'
                            } p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400`}
                          >
                            <span
                              aria-hidden="true"
                              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ocean-500 to-meadow-400 text-2xl text-white shadow"
                            >
                              {option.emoji}
                            </span>
                            <span className="mt-4 text-lg font-semibold text-slate-900">{option.label}</span>
                            <span className="mt-2 text-sm text-slate-600">{option.description}</span>
                            <span className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-ocean-600">
                              {option.tags.map((tag) => (
                                <span key={tag} className="rounded-full bg-ocean-100 px-2.5 py-1 text-ocean-600">
                                  #{tag}
                                </span>
                              ))}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goToPrevious}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-ocean-400 hover:text-ocean-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={!answers[quizQuestions[currentStep].id]}
                  className="inline-flex items-center gap-2 rounded-full bg-ocean-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-ocean-500 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isLastStep ? 'See my matches' : 'Next question'}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-ocean-500">Your matches</p>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Your strengths align with these career paths
                </h3>
                <p className="text-sm text-slate-600">
                  Explore each career to understand growth opportunities, day-to-day work, and how to tailor your skill-building roadmap.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.length ? (
                  recommendations.map((career) => (
                    <div key={career.id} className="card-hover-transition rounded-3xl border border-ocean-100 bg-ocean-50/70 p-5 text-slate-800">
                      <h4 className="text-lg font-semibold text-ocean-700">{career.title}</h4>
                      <p className="mt-2 text-sm text-slate-600">{career.description}</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li>
                          <span className="font-semibold text-slate-800">Salary: </span>
                          {career.salaryRange}
                        </li>
                        <li>
                          <span className="font-semibold text-slate-800">Top skills: </span>
                          {career.skills.slice(0, 3).join(', ')}
                        </li>
                      </ul>
                      <a
                        href={`#${career.id}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ocean-600 transition hover:text-ocean-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-400"
                      >
                        View career card
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-6 text-center text-sm text-slate-500">
                    We need all answers to personalize your matches. Revisit the quiz and share your preferences.
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-ocean-400 hover:text-ocean-500"
                >
                  Retake quiz
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-meadow-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-meadow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-meadow-500"
                >
                  Connect with a mentor
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
