import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  X, 
  CheckCircle2, 
  Share2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  onContactAuthor: (topicTitle: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onContactAuthor
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const categories = ['All', 'Geophysics', 'Geotechnical', 'EIA & Environment', 'GIS & Digital Twins', 'Risk Mitigation'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.content.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <section id="insights" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20 mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Industry Insights & Technical Whitepapers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Space_Grotesk']">
              Ground Intelligence Knowledge Base
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl">
              Practical guides on subsurface risk mitigation, CPT versus SPT selection, statutory environmental compliance, and cloud GIS digital twins.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="blog-search-input"
              type="text"
              placeholder="Search insights & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00A3E8] transition-colors"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`blog-category-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#00A3E8] to-[#38bdf8] text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-post-card-${post.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#00A3E8]/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-100/50"
            >
              <div className="space-y-4">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#00A3E8]/10 text-[#007ea8] border border-[#00A3E8]/20">
                    {post.category}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#007ea8] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#00A3E8]/15 border border-[#00A3E8]/30 flex items-center justify-center text-[11px] font-bold text-[#007ea8]">
                    {post.author.avatarInitials}
                  </div>
                  <div className="leading-tight">
                    <span className="text-xs font-semibold text-slate-900 block">{post.author.name}</span>
                    <span className="text-[10px] text-slate-500">{post.publishDate}</span>
                  </div>
                </div>

                <button
                  id={`read-article-btn-${post.id}`}
                  onClick={() => setSelectedArticle(post)}
                  className="p-2 rounded-lg text-[#007ea8] hover:bg-[#00A3E8]/10 transition-colors flex items-center gap-1 text-xs font-bold"
                  aria-label={`Read ${post.title}`}
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div 
          id="article-reader-modal" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-8 my-8 animate-in fade-in zoom-in-95">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedArticle.publishDate}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk'] leading-tight mt-2">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                id="close-article-modal-btn"
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author Profile Header */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xs font-bold text-emerald-800">
                  {selectedArticle.author.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{selectedArticle.author.name}</h4>
                  <p className="text-[11px] text-emerald-700">{selectedArticle.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="share-article-btn"
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedUrl ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Executive Key Takeaways Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Key Engineering Takeaways
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Article Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Footer & Specialist Contact CTA */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                <span>Have questions regarding these findings for your site?</span>
              </div>
              <button
                id="article-discuss-cta-btn"
                onClick={() => {
                  onContactAuthor(selectedArticle.title);
                  setSelectedArticle(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#FF721F] to-[#F7BA1E] hover:from-[#ff8134] hover:to-[#f8c339] shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss with Our Technical Desk</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
