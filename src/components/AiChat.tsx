import React from 'react';
import { MessageSquare, Send, X, Bot, Sparkles, Compass, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiChatProps {
  onSearchShipmentByTrackNo?: (trackNo: string) => void;
  setCurrentTab?: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AiChat({
  onSearchShipmentByTrackNo,
  setCurrentTab,
  isOpen: propsIsOpen,
  onClose
}: AiChatProps) {
  const [localIsOpen, setLocalIsOpen] = React.useState(false);
  const isOpen = propsIsOpen !== undefined ? propsIsOpen : localIsOpen;
  
  const setIsOpen = (val: boolean) => {
    if (onClose && !val) {
      onClose();
    }
    setLocalIsOpen(val);
  };
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      text: "Welcome to TransitGlobal's AI Trade Desk. I am your premium trade intelligence co-pilot. I can locate active bulk shipping containers, evaluate market rates, or assist with wholesale sourcing specifications. How may I direct your supply chain today?",
      timestamp: "Just Now"
    }
  ]);
  const [inputMsg, setInputMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const presetQueries = [
    { text: "Track active container TRK-9831-285", label: "Track Cargo" },
    { text: "What is the MOQ of Monocrystalline Solar Panels?", label: "Solar MOQ" },
    { text: "What are the Incoterms limits of CIF vs FOB?", label: "IncoTerms" },
    { text: "List registered shipping hubs of TransitGlobal", label: "Trade Hubs" }
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg("");
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10) // Send trailing conversation context
        })
      });

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: data.text || "I apologize. Our trade mainframe has missed a connection beat. Please resubmit your inquiry.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

      // If the response context is tracking a shipment let's search it automatically for them!
      if (textToSend.includes("TRK-9831-285") || textToSend.includes("TRK-2410-891") || textToSend.includes("TRK-5512-422")) {
        const matches = textToSend.match(/TRK-\d+-\d+/i);
        if (matches && matches[0] && onSearchShipmentByTrackNo) {
          onSearchShipmentByTrackNo(matches[0]);
          if (setCurrentTab) setCurrentTab('tracking');
        }
      }

    } catch (err) {
      console.error("Failed to connect to fullstack chat API:", err);
      setMessages(prev => [...prev, {
        id: `msg-err-${Date.now()}`,
        sender: 'ai',
        text: "We are currently running in limited client-side offline sandbox mode. Please refer to our product catalog tabs above or contact human trade specialists directly via email.",
        timestamp: "Now"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl hover:scale-105 transition-all text-sm font-bold cursor-pointer hover:shadow-cyan-400/20 shadow-blue-600/30 ring-1 ring-white/10"
        id="btn-trigger-ai-chat"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 animate-pulse text-[8px] font-bold">1</span>
        <Sparkles className="h-6 w-6 animate-pulse" />
      </button>

      {/* Floating Chat Panel Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white p-0 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-transform duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-900 dark:bg-slate-950 dark:border-slate-800 flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center">
                  Trade Co-Pilot
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[8px] font-mono bg-blue-900/60 text-blue-300 uppercase">Gemini AI</span>
                </h4>
                <div className="text-[10px] text-slate-400 font-mono flex items-center mt-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1"></span>
                  Online 24/7 Intel Feed
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick-click presets instructions bar */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 flex items-center mb-1.5 uppercase font-mono">
              <Compass className="h-3 w-3 mr-1 text-blue-500" />
              <span>Suggested B2B Queries</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="px-2 py-1 bg-white hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] border border-slate-250 dark:border-slate-750 text-slate-700 dark:text-slate-200 rounded-md font-medium cursor-pointer transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div key={m.id} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    isAi 
                      ? 'bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-800' 
                      : 'bg-blue-600 text-white rounded-tr-none'
                  }`}>
                    {/* Render newlines correctly */}
                    <div className="whitespace-pre-line">{m.text}</div>
                    <span className={`text-[8px] mt-1.5 block text-right font-mono ${isAi ? 'text-slate-400' : 'text-blue-200'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-2xl rounded-tl-none p-3 text-xs border border-slate-100 dark:border-slate-800 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-75"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider">Evaluating trade terminals...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Form input */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputMsg);
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask about tariffs, freight schedules, specs..."
                className="flex-1 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-250 dark:border-slate-750 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400 text-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim() || loading}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-40 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
