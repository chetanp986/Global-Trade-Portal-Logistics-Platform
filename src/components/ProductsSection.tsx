import React from 'react';
import { Filter, Search, FileText, ArrowRight, X, User, Briefcase, Mail, Phone, ShoppingBag, Globe, Printer } from 'lucide-react';
import { Product, Lead } from '../types';

interface ProductsSectionProps {
  products: Product[];
  currency: string;
  currencySymbol: string;
  currencyRate: number;
  language: string;
  onAddLead: (lead: Omit<Lead, 'id' | 'date' | 'status'>) => void;
}

export default function ProductsSection({
  products,
  currency,
  currencySymbol,
  currencyRate,
  language,
  onAddLead
}: ProductsSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeProduct, setActiveProduct] = React.useState<Product | null>(null);
  const [quoteStep, setQuoteStep] = React.useState<'choose' | 'form' | 'pdf'>('choose');

  // Quotation form states
  const [clientName, setClientName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [clientPhone, setClientPhone] = React.useState("");
  const [requestedQty, setRequestedQty] = React.useState("500 Units");
  const [destinationPort, setDestinationPort] = React.useState("Port of Rotterdam, NL");
  const [targetIncoterm, setTargetIncoterm] = React.useState("CIF (Sellers covers freight & cover)");
  const [specialRemarks, setSpecialRemarks] = React.useState("");
  
  // Generated quotation data
  const [generatedInvoiceNo, setGeneratedInvoiceNo] = React.useState("");

  const categories = ["All", "Renewable Energy", "Metals & Minerals", "Agriculture & Wholesale Food", "Electronics & Grid Batteries", "Industrial Machinery", "Textiles & Materials"];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesKeyword = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.countryOrigin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  const getInboundInquiryPrompt = (p: Product) => {
    setActiveProduct(p);
    setQuoteStep('choose');
    setGeneratedInvoiceNo(`INV-26-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !activeProduct) return;

    // Trigger Lead Submission to Backend
    onAddLead({
      name: clientName,
      company: companyName || "Self Employed Merchant",
      email: clientEmail,
      phone: clientPhone || "None provided",
      message: `Proforma Quotation Request Generated. IncoTerm: ${targetIncoterm}. Bound Port: ${destinationPort}. Bulk Qty: ${requestedQty}. Special Remarks: ${specialRemarks}`,
      type: 'quote',
      product: activeProduct.name,
      quantity: requestedQty
    });

    setQuoteStep('pdf');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6 pb-20">
      
      {/* Page Title */}
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">Consolidated B2B Catalog</span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Global Trade Commodities
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Source high-purity minerals, renewable solar tech, and precision heavy CNC toolings in multiple currencies.</p>
        </div>

        {/* Text Search Bar */}
        <div className="relative w-full max-w-xs shrink-0">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search country, energy, metal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-750 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400 dark:text-white"
          />
        </div>
      </section>

      {/* Categories Filter Pills */}
      <section className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-805">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                : 'bg-slate-50 text-slate-600 dark:bg-slate-905 dark:bg-slate-900 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grid containing results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-400 text-xs">No wholesale resources matched your criteria. Try adjusting filters or use our Trade AI Sidebar.</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const calculatedPrice = p.price * currencyRate;
            return (
              <div 
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-850 dark:bg-slate-900 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
              >
                <div>
                  {/* Photo container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img referrerPolicy="no-referrer" src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                    <span className="absolute top-2 left-2 bg-slate-950/80 text-white px-2 py-0.5 rounded font-mono text-[9px] font-bold">
                      {p.countryOrigin}
                    </span>
                    <span className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-bold font-mono">
                      {p.exportAvailability}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-wider text-blue-500 font-extrabold font-mono mt-4 block">{p.category}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 lines-clamp-3 leading-relaxed">{p.description}</p>
                </div>

                {/* Sourcing pricing metadata and quote controls */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">Wholesale Price</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                        {currencySymbol}{calculatedPrice.toLocaleString('en-US', { minimumFractionDigits: p.price < 50 ? 2 : 0, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">Min. MOQ</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-350">{p.moq}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => getInboundInquiryPrompt(p)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Request Quotation</span>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Detailed specs & Quotation Drawer Modal overlay */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            
            <button 
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Quote details switch screens */}
            {quoteStep === 'choose' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={activeProduct.image} alt={activeProduct.name} className="w-full sm:w-48 aspect-video rounded-xl object-cover bg-slate-100" />
                  <div>
                    <span className="text-[9px] text-blue-500 font-mono font-bold uppercase">{activeProduct.category}</span>
                    <h2 className="text-md font-bold text-slate-900 dark:text-white mt-1">{activeProduct.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{activeProduct.description}</p>
                  </div>
                </div>

                {/* Tech specifications Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase font-mono tracking-widest text-slate-400">Technical Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(activeProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 rounded bg-slate-55 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-slate-500 font-medium">{key}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-250 truncate max-w-[170px]">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-950/45 p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-mono tracking-widest block">Standard Trade Guarantee</span>
                    <p className="text-slate-200 mt-1">Pre-shipment verification inspects visual purity under TUV Nord standards before loading.</p>
                  </div>
                  <button 
                    onClick={() => setQuoteStep('form')}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer text-xs"
                  >
                    Configure Invoices
                  </button>
                </div>
              </div>
            )}

            {quoteStep === 'form' && (
              <form onSubmit={handleCreateQuotation} className="space-y-4">
                <div className="border-b border-indigo-100 dark:border-slate-850 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Wholesale Quotation Planner</h3>
                  <p className="text-xs text-slate-500 mt-1">Provide your bulk dispatch parameters to generate an instant proforma invoice and notify brokers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-655 text-slate-500 dark:text-slate-400 uppercase block font-mono">Representative Name*</label>
                    <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. Marcus Vance" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Company / Syndicate*</label>
                    <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. EPC Sourcing LLC" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Corporate Email*</label>
                    <input type="email" required value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="procurement@company.com" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Contact Phone</label>
                    <input type="text" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+1 (415) 555-0199" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Expected Order Volume (Quantity)</label>
                    <input type="text" value={requestedQty} onChange={e => setRequestedQty(e.target.value)} placeholder="e.g. 100 panels (1 container)" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Destination Cargo Port</label>
                    <input type="text" value={destinationPort} onChange={e => setDestinationPort(e.target.value)} placeholder="e.g. Port of Rotterdam, NL" className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono">Requested IncoTerms Allocation</label>
                  <select value={targetIncoterm} onChange={e => setTargetIncoterm(e.target.value)} className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-205 border-slate-200 dark:border-slate-750 bg-slate-55 bg-slate-50 dark:bg-slate-900 dark:text-white">
                    <option>CIF (Cost, Insurance & Ocean Freight - Seller manages risk across ocean)</option>
                    <option>FOB (Free on Board - Buyer manages ocean freight liabilities from origin gate)</option>
                    <option>EXW (Ex-Works - Buyer collects cargo from designated factory warehouses)</option>
                    <option>DDP (Delivered Duty Paid - Complete delivery straight to destination gate)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase block font-mono font-mono">Special Directives & Cargo Specs</label>
                  <textarea rows={2} value={specialRemarks} onChange={e => setSpecialRemarks(e.target.value)} placeholder="Write cargo composition specific, custom dyed PANTONEs, moisture content limits..." className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-250 dark:border-slate-750 bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>

                <div className="pt-4 flex justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <button type="button" onClick={() => setQuoteStep('choose')} className="px-4 py-2 text-xs font-semibold text-slate-550 text-slate-500 hover:bg-slate-50 rounded-lg">Back to Specs</button>
                  <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer">Generate Corporate Quotation</button>
                </div>
              </form>
            )}

            {/* Premium Printable PDF Invoice layout */}
            {quoteStep === 'pdf' && (
              <div id="printable-quotation" className="space-y-6">
                
                {/* Print Layout Header */}
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900/40 text-xs flex justify-between items-center print:hidden">
                  <span className="text-slate-600 dark:text-slate-300"><b>✓ B2B Quotation Generated.</b> Ready to print or download for procurement review.</span>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>

                {/* Actual Proforma Bill Sheet */}
                <div className="p-6 md:p-8 border border-slate-200 rounded-2xl bg-white text-slate-950 text-xs space-y-6 max-w-xl mx-auto shadow-sm">
                  
                  {/* Bill head */}
                  <div className="flex justify-between pb-6 border-b border-slate-150">
                    <div>
                      <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">TRANSITGLOBAL CORP.</span>
                      <p className="text-[10px] text-slate-400 mt-1 leading-tight">Marina Bay Financial Center, SG<br />Reg ID: SG-9932B-B2B</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-blue-700 font-mono tracking-tight uppercase">Proforma Invoice</span>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">NO: {generatedInvoiceNo}<br />DATE: {new Date().toISOString().split('T')[0]}</p>
                    </div>
                  </div>

                  {/* Bill parties addresses */}
                  <div className="grid grid-cols-2 gap-4 text-[11px] leading-relaxed">
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase tracking-widest block text-[9px] font-mono">Consigner / Exporter</span>
                      <strong className="text-slate-900">TransitGlobal Logistics HQ</strong>
                      <address className="not-italic text-slate-400 mt-1">
                        44 Marina Bay Boulevard, Tower 2<br />Singapore 018981
                      </address>
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-500 uppercase tracking-widest block text-[9px] font-mono">Consignee / Importer</span>
                      <strong className="text-slate-900">{companyName || "Anonymous Merchant LLC"}</strong>
                      <span className="text-slate-400 block mt-0.5">Attn: {clientName}</span>
                      <address className="not-italic text-slate-400">
                        {destinationPort}
                      </address>
                    </div>
                  </div>

                  {/* Main calculation Table */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-xs leading-relaxed border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[9px] font-mono">
                          <th className="p-2 border-b border-slate-200">Wholesale Line Description</th>
                          <th className="p-2 border-b border-slate-200 text-center">IncoTerm</th>
                          <th className="p-2 border-b border-slate-200 text-center">Target Qty</th>
                          <th className="p-2 border-b border-slate-200 text-right">Value Rate ({currency})</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-slate-900 border-b border-slate-200 font-medium">
                          <td className="p-2 max-w-[150px] truncate">{activeProduct.name}</td>
                          <td className="p-2 text-center font-mono text-[10px]">{targetIncoterm.split(' ')[0]}</td>
                          <td className="p-2 text-center">{requestedQty}</td>
                          <td className="p-2 text-right font-mono">
                            {currencySymbol}{(activeProduct.price * currencyRate).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                        {/* Summary */}
                        <tr className="text-slate-900 bg-slate-50/50">
                          <td colSpan={2} />
                          <td className="p-2 font-bold text-right text-slate-400 font-mono text-[9px] uppercase">Customs Surcharge</td>
                          <td className="p-2 text-right font-mono font-medium">{currencySymbol}{(120 * currencyRate).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                        </tr>
                        <tr className="text-slate-900 bg-slate-50">
                          <td colSpan={2} />
                          <td className="p-2 font-bold text-right text-indigo-700 font-mono text-[9px] uppercase">Calculated Total</td>
                          <td className="p-2 text-right font-mono font-black text-blue-700 text-sm">
                            {currencySymbol}{((activeProduct.price * currencyRate) + (120 * currencyRate)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Conditions & Signatures footer */}
                  <div className="space-y-4 pt-4 border-t border-slate-150 leading-relaxed text-[10px] text-slate-550 text-slate-400">
                    <p>
                      <b>Quotations Conditions:</b> This valuation index is calculated under current LME/CBAM Spot indexes and represents an estimation subject to custom evaluation upon shipping vessel berth clearance. Valid for 14 trade days.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-slate-150 text-center">
                      <div className="pt-8 border-t border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[8px] font-mono">Exporter Authorized signature</div>
                      <div className="pt-8 border-t border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[8px] font-mono">Importer Agreement signature</div>
                    </div>
                  </div>

                </div>

                <div className="flex justify-between print:hidden">
                  <button type="button" onClick={() => setQuoteStep('form')} className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-50 rounded-lg text-xs">Edit Parameters</button>
                  <button type="button" onClick={() => setActiveProduct(null)} className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs">Submit & Close</button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
