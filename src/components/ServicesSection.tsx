import React from 'react';
import { Ship, ShieldCheck, MapPin, Layers, Settings, Globe, Search, BookOpen, Clock, Check } from 'lucide-react';

interface ServicesSectionProps {
  setCurrentTab: (tab: string) => void;
  language: string;
}

export default function ServicesSection({ setCurrentTab, language }: ServicesSectionProps) {
  const getText = (en: string, es: string, zh: string) => {
    if (language === 'ES') return es;
    if (language === 'ZH') return zh;
    return en;
  };

  const services = [
    {
      id: "srv-1",
      title: "Bulk Import Sourcing",
      icon: <Layers className="h-5 w-5 text-blue-500" />,
      desc: "Comprehensive supplier vetting and audit reports for heavy industrial resources, ensuring maximum purity and strict compliance benchmarks.",
      steps: ["Identify certified local mines/factories", "Conduct onsite quality/environmental audits", "Negotiate bulk MOQs & export contracts"],
      benefits: "Guarantees Grade-A materials at factory floor pricing."
    },
    {
      id: "srv-2",
      title: "Customs Brokering & Clearance",
      icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
      desc: "Pre-evaluating HS codes, tariff duties, carbon Border taxes (CBAM), and generating certified declarations for seamless port clearances.",
      steps: ["Validate HS Tariff Codes classifications", "Draft full shipping compliance documentation dossiers", "Direct API clearance filing with ports authorities"],
      benefits: "Reduces customs hold periods from weeks to mere hours."
    },
    {
      id: "srv-3",
      title: "Multi-Modal Ocean Freight Routing",
      icon: <Ship className="h-5 w-5 text-cyan-500" />,
      desc: "Secure container bookings (20ft, 40ft High Cube) on tier-1 maritime vessel lines including MSC, Maersk, and COSCO with full marine coverage.",
      steps: ["Consolidate bulk cargoes at origin port yards", "Configure appropriate LCL or FCL container volume", "Coordinate ocean vessel secure loading schedules"],
      benefits: "Safeguards cargo with ISO grade marine insurance."
    },
    {
      id: "srv-4",
      title: "Warehousing & Multi-Port Hubbing",
      icon: <MapPin className="h-5 w-5 text-indigo-500" />,
      desc: "Bespoke warehousing, climate-controlled storage, container stripping, and local freight dispatch across our Singapore, Rotterdam, and LA hubs.",
      steps: ["Discharge containers at target custom terminals", "Perform pre-shipping tally and pallet inspections", "Deploy overland B2B dispatcher systems"],
      benefits: "Enables buffer stockpiles close to final buyers."
    }
  ];

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Services Title and Intro */}
      <section className="text-center max-w-2xl mx-auto py-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">{getText("Our Core Competencies", "Especialidades de Comercio", "核心合规与货代服务")}</span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
          {getText("End-to-End Global Sourcing & Logistics", "Suministro Global y Logística de Extremo a Extremo", "海陆空联运及跨国清关全包服务")}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          {getText(
            "We solve multi-country trading blocks. Our services synchronize exact supplier audits, custom clearances, ocean bookings, and final local deliveries cleanly.",
            "Resolvemos las barreras del comercio internacional. Nuestros servicios sincronizan auditorías de proveedores, gestiones aduaneras y entregas locales.",
            "我们破除复杂的准入与地域贸易壁垒。全套服务涵盖原厂合规审计、保税仓储、转口运输、提单换单及一站式清关交付。"
          )}
        </p>
      </section>

      {/* Grid of details Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-850 dark:bg-slate-900 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-55 bg-slate-50 dark:bg-slate-950">
                {s.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-4">{s.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
              
              {/* Steps Checklist */}
              <div className="mt-5 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Process Milestones</span>
                {s.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-655 dark:text-slate-350">
                    <Check className="h-3 w-3.5 text-blue-500 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[8px] uppercase tracking-wider font-mono text-slate-400">Primary Value</span>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-300 block">{s.benefits}</span>
              </div>
              <button 
                onClick={() => setCurrentTab('contact')}
                className="px-3.5 py-2 hover:bg-blue-600 hover:text-white border border-slate-250 dark:border-slate-750 hover:border-blue-600 dark:hover:border-blue-600 text-[10px] font-black text-slate-800 dark:text-white rounded-lg cursor-pointer transition-all"
              >
                Inquire Offer
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Structured Customs advisory banner */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="opacity-15 absolute right-0 bottom-0 pointer-events-none">
          <BookOpen className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 max-w-xl space-y-4">
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest bg-blue-820/50 bg-blue-800/40 p-1.5 px-3 rounded-full text-blue-300">Regulatory Advisory</span>
          <h3 className="text-md md:text-lg font-bold">Unsure of Carbon Adjustment Tax Rates (CBAM) or US Customs classifications?</h3>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Our trade compliance division regularly evaluates CBAM limits for renewable energy cells, ASTM alloy compositions, and heavy cargo shipping regulations. Click below to schedule a direct custom broker diagnostic session.
          </p>
          <button 
            onClick={() => setCurrentTab('contact')}
            className="flex items-center space-x-1 px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold rounded-lg cursor-pointer transition-colors"
          >
            <span>Talk Sourcing Broker</span>
            <Clock className="h-3.5 w-3.5 ml-1 animate-pulse" />
          </button>
        </div>
      </section>

    </div>
  );
}
