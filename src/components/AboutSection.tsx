import React from 'react';
import { Clock, ShieldCheck, Award, Briefcase, MapPin, Compass, Globe } from 'lucide-react';

interface AboutSectionProps {
  language: string;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const getText = (en: string, es: string, zh: string) => {
    if (language === 'ES') return es;
    if (language === 'ZH') return zh;
    return en;
  };

  const timelineEvents = [
    { year: "2012", title: "Incorporation in Singapore", desc: "Initially established as a regional customs broker and metal trade desk inside Marina Bay HQ." },
    { year: "2017", title: "European Logistics Expansion", desc: "Incorporated our second physical hub at the Port of Rotterdam to fast-track EU customs broker services." },
    { year: "2021", title: "Americas Shipping Gate", desc: "Launched our Los Angeles shipping terminal, integrating Smart Cargo tracking indexes with marine insurers." },
    { year: "2025", title: "AI Sourcing & Custom Compliance Integration", desc: "Pre-integrated Google Gemini trade feeds to give clients instant tariff advice and MOQ scheduling." }
  ];

  const core团队 = [
    { name: "Siddharth Mehta", role: "Managing Director & Founder", origin: "Singapore Terminal", bio: "20+ years coordinating heavy industrial metals exporting and freight forwarding across maritime channels." },
    { name: "Christina Jansen", role: "European Logistics Director", origin: "Rotterdam, NL", bio: "Customs brokerage specialist, previously managing tier-A logistics terminals in Hamburg and Antwerp." },
    { name: "Jonathan Wu", role: "Americas Operations Chief", origin: "Los Angeles, USA", bio: "Authority on B2B ocean risk mitigation, container logistics safety, and IncoTerms compliance guidelines." }
  ];

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Title block */}
      <section className="text-center max-w-2xl mx-auto py-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">{getText("Our Foundation", "Nuestra Fundación", "企业背景及资质")}</span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
          {getText("Global Scope, Rigid Integrity", "Alcance Global, Integridad Rígida", "立足全球视野，坚守合规诚信")}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
          {getText(
            "Since 2012, TransitGlobal has expanded from a Singapore commodity broker Desk to a fully responsive, technology-integrated global logistics supply provider.",
            "Desde 2012, TransitGlobal ha crecido desde una oficina de broker en Singapur hasta convertirse en un proveedor logístico tecnológico integral.",
            "自2012年成立以来，TransitGlobal已从新加坡的一家货运代理行发展成为业务遍布美、欧、亚大宗运输的全流程通关及大宗商品供应集团。"
          )}
        </p>
      </section>

      {/* Director & Core Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl p-6 md:p-8 dark:bg-slate-900/50">
        <div className="lg:col-span-4 flex flex-col items-center text-center">
          <div className="h-28 w-28 rounded-full overflow-hidden bg-slate-350 border-2 border-blue-500 shadow-md">
            <img referrerPolicy="no-referrer" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" alt="Siddharth Mehta" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-3">Siddharth Mehta</h3>
          <span className="text-[10px] text-blue-500 font-mono font-bold mt-0.5">Founder & Managing Director</span>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
            {getText("A Message From Our Board", "Mensaje del Directorio", "董事会主席致辞")}
          </h4>
          <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed italic">
            "In international commerce, logistics and compliance are the ultimate differentiators. Anyone can find a supplier, but bridging raw materials through strict carbon border tariffs (CBAM), ocean congestion risk management, and multi-port brokerage demands exceptional expertise. At TransitGlobal, we combine real-world physical shipping assets with smart tracking portals, ensuring your cargo clears custom terminals safely and predictably, every single month."
          </p>
          <div className="flex space-x-3 text-[10px] font-semibold text-slate-500">
            <span className="flex items-center"><ShieldCheck className="h-4.5 w-4.5 mr-1 text-emerald-500" /> ISO 9001 Settle Compliance</span>
            <span className="flex items-center"><Award className="h-4.5 w-4.5 mr-1 text-blue-500" /> Authorized Broker ID: SG-9932</span>
          </div>
        </div>
      </section>

      {/* Corporate History Timeline */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 uppercase font-mono">
          {getText("Milestones Timeline", "Nuestra Historia", "集团发展纪实")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/80 bg-white dark:border-slate-850 dark:bg-slate-960 flex flex-col justify-between">
              <div>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono">{evt.year}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2 leading-tight">{evt.title}</h4>
                <p className="text-[11px] text-slate-505 text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Trading Directors */}
      <section className="space-y-6">
        <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase font-mono">
            {getText("Global Logistics Directors", "Líderes de Comercio", "专家与运营总监")}
          </h2>
          <span className="text-[10px] text-slate-400 font-mono">3 Registered Sourcing Leads</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {core团队.map((member, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-850 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-bold uppercase">{member.origin}</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-3">{member.name}</h4>
                <span className="text-[10px] font-semibold text-slate-400 font-mono block mt-0.5">{member.role}</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{member.bio}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center justify-between">
                <span>Verified Direct Desk</span>
                <span>Active 🟢</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Office locations */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 uppercase font-mono">
          {getText("Our Corporate Presence", "Nuestras Oficinas", "全球通航与办公机构")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Singapore Headquarters</h4>
            <div className="text-[11px] text-slate-400 mt-1 lines-relaxed">Marina Bay Financial Centre, Tower 2, Level 44. Phone: +65 6789 0122</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Rotterdam Custom Terminal</h4>
            <div className="text-[11px] text-slate-400 mt-1 lines-relaxed">Willemswerf Business Hub, Office 28B. Phone: +31 10 555 4322</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Los Angeles Logistic Tower</h4>
            <div className="text-[11px] text-slate-400 mt-1 lines-relaxed">Interstate Trade Tower, Suite 400. Phone: +1 213 555 8901</div>
          </div>
        </div>
      </section>

    </div>
  );
}
