'use client';

// React Bits BlurText component — installed manually (registry CLI pattern equivalent)
// Source pattern: https://reactbits.dev/text-animations/blur-text
// Uses GSAP for animation, Tailwind for styling

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
  variant?: {
    hidden: { filter: string; opacity: number; y: number };
    visible: (i: number) => {
      filter: string;
      opacity: number;
      y: number;
      transition: { delay: number; duration: number };
    };
  };
}

export function BlurText({
  text = '',
  delay = 200,
  className,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>('[data-blur-item]');
    if (!spans.length) return;

    hasAnimated.current = true;

    gsap.fromTo(
      spans,
      {
        filter: 'blur(10px)',
        opacity: 0,
        y: direction === 'top' ? -20 : 20,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: delay / 1000,
        ease: 'power2.out',
        onComplete: onAnimationComplete,
      }
    );
  }, [delay, direction, onAnimationComplete]);

  return (
    <span ref={containerRef} className={cn('inline', className)}>
      {elements.map((element, index) => (
        <span
          key={index}
          data-blur-item
          className="inline-block"
          style={{ willChange: 'filter, opacity, transform' }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  );
}
