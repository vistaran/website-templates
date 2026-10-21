import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';
import { getBreadcrumbSchema } from '@/lib/seo';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href || '/',
  }));

  return (
    <>
      <StructuredData data={getBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
        <ol
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.4rem',
            listStyle: 'none',
            fontSize: '0.85rem',
            color: '#94a3b8',
          }}
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {index > 0 && <ChevronRight size={14} style={{ color: '#64748b' }} />}
                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    style={{
                      color: '#ffffff',
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    style={{
                      color: '#cbd5e1',
                      transition: 'color 150ms ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                    className="breadcrumb-link"
                  >
                    {index === 0 && <Home size={13} style={{ marginBottom: '1px' }} />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
