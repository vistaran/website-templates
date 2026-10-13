import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/initialData';
import { JournalArticle } from '../types/booking';
import { ArrowRight, X, Clock, Calendar, BookOpen } from 'lucide-react';

interface JournalPageProps {
  onNavigate: (page: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div className="py-20 lg:py-24 bg-[#F7F5F0] space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4 max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A8069] font-medium block">
          Editorial & Material Studies
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#262622]">
          The Design Journal
        </h1>
        <p className="text-base text-[#55554E] leading-relaxed font-light">
          Observations on spatial harmony, geological materiality, lighting nuances, and residential craftsmanship from the Trikha Interiors studio directors.
        </p>
      </section>

      {/* Featured Lead Article */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {JOURNAL_ARTICLES.length > 0 && (
          <div
            onClick={() => setSelectedArticle(JOURNAL_ARTICLES[0])}
            className="group bg-white border border-[#E8E0D5] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer hover:border-[#262622] transition-colors"
          >
            <div className="lg:col-span-7 aspect-16/10 overflow-hidden">
              <img
                src={JOURNAL_ARTICLES[0].coverImage}
                alt={JOURNAL_ARTICLES[0].title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#7A8069]">
                <span>{JOURNAL_ARTICLES[0].category}</span>
                <span aria-hidden="true">·</span>
                <span>{JOURNAL_ARTICLES[0].date}</span>
                <span aria-hidden="true">·</span>
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#262622] font-medium group-hover:text-[#7A8069] transition-colors">
                {JOURNAL_ARTICLES[0].title}
              </h2>

              <p className="text-xs text-[#55554E] leading-relaxed">
                {JOURNAL_ARTICLES[0].excerpt}
              </p>

              <div className="pt-2 text-xs text-[#7A8069]">
                <span>By {JOURNAL_ARTICLES[0].author} ({JOURNAL_ARTICLES[0].authorRole})</span>
              </div>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-widest text-[#262622] font-medium inline-flex items-center gap-1.5 border-b border-[#262622] pb-0.5 group-hover:text-[#7A8069] group-hover:border-[#7A8069]">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Grid of Remaining Articles */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white border border-[#E8E0D5] p-6 space-y-4 cursor-pointer hover:border-[#262622] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 overflow-hidden mb-4">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#7A8069] mb-1.5">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl text-[#262622] font-medium group-hover:text-[#7A8069] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-[#66665E] leading-relaxed mt-2">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E0D5] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#7A8069]">
                  {article.author}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#262622] font-medium inline-flex items-center gap-1 group-hover:text-[#7A8069]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8E0D5] max-w-3xl w-full p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 text-[#7A8069] hover:text-[#262622] cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="border-b border-[#E8E0D5] pb-6 space-y-2 pr-10">
              <div className="flex items-center gap-2 text-xs text-[#7A8069] uppercase tracking-wider">
                <span>{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#262622] leading-tight">
                {selectedArticle.title}
              </h2>
              <p className="text-xs text-[#7A8069]">
                By {selectedArticle.author} · {selectedArticle.authorRole}
              </p>
            </div>

            <div className="aspect-16/9 overflow-hidden">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[#44443E] leading-relaxed font-light">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-2">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-[#E8E0D5] pt-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider border border-[#262622]"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  setSelectedArticle(null);
                  onNavigate('book');
                }}
                className="px-6 py-2 text-xs uppercase tracking-wider bg-[#262622] text-white hover:bg-[#3D3D36]"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
