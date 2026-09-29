'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Database, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Technology Core', href: '/platform' },
  { label: 'Command Centre', href: '/command' },
  { label: 'Licensing & Royalties', href: '/revenue' },
  { label: 'Developer Portal', href: '/developers' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300',
          scrolled
            ? 'glass-strong border-border/60 shadow-soft'
            : 'border-transparent bg-transparent',
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">
            ZimGuide
            <span className="text-muted-foreground"> Data Core</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-lg px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute inset-x-2.5 -bottom-px h-px scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/#contact">Become a Data Partner</Link>
          </Button>
          <Button size="sm" className="gap-1.5" asChild>
            <Link href="/marketplace">
              Browse Datasets
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass-strong absolute left-4 right-4 top-[calc(100%+0.5rem)] rounded-2xl border border-border/60 p-3 shadow-soft-lg lg:hidden"
            >
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/#contact" onClick={() => setOpen(false)}>
                    Become a Data Partner
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/marketplace" onClick={() => setOpen(false)}>
                    Browse Datasets
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand shadow-glow',
        className,
      )}
    >
      <Database className="h-4 w-4 text-white" strokeWidth={2.5} />
    </div>
  );
}
