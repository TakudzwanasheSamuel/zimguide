'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Aurora background — soft animated gradient blobs over the deep navy base.
 * Purely decorative; respects reduced-motion.
 */
export function Aurora({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <div
        className={cn(
          'aurora-blob absolute -top-32 left-1/4 h-[42rem] w-[42rem] rounded-full opacity-40 blur-[120px]',
          reduce && 'animate-none',
        )}
        style={{
          background:
            'radial-gradient(circle at center, #00C6A7 0%, transparent 60%)',
        }}
      />
      <div
        className={cn(
          'aurora-blob absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full opacity-30 blur-[120px]',
          reduce && 'animate-none',
        )}
        style={{
          background:
            'radial-gradient(circle at center, #2563EB 0%, transparent 60%)',
          animationDelay: '-6s',
        }}
      />
      <div
        className={cn(
          'aurora-blob absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full opacity-25 blur-[120px]',
          reduce && 'animate-none',
        )}
        style={{
          background:
            'radial-gradient(circle at center, #0EA5E9 0%, transparent 60%)',
          animationDelay: '-12s',
        }}
      />
    </div>
  );
}

/** Subtle grid overlay with radial fade. */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]',
        className,
      )}
    />
  );
}

/** Animated conic gradient ring used in hero visuals. */
export function GradientRing({
  className,
  size = 320,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-60 blur-md"
        style={{
          background:
            'conic-gradient(from 0deg, #00C6A7, #0EA5E9, #2563EB, #00C6A7)',
        }}
        animate={useReducedMotion() ? {} : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="absolute inset-[3px] rounded-full"
        style={{ background: 'hsl(var(--background))' }}
      />
    </div>
  );
}
