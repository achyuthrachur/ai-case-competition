'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Chart, Cpu, Document } from 'iconsax-react';
import { BlurText } from '@/components/ui/blur-text';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    Icon: Chart,
    title: 'Real Transaction Data',
    description: '75,000 synthetic records across 21 columns — anomalies pre-labeled, patterns waiting to be found.',
  },
  {
    Icon: Cpu,
    title: 'AI-First Workflow',
    description: 'Use ChatGPT and Codex to build your dashboard. No prior coding experience required.',
  },
  {
    Icon: Document,
    title: 'Guided Case Brief',
    description: 'A clear problem statement, grading rubric, and everything you need to submit — in one place.',
  },
] as const;

export default function LandingPage() {
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-crowe-indigo-dark flex flex-col -mx-4 sm:-mx-6 lg:-mx-8 -mt-16">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">

        {/* Eyebrow tag */}
        <div
          className={cn(
            'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-crowe-amber/30 bg-crowe-amber/10 mb-8 transition-all duration-700',
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-crowe-amber animate-pulse" />
          <span className="text-crowe-amber text-xs font-semibold tracking-widest uppercase">
            Meridian Financial
          </span>
        </div>

        {/* Main headline */}
        <BlurText
          text="AI Solution Builder"
          animateBy="words"
          direction="top"
          delay={200}
          onAnimationComplete={() => setHeadlineVisible(true)}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#f6f7fa] leading-tight tracking-tight"
        />

        {/* Sub-headline */}
        <div
          className={cn(
            'transition-all duration-700 delay-100',
            headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-crowe-amber mt-2 tracking-tight">
            Case Competition
          </p>
        </div>

        {/* Amber divider */}
        <div
          className={cn(
            'w-20 h-0.5 bg-crowe-amber mx-auto my-8 rounded-full transition-all duration-700 delay-200',
            headlineVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          )}
        />

        {/* Description */}
        <p
          className={cn(
            'max-w-xl text-[#f6f7fa]/70 text-lg sm:text-xl leading-relaxed mb-10 transition-all duration-700 delay-300',
            headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          Analyze a real financial dataset, surface anomalies with AI tools,
          and present your findings to the compliance team.
        </p>

        {/* CTA */}
        <div
          className={cn(
            'transition-all duration-700 delay-500',
            headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <Link
            href="/home"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-crowe-amber text-crowe-indigo-dark font-bold text-lg shadow-amber-glow hover:shadow-[0_6px_28px_rgba(245,168,0,0.40)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
            <ArrowRight
              variant="Bold"
              size={22}
              color="#011E41"
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </main>

      {/* ── FEATURE STRIP ────────────────────────────────────── */}
      <section
        className={cn(
          'border-t border-white/10 px-6 py-12 transition-all duration-700 delay-700',
          headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map(({ Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4">
                <Icon variant="Bold" size={24} color="#F5A800" />
              </div>
              <h3 className="text-[#f6f7fa] font-semibold text-sm mb-1">{title}</h3>
              <p className="text-[#f6f7fa]/50 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER NOTE ──────────────────────────────────────── */}
      <footer className="pb-8 text-center">
        <p className="text-[#f6f7fa]/30 text-xs tracking-wide">
          Powered by Meridian Financial · Internal Competition
        </p>
      </footer>
    </div>
  );
}
