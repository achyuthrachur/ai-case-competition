import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RubricPage from '@/app/rubric/page';

// No mocks needed — RubricPage is a pure Server Component with no hooks,
// router calls, animation dependencies, or icon imports.

describe('RubricPage', () => {
  // ─── Page title ───────────────────────────────────────────────────────────

  it('renders page title', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Rubric' })).toBeInTheDocument();
  });

  // ─── RUB-01: Four scoring categories with visual weight indicators ─────────

  it('renders Data Analysis Depth category with 40%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Data Analysis Depth' })).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('renders Dashboard UI Quality category with 35%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Dashboard UI Quality' })).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });

  it('renders Memo Quality category with 15%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Memo Quality' })).toBeInTheDocument();
    // '15%' is exact text node for this card; 'up to 15%' is a distinct node on Extra Credit card
    expect(screen.getByText('15%')).toBeInTheDocument();
  });

  it('renders Extra Credit category with up to 15%', () => {
    render(<RubricPage />);
    expect(screen.getByRole('heading', { name: 'Extra Credit' })).toBeInTheDocument();
    expect(screen.getByText('up to 15%')).toBeInTheDocument();
  });

  // ─── RUB-02: What We're Looking For descriptions ──────────────────────────

  it('renders Data Analysis Depth description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/go beyond listing anomalous rows/i)).toBeInTheDocument();
  });

  it('renders Dashboard UI Quality description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/polished and intentional/i)).toBeInTheDocument();
  });

  it('renders Memo Quality description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/real compliance memo/i)).toBeInTheDocument();
  });

  it('renders Extra Credit description', () => {
    render(<RubricPage />);
    expect(screen.getByText(/above and beyond/i)).toBeInTheDocument();
  });

  // ─── RUB-03: Grading Notes callout block ─────────────────────────────────

  it('renders Grading Notes callout label', () => {
    render(<RubricPage />);
    // DOM text is 'Grading Notes' — Tailwind 'uppercase' is CSS-only and does NOT affect DOM text
    expect(screen.getByText('Grading Notes')).toBeInTheDocument();
  });

  it('renders Grading Notes callout quote text', () => {
    render(<RubricPage />);
    expect(screen.getByText(/field-and-feel based/i)).toBeInTheDocument();
    expect(screen.getByText(/critical thinking/i)).toBeInTheDocument();
  });
});
