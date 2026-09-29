'use client';

import { ArrowRight, Handshake, Store } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/motion/aurora';
import { Reveal } from '@/components/motion/reveal';

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 px-6 py-20 text-center backdrop-blur-xl lg:px-16 lg:py-28">
            <Aurora className="opacity-70" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl lg:leading-[1.1]">
                Power Zimbabwe&apos;s Next Generation of{' '}
                <span className="gradient-text text-glow">AI</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
                Join universities, research institutions and innovators building
                Zimbabwe&apos;s sovereign AI ecosystem.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="group gap-2" asChild>
                  <Link href="#datasets">
                    Browse Marketplace
                    <Store className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group gap-2 bg-secondary/30" asChild>
                  <Link href="#contact">
                    Become a Partner
                    <Handshake className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
