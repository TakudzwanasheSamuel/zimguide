'use client';

import { useState } from 'react';
import { provincesData, type ProvinceDetails } from '@/lib/command-data';
import { GlassCard } from '@/components/site/section';
import { Landmark, Database, Users, Cpu, GraduationCap, Coins, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProvinceMap() {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceDetails>(
    provincesData.find((p) => p.name === 'Harare') || provincesData[0]
  );

  // Stylized coordinate mappings for Zimbabwe 10 provinces to draw a neat polygonal map
  const mapNodes = [
    { name: 'Matabeleland North', cx: 100, cy: 110, r: 28 },
    { name: 'Matabeleland South', cx: 140, cy: 250, r: 24 },
    { name: 'Midlands', cx: 240, cy: 180, r: 28 },
    { name: 'Masvingo', cx: 320, cy: 260, r: 26 },
    { name: 'Manicaland', cx: 410, cy: 190, r: 25 },
    { name: 'Harare', cx: 330, cy: 110, r: 16 },
    { name: 'Bulawayo', cx: 160, cy: 190, r: 16 },
    { name: 'Mashonaland Central', cx: 320, cy: 60, r: 22 },
    { name: 'Mashonaland East', cx: 380, cy: 110, r: 24 },
    { name: 'Mashonaland West', cx: 240, cy: 90, r: 26 },
  ];

  return (
    <section id="province-map" className="py-10">
      <div className="flex flex-col gap-2 mb-6 px-2">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
          <Landmark className="h-4.5 w-4.5 text-primary" />
          Provincial AI Readiness & Activity Map
        </h3>
        <p className="text-xs text-muted-foreground">
          Interactive map auditing dataset curation levels and local innovation indexes across Zimbabwe&apos;s ten provinces.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Interactive Map Canvas */}
        <div className="lg:col-span-8 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-border/80 bg-card/40 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3">
                Sovereign Geographic Grid
              </h4>
              <p className="text-[11px] text-muted-foreground mt-2">
                Click on any province circle to inspect registered datasets, academic institutions, and generated royalties.
              </p>
            </div>

            {/* Map wrapper */}
            <div className="relative mt-6 flex justify-center items-center h-[24rem] bg-secondary/15 rounded-xl border border-border/60 overflow-hidden">
              
              <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 350">
                {/* Connecting grid lines */}
                <line x1={100} y1={110} x2={240} y2={90} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={240} y1={90} x2={320} y2={60} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={320} y1={60} x2={330} y2={110} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={330} y1={110} x2={380} y2={110} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={380} y1={110} x2={410} y2={190} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={410} y1={190} x2={320} y2={260} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={320} y1={260} x2={140} y2={250} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={140} y1={250} x2={100} y2={110} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                
                {/* Midlands Core connections */}
                <line x1={240} y1={180} x2={100} y2={110} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={240} y1={180} x2={240} y2={90} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={240} y1={180} x2={320} y2={260} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={240} y1={180} x2={140} y2={250} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />
                <line x1={240} y1={180} x2={160} y2={190} stroke="hsl(var(--border) / 0.5)" strokeWidth={1} strokeDasharray="3 3" />

                {/* Draw Province Interactive Circles */}
                {mapNodes.map((node) => {
                  const data = provincesData.find((p) => p.name === node.name);
                  if (!data) return null;
                  const isSelected = selectedProvince.name === node.name;

                  return (
                    <g
                      key={node.name}
                      onClick={() => setSelectedProvince(data)}
                      className="cursor-pointer group"
                    >
                      {/* Glow ring */}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r + 6}
                        fill="none"
                        stroke={data.fillColor}
                        strokeWidth={isSelected ? 2 : 1}
                        className={`opacity-30 transition-all ${
                          isSelected ? 'animate-pulse' : 'group-hover:opacity-50'
                        }`}
                      />
                      {/* Main Node */}
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill={data.fillColor}
                        className="transition-colors group-hover:fill-primary/20"
                      />
                      {/* Initial text */}
                      <text
                        x={node.cx}
                        y={node.cy + 3}
                        fill="#ffffff"
                        fontSize={8}
                        fontWeight="bold"
                        textAnchor="middle"
                        className="select-none"
                      >
                        {node.name.substring(0, 3).toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-secondary/80 border border-border/60 p-2.5 rounded text-[9px] font-mono leading-relaxed space-y-1 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                  <span className="text-slate-300">Ready Score &ge; 90%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-300">Ready Score 85-89%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-slate-300">Ready Score &le; 84%</span>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* Right Column: Province detail Inspector */}
        <div className="lg:col-span-4 flex flex-col">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-primary/20 bg-[#0b1329]/50 shadow-glow" hover={false}>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-3 flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-primary" />
                Sovereign Province Details
              </h4>

              {/* Title */}
              <div className="mt-6 flex items-center gap-3">
                <div className="text-xl font-bold text-foreground">
                  {selectedProvince.name} Province
                </div>
                <span className="text-xs font-bold font-mono text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                  {selectedProvince.readinessScore}% score
                </span>
              </div>

              {/* Detailed metrics stack */}
              <div className="mt-6 space-y-4 text-xs font-medium">
                {/* Connected Institutions */}
                <div className="flex justify-between items-center bg-secondary/20 p-3 rounded-lg border border-border/80">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Landmark className="h-3.5 w-3.5 text-primary" />
                    Connected Partners
                  </span>
                  <span className="font-bold text-foreground font-mono">{selectedProvince.institutions}</span>
                </div>

                {/* AI Ready Datasets */}
                <div className="flex justify-between items-center bg-secondary/20 p-3 rounded-lg border border-border/80">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-primary" />
                    AI Ready Datasets
                  </span>
                  <span className="font-bold text-foreground font-mono">{selectedProvince.datasets}</span>
                </div>

                {/* Developers */}
                <div className="flex justify-between items-center bg-secondary/20 p-3 rounded-lg border border-border/80">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    Registered Developers
                  </span>
                  <span className="font-bold text-foreground font-mono">{selectedProvince.developers.toLocaleString()}</span>
                </div>

                {/* API Requests */}
                <div className="flex justify-between items-center bg-secondary/20 p-3 rounded-lg border border-border/80">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-primary" />
                    Daily API Requests
                  </span>
                  <span className="font-bold text-foreground font-mono">{selectedProvince.apiRequests}</span>
                </div>

                {/* Revenue Generated */}
                <div className="flex justify-between items-center bg-secondary/20 p-3 rounded-lg border border-border/80">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Coins className="h-3.5 w-3.5 text-emerald-400" />
                    Ecosystem Revenue
                  </span>
                  <span className="font-bold text-emerald-400 font-mono">{selectedProvince.revenue}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
}
