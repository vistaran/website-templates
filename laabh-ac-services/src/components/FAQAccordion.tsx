'use client';

import { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { getWhatsAppVendorUrl } from '@/lib/config';
import StructuredData from './StructuredData';
import { getFAQSchema } from '@/lib/seo';

export interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
  showSearch?: boolean;
  includeSchema?: boolean;
}

export default function FAQAccordion({
  items,
  title,
  subtitle,
  showCategories = true,
  showSearch = true,
  includeSchema = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract categories
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[]];

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {includeSchema && <StructuredData data={getFAQSchema(items)} />}

      {(title || subtitle) && (
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          {title && (
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ color: 'var(--color-slate-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Search and Category Filters */}
      {(showSearch || (showCategories && categories.length > 2)) && (
        <div style={{ maxWidth: '820px', margin: '0 auto 2.5rem' }}>
          {showSearch && (
            <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-slate-400)',
                }}
              />
              <input
                type="text"
                placeholder="Search AC questions (e.g., gas refilling, jet service cost, cooling issues)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '46px',
                  borderRadius: 'var(--radius-full)',
                  height: '52px',
                  fontSize: '0.975rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              />
            </div>
          )}

          {showCategories && categories.length > 2 && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1.15rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 150ms ease',
                    background: selectedCategory === cat ? 'var(--color-primary)' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : 'var(--color-slate-600)',
                    border: selectedCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-slate-200)',
                    boxShadow: selectedCategory === cat ? '0 4px 10px rgba(2, 132, 199, 0.3)' : 'var(--shadow-sm)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion List */}
      <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-slate-200)',
            }}
          >
            <HelpCircle size={36} style={{ color: 'var(--color-slate-400)', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No answers matched your search</h3>
            <p style={{ color: 'var(--color-slate-600)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Have an urgent or specific query? Our senior HVAC technicians are ready to answer directly on WhatsApp.
            </p>
            <a
              href={getWhatsAppVendorUrl(`Hello Labh AC Services, I have a question: ${searchQuery}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={16} /> Ask Technicians on WhatsApp
            </a>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1.5px solid var(--color-primary-light)' : '1px solid var(--color-slate-200)',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  transition: 'all 200ms ease',
                }}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: isOpen ? 'var(--color-slate-50)' : 'transparent',
                    transition: 'background 150ms ease',
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: isOpen ? 'var(--color-primary-dark)' : 'var(--color-navy)',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-slate-400)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '1.25rem 1.5rem 1.5rem',
                      color: 'var(--color-slate-600)',
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid var(--color-slate-100)',
                      background: '#ffffff',
                    }}
                  >
                    <p style={{ whiteSpace: 'pre-line' }}>{item.a}</p>
                    {item.category && (
                      <div style={{ marginTop: '1rem' }}>
                        <span
                          className="badge badge-ice"
                          style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}
                        >
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Assistance Callout */}
      <div
        style={{
          marginTop: '3.5rem',
          maxWidth: '820px',
          margin: '3.5rem auto 0',
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h4 style={{ fontSize: '1.2rem', color: 'var(--color-navy)', marginBottom: '0.35rem' }}>
            Still have questions about your AC?
          </h4>
          <p style={{ color: 'var(--color-slate-600)', fontSize: '0.9rem' }}>
            Get honest technical guidance and upfront price quotes directly from our verified master technicians.
          </p>
        </div>
        <a
          href={getWhatsAppVendorUrl('Hello Labh AC Services, I have a specific question about my AC.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
          style={{ padding: '0.75rem 1.5rem' }}
        >
          <MessageSquare size={16} /> Chat on WhatsApp <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
