import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InstructionsPage from '@/app/instructions/page';

// No mocks needed — InstructionsPage is a pure Server Component with no hooks,
// router calls, animation dependencies, or icon imports.

describe('InstructionsPage', () => {
  // ─── INST-01: Background section ─────────────────────────────────────────

  it('renders Background section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Background' })).toBeInTheDocument();
  });

  it('renders Background paragraph text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/Meridian Financial/)).toBeInTheDocument();
    expect(screen.getByText(/compliance team/i)).toBeInTheDocument();
  });

  // ─── INST-02: Your Dataset section ───────────────────────────────────────

  it('renders Your Dataset section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Your Dataset' })).toBeInTheDocument();
  });

  it('renders Your Dataset paragraph text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/transactions\.csv/i)).toBeInTheDocument();
  });

  // ─── INST-03: Your Deliverables section ──────────────────────────────────

  it('renders Your Deliverables section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Your Deliverables' })).toBeInTheDocument();
  });

  it('renders both numbered deliverable items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText('Standalone HTML Dashboard')).toBeInTheDocument();
    expect(screen.getByText('2-Page Findings Memo')).toBeInTheDocument();
  });

  it('renders indigo number badges 1 and 2', () => {
    render(<InstructionsPage />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // ─── INST-04: Tools and Not-Needed sections ───────────────────────────────

  it('renders Tools You Should Use section heading', () => {
    render(<InstructionsPage />);
    expect(screen.getByRole('heading', { name: 'Tools You Should Use' })).toBeInTheDocument();
  });

  it('renders Tools list items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/VS Code/)).toBeInTheDocument();
    expect(screen.getByText(/Cursor or GitHub Copilot/)).toBeInTheDocument();
  });

  it('renders What You Do NOT Need to Do section heading', () => {
    render(<InstructionsPage />);
    expect(
      screen.getByRole('heading', { name: 'What You Do NOT Need to Do' })
    ).toBeInTheDocument();
  });

  it('renders Not-needed list items', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/machine learning model/i)).toBeInTheDocument();
    expect(screen.getByText(/Deploy anything/i)).toBeInTheDocument();
  });

  // ─── INST-05: Guidance callout ────────────────────────────────────────────

  it('renders Guidance callout label', () => {
    render(<InstructionsPage />);
    // DOM text is 'Guidance' — Tailwind 'uppercase' is CSS-only and does NOT affect DOM text
    expect(screen.getByText('Guidance')).toBeInTheDocument();
  });

  it('renders Guidance quote text', () => {
    render(<InstructionsPage />);
    expect(screen.getByText(/end deliverables are clear/i)).toBeInTheDocument();
    expect(screen.getByText(/use AI aggressively/i)).toBeInTheDocument();
  });
});
