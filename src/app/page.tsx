'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Document, Judge, FolderOpen, Send, Calendar } from 'iconsax-react';
import { BlurText } from '@/components/ui/blur-text';
import { cn } from '@/lib/utils';

const CARDS = [
  {
    href: '/instructions',
    Icon: Document,
    title: 'Instructions',
    description: 'Read the case brief and rules',
  },
  {
    href: '/rubric',
    Icon: Judge,
    title: 'Rubric',
    description: 'See how your work will be scored',
  },
  {
    href: '/downloads',
    Icon: FolderOpen,
    title: 'Downloads',
    description: 'Get the dataset and reference files',
  },
  {
    href: '/submit',
    Icon: Send,
    title: 'Submit',
    description: 'Upload your dashboard and memo',
  },
] as const;

export default function HomePage() {
  const [blurbVisible, setBlurbVisible] = useState(false);

  return (
    <>
      {/* 1. HERO — full-width dark indigo band */}
      <section className="bg-crowe-indigo-dark -mx-4 sm:-mx-6 lg:-mx-8 min-h-[50vh] flex items-center justify-center text-center py-16">
        <div className="max-w-4xl mx-auto px-4">
          <BlurText
            text="Meridian Financial — AI Case Competition"
            animateBy="words"
            direction="top"
            delay={250}
            onAnimationComplete={() => setBlurbVisible(true)}
            className="text-3xl sm:text-4xl font-bold text-[#f6f7fa] leading-tight"
          />
          <div className="w-16 h-1 bg-crowe-amber rounded-full mx-auto my-6" />
          <p
            className={cn(
              'text-[#f6f7fa]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-opacity duration-300',
              blurbVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            You&apos;ve been given access to a transaction dataset from a regional bank.
            Your challenge: use AI tools to build a dashboard that surfaces anomalies,
            uncovers patterns, and tells a story about what&apos;s happening in these accounts.
          </p>
        </div>
      </section>

      {/* 2. QUICK-LINK CARDS — warm off-white section */}
      <section className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map(({ href, Icon, title, description }) => (
            <Link key={href} href={href} className="block group">
              <div className="bg-white shadow-crowe-card rounded-xl p-6 h-full hover:-translate-y-1 hover:shadow-amber-glow transition-all duration-200">
                <Icon variant="Bold" size={48} className="text-crowe-indigo-dark mb-4" />
                <h3 className="text-base font-semibold text-crowe-indigo-dark">{title}</h3>
                <p className="text-sm text-tint-700 mt-1 leading-snug">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. KEY DATES — amber-wash full-width band */}
      <section className="bg-section-amber -mx-4 sm:-mx-6 lg:-mx-8 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold text-crowe-indigo-dark mb-8">Key Dates</h2>
          <div className="flex flex-col sm:flex-row gap-10 justify-center">
            {[
              { label: 'Competition Opens', value: 'TBD' },
              { label: 'Submission Deadline', value: 'TBD' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Calendar variant="Linear" size={24} className="text-crowe-indigo-dark flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-crowe-indigo-dark">{label}</p>
                  <p className="text-sm text-tint-700">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
