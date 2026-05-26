import React from 'react';
import { User, Shield, Briefcase, FileCheck, CheckCircle2, AlertCircle, Trash2, ArrowUpRight, Plus, Check, Loader2, PlayCircle, Settings, Mail } from 'lucide-react';
import { UserSession, Product, Shipment, Lead } from '../types';

interface PortalSectionProps {
  user: UserSession;
  onLogin: (email: string) => void;
  onLogout: () => void;
  products: Product[];
  onAddProduct: (prod: any) => void;
  onDeleteProduct: (id: string) => void;
  shipments: Shipment[];
  onUpdateShipment: (tracking: string, status: string, port: string) => void;
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: string) => void;
  currencySymbol: string;
  currencyRate: number;
  currency: string;
}

export default function PortalSection({
  user,
  onLogin,
  onLogout,
  products,
  onAddProduct,
  onDeleteProduct,
  shipments,
  onUpdateShipment,
  leads,
  onUpdateLeadStatus,
  currencySymbol,
  currencyRate,
  currency
}: PortalSectionProps) {
  
  // Login form states
  const [email, setEmail] = React.useState("client@transit.com");
  const [password, setPassword] = React.useState("123456");

  // Admin New Product CMS form states
  const [pName, setPName] = React.useState("");
  const [pCategory, setPCategory] = React.useState("Renewable Energy");
  const [pPrice, setPPrice] = React.useState(100);
  const [pMoq, setPMoq] = React.useState("100 Units");
  const [pOrigin, setPOrigin] = React.useState("Singapore");
  const [pDesc, setPDesc] = React.useState("");
  const [pAvailability, setPAvailability] = React.useState("In Stock");
  
  // Admin Shipment transponder updater states
  const [shippingNo, setShippingNo] = React.useState("TRK-9831-285");
  const [shippingStatus, setShippingStatus] = React.useState("Customs Clearance");
  const [shippingPort, setShippingPort] = React.useState("Mid-Pacific Transit");

  const [activeTab, setActiveTab] = React.useState<'overview' | 'cms' | 'shipments' | 'leads'>('overview');

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName) return;
    onAddProduct({
      name: pName,
      category: pCategory,
      price: Number(pPrice),
      moq: pMoq,
      countryOrigin: pOrigin,
      description: pDesc || "Ethically sourced heavy raw resource.",
      exportAvailability: pAvailability,
      specifications: { "Purity": "Grade-A certified", "Customs": "Pre-cleared" }
    });

    setPName("");
    setPDesc("");
    alert("New B2B product appended to global server inventory. Review in 'Products' tab.");
  };

  const handleShipmentUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShipment(shippingNo, shippingStatus, shippingPort);
    alert(`Voyage transponder TRK updated! Live Port: ${shippingPort}. Status: ${shippingStatus}`);
  };

  // Static user historic invoice records
  const userHistoricOrders = [
    { id: "ORD-98", item: "Solar Monocrystalline Modules (550W)", qty: "100 Units", date: "2026-04-18", status: "Delivered", value: 8800 },
    { id: "ORD-101", item: "Grade-A Copper Cathodes sheets", qty: "20 Metric Tons", date: "2026-05-24", status: "Customs Hub", value: 170400 }
  ];

  // Auto set values in admin dropdown
  React.useEffect(() => {
    if (shipments.length > 0) {
      setShippingNo(shipments[0].trackingNumber);
    }
  }, [shipments]);

  return (
    <div className="space-y-8 py-6 pb-20">
      
      {/* If logged out, render beautiful B2B Auth card */}
      {!user.role ? (
        <section className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-8 dark:bg-slate-905 dark:bg-slate-900 dark:border-slate-805 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="h-10 w-10 mx-auto rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center">
              <User className="h-5 w-5" />
            </span>
            <h2 className="text-md font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-mono">B2B Sourcing Portal</h2>
            <p className="text-[11px] text-slate-400">Secure entry access for associated maritime purchase managers and administrative shipping officers.</p>
          </div>

          <form onSubmit={handleLoginFormSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="text-[10px] text-slate-500 font-mono block">Workplace email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. client@transit.com or admin@transit.com"
                className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-250 dark:border-slate-750 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-505 text-slate-500 font-mono block">Secret credential passphrase</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-255 border-slate-200 dark:border-slate-750 dark:text-white"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer">
              Authenticate Credentials
            </button>
          </form>

          {/* Quick guidance notes details */}
          <div className="bg-blue-50/50 p-3 rounded-lg text-[10px] dark:bg-slate-950/40 text-slate-500 flex items-start space-x-2 leading-relaxed">
            <Shield className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-700 dark:text-slate-350 italic">Quick Access Keys For Reviewers (Lax Passwords):</strong>
              <div className="mt-1 space-y-1">
                <div>• Type <b>admin@transit.com</b> to open administrative inventory CMS, shipment milestone and CRM lead resolve controls.</div>
                <div>• Type <b>client@transit.com</b> to preview buyer historic bills, saved proforma invoices, and direct message boards.</div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Logged In Gateway Panel */
        <div className="space-y-6">
          
          {/* Header block with welcome and logout */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center p-5 bg-slate-900 rounded-2xl text-white gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                {user.role === 'admin' ? <Shield className="h-5.5 w-5.5" /> : <User className="h-5.5 w-5.5" />}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-sm">{user.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-blue-800 text-blue-200 uppercase">{user.role}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono italic">{user.company} • Active desk node session</span>
              </div>
            </div>
            <button onClick={onLogout} className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs cursor-pointer ml-auto">Logout Session</button>
          </div>

          {/* Render Client dashboard if user is 'client' */}
          {user.role === 'client' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* historic bills table */}
              <div className="lg:col-span-2 space-y-4 bg-white rounded-2xl border border-slate-200 p-5 dark:bg-slate-900 dark:border-slate-805">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">My Active Cargo Orders</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs leading-relaxed border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-450 dark:bg-slate-950 font-bold">
                        <th className="p-2.5">Order ID</th>
                        <th className="p-2.5">Cargo Commodity</th>
                        <th className="p-2.5">Settle Status</th>
                        <th className="p-2.5 text-right">Invoiced value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userHistoricOrders.map((ord) => (
                        <tr key={ord.id} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="p-2.5 font-mono text-blue-500 font-bold">{ord.id}</td>
                          <td className="p-2.5">{ord.item}</td>
                          <td className="p-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800">{ord.status}</span></td>
                          <td className="p-2.5 text-right font-mono font-bold">${(ord.value * currencyRate).toLocaleString('en-US', { maximumFractionDigits: 0 })} {currency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* quick actions file list */}
              <div className="space-y-4 bg-white rounded-2xl border border-slate-200 p-5 dark:bg-slate-900 dark:border-slate-805 h-fit">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Compliance Downloads</h3>
                <div className="space-y-2 text-xs">
                  <button onClick={() => alert("Downloading digital Bill of Lading (B/L) copy simulation... Required for Rotterdam customs port discharge manual.")} className="w-full p-2.5 text-left border border-slate-100 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-between dark:bg-slate-950 dark:border-slate-850 cursor-pointer font-semibold">
                    <span>📃 Bill of Lading (B/L) - ORD-101.pdf</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
                  </button>
                  <button onClick={() => alert("Downloading TUV Nord original environmental carbon footprint CBAM compliance sheet... Required for renewable credits approval.")} className="w-full p-2.5 text-left border border-slate-100 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-between dark:bg-slate-950 dark:border-slate-850 cursor-pointer font-semibold">
                    <span>📃 Sourcing CE Certification.pdf</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
                  </button>
                </div>
                <div className="p-3 bg-blue-50 text-[10px] text-slate-500 dark:bg-slate-950/40 rounded-xl leading-relaxed flex items-start space-x-1">
                  <FileCheck className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>These documents are legally certified and pre-evaluated using deep-water customs registry databases. For compliance updates, use live chatting with AI.</span>
                </div>
              </div>

            </div>
          )}

          {/* Render Admin Dashboard if user is 'admin' */}
          {user.role === 'admin' && (
            <div className="space-y-6">
              
              {/* Tabs selector */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-bold font-mono">
                <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 cursor-pointer ${activeTab==='overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Inventory CMS</button>
                <button onClick={() => setActiveTab('shipments')} className={`px-4 py-2 cursor-pointer ${activeTab==='shipments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>Shipments Transponders</button>
                <button onClick={() => setActiveTab('leads')} className={`px-4 py-2 cursor-pointer ${activeTab==='leads' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}>CRM Leads CRM</button>
              </div>

              {/* CRM Leads display section */}
              {activeTab === 'leads' && (
                <div className="space-y-4 bg-white rounded-2xl border border-slate-200 p-5 dark:bg-slate-900 dark:border-slate-805">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">CRM Inbound Sourcing Intake Logs ({leads.length})</h3>
                    <span className="text-[10px] text-slate-400">Live logs updated from main forms</span>
                  </div>

                  <div className="space-y-3">
                    {leads.map((l) => (
                      <div key={l.id} className="p-3.5 border border-slate-100 bg-slate-50 dark:bg-slate-950 dark:border-slate-850 rounded-xl flex flex-col sm:flex-row justify-between text-xs gap-4 items-start sm:items-center">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <strong className="text-slate-900 dark:text-white text-xs">{l.name}</strong>
                            <span className="text-[10px] text-slate-450 text-slate-400">({l.company})</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                              l.status === 'New' ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950'
                            }`}>{l.status}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">Type: {l.type.toUpperCase()} | Phone: {l.phone}</div>
                          <p className="text-[11px] text-slate-655 text-slate-600 dark:text-slate-300 mt-1 italic">{l.message}</p>
                          {l.product && <div className="text-[10px] text-blue-600 font-extrabold font-mono mt-1">Bound wholesale Item: {l.product} ({l.quantity})</div>}
                        </div>
                        {l.status === 'New' && (
                          <button
                            onClick={() => onUpdateLeadStatus(l.id, "In Contact")}
                            className="px-3.5 py-1.5 bg-blue-600 text-white font-bold rounded text-[10px] uppercase cursor-pointer shrink-0"
                          >
                            Mark: In Contact
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin CMS inventory creator panel */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Creator frame */}
                  <form onSubmit={handleProductSubmit} className="space-y-4 bg-white rounded-2xl border border-slate-200 p-5 dark:bg-slate-900 dark:border-slate-805 text-xs font-semibold">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Create B2B Wholesale stock</h3>
                    
                    <div>
                      <label className="text-[10px] text-slate-500 block">Product asset Title</label>
                      <input type="text" required value={pName} onChange={e => setPName(e.target.value)} placeholder="e.g. Ultra-Fine Copper Cathode Sheets" className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Wholesale Category</label>
                        <select value={pCategory} onChange={e => setPCategory(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
                          <option>Renewable Energy</option>
                          <option>Metals & Minerals</option>
                          <option>Agriculture & Wholesale Food</option>
                          <option>Electronics & Grid Batteries</option>
                          <option>Industrial Machinery</option>
                          <option>Textiles & Materials</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Product Price (USD rate)</label>
                        <input type="number" value={pPrice} onChange={e => setPPrice(Number(e.target.value))} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Minimal Order MOQ</label>
                        <input type="text" value={pMoq} onChange={e => setPMoq(e.target.value)} placeholder="e.g. 50 Packs" className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Country of Origin</label>
                        <input type="text" value={pOrigin} onChange={e => setPOrigin(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block">Export Availability Stamp</label>
                      <input type="text" value={pAvailability} onChange={e => setPAvailability(e.target.value)} placeholder="In Stock - immediate dispatch" className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white" />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block">Wholesale product Summary</label>
                      <textarea rows={2} value={pDesc} onChange={e => setPDesc(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-755 dark:border-slate-750 dark:text-white focus:outline-none placeholder-slate-500" placeholder="Summary specifications detailed..." />
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 cursor-pointer">Add Resource catalog</button>
                  </form>

                  {/* Listings block deletion */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 dark:bg-slate-900 dark:border-slate-805 space-y-4 max-h-[440px] overflow-y-auto">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Current Catalog items</h3>
                    {products.map((p) => (
                      <div key={p.id} className="p-2 border border-slate-100 hover:border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs flex justify-between items-center">
                        <div className="truncate max-w-[200px]">
                          <strong className="text-slate-900 dark:text-white block truncate">{p.name}</strong>
                          <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{p.category} | ${p.price} USD</span>
                        </div>
                        <button 
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1 px-2.5 hover:bg-red-50 text-red-600 rounded flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Admin Transponders update Milestones */}
              {activeTab === 'shipments' && (
                <form onSubmit={handleShipmentUpdateSubmit} className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-6 dark:bg-slate-900 dark:border-slate-805 text-xs font-semibold space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Vessel Milestones Controller</h3>
                  
                  <div>
                    <label className="text-[10px] text-slate-500 block">Select Shipment transponder ID</label>
                    <select value={shippingNo} onChange={e => setShippingNo(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
                      {shipments.map(s => (
                        <option key={s.id} value={s.trackingNumber}>{s.trackingNumber} ({s.cargoType})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block">State status stamp</label>
                    <select value={shippingStatus} onChange={e => setShippingStatus(e.target.value)} className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-250 dark:border-slate-750 dark:text-white">
                      <option>In Transit</option>
                      <option>Customs Clearance</option>
                      <option>Arrived Destination</option>
                      <option>Pending</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block">Vessel Coordinates Current Anchor Port</label>
                    <input type="text" required value={shippingPort} onChange={e => setShippingPort(e.target.value)} placeholder="e.g. Mid-Pacific anchorage transit MSC" className="w-full mt-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded border border-slate-255 border-slate-200 dark:border-slate-750 dark:text-white" />
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-bold rounded cursor-pointer">Commit Transponder status</button>
                </form>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
