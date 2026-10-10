import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPosts(data.data);
        }
      })
      .catch(err => console.error('Error fetching blog posts:', err))
      .finally(() => setLoading(false));
  }, []);

  const openFullPost = async (slug) => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();
      if (data.success) {
        setActivePost(data.data);
      }
    } catch (e) {
      console.error('Error loading article:', e);
    }
  };

  return (
    <section id="blog-section" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a24a]/15 text-[#c9a24a] text-xs font-bold uppercase tracking-wider border border-[#c9a24a]/30 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Design Journal & Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading uppercase">
            ZOLA FURNITURE BLOG
          </h2>
          <p className="text-xs sm:text-sm text-[#a69c8f] mt-1">
            Expert woodcraft guides, material care advice, and interior design trends in Ethiopia
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="luxury-card overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Cover Image */}
              <div 
                onClick={() => openFullPost(post.slug)}
                className="h-56 bg-[#1a1512] relative overflow-hidden cursor-pointer"
              >
                <img
                  src={post.cover_image || '/images/08-zola-blue-velvet-sofa-set.png'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1613] via-transparent to-transparent" />
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#9e9081] mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#c9a24a]" /> {post.author || 'Zola Team'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c9a24a]" /> 2026 Edition
                    </span>
                  </div>

                  <h3 
                    onClick={() => openFullPost(post.slug)}
                    className="text-base sm:text-lg font-bold text-white group-hover:text-[#c9a24a] transition-colors cursor-pointer font-heading leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#b8ad9e] mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#3a2e24]">
                  <button
                    onClick={() => openFullPost(post.slug)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#c9a24a] group-hover:text-[#e0b85a] uppercase tracking-wider"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-[32px] luxury-card p-6 sm:p-8 border border-[#c9a24a]/30">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#1e1915] text-[#a69c8f] hover:text-white border border-[#44382f] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] text-[#c9a24a] font-bold uppercase tracking-wider">
                Published by {activePost.author}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 uppercase">
                {activePost.title}
              </h2>
            </div>

            <div className="h-60 rounded-2xl overflow-hidden mb-6 bg-[#181310]">
              <img
                src={activePost.cover_image || '/images/08-zola-blue-velvet-sofa-set.png'}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs sm:text-sm text-[#cfc7bc] leading-relaxed whitespace-pre-line space-y-3 max-h-96 overflow-y-auto pr-2">
              {activePost.body}
            </div>

            <div className="mt-6 pt-4 border-t border-[#3b3026] text-right">
              <button
                onClick={() => setActivePost(null)}
                className="gold-btn px-6 py-2.5 rounded-2xl text-xs font-bold uppercase"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
