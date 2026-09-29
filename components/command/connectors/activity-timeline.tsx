'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Download,
  FileText,
  Play,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { GlassCard } from '@/components/site/section';
import type { ActivityItem } from '@/lib/connector-types';
import { cn } from '@/lib/utils';

const TYPE_ICONS = {
  start: Play,
  auth: ShieldCheck,
  download: Download,
  metadata: FileText,
  complete: CheckCircle2,
  error: AlertTriangle,
};

const TYPE_COLORS = {
  start: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  auth: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  download: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  metadata: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  complete: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  error: 'text-red-400 bg-red-500/10 border-red-500/30',
};

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <GlassCard className="p-4 border-border/80 bg-card/40" hover={false}>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Live Activity Timeline
      </h4>

      {activities.length === 0 ? (
        <p className="text-[10px] text-muted-foreground font-mono py-4 text-center">
          No recent connector activity
        </p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {activities.map((item, idx) => {
            const Icon = TYPE_ICONS[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-3"
              >
                <div
                  className={cn(
                    'grid h-7 w-7 shrink-0 place-items-center rounded-lg border',
                    TYPE_COLORS[item.type],
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1 border-b border-border/30 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
