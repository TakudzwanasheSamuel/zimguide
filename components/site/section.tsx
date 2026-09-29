'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

/**
 * Premium glass card with hover elevation. Use for feature/dataset cards.
 */
export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      onClick={onClick}
      whileHover={
        hover && !reduce ? { y: -4 } : undefined
      }
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl',
        glow && 'shadow-glow',
        className,
      )}
    >
      {/* hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>
      {children}
    </motion.div>
  );
}

/** Section heading block with eyebrow + title + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground md:self-center">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Decorative gradient divider line. */
export function GradientDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-border to-transparent',
        className,
      )}
    />
  );
}

export { Card };
