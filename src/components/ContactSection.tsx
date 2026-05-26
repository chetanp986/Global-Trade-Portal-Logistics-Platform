import React from 'react';
import { Mail, Phone, MapPin, Compass, CheckCircle, MessageSquare, ArrowRight, Share2, AlertCircle } from 'lucide-react';
import { Lead } from '../types';

interface ContactSectionProps {
  onAddLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  language: string;
}

export default function ContactSection({ onAddLead, language }: ContactSectionProps) {
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<'general' | 'quote' | 'import' | 'export'>('general');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please provide the required core fields (Name and Email).");
      return;
    }

    onAddLead({
      name,
      company: company || "Independent Trader",
      email,
      phone: phone || "Not Provided",
      message: message || "Requested a live B2B Consultation call.",
      type
    });

    setSubmitted(true);
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setMessage("");
    
    // Clear success banner after delay
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsApp = () => {
    const textStr = encodeURIComponent("Hello TransitGlobal! We intend to inquire about bulk B2B raw materials sourcing and customhouse brokerage services.");
    window.open(`https://wa.me/12135558901?text=${textStr}`, '_blank');
  };

  return (
    <div className="space-y-12 py-6 pb-20">
      
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto py-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">Consolidated Sourcing Office</span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
          Inquire B2B Freight Consultations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          File formal quotation requests, coordinate direct customs evaluation diagnostic audits, or request bulk CIF ocean schedules from our registered trading leaders.
        </p>
      </section>

      {/* Grid container */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact form (Saves to server leads DB) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-805 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Inquiry Intake Mainframe</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Entries are routed instantly to our regional logistics director offices.</p>
          </div>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-900/40 dark:text-emerald-300 rounded-xl text-xs flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              <span><b>Inquiry Recorded successfully!</b> Our Singapore desk will issue structural customs estimates inside your portal account within 2 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Your Full Name*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Sterling"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Enterprise / Syndicate*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alliance Metals Ltd"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Company Contact Email*</label>
                <input
                  type="email"
                  required
                  placeholder="sterling@alliance.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Corporate Desk Phone</label>
                <input
                  type="text"
                  placeholder="+44 20 7946 0958"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Inquiry category Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
              >
                <option value="general">B2B Sourcing Consultation (General Inquiry)</option>
                <option value="quote">Commercial Ocean Freight Calculation (CIF Quote)</option>
                <option value="import">Customshouse regulatory clearance broker advisory</option>
                <option value="export">Wholesale raw materials export schedules clearance</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono block">Specify Message Details</label>
              <textarea
                rows={4}
                required
                placeholder="Include bulk weights, exact target dimensions, IncoTerms limits..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-755 dark:border-slate-750 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center justify-center space-x-1"
            >
              <span>Submit Sourcing Inquiry</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Info panel & Direct Hotlines */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick WhatsApp trigger card */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/45 p-5 dark:bg-emerald-950/20 dark:border-emerald-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-3">
            <div className="p-2 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-600 shrink-0">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white text-xs block">Expedited WhatsApp Desk</strong>
              <p className="mt-1 leading-relaxed text-[11px]">Contact our active Singapore Logistics Coordinator directly for immediate response times under 5 minutes.</p>
              <button 
                onClick={handleWhatsApp}
                className="mt-3 inline-flex items-center space-x-1.5 bg-emerald-600 text-white font-bold p-1 px-3 rounded text-[10px] hover:bg-emerald-705 hover:bg-emerald-700 cursor-pointer"
              >
                <span>Launch WhatsApp Broker Chat</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:bg-slate-900 dark:border-slate-805 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Terminal Coordinators</h4>
            
            <div className="space-y-3 font-medium text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Asia-Pacific Logistics HQ</strong>
                  <span className="block mt-0.5">Marina Bay Financial Centre, SG. Call: +65 6789 0122</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">Euro Terminal Operations</strong>
                  <span className="block mt-0.5">Willemswerf Business Port, Rotterdam, NL. Call: +31 10 555 4322</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white">North American Customs Desk</strong>
                  <span className="block mt-0.5">Interstate Trade Tower, Los Angeles, USA. Call: +1 213 555 8901</span>
                </div>
              </div>
            </div>
          </div>

          {/* Styled compliance map visual banner */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs bg-slate-100 p-4 font-mono text-slate-500 font-extrabold flex flex-col items-center justify-center h-44 border-dashed border-2 text-center text-[10px]">
            <Compass className="h-8 w-8 text-slate-400 animate-spin-slow mb-2" />
            <span>Map transponder pipeline online.<br />Anchorage telemetry feeding 🟢</span>
          </div>

        </div>

      </section>

    </div>
  );
}
