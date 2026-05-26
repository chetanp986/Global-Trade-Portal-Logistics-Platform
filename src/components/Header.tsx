import React from 'react';
import { Globe, User, Bell, ChevronDown, CheckCircle, Shield, Menu, X, LogIn } from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  currency: string;
  setCurrency: (curr: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  user: UserSession;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  currency,
  setCurrency,
  darkMode,
  setDarkMode,
  user,
  onLogout,
  onOpenAuth
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notifDropdown, setNotifDropdown] = React.useState(false);

  const notifications = [
    { id: 1, text: "Vessel MSC OSCAR entered Mid-Pacific route.", time: "10m ago" },
    { id: 2, text: "Customs clearance approved for Rotterdam copper.", time: "2h ago" },
    { id: 3, text: "New B2B bulk quote requested by Sato Electronics.", time: "4h ago" }
  ];

  const menuItems = [
    { id: 'home', label: { EN: 'Home', ES: 'Inicio', ZH: '首页' } },
    { id: 'about', label: { EN: 'About Us', ES: 'Nosotros', ZH: '关于我们' } },
    { id: 'services', label: { EN: 'Services', ES: 'Servicios', ZH: '贸易服务' } },
    { id: 'products', label: { EN: 'Products', ES: 'Catálogo', ZH: '商品目录' } },
    { id: 'dashboard', label: { EN: 'Trade Desk', ES: 'Tablero', ZH: '全球看板' } },
    { id: 'tracking', label: { EN: 'Logistics', ES: 'Logística', ZH: '物流跟踪' } },
    { id: 'blog', label: { EN: 'Trade Intel', ES: 'Blog', ZH: '行业快讯' } },
    { id: 'contact', label: { EN: 'Contact', ES: 'Contacto', ZH: '联络我们' } }
  ];

  const getLabel = (item: typeof menuItems[0]) => {
    if (language === 'ES') return item.label.ES;
    if (language === 'ZH') return item.label.ZH;
    return item.label.EN;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/60 dark:border-slate-800/80 dark:bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="flex cursor-pointer items-center space-x-2"
          id="header-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-800 text-white shadow-md shadow-blue-500/20">
            <Globe className="h-5.5 w-5.5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              TRANSIT<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-extrabold uppercase">Global</span>
            </span>
            <div className="text-[9px] -mt-1 font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              B2B Trade & Logistics
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                currentTab === item.id
                  ? 'bg-blue-50/80 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold border-b-2 border-blue-600 rounded-b-none'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              {getLabel(item)}
            </button>
          ))}
        </nav>

        {/* Settings & User Management Controls */}
        <div className="hidden md:flex items-center space-x-3">
          
          {/* Multi-language Selector */}
          <div className="relative group">
            <button className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>{language}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-32 rounded-md border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-xl overflow-hidden z-50">
              <button onClick={() => setLanguage('EN')} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex justify-between items-center cursor-pointer font-medium">
                English {language === 'EN' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </button>
              <button onClick={() => setLanguage('ES')} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex justify-between items-center cursor-pointer font-medium">
                Español {language === 'ES' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </button>
              <button onClick={() => setLanguage('ZH')} className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex justify-between items-center cursor-pointer font-medium">
                中文 {language === 'ZH' && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </button>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="relative group">
            <button className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
              <span className="font-mono text-slate-400">$</span>
              <span>{currency}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:block w-28 rounded-md border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-xl overflow-hidden z-50">
              {['USD', 'EUR', 'GBP'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex justify-between items-center font-mono cursor-pointer"
                >
                  {curr} {currency === curr && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer"
            title="Toggle theme visualizer"
          >
            {darkMode ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notifications Terminal Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdown(!notifDropdown)}
              className="relative p-1.5 rounded-md text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                3
              </span>
            </button>

            {notifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-slate-100 bg-white p-2 dark:bg-slate-910 dark:bg-slate-900 dark:border-slate-800 shadow-xl z-50">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 px-2 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">B2B Cargo Feeds</span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400">Mark all read</span>
                </div>
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-900 dark:text-white">{n.text}</span>
                      </div>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Secure Portal login/role-based route buttons */}
          {user.role ? (
            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-mono text-xs font-semibold">
                {user.role === 'admin' ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                <span className="max-w-[75px] truncate">{user.name}</span>
              </span>
              <button
                onClick={onLogout}
                className="text-[11px] text-red-600 dark:text-red-400 font-medium hover:underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              id="btn-portal-login"
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>B2B Portal</span>
            </button>
          )}

        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          {user.role && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-md font-mono text-[10px]">
              {user.name.split(' ')[0]}
            </span>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 px-4 pt-2 pb-4 dark:border-slate-800 dark:bg-slate-950/95 space-y-2 relative z-50">
          <div className="flex flex-col space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  currentTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900'
                }`}
              >
                {getLabel(item)}
              </button>
            ))}
          </div>
          
          <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-wrap gap-2 items-center justify-between">
            {/* Lang & Currency controls for mobile */}
            <div className="flex space-x-2 text-xs">
              <button 
                onClick={() => setLanguage(language === 'EN' ? 'ES' : language === 'ES' ? 'ZH' : 'EN')} 
                className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md"
              >
                🌐 Language: {language}
              </button>
              <button 
                onClick={() => setCurrency(currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'GBP' : 'USD')}
                className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-md font-mono"
              >
                Currency: {currency}
              </button>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-full border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {user.role ? (
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Logged in: <b>{user.email}</b></div>
                <button onClick={onLogout} className="px-3 py-1.5 text-xs bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 rounded-md font-bold">Log out</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 bg-blue-600 text-white rounded-md text-xs font-semibold"
              >
                Access Secure B2B Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
