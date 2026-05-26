import React from 'react';
import { BarChart, TrendingUp, Compass, ArrowUpRight, DollarSign, Activity } from 'lucide-react';
import { CommodityPrice, CurrencyRate } from '../types';

interface AnalyticsChartsProps {
  commodities: CommodityPrice[];
  currencies: CurrencyRate[];
}

export default function AnalyticsCharts({ commodities, currencies }: AnalyticsChartsProps) {
  // Bespoke data points representing monthly trading volumes (in Million USD)
  const monthlyVolume = [
    { month: "Jan", exportVal: 18.5, importVal: 14.2 },
    { month: "Feb", exportVal: 22.4, importVal: 16.8 },
    { month: "Mar", exportVal: 29.1, importVal: 19.5 },
    { month: "Apr", exportVal: 26.5, importVal: 22.1 },
    { month: "May", exportVal: 34.8, importVal: 24.6 },
    { month: "Jun", exportVal: 40.2, importVal: 28.9 },
  ];

  const maxVolume = 45; // Max scale value for SVG heights
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Chart 1: Bespoke SVG B2B Trading volume */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-slate-150 dark:border-slate-800 mb-6">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-blue-500 font-bold block">Trade Desk Intelligence</span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center mt-1">
              <Activity className="h-4.5 w-4.5 mr-2 text-blue-500" />
              Corporate Sourcing Settle Volume
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-[10px] font-semibold text-slate-500 font-mono">
            <span className="flex items-center"><span className="h-2.5 w-2.5 rounded bg-blue-600 mr-1 block" />Exports</span>
            <span className="flex items-center"><span className="h-2.5 w-2.5 rounded bg-cyan-400 mr-1 block" />Imports</span>
          </div>
        </div>

        {/* SVG Drawing Area */}
        <div className="relative w-full aspect-[21/9] min-h-[180px]">
          
          {/* background scale dashed lines */}
          <div className="absolute inset-0 flex flex-col justify-between text-[9px] font-mono text-slate-400/80 pointer-events-none select-none">
            <div className="border-b border-dashed border-slate-100 dark:border-slate-850 w-full pt-1"><span>$40M USD</span></div>
            <div className="border-b border-dashed border-slate-100 dark:border-slate-850 w-full pt-1"><span>$30M USD</span></div>
            <div className="border-b border-dashed border-slate-100 dark:border-slate-850 w-full pt-1"><span>$20M USD</span></div>
            <div className="border-b border-dashed border-slate-100 dark:border-slate-850 w-full pt-1"><span>$10M USD</span></div>
            <div className="w-full pt-1"><span>$0.00 M</span></div>
          </div>

          {/* SVG Elements Grid */}
          <svg viewBox="0 0 600 200" className="w-full h-full relative z-10 pt-4">
            <g>
              {monthlyVolume.map((item, idx) => {
                const xBase = 50 + idx * 85;
                const exportHeight = (item.exportVal / maxVolume) * 150;
                const importHeight = (item.importVal / maxVolume) * 150;
                const exportY = 170 - exportHeight;
                const importY = 170 - importHeight;

                const isHovered = hoveredBar === idx;

                return (
                  <g 
                    key={idx} 
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="cursor-pointer"
                  >
                    {/* Background hover highlight card */}
                    {isHovered && (
                      <rect 
                        x={xBase - 15} 
                        y="10" 
                        width="70" 
                        height="180" 
                        rx="8" 
                        className="fill-blue-50/40 dark:fill-slate-800/20" 
                      />
                    )}

                    {/* Export Bar (Blue Glass style) */}
                    <rect
                      x={xBase}
                      y={exportY}
                      width="16"
                      height={exportHeight}
                      rx="3"
                      className="fill-blue-600 transition-all duration-300 hover:fill-blue-700"
                    />

                    {/* Import Bar (Cyan Glass style) */}
                    <rect
                      x={xBase + 20}
                      y={importY}
                      width="16"
                      height={importHeight}
                      rx="3"
                      className="fill-cyan-400 transition-all duration-300 hover:fill-cyan-500"
                    />

                    {/* Scale Label */}
                    <text
                      x={xBase + 18}
                      y="190"
                      textAnchor="middle"
                      className="fill-slate-500 dark:fill-slate-400 font-mono text-[9px] font-bold"
                    >
                      {item.month}
                    </text>

                    {/* Tooltip on element hover */}
                    {isHovered && (
                      <g>
                        <rect x={xBase - 25} y={Math.min(exportY, importY) - 30} width="90" height="24" rx="4" className="fill-slate-950 stroke-slate-800" strokeWidth="0.5" />
                        <text x={xBase + 20} y={Math.min(exportY, importY) - 15} textAnchor="middle" className="fill-white font-mono text-[8px] font-bold">
                          Ex: ${item.exportVal}M | Im: ${item.importVal}M
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Dynamic Analytics Summary Indicators */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Reporting Zone: Active Fiscal Year 2026</span>
          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold font-mono">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            +18.4% Outbound Trade Gain
          </span>
        </div>
      </div>

      {/* Chart 2: Interactive Commodities Index Gauge & Mini Rate Widget */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-amber-500 font-bold block">Live Benchmarks</span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center mt-1">
            <DollarSign className="h-4.5 w-4.5 mr-2 text-amber-500" />
            Commodity Indices
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">FOB Spot Market benchmark indices for heavy industries resource procurement.</p>
        </div>

        <div className="space-y-3 my-4">
          {commodities.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:border-slate-250 transition-colors">
              <div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 block">{c.name}</span>
                <span className="text-[9px] text-slate-400 font-mono">per {c.unit}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">{c.price}</span>
                <span className={`text-[10px] font-mono font-bold flex items-center justify-end ${c.change > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {c.change > 0 ? '▲' : '▼'} {Math.abs(c.change)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/40 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed flex items-start space-x-2">
          <ArrowUpRight className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <span><b>Copper surge check:</b> Infrastructure wiring demands in South-East Asia solar grids maintain a high floor on spot valuation trends.</span>
        </div>
      </div>

    </div>
  );
}
