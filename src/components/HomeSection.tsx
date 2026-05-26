import React from 'react';
import { ShieldCheck, Anchor, ArrowRight, Award, ChevronRight, TrendingUp, Users, Ship } from 'lucide-react';
import WorldMap from './WorldMap';
import { Product } from '../types';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
  featuredProducts: Product[];
  currencySymbol: string;
  currencyRate: number;
  language: string;
}

export default function HomeSection({
  setCurrentTab,
  featuredProducts,
  currencySymbol,
  currencyRate,
  language
}: HomeSectionProps) {
  const getText = (en: string, es: string, zh: string) => {
    if (language === 'ES') return es;
    if (language === 'ZH') return zh;
    return en;
  };

  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmt = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 py-6 pb-20">
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 md:p-12 text-white">
        {/* Decorative ambient gradient backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#1e3a8a_0%,#0f172a_60%)] opacity-80" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-blue-900 bg-blue-950/60 p-1.5 px-3.5 text-xs text-blue-400 font-mono font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>{getText("B2B Sourcing Authority", "Autoridad de Abastecimiento B2B", "国际B2B核心采购平台")}</span>
            </div>
            
            <h1 className="text-3.5xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-350 bg-clip-text">
              {getText(
                "Connecting Global Markets With Trusted Trade Solutions",
                "Conectando Mercados Globales con Soluciones de Confianza",
                "连接全球市场，为您提供值得信赖的贸易解决方案"
              )}
            </h1>
            
            <p className="text-sm md:text-md text-slate-300 leading-relaxed max-w-lg">
              {getText(
                "TransitGlobal expedites high-volume bulk supply chains. We coordinate premium mineral cathodes, clean technology panels, industrial machinery, and textiles under verified logistics pipelines.",
                "TransitGlobal agiliza cadenas de suministro de gran volumen. Coordinamos cátodos orgánicos, paneles solares, maquinaria y textiles bajo estrictas regulaciones CIF y FOB.",
                "TransitGlobal 专门从事大宗工业原料、新能源光伏板、重型机械及纺织原料的全球转口与报关配送，提供成熟的货代及提单追踪解决方案。"
              )}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('products')}
                className="flex items-center space-x-1.5 px-5 py-3 text-xs font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 hover:shadow-lg shadow-blue-500/10 cursor-pointer transition-all"
              >
                <span>{getText("Start Sourcing", "Iniciar Abastecimiento", "开始选购")}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentTab('tracking')}
                className="flex items-center space-x-2 px-5 py-3 text-xs font-bold text-slate-200 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 cursor-pointer transition-colors"
              >
                <Ship className="h-4 w-4 text-cyan-400" />
                <span>{getText("Track Shipments", "Rastrear Envío", "物流跟踪")}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <WorldMap />
          </div>
        </div>
      </section>

      {/* Corporate High-End Statistics counters */}
      <section className="mx-auto max-w-7xl px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-850 dark:bg-slate-900 shadow-sm flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">140+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{getText("Countries Direct Sourced", "Países Surtidos Directamente", "直源合作国家及地区")}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-850 dark:bg-slate-900 shadow-sm flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400">
              <Anchor className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">85K+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{getText("Successful B2B Line Cargoes", "Cargamentos B2B Exitosos", "成功申报的海运提单")}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-850 dark:bg-slate-900 shadow-sm flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">400+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{getText("Enterprise Elite Clients", "Clientes Globales Activos", "长期服务企业及商户")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase Section with horizontal Carousel Controls */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">{getText("Commercial Catalog", "Catálogo Comercial", "核心现货资源库")}</span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              {getText("Featured Sourcing Commodities", "Materias Primas Destacadas", "特色采购品目供应")}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => scrollCarousel('left')}
              className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              ◀
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Scrollable container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
        >
          {featuredProducts.map((p) => {
            const displayPrice = Math.round(p.price * currencyRate);
            return (
              <div 
                key={p.id}
                className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                    <img referrerPolicy="no-referrer" src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                    <span className="absolute top-2 left-2 bg-slate-950/80 text-white font-mono text-[9px] px-2 py-0.5 rounded font-medium">
                      {p.countryOrigin}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-3 block">{p.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{p.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono">Benchmark MOQ</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.moq}</span>
                  </div>
                  <button 
                    onClick={() => setCurrentTab('products')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:shadow-md cursor-pointer transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us & Trust Badges Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-slate-100 dark:border-slate-850 pt-16">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">{getText("Elite Compliance", "Cumplimiento Elite", "合规与国际准入")}</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            {getText("Rigorous Sourcing Certifications", "Certificaciones de Suministro Rigurosas", "严苛的产品品控标准与海运追溯")}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            {getText(
              "TransitGlobal guarantees compliance for commercial customhouse entries. Every delivery dossier includes ASTM certifications, TUV environmental reports, and direct trace routes of origins.",
              "TransitGlobal garantiza cumplimiento total en aduanas. Todo dossier incluye certificados ASTM, reportes TUV Nord de impacto ambiental y trazabilidad completa de orígenes.",
              "所有的提货和交付卷宗均包含ASTM标准分析、CE环保论证、以及TUVNord的原产质量认证。为跨国合规保驾护航。"
            )}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850 dark:text-white">Full Freight Risk Cover</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Underwritten marine coverage limits with Lloyds alliance.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                <Award className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-850 dark:text-white">Authorized Customhouse Broker</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Direct API bridges to US/Euro custom customs gates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand visual cards listing values */}
        <div className="bg-slate-50 rounded-2xl p-6 dark:bg-slate-900 relative border border-slate-100 dark:border-slate-800">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs text-blue-500 font-bold block">01 / LOGISTICS</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Multi-Modal Port Integrations</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Direct shipping alliances with MSC, COSCO and Maersk line fleets to lower bulk rates.</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="font-mono text-xs text-blue-500 font-bold block">02 / TRADING AGILITY</span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">Flexible B2B IncoTerms allocation</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Seamless risk transitions utilizing standard EXW, FOB, CIF, or DDP agreements with smart invoicing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">{getText("Verified Trust", "Confianza Verificada", "企业客户感言")}</span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            {getText("What Global Sourcing Officers Say", "Lo que dicen los oficiales de compras", "世界各地合作伙伴的反馈")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-850 dark:bg-slate-900">
            <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed italic">
              "We regularized monthly wholesale solar panels under CIF Seattle. TransitGlobal's full compliance and tracking allowed us to schedule installation projects down to the exact customs discharge hour."
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-3">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Marcus Vance</span>
                <span className="text-[10px] text-slate-400">EPC Energy Corp, USA</span>
              </div>
              <span className="text-xs text-blue-500 font-bold font-mono">★★★★★</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-850 dark:bg-slate-900">
            <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed italic">
              "Sourcing high-purity Chilean copper cathodes normally involves massive custom clearance bureaucracies. TransitGlobal streamlined everything. The documentation was fully compliant."
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-3">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Dr. S. K. Nair</span>
                <span className="text-[10px] text-slate-400">Standard Machinery Co, India</span>
              </div>
              <span className="text-xs text-blue-500 font-bold font-mono">★★★★★</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-850 dark:bg-slate-900">
            <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed italic">
              "The washed Arabica coffee spools harvesting metrics are outstanding. The TransitGlobal team provides complete, reliable reports of source locations for complete green marketing integrity."
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-3">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">L. Gauthier</span>
                <span className="text-[10px] text-slate-400">Chocolatier Franchises, France</span>
              </div>
              <span className="text-xs text-blue-500 font-bold font-mono">★★★★★</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline helper for Globe
function Globe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
