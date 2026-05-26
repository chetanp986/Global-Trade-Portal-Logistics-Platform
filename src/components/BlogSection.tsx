import React from 'react';
import { BookOpen, User, Calendar, Tag, ArrowRight, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
  language: string;
}

export default function BlogSection({ blogs, language }: BlogSectionProps) {
  const [selectedTag, setSelectedTag] = React.useState("All");
  const [activeBlog, setActiveBlog] = React.useState<BlogPost | null>(null);

  const tagsList = ["All", "Logistics", "IncoTerms", "Clean Energy", "Regulation", "Customs"];

  const filteredBlogs = blogs.filter(b => {
    if (selectedTag === "All") return true;
    return b.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));
  });

  const handleShare = (pTitle: string) => {
    alert(`Enabling secure corporate share link simulation for: ${pTitle}`);
  };

  return (
    <div className="space-y-12 py-6 pb-20">
      
      {/* Blog Hero Info Header */}
      <section className="text-center max-w-2xl mx-auto py-6">
        <span className="text-[10px] uppercase font-mono tracking-widest text-blue-500 font-bold block">Trade Desk Intelligence Room</span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
          International Sourcing Forecasts & Manuals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          Read daily publications curated by customs legal counsel, logistics specialists, and supply chain directors. Complete guidelines for bulk item compliance.
        </p>
      </section>

      {/* Tags Filters tabs */}
      <section className="flex flex-wrap gap-2 pb-2 border-b border-slate-100 dark:border-slate-805">
        {tagsList.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 bg-slate-55 bg-slate-50 text-slate-600 rounded-full text-[11px] font-bold cursor-pointer hover:bg-slate-100 transition-all ${
              selectedTag === tag ? 'bg-blue-600 text-white hover:bg-blue-600' : 'dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* Main Blog grid or Detail active focus post */}
      {activeBlog ? (
        <article className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 md:p-8 dark:bg-slate-905 dark:bg-slate-900 dark:border-slate-800 space-y-6 relative shadow-sm">
          <button 
            onClick={() => setActiveBlog(null)}
            className="text-xs font-semibold text-blue-600 hover:underline mb-4 block"
          >
            ◀ Back to Intel Lists
          </button>

          <img src={activeBlog.image} alt={activeBlog.title} className="w-full aspect-video rounded-xl object-cover bg-slate-100" />
          
          <div className="flex flex-wrap gap-2 items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center"><User className="h-3 w-3 mr-1" /> {activeBlog.author}</span>•
            <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {activeBlog.date}</span>•
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 dark:bg-slate-800 dark:text-blue-300 font-bold uppercase">{activeBlog.category}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{activeBlog.title}</h2>
          
          {/* Main Content paragraphs with safe render formatting */}
          <div className="text-xs text-slate-655 text-slate-650 dark:text-slate-300 space-y-4 leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800 pt-6">
            {activeBlog.content}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-850 pt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {activeBlog.tags.map((tg, i) => (
                <span key={i} className="text-[9px] font-semibold bg-slate-50 dark:bg-slate-950 p-1 px-2 text-slate-500 rounded font-mono">#{tg}</span>
              ))}
            </div>

            {/* Social Share mock panels */}
            <div className="flex space-x-2 text-slate-400">
              <button onClick={() => handleShare(activeBlog.title)} className="p-1 px-2 border border-slate-200 dark:border-slate-800 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded font-mono text-[9px] cursor-pointer inline-flex items-center space-x-1">
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </article>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBlogs.map((b) => (
            <div 
              key={b.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden dark:border-slate-850 dark:bg-slate-900 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-video relative bg-slate-100 dark:bg-slate-950">
                <img referrerPolicy="no-referrer" src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-slate-950/80 text-white font-mono text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {b.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-medium text-slate-400">{b.date} • {b.author.split(',')[0]}</span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">{b.title}</h3>
                  <p className="text-[11px] text-slate-550 text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">{b.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <button 
                    onClick={() => setActiveBlog(b)}
                    className="text-[10px] font-extrabold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <span>Read Intel Report</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                  <button onClick={() => handleShare(b.title)} className="text-slate-400 hover:text-slate-950 dark:hover:text-white" title="Quick Share">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
