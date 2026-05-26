import React from 'react';
import { Compass, Ship, Anchor, MapPin, ZoomIn, Info } from 'lucide-react';

interface TradeHub {
  id: string;
  name: string;
  coords: { x: number; y: number }; // Percentage coords on our SVG grid
  country: string;
  category: string;
  role: string;
}

interface WorldMapProps {
  onSelectHub?: (hubName: string) => void;
  selectedHubName?: string;
}

export default function WorldMap({ onSelectHub, selectedHubName }: WorldMapProps) {
  const [activeHub, setActiveHub] = React.useState<string | null>(null);

  const hubs: TradeHub[] = [
    { id: 'sg', name: 'Port of Singapore', coords: { x: 74, y: 64 }, country: 'SG', category: 'Major Hub HQ', role: 'Main Sourcing Gate' },
    { id: 'la', name: 'Port of Los Angeles', coords: { x: 19, y: 39 }, country: 'USA', category: 'Import Terminal', role: 'West US Logistics Gateway' },
    { id: 'rot', name: 'Port of Rotterdam', coords: { x: 49, y: 26 }, country: 'NL', category: 'Customs Terminal', role: 'Euro-Zone Distribution Hub' },
    { id: 'valp', name: 'Port of Valparaiso', coords: { x: 26, y: 78 }, country: 'Chile', category: 'Minerals Port', role: 'Copper & Lithium Export' },
    { id: 'mumbai', name: 'Port of Mumbai', coords: { x: 67, y: 52 }, country: 'India', category: 'Distribution Hub', role: 'SAsia Freight Terminal' },
    { id: 'hamburg', name: 'Port of Hamburg', coords: { x: 50, y: 23 }, country: 'Germany', category: 'Heavy Machine Hub', role: 'Precision Industry Sourcing' },
    { id: 'cart', name: 'Port of Cartagena', coords: { x: 27, y: 55 }, country: 'Colombia', category: 'Agri Gateway', role: 'Coffee & Textiles Export' }
  ];

  const tradeLanes = [
    { from: 'sg', to: 'la', color: 'stroke-cyan-500', dash: '8,4' },
    { from: 'valp', to: 'rot', color: 'stroke-amber-500', dash: '6,3' },
    { from: 'sg', to: 'mumbai', color: 'stroke-blue-500', dash: '4,4' },
    { from: 'cart', to: 'hamburg', color: 'stroke-emerald-500', dash: '10,5' },
  ];

  const handleHubClick = (hub: TradeHub) => {
    setActiveHub(hub.id);
    if (onSelectHub) {
      onSelectHub(hub.name);
    }
  };

  const getHubCoords = (id: string) => {
    const found = hubs.find(h => h.id === id);
    return found ? found.coords : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden dark:border-slate-800 p-6 shadow-xl">
      
      {/* Visual Title Grid */}
      <div className="absolute top-4 left-4 z-10 bg-slate-950/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md max-w-sm">
        <div className="flex items-center space-x-2 text-blue-400 font-mono text-[10px] uppercase tracking-widest font-bold">
          <Compass className="h-4 w-4 animate-spin-slow" />
          <span>Real-time Ocean Freight Pipeline</span>
        </div>
        <h3 className="text-sm font-bold text-white mt-1">Global Trade Network</h3>
        <p className="text-[11px] text-slate-400 mt-1">
          Click any highlighted deep-water harbor terminal to review active cargo routes, custom duty updates, and load statistics.
        </p>
      </div>

      {/* SVG Canvas Map Grid */}
      <div className="relative w-full aspect-[21/9] min-h-[300px] overflow-x-auto select-none">
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full text-slate-800"
          preserveAspectRatio="none"
        >
          {/* Subtle grid lines background */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="0.25" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Abstract background world continents map representation */}
          <g fill="rgba(30, 41, 59, 0.55)" className="opacity-95">
            {/* North America */}
            <path d="M 5 20 Q 15 15 28 25 Q 24 35 18 42 Q 10 32 5 20 Z" />
            {/* South America */}
            <path d="M 22 50 Q 28 50 31 60 Q 28 85 24 95 Q 18 75 22 50 Z" />
            {/* Eurasia / Africa */}
            <path d="M 40 15 Q 60 10 85 20 Q 95 38 85 62 Q 70 70 50 45 Q 40 30 40 15 Z" />
            <path d="M 42 42 Q 52 38 58 52 Q 50 78 44 82 Q 38 60 42 42 Z" />
            {/* Australia */}
            <path d="M 78 70 Q 88 72 85 85 Q 73 82 78 70 Z" />
          </g>

          {/* Trade Pipeline connection Arcs */}
          {tradeLanes.map((lane, idx) => {
            const start = getHubCoords(lane.from);
            const end = getHubCoords(lane.to);
            // Midpoint calculated for curvature
            const midX = (start.x + end.x) / 2;
            const midY = Math.min(start.y, end.y) - 8;
            return (
              <g key={idx}>
                {/* Curve Connector */}
                <path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  className={`${lane.color} opacity-40`}
                  strokeWidth="0.5"
                />
                {/* Animated dash flow */}
                <path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  className={`${lane.color} opacity-90 stroke-dasharray-[1] animate-dash`}
                  strokeDasharray={lane.dash}
                  strokeWidth="0.8"
                />
              </g>
            );
          })}

          {/* Interactive Hub Node Icons in SVG */}
          {hubs.map((hub) => {
            const isSelected = selectedHubName === hub.name || activeHub === hub.id;
            return (
              <g 
                key={hub.id} 
                className="cursor-pointer group"
                onClick={() => handleHubClick(hub)}
              >
                {/* Outer radar pulse */}
                <circle
                  cx={hub.coords.x}
                  cy={hub.coords.y}
                  r={isSelected ? "3.5" : "1.8"}
                  className={`fill-none ${isSelected ? 'stroke-blue-400 animate-ping' : 'stroke-blue-500 opacity-20'}`}
                  strokeWidth="0.5"
                />
                {/* Node Solid Circle */}
                <circle
                  cx={hub.coords.x}
                  cy={hub.coords.y}
                  r={isSelected ? "1.6" : "1"}
                  className={`${isSelected ? 'fill-blue-400 stroke-white' : 'fill-slate-100 fill-slate-300 stroke-blue-500 hover:fill-blue-400'} transition-all`}
                  strokeWidth="0.3"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating HTML absolute coordinates layout for Hub Tooltips */}
        {hubs.map((hub) => {
          const isSelected = selectedHubName === hub.name || activeHub === hub.id;
          return (
            <div
              key={hub.id}
              style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-[130%]"
            >
              {/* Highlight state text flags */}
              <button
                onClick={() => handleHubClick(hub)}
                className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight shadow-sm cursor-pointer whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white ring-1 ring-white/20 scale-105' 
                    : 'bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300'
                }`}
              >
                <Anchor className="h-2 w-2 text-blue-400 shrink-0" />
                <span>{hub.country}: {hub.name.replace('Port of ', '')}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Terminal Cargo Specs Details Panel */}
      <div className="mt-4 border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        {(() => {
          const activeItem = hubs.find(h => h.id === activeHub || h.name === selectedHubName) || hubs[0];
          return (
            <>
              <div className="flex items-center space-y-1 sm:space-y-0 sm:space-x-3 flex-col sm:flex-row">
                <div className="bg-slate-800 p-2 rounded-lg text-blue-400">
                  <Ship className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{activeItem.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-900/40 text-blue-300">{activeItem.category}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Primary Trade Purpose: <b>{activeItem.role}</b></p>
                </div>
              </div>
              <div className="bg-slate-950/45 p-2 px-3 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2 max-w-sm">
                <Info className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Selected Gateway routes are integrated into our live vessel simulation modules. Double click database entries to generate invoices.</span>
              </div>
            </>
          );
        })()}
      </div>

    </div>
  );
}
