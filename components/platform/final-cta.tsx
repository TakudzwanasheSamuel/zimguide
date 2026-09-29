'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { Aurora, GradientRing } from '@/components/motion/aurora';
import Link from 'next/link';
import { ArrowRight, Terminal, UserPlus } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-secondary/15">
      <Aurora className="opacity-30" />
      
      {/* Absolute Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
        <GradientRing size={450} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal direction="up" duration={0.8}>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl lg:leading-[1.1]">
            Power Zimbabwe&apos;s AI Future Through{' '}
            <span className="bg-gradient-brand bg-clip-text text-transparent text-glow">
              Trusted Data Infrastructure
            </span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.15} duration={0.8}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-sm leading-relaxed text-muted-foreground md:text-lg">
            Deploy secure connectors on-premise or in your private cloud, audit pipeline logs cryptographically, and publish verified datasets to local AI systems.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3} duration={0.8}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-6 text-[15px] font-medium gap-2 shadow-glow hover:shadow-primary/30" asChild>
              <Link href="/#contact">
                Request a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6 text-[15px] font-medium glass hover:bg-secondary/40 gap-2" asChild>
              <Link href="/#contact">
                <UserPlus className="h-4 w-4 text-primary" />
                Become a Data Partner
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="h-12 px-6 text-[15px] font-medium gap-2 text-muted-foreground hover:text-foreground" asChild>
              <a href="#api-gateway">
                <Terminal className="h-4 w-4 text-accent" />
                Explore APIs
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
