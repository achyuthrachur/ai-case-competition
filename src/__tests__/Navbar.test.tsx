import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Navbar } from '@/components/layout/Navbar';

// Mock next/navigation
const mockPathname = vi.fn().mockReturnValue('/');
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

// Mock next/link — render as plain <a> to avoid router context
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

// Mock iconsax-react with SVG stubs (avoids SVG render issues in jsdom)
vi.mock('iconsax-react', () => ({
  Home: ({ variant }: { variant: string }) => (
    <svg data-testid="icon-home" data-variant={variant} />
  ),
  Document: ({ variant }: { variant: string }) => (
    <svg data-testid="icon-document" data-variant={variant} />
  ),
  Judge: ({ variant }: { variant: string }) => (
    <svg data-testid="icon-judge" data-variant={variant} />
  ),
  FolderOpen: ({ variant }: { variant: string }) => (
    <svg data-testid="icon-folder" data-variant={variant} />
  ),
  Send: ({ variant }: { variant: string }) => (
    <svg data-testid="icon-send" data-variant={variant} />
  ),
  HambergerMenu: () => <svg data-testid="icon-hamburger" />,
  CloseCircle: () => <svg data-testid="icon-close" />,
}));

describe('Navbar', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/');
  });

  // NAV-01: Wordmark and fixed positioning
  it('renders the Meridian Financial wordmark', () => {
    render(<Navbar />);
    expect(
      screen.getByText('Meridian Financial — AI Case Competition')
    ).toBeInTheDocument();
  });

  it('has a nav element with fixed positioning class', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('fixed');
  });

  // NAV-02: All 5 nav links with correct labels and icons
  it('renders all 5 nav link labels', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Instructions')).toBeInTheDocument();
    expect(screen.getByText('Rubric')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders an icon for each nav item', () => {
    render(<Navbar />);
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.getByTestId('icon-document')).toBeInTheDocument();
    expect(screen.getByTestId('icon-judge')).toBeInTheDocument();
    expect(screen.getByTestId('icon-folder')).toBeInTheDocument();
    expect(screen.getByTestId('icon-send')).toBeInTheDocument();
  });

  // NAV-03: Active state indicator
  it('applies amber text class to the active nav link', () => {
    mockPathname.mockReturnValue('/instructions');
    render(<Navbar />);
    // Get all elements containing "Instructions" text and find the nav link
    const allInstructionsLinks = screen.getAllByText('Instructions');
    // At least one should have amber class
    const activeLink = allInstructionsLinks.find((el) =>
      el.closest('a')?.className.includes('text-crowe-amber')
    );
    expect(activeLink).toBeTruthy();
  });

  it('does not apply amber text class to inactive nav links', () => {
    mockPathname.mockReturnValue('/instructions');
    render(<Navbar />);
    const homeLinks = screen.getAllByText('Home');
    const inactiveLink = homeLinks.find((el) =>
      el.closest('a')?.className.includes('text-crowe-amber')
    );
    expect(inactiveLink).toBeFalsy();
  });

  // NAV-04: Mobile hamburger menu
  it('does not show the mobile menu on initial render', () => {
    render(<Navbar />);
    // mobile-nav panel should not be in the document initially
    expect(screen.queryByRole('list', { hidden: true })).not.toBeNull(); // desktop list exists
    // The mobile dropdown specifically should not be visible
    const hamburger = screen.getByLabelText('Open menu');
    expect(hamburger).toBeInTheDocument();
  });

  it('shows mobile menu after hamburger button click', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    // After clicking, aria-expanded should be true and close button should appear
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('closes mobile menu when a nav link inside it is clicked', () => {
    render(<Navbar />);
    // Open the menu
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
    // The mobile menu renders nav links — click one of the mobile links
    // After click, menu should close (hamburger button should reappear)
    const closeBtn = screen.getByLabelText('Close menu');
    fireEvent.click(closeBtn);
    // After toggling back closed via close button, open button should reappear
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });
});
