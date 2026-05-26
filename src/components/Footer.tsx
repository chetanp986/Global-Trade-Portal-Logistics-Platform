import React from 'react';
import { Globe, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Award, FileText } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  language: string;
}

export default function Footer({ setCurrentTab, language }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const tradeHubs = [
    { country: "Asia-Pacific (HQ)", city: "Singapore", location: "Marina Bay Financial Centre, SG" },
    { country: "Europe Gateway", city: "Rotterdam", location: "Willemswerf Business Port, NL" },
    { country: "Americas Hub", city: "Los Angeles", location: "Gateway Trade Tower, CA, USA" }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      
      {/* Top Value Propositions & Trust Badge bar */}
      <div className="border-b border-slate-800 bg-slate-950/45 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-850 text-blue-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Full ISO Legal Liability Insurance</h4>
                <p className="text-xs text-slate-400 mt-1">Every bulk ocean liner cargo complies under Lloyd's & CIF regulatory policies.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-850 text-blue-500">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Customs House Authorized Agent</h4>
                <p className="text-xs text-slate-400 mt-1">Expedited green-channel custom declarations in Europe, East-Asia, and US.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-850 text-blue-500">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Transparent Sourcing Audits</h4>
                <p className="text-xs text-slate-400 mt-1">We supply complete TUV Nord, ASTM, CE, and OEKO-TEX declarations of origins.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <Globe className="h-5 w-5" />
              </div>
              <span className="text-md font-bold tracking-tight text-white uppercase">
                TRANSIT<span className="text-blue-500">Global</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              TransitGlobal is a premier, logistics-integrated global raw material and industrial machinery supplier. We bridge trading companies with vetted, high-purity minerals, renewable panels, and heavy manufacturing equipment seamlessly under verified customs and ocean logistics.
            </p>
            <div className="space-y-2 text-xs">
              <a href="mailto:trade@transitglobal.com" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
                <Mail className="h-3.5 w-3.5 text-blue-500" />
                <span>trade@transitglobal.com</span>
              </a>
              <div className="flex items-center space-x-2 text-slate-400">
                <Phone className="h-3.5 w-3.5 text-blue-500" />
                <span>+65 6789 0122 (B2B HQ Hotline)</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">Trade Services</h3>
            <ul className="mt-4 space-y-2 text-xs">
              {['home', 'about', 'services', 'products'].map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => setCurrentTab(tab)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer capitalize font-medium"
                  >
                    TransitGlobal {tab === 'home' ? 'Gateway' : tab}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => setCurrentTab('dashboard')} className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">Global Trade Dashboard</button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('tracking')} className="text-slate-400 hover:text-white transition-colors cursor-pointer font-medium">Vessel Container Tracking</button>
              </li>
            </ul>
          </div>

          {/* Registered Global Trade Hubs / Offices */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">Global Registered Hubs</h3>
            <div className="mt-4 space-y-3 text-xs">
              {tradeHubs.map((hub, idx) => (
                <div key={idx} className="border-l-2 border-slate-700 pl-3">
                  <div className="font-semibold text-slate-200">{hub.city} - <span className="text-slate-400 text-[10px] font-normal">{hub.country}</span></div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center">
                    <MapPin className="h-3 w-3 text-red-400 mr-1 shrink-0" />
                    <span>{hub.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* B2B Newsletter Intake */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">Subscribe Trade Intel</h3>
            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Receive bi-weekly reports covering customs duty changes, shipping congestion, commodity Indexes, and import tariff adaptations.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="procurement@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-slate-800 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700"
              />
              <button 
                type="submit"
                className="rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-all flex items-center justify-center cursor-pointer"
              >
                <span>Join</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-emerald-400 mt-2 font-medium">
                ✓ Enrolled successfully. Weekly trade updates activated.
              </p>
            )}
            <div className="mt-6">
              <span className="text-slate-500 text-[10px] font-mono block">TransitGlobal Inc. All Rights Reserved. © 2026.</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
