import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DownloadsPage from '@/app/downloads/page';

// No mocks needed — DownloadsPage is a pure Server Component with no hooks,
// router calls, animation dependencies, or icon imports.

describe('DownloadsPage', () => {
  it('renders page title', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('heading', { name: 'Downloads' })).toBeInTheDocument();
  });

  // DL-01: transactions.csv card
  it('renders transactions.csv card heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('heading', { name: 'transactions.csv' })).toBeInTheDocument();
  });

  // DL-02: data_dictionary.md card
  it('renders data_dictionary.md card heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('heading', { name: 'data_dictionary.md' })).toBeInTheDocument();
  });

  // DL-03: setup_guide.md card
  it('renders setup_guide.md card heading', () => {
    render(<DownloadsPage />);
    expect(screen.getByRole('heading', { name: 'setup_guide.md' })).toBeInTheDocument();
  });

  // DL-01: transactions.csv description and size
  it('renders transactions.csv description and size', () => {
    render(<DownloadsPage />);
    expect(screen.getByText(/Synthetic transaction records/i)).toBeInTheDocument();
    expect(screen.getByText('~10\u201312 MB')).toBeInTheDocument();
  });

  // DL-02 + DL-03: data_dictionary.md and setup_guide.md both show '< 5 KB'
  it('renders data_dictionary.md description and size', () => {
    render(<DownloadsPage />);
    expect(screen.getByText(/Plain-language description of every column/i)).toBeInTheDocument();
    // Both data_dictionary.md and setup_guide.md display '< 5 KB'
    expect(screen.getAllByText('< 5 KB')).toHaveLength(2);
  });

  // DL-04: Download attribute and href
  it('renders three download links with download attribute', () => {
    render(<DownloadsPage />);
    const links = screen.getAllByRole('link', { name: /download/i });
    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link).toHaveAttribute('download');
    });
  });

  it('renders correct hrefs for all three download links', () => {
    render(<DownloadsPage />);
    const links = screen.getAllByRole('link', { name: /download/i });
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/transactions.csv');
    expect(hrefs).toContain('/data_dictionary.md');
    expect(hrefs).toContain('/setup_guide.md');
  });
});
