'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/site/navbar';
import { Bell, HelpCircle, Settings, ChevronDown, Check, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PortalNav() {
  const [activeWorkspace, setActiveWorkspace] = useState('Production Ingest');
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const workspaces = ['Production Ingest', 'Staging Audit Pool', 'Historical Archives (Read-Only)'];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Workspace Switcher */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Logo className="h-7 w-7" />
              <span className="hidden text-sm font-semibold tracking-tight sm:inline-block">
                ZimGuide <span className="text-muted-foreground">Data Core</span>
              </span>
            </Link>

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-border/60" />

            {/* Workspace Dropdown Switcher */}
            <div className="relative">
              <button
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 hover:bg-secondary transition-all"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="truncate max-w-[120px] md:max-w-none">{activeWorkspace}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>

              <AnimatePresence>
                {workspaceOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setWorkspaceOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 mt-1.5 w-56 rounded-xl border border-border/60 bg-card p-1 shadow-soft-lg z-50 glass-strong"
                    >
                      <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Select Workspace
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {workspaces.map((ws) => {
                          const isActive = activeWorkspace === ws;
                          return (
                            <button
                              key={ws}
                              onClick={() => {
                                setActiveWorkspace(ws);
                                setWorkspaceOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-left transition-colors ${
                                isActive
                                  ? 'bg-primary/10 text-primary'
                                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                              }`}
                            >
                              {ws}
                              {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Tools & Profile */}
          <div className="flex items-center gap-2">
            
            {/* Help Center */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg">
              <HelpCircle className="h-4.5 w-4.5" />
            </Button>

            {/* Configuration Settings */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg">
              <Settings className="h-4.5 w-4.5" />
            </Button>

            {/* Notification Bell */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              </Button>
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center h-8 w-8 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold text-xs shadow-glow hover:border-primary/60 transition-all"
              >
                NA
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl border border-border/60 bg-card p-1 shadow-soft-lg z-50 glass-strong"
                    >
                      {/* Current User Info */}
                      <div className="px-3 py-2 border-b border-border/60">
                        <div className="text-xs font-bold text-foreground">National Archives</div>
                        <div className="text-[10px] text-muted-foreground truncate">admin@archives.gov.zw</div>
                      </div>

                      <div className="mt-1 space-y-0.5">
                        <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                          <User className="h-4 w-4" />
                          My Profile
                        </button>
                        <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                          <Shield className="h-4 w-4" />
                          Security Policies
                        </button>
                        <hr className="my-1 border-border/60" />
                        <button className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors">
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
