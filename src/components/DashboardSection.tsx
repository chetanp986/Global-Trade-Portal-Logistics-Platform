import React from 'react';
import { TrendingUp, Globe, Anchor, ArrowUpRight, ShieldCheck, Mail, Ship, Sparkles, Server } from 'lucide-react';
import AnalyticsCharts from './AnalyticsCharts';
import { CurrencyRate, CommodityPrice } from '../types';

interface DashboardSectionProps {
  currencies: CurrencyRate[];
  commodities: CommodityPrice[];
  language: string;
}

export default function DashboardSection({ currencies, commodities, language }: DashboardSectionProps) {
  const [aiInsightPrompt, setAiInsightPrompt] = React.useState("Analyze copper cathode CBAM carbon tariff risks for EU custom terminals");
  const [aiResponse, setAiResponse] = React.useState("");
  const [loadingInsight, setLoadingInsight] = React.useState(false);

  const fetchTradeInsight = async (prompt?: string) => {
    const qText = prompt || aiInsightPrompt;
    setLoadingInsight(true);
    setAiResponse("");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Provide a concise 3-bullet point executive summary for B2B procurement managers on: ${qText}. Mention relevant HS cargo codes. Keep headings bold.`
        })
      });
      const data = await response.json();
      setAiResponse(data.text || "Mainframe offline. Sourcing estimates suggest holding buffer reserves.");
    } catch (err) {
      console.error(err);
      setAiResponse("Offline simulation: Steel reinforcement arrays will encounter high delivery tariffs (+10.5% CBAM adjustment) for Euro customhouse entries. Suggest sourcing from Singapore warehouses under CIF terms.");
    } finally {
      setLoadingInsight(false);
    }
  };

  React.useEffect(() => {
    fetchTradeInsight();
  }, []);

  const selectPrebuiltInsight = (topic: string) => {
    setAiInsightPrompt(topic);
    fetchTradeInsight(topic);
  };

  return (
    <div className="space-y-8 py-6 pb-20">
      
      {/* Overview stats cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* EUR / USD Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-805 dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start text-xs">
            <span className="font-mono text-slate-400 font-bold uppercase">EUR / USD SPOT</span>
            <span className="text-emerald-500 font-mono text-[10px] font-bold">▲ +0.22%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">1.0854</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">LME Closing Settle Index</div>
        </div>

        {/* Brent Crude Spot */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-850 dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start text-xs">
            <span className="font-mono text-slate-400 font-bold">BRENT CRUDE INDEX</span>
            <span className="text-rose-500 font-mono text-[10px] font-bold">▼ -0.73%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">$82.14 / bbl</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Maritime Marine Fuel Index</div>
        </div>

        {/* Copper sheet Spot */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-850 dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start text-xs">
            <span className="font-mono text-slate-400 font-semibold">LME COPPER CATHODE</span>
            <span className="text-emerald-500 font-mono text-[10px] font-bold">▲ +1.48%</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">$9,850 / MT</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">ASTM Grade A Spot index</div>
        </div>

        {/* Global Hub terminal activity indicator */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-850 dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start text-xs">
            <span className="font-mono text-slate-400 font-bold uppercase">Congestion Ratio</span>
            <span className="text-yellow-600 font-mono text-[10px] font-bold">Moderate</span>
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono">1.14 Settle</div>
          <div className="text-[10px] text-slate-500 font-mono mt-1">Singapore Yard Berthing Index</div>
        </div>
      </section>

      {/* Main interactive Charts area */}
      <section>
        <AnalyticsCharts commodities={commodities} currencies={currencies} />
      </section>

      {/* Corporate Trade Smart AI analysis panel */}
      <section className="rounded-2xl border border-blue-150 bg-gradient-to-tr from-slate-900 to-slate-950 p-6 text-white dark:border-slate-850 relative overflow-hidden">
        
        {/* Glow indicators */}
        <div className="absolute top-0 right-0 h-44 w-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-900/40 text-blue-300 font-mono text-[10px] rounded-lg border border-blue-800/40 font-bold uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trade intelligence Co-Pilot</span>
              </div>
              <h3 className="text-sm font-extrabold mt-2">AI Sourcing Risk Diagnostic</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Let our Gemini Trade mainframe evaluate tariff restrictions, Congestion, and ideal IncoTerms splits.</p>
            </div>

            {/* Quick-toggle topics */}
            <div className="flex flex-wrap gap-1.5 text-[9px] font-bold font-mono">
              <button onClick={() => selectPrebuiltInsight("LFP lithium batteries maritime safety logistics codes")} className="px-2 py-1 select-none border border-slate-850 bg-slate-900 hover:bg-slate-800 rounded text-slate-300 cursor-pointer">Battery Compliance</button>
              <button onClick={() => selectPrebuiltInsight("CBAM Carbon border import duties on Singapore monopanels")} className="px-2 py-1 select-none border border-slate-850 bg-slate-900 hover:bg-slate-800 rounded text-slate-300 cursor-pointer">Solar CBAM Tariffs</button>
              <button onClick={() => selectPrebuiltInsight("Rotterdam Port anchorage congestion averages May 2026")} className="px-2 py-1 select-none border border-slate-850 bg-slate-900 hover:bg-slate-800 rounded text-slate-300 cursor-pointer">Terminal Averages</button>
            </div>
          </div>

          {/* Prompt custom box trigger */}
          <div className="flex gap-2">
            <input
              type="text"
              value={aiInsightPrompt}
              onChange={e => setAiInsightPrompt(e.target.value)}
              placeholder="e.g. Arabica beans import tariffs Seattle custom terminals..."
              className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800/80 text-white text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder-slate-500 font-mono"
            />
            <button 
              onClick={() => fetchTradeInsight()}
              disabled={loadingInsight || !aiInsightPrompt.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs disabled:opacity-40 cursor-pointer"
            >
              Ask AI Co-Pilot
            </button>
          </div>

          {/* AI Output Window */}
          <div className="p-4 bg-slate-950/70 border border-slate-850 rounded-xl text-xs space-y-2 min-h-[100px] leading-relaxed select-text font-sans">
            {loadingInsight ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <div className="h-5.5 w-5.5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest animate-pulse">Consulting Gemini Mains and Sourcing databases...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-2 border-b border-slate-900">
                  <span className="text-blue-400 font-bold uppercase flex items-center"><Server className="h-3 w-3 mr-1" /> Gemini Response Node #3.5</span>
                  <span>Compliance analysis active</span>
                </div>
                {/* Format paragraphs beautifully */}
                <div className="whitespace-pre-line text-slate-250 text-slate-300">
                  {aiResponse}
                </div>
              </>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
