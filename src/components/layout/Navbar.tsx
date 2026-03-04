'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Document,
  Judge,
  FolderOpen,
  Send,
  HambergerMenu,
  CloseCircle,
} from 'iconsax-react';
import { cn } from '@/lib/utils';

type IconVariant = 'Bold' | 'Linear' | 'Broken' | 'Bulk' | 'Outline' | 'TwoTone';

interface NavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ variant: IconVariant; size: number; color?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/home', label: 'Home', Icon: Home },
  { href: '/instructions', label: 'Instructions', Icon: Document },
  { href: '/rubric', label: 'Rubric', Icon: Judge },
  { href: '/downloads', label: 'Downloads', Icon: FolderOpen },
  { href: '/submit', label: 'Submit', Icon: Send },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/home') return pathname === '/home';
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-crowe-indigo-dark shadow-crowe-md">
      {/* Inner: full-width flex row */}
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark — left */}
        <Link
          href="/home"
          className="text-sm font-semibold text-[#f6f7fa] hover:text-crowe-amber transition-colors duration-150 truncate max-w-[240px] sm:max-w-none"
        >
          Meridian Financial — AI Case Competition
        </Link>

        {/* Desktop nav links — right, hidden on mobile */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const active = isActive(pathname ?? '/', href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1 text-sm font-medium transition-colors duration-150 border-b-2',
                    active
                      ? 'text-crowe-amber border-crowe-amber'
                      : 'text-[#f6f7fa]/70 border-transparent hover:text-[#f6f7fa]'
                  )}
                >
                  <Icon variant={active ? 'Bold' : 'Linear'} size={18} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#f6f7fa] hover:text-crowe-amber transition-colors duration-150"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? (
            <CloseCircle variant="Bold" size={24} />
          ) : (
            <HambergerMenu variant="Bold" size={24} />
          )}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-crowe-indigo-dark border-t border-white/10 transition-all duration-200"
        >
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map(({ href, label, Icon }) => {
              const active = isActive(pathname ?? '/', href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    data-testid="mobile-nav-link"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-150',
                      active
                        ? 'text-crowe-amber'
                        : 'text-[#f6f7fa]/70 hover:text-[#f6f7fa]'
                    )}
                  >
                    <Icon variant={active ? 'Bold' : 'Linear'} size={20} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
