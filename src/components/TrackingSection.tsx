import React from 'react';
import { Ship, Search, Clock, CheckCircle, AlertCircle, Anchor, ArrowRight, MapPin, Compass, Info } from 'lucide-react';
import { Shipment } from '../types';

interface TrackingSectionProps {
  shipments: Shipment[];
  activeTrackingNo: string;
  setActiveTrackingNo: (trackNo: string) => void;
  language: string;
}

export default function TrackingSection({
  shipments,
  activeTrackingNo,
  setActiveTrackingNo,
  language
}: TrackingSectionProps) {
  const [searchVal, setSearchVal] = React.useState(activeTrackingNo || "TRK-9831-285");
  const [inspectedShipment, setInspectedShipment] = React.useState<Shipment | null>(null);
  const [calcMsg, setCalcMsg] = React.useState("");

  // Sourcing calculator states
  const [calcOrigin, setCalcOrigin] = React.useState("Port of Singapore, SG");
  const [calcDest, setCalcDest] = React.useState("Port of Rotterdam, NL");
  const [calcWeight, setCalcWeight] = React.useState(18000);
  const [calcSize, setCalcSize] = React.useState("40ft High Cube");
  const [isHazardous, setIsHazardous] = React.useState(false);
  const [calculatedQuote, setCalculatedQuote] = React.useState<number | null>(null);

  const handleTrackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchVal.trim()) return;

    // Search against active client shipments
    const matched = shipments.find(s => s.trackingNumber.toUpperCase() === searchVal.trim().toUpperCase());
    if (matched) {
      setInspectedShipment(matched);
      setActiveTrackingNo(matched.trackingNumber);
    } else {
      setInspectedShipment(null);
      alert("No active B2B cargo container was found matching that tracking ID. Try: TRK-9831-285");
    }
  };

  React.useEffect(() => {
    if (activeTrackingNo) {
      setSearchVal(activeTrackingNo);
      const matched = shipments.find(s => s.trackingNumber.toUpperCase() === activeTrackingNo.toUpperCase());
      if (matched) setInspectedShipment(matched);
    } else if (shipments.length > 0) {
      setInspectedShipment(shipments[0]);
    }
  }, [activeTrackingNo, shipments]);

  const handleCalculateCost = (e: React.FormEvent) => {
    e.preventDefault();
    // Distance multiplier math
    let baseRate = calcSize === "20ft Standard" ? 1250 : 2200;
    
    // Weight multiplier
    baseRate += (calcWeight / 1000) * 15;

    // Route math
    if (calcOrigin.includes("Singapore") && calcDest.includes("Rotterdam")) baseRate += 900;
    if (calcOrigin.includes("Valparaiso") && calcDest.includes("Rotterdam")) baseRate += 1400;
    if (calcOrigin.includes("Singapore") && calcDest.includes("Mumbai")) baseRate += 450;
    if (calcOrigin.includes("Cartagena") && calcDest.includes("Hamburg")) baseRate += 1100;

    if (isHazardous) baseRate += 500;

    setCalculatedQuote(baseRate);
    setCalcMsg(`Ocean cargo quote calculated successfully under standard CIF terms.`);
  };

  return (
    <div className="space-y-12 py-6 pb-20">
      
      {/* Search active cargos section */}
      <section className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,#1e3a8a_0%,#090d16_55%)] opacity-85" />
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-cyan-400 block">AIS Vessel transponders Node</span>
          <h2 className="text-2xl font-black">Secure Vessel Delivery Coordinates</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monitor real-time bulk cargo progress, active customs stamps, cargo discharge logs, and final warehouse release schedules across deep-sea trading channels.
          </p>

          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md pt-2">
            <input
              type="text"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Enter container number (e.g. TRK-9831-285)"
              className="px-3.5 py-2.5 bg-slate-950 font-mono rounded-xl border border-slate-800 text-white text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Locate Vessel
            </button>
          </form>
          <div className="text-[9px] text-slate-400 font-mono flex items-center gap-2">
            <span>Demo Codes for testing:</span>
            <button type="button" onClick={() => { setSearchVal("TRK-9831-285"); setActiveTrackingNo("TRK-9831-285"); }} className="underline hover:text-white cursor-pointer bg-transparent">TRK-9831-285 (Battery Packs)</button>•
            <button type="button" onClick={() => { setSearchVal("TRK-2410-891"); setActiveTrackingNo("TRK-2410-891"); }} className="underline hover:text-white cursor-pointer bg-transparent">TRK-2410-891 (Refined Copper)</button>
          </div>
        </div>
      </section>

      {/* Output Results and Milestone Steps */}
      {inspectedShipment ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Shipment Diagnostics */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-850 dark:bg-slate-900 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-500 block">AIS Cargo Manifest</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{inspectedShipment.cargoType}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                inspectedShipment.status === 'In Transit' ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400' :
                inspectedShipment.status === 'Customs Clearance' ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                inspectedShipment.status === 'Arrived Destination' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' :
                'bg-slate-105 text-slate-700'
              }`}>
                ● {inspectedShipment.status}
              </span>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
              <div className="p-2.5 rounded-lg bg-slate-55 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                <span className="text-[9px] text-slate-400 block font-mono">Carrier Vessel</span>
                <span className="text-slate-800 dark:text-slate-200 mt-1 font-bold block">{inspectedShipment.vesselName}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                <span className="text-[9px] text-slate-400 block font-mono">Container Volume</span>
                <span className="text-slate-800 dark:text-slate-200 mt-1 font-bold block">{inspectedShipment.containerSize}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                <span className="text-[9px] text-slate-400 block font-mono">Gross Weight</span>
                <span className="text-slate-800 dark:text-slate-200 mt-1 font-bold block">{inspectedShipment.weight}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                <span className="text-[9px] text-slate-400 block font-mono">ETA Settle Port</span>
                <span className="text-slate-800 dark:text-slate-200 mt-1 font-bold block font-mono">{inspectedShipment.estimatedArrival}</span>
              </div>
            </div>

            {/* Delivery Timeline layout */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest">Voyage Port checkpoints Logs</span>
              <div className="space-y-4 relative border-l border-slate-200 dark:border-slate-800 pl-4 py-2">
                {inspectedShipment.milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 ${
                      m.completed ? 'bg-blue-600 animate-pulse' : 'bg-slate-310 bg-slate-300'
                    }`} />
                    <div className="text-[11px]">
                      <div className="flex items-center space-x-2">
                        <strong className="text-slate-800 dark:text-slate-200">{m.title}</strong>
                        <span className="text-[9px] text-slate-400 font-mono">{m.date}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">Location: {m.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Hub info widget */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-850 dark:bg-slate-900 shadow-sm">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">Anchorage Location Info</span>
              <div className="mt-3 flex items-center space-x-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <MapPin className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">Current Port Coordinate</span>
                  <span>{inspectedShipment.currentPort}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl text-[10px] text-slate-500 leading-relaxed border border-slate-100 dark:border-slate-850">
                You can download verified Bill of Ladings or commercial certificates of inspections by securely logging in to our Client B2B Portal above.
              </div>
            </div>
          </div>

        </section>
      ) : (
        <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/10 rounded-xl text-slate-400 text-xs">Enter a valid tracking ID to output transponder coordinates.</div>
      )}

      {/* Ocean Sourcing cost Calculator */}
      <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-150 dark:border-slate-800 max-w-3xl mx-auto">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-6">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="h-4.5 w-4.5 text-blue-500" />
            B2B Ocean Freight Cost Estimator
          </h3>
          <p className="text-xs text-slate-550 text-slate-500 dark:text-slate-400 mt-0.5">Calculate instant shipping, fuel indexes, and customs insurance estimates for bulk items.</p>
        </div>

        <form onSubmit={handleCalculateCost} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div>
            <label className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Origin Port Gate</label>
            <select value={calcOrigin} onChange={e => setCalcOrigin(e.target.value)} className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
              <option>Port of Singapore, SG</option>
              <option>Port of Valparaiso, Chile</option>
              <option>Port of Cartagena, Colombia</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block font-mono">Destination Port Gate</label>
            <select value={calcDest} onChange={e => setCalcDest(e.target.value)} className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
              <option>Port of Rotterdam, NL</option>
              <option>Port of Mumbai, IN</option>
              <option>Port of Hamburg, DE</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block font-mono">Container Dimensions</label>
            <select value={calcSize} onChange={e => setCalcSize(e.target.value)} className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
              <option>20ft Standard Duty</option>
              <option>40ft High Cube</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-slate-500 block font-mono">Gross Cargo Weight (kg)</label>
            <input type="number" value={calcWeight} onChange={e => setCalcWeight(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-white dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
          </div>
          <div className="sm:col-span-2 flex items-center space-x-2">
            <input type="checkbox" id="hazardous" checked={isHazardous} onChange={e => setIsHazardous(e.target.checked)} className="h-4 w-4 rounded" />
            <label htmlFor="hazardous" className="text-xs text-slate-600 dark:text-slate-300">Hazardous Cargo elements included in shipment (e.g. Lithium pack cells)</label>
          </div>

          <div className="sm:col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center gap-4 flex-wrap">
            {calculatedQuote !== null && (
              <div>
                <span className="text-[9px] font-mono text-slate-400 block uppercase">Estimated CIF Rate</span>
                <span className="text-md font-black text-blue-600 dark:text-blue-400 font-mono">${calculatedQuote.toLocaleString()} USD</span>
                <p className="text-[10px] text-slate-450 text-slate-400 mt-0.5 italic">{calcMsg}</p>
              </div>
            )}
            <button type="submit" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-lg text-xs cursor-pointer ml-auto">Calculate Logistics Fee</button>
          </div>
        </form>
      </section>

    </div>
  );
}
