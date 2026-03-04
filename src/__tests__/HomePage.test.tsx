import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import HomePage from '@/app/home/page';

// Mock @/components/ui/blur-text — renders text as h1 stub; onClick proxies onAnimationComplete
// so tests can simulate animation completion without GSAP/jsdom conflicts
vi.mock('@/components/ui/blur-text', () => ({
  BlurText: ({
    text,
    className,
    onAnimationComplete,
  }: {
    text?: string;
    className?: string;
    onAnimationComplete?: () => void;
  }) => (
    <h1
      data-testid="blur-text"
      className={className}
      onClick={onAnimationComplete}
    >
      {text}
    </h1>
  ),
}));

// Mock next/link — render as plain <a> to avoid router context requirement
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    onClick,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

// Mock iconsax-react — stub all 5 icons used on the home page
vi.mock('iconsax-react', () => ({
  Document: ({ variant }: { variant?: string }) => (
    <svg data-testid="icon-document" data-variant={variant} />
  ),
  Judge: ({ variant }: { variant?: string }) => (
    <svg data-testid="icon-judge" data-variant={variant} />
  ),
  FolderOpen: ({ variant }: { variant?: string }) => (
    <svg data-testid="icon-folder" data-variant={variant} />
  ),
  Send: ({ variant }: { variant?: string }) => (
    <svg data-testid="icon-send" data-variant={variant} />
  ),
  Calendar: ({ variant }: { variant?: string }) => (
    <svg data-testid="icon-calendar" data-variant={variant} />
  ),
}));

describe('HomePage', () => {
  // HOME-01: Hero section with BlurText headline
  it('renders the headline text via BlurText', () => {
    render(<HomePage />);
    // BlurText mock renders as h1 with data-testid="blur-text"
    expect(screen.getByTestId('blur-text')).toBeInTheDocument();
    // The headline must contain the competition name
    expect(screen.getByText(/Meridian Financial/)).toBeInTheDocument();
  });

  // HOME-02 (initial state): blurb paragraph is hidden before animation completes
  it('blurb is hidden before animation completes', () => {
    render(<HomePage />);
    // Find the paragraph that contains the competition blurb text
    const blurb = screen.getByText(/transaction dataset/i);
    // Must start with opacity-0 (not yet visible)
    expect(blurb.className).toContain('opacity-0');
    // Must NOT already show opacity-100
    expect(blurb.className).not.toContain('opacity-100');
  });

  // HOME-02 (post-animation): blurb becomes visible after onAnimationComplete fires
  it('blurb becomes visible after onAnimationComplete fires', () => {
    render(<HomePage />);
    // Simulate BlurText completing its animation (mock calls onClick → onAnimationComplete)
    fireEvent.click(screen.getByTestId('blur-text'));
    const blurb = screen.getByText(/transaction dataset/i);
    // After animation, must be visible
    expect(blurb.className).toContain('opacity-100');
    // And must no longer be opacity-0
    expect(blurb.className).not.toContain('opacity-0');
  });

  // HOME-03: Quick-link cards with correct hrefs
  it('renders all 4 quick-link cards with correct hrefs', () => {
    render(<HomePage />);
    const instructionsLink = screen.getByRole('link', { name: /Instructions/i });
    expect(instructionsLink).toHaveAttribute('href', '/instructions');

    const rubricLink = screen.getByRole('link', { name: /Rubric/i });
    expect(rubricLink).toHaveAttribute('href', '/rubric');

    const downloadsLink = screen.getByRole('link', { name: /Downloads/i });
    expect(downloadsLink).toHaveAttribute('href', '/downloads');

    const submitLink = screen.getByRole('link', { name: /Submit/i });
    expect(submitLink).toHaveAttribute('href', '/submit');
  });

  // HOME-04: Key Dates section with both entries
  it('renders key dates section with both entries', () => {
    render(<HomePage />);
    expect(screen.getByText('Competition Opens')).toBeInTheDocument();
    expect(screen.getByText('Submission Deadline')).toBeInTheDocument();
    // Both date values are TBD
    const tbdEntries = screen.getAllByText('TBD');
    expect(tbdEntries).toHaveLength(2);
  });
});
