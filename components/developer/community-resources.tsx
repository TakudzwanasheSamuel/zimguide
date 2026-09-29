'use client';

import { communityLinks } from '@/lib/developer-data';
import { GlassCard } from '@/components/site/section';
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal';
import { BookOpen, FolderOpen, Github, MessageSquare, GraduationCap, LayoutGrid } from 'lucide-react';

const iconMap = [
  BookOpen,
  FolderOpen,
  Github,
  MessageSquare,
  GraduationCap,
  LayoutGrid,
];

export function CommunityResources() {
  const handleScroll = (target: string) => {
    if (target.startsWith('#')) {
      const el = document.getElementById(target.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="community-resources" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <MessageSquare className="h-4.5 w-4.5 text-primary" />
          Developer Community & Resources
        </h3>
        <p className="text-xs text-muted-foreground">
          Join other builders, read guides, download libraries, or report bugs in open discussion threads.
        </p>
      </div>

      <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {communityLinks.map((link, idx) => {
          const Icon = iconMap[idx % iconMap.length];

          return (
            <StaggerItem key={link.title}>
              <GlassCard
                className="group h-full p-5 hover:border-primary/45 hover:shadow-glow cursor-pointer flex items-start gap-4"
                onClick={() => handleScroll(link.target)}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border/80 bg-secondary/50 text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-relaxed text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-normal mt-1">
                    {link.desc}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
