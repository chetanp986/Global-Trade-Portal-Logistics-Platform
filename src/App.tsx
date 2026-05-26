import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AiChat from './components/AiChat';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProductsSection from './components/ProductsSection';
import DashboardSection from './components/DashboardSection';
import TrackingSection from './components/TrackingSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import PortalSection from './components/PortalSection';

import { Product, Shipment, Lead, BlogPost, CurrencyRate, CommodityPrice, UserSession } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<string>('EN');
  const [currency, setCurrency] = useState<string>('USD');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(false);
  const [activeTrackingNo, setActiveTrackingNo] = useState<string>('');

  // Active DB states
  const [products, setProducts] = useState<Product[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [commodities, setCommodities] = useState<CommodityPrice[]>([]);

  // Authenticated user session
  const [user, setUser] = useState<UserSession>({
    name: '',
    role: undefined,
    company: '',
    token: ''
  });

  const currencyRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79
  };

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };

  // Synchronize state from API on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, sRes, bRes, lRes, rRes, cRes] = await Promise.all([
          fetch('/api/products').then(r => r.json()),
          fetch('/api/shipments').then(r => r.json()),
          fetch('/api/blogs').then(r => r.json()),
          fetch('/api/leads').then(r => r.json()),
          fetch('/api/rates').then(r => r.json()),
          fetch('/api/commodities').then(r => r.json())
        ]);

        if (Array.isArray(pRes)) setProducts(pRes);
        if (Array.isArray(sRes)) setShipments(sRes);
        if (Array.isArray(bRes)) setBlogs(bRes);
        if (Array.isArray(lRes)) setLeads(lRes);
        if (Array.isArray(rRes)) setCurrencies(rRes);
        if (Array.isArray(cRes)) setCommodities(cRes);
      } catch (err) {
        console.error("Trouble reaching Express API. Using offline backup states.", err);
      }
    };
    fetchData();
  }, []);

  // Sync class state for darkmode
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Auth Operations
  const handleLogin = (userEmail: string) => {
    if (userEmail.toLowerCase().includes('admin')) {
      setUser({
        name: 'Alex Mercer',
        role: 'admin',
        company: 'TransitGlobal HQ (Europe)',
        token: 'MOCK_ADMIN_JWT_TOKEN'
      });
      setCurrentTab('portal');
    } else {
      setUser({
        name: 'Guillaume Vancover',
        role: 'client',
        company: 'Oceanic Wholesalers Syndicate',
        token: 'MOCK_USER_JWT_TOKEN'
      });
      setCurrentTab('portal');
    }
  };

  const handleLogout = () => {
    setUser({ name: '', role: undefined, company: '', token: '' });
    setCurrentTab('portal');
  };

  // CRUD endpoints wrappers to update state locally and hit Express server
  const handleAddProduct = async (newP: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newP)
      });
      const storedItem = await response.json();
      setProducts(prev => [storedItem, ...prev]);
    } catch (err) {
      console.error(err);
      // Local fallback
      setProducts(prev => [
        { ...newP, id: `PROD-${Math.floor(Math.random()*1000)}` },
        ...prev
      ]);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateShipment = async (trackNo: string, status: string, port: string) => {
    try {
      const response = await fetch(`/api/shipments/${trackNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, currentPort: port })
      });
      const updatedItem = await response.json();
      setShipments(prev => prev.map(s => s.trackingNumber === trackNo ? updatedItem : s));
    } catch (err) {
      console.error(err);
      // Local updates fallback
      setShipments(prev => prev.map(s => {
        if (s.trackingNumber === trackNo) {
          return {
            ...s,
            status,
            currentPort: port,
            milestones: [
              { title: `Station log: ${status}`, location: port, date: new Date().toISOString().split('T')[0], completed: true },
              ...s.milestones
            ]
          };
        }
        return s;
      }));
    }
  };

  const handleAddLead = async (leadNoId: Omit<Lead, 'id' | 'date' | 'status'>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadNoId)
      });
      const recorded = await response.json();
      setLeads(prev => [recorded, ...prev]);
    } catch (err) {
      console.error(err);
      // local update
      setLeads(prev => [
        { ...leadNoId, id: `L-9932${Math.floor(Math.random()*100)}`, date: new Date().toISOString().split('T')[0], status: 'New' },
        ...prev
      ]);
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await response.json();
      setLeads(prev => prev.map(l => l.id === id ? updated : l));
    } catch (err) {
      console.error(err);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  return (
    <div id="corporate-portal-body" className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Frost glass top Nav Header bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setCurrentTab('portal')}
      />

      {/* Main viewport Container section */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 mt-24">
        
        {/* Render Tab panels based on route state */}
        <div className="animate-fade-in">
          {currentTab === 'home' && (
            <HomeSection
              setCurrentTab={setCurrentTab}
              featuredProducts={products.slice(0, 5)}
              currencySymbol={currencySymbols[currency]}
              currencyRate={currencyRates[currency]}
              language={language}
            />
          )}

          {currentTab === 'about' && (
            <AboutSection language={language} />
          )}

          {currentTab === 'services' && (
            <ServicesSection setCurrentTab={setCurrentTab} language={language} />
          )}

          {currentTab === 'products' && (
            <ProductsSection
              products={products}
              currency={currency}
              currencySymbol={currencySymbols[currency]}
              currencyRate={currencyRates[currency]}
              language={language}
              onAddLead={handleAddLead}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardSection
              currencies={currencies}
              commodities={commodities}
              language={language}
            />
          )}

          {currentTab === 'tracking' && (
            <TrackingSection
              shipments={shipments}
              activeTrackingNo={activeTrackingNo}
              setActiveTrackingNo={setActiveTrackingNo}
              language={language}
            />
          )}

          {currentTab === 'blog' && (
            <BlogSection blogs={blogs} language={language} />
          )}

          {currentTab === 'contact' && (
            <ContactSection onAddLead={handleAddLead} language={language} />
          )}

          {currentTab === 'portal' && (
            <PortalSection
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
              products={products}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              shipments={shipments}
              onUpdateShipment={handleUpdateShipment}
              leads={leads}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              currencySymbol={currencySymbols[currency]}
              currencyRate={currencyRates[currency]}
              currency={currency}
            />
          )}
        </div>

      </main>

      {/* Corporate detailed multi-port footer */}
      <Footer setCurrentTab={setCurrentTab} language={language} />

      {/* AI Assistant Chat drawer overlay */}
      <AiChat isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

    </div>
  );
}
