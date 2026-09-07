import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { Sparkles, Clock, User, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const { blogPosts } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Skincare Rituals', 'Hair Couture', 'Bridal & Glamour'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-12 sm:py-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.25em] text-[#D4A373] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
            L'AURA Journal & Editorial
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-normal">
            The Art of Mindful Beauty
          </h1>
          <p className="text-xs sm:text-sm text-[#8C827A] mt-3">
            Dermatological insights, botanical chemistry, and seasonal hair rituals from our salon directors.
          </p>

          {/* Category Tabs */}
          <div className="flex gap-2 justify-center mt-8 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedCategory === c
                    ? 'bg-[#1A1A1A] text-white shadow-md'
                    : 'bg-white border border-[#E5DDD5] text-[#1A1A1A] hover:border-[#D4A373]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post Hero */}
        {filteredPosts.length > 0 && (
          <div
            onClick={() => setSelectedPost(filteredPosts[0])}
            className="bg-white rounded-2xl border border-[#E5DDD5] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 h-72 lg:h-auto relative overflow-hidden">
              <img
                src={filteredPosts[0].image}
                alt={filteredPosts[0].title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#1A1A1A] text-[#D4A373] text-xs font-bold rounded-full uppercase">
                Featured Editorial
              </span>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                  {filteredPosts[0].category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-normal mt-2 leading-snug">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C554E] mt-3 leading-relaxed font-light">
                  {filteredPosts[0].excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DDD5] flex items-center justify-between text-xs text-[#8C827A]">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1A1A1A]">{filteredPosts[0].author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {filteredPosts[0].readTime}
                  </span>
                </div>

                <span className="text-[#D4A373] font-bold flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Other Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-[#E5DDD5] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[#D4A373] text-[10px] font-bold uppercase rounded-full border border-[#E5DDD5]">
                  {post.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl text-[#1A1A1A] font-normal group-hover:text-[#D4A373] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5C554E] mt-2 font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DDD5] flex items-center justify-between text-[11px] text-[#8C827A]">
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4A373]" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E5DDD5] relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-72 w-full relative">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#D4A373]">
                  {selectedPost.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-[#8C827A] pb-4 border-b border-[#E5DDD5]">
                <span>By <strong>{selectedPost.author}</strong> • {selectedPost.publishedDate}</span>
                <span>{selectedPost.readTime}</span>
              </div>

              <div className="text-sm text-[#5C554E] leading-relaxed space-y-4 font-light">
                <p className="font-medium text-base text-[#1A1A1A]">{selectedPost.excerpt}</p>
                <p>
                  True skin and hair vitality are born from biocompatibility. When active botanical lipids mimic our natural sebum mantle, cellular absorption increases by up to 340% compared to standard synthetic carrier oils.
                </p>
                <p>
                  In our salon suites, treatments always commence with custom pH balancing and thermal hydro-vaporation. This gently loosens surface keratinocytes and prepares follicles to receive concentrated ceramides, peptides, and 24K colloidal gold suspensions.
                </p>
                <p>
                  To maintain these luminous results at home, we advise our patrons to adhere to gentle double-cleansing rituals and avoid harsh sulfated foaming agents that disrupt the acid mantle.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DDD5] flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-bold rounded-full uppercase tracking-wider hover:bg-[#D4A373] transition-colors"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
