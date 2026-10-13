import React, { useState } from 'react';
import { INTEGRATION_SPECS, SUPABASE_SQL_SCHEMA } from '../../services/integrationStatus';
import { X, Database, CreditCard, Mail, Check, Copy } from 'lucide-react';

interface IntegrationsModalProps {
  onClose: () => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({ onClose }) => {
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#E8E0D5] max-w-3xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7A8069] hover:text-[#262622] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#E8E0D5] pb-4 pr-10">
          <span className="text-xs uppercase tracking-widest text-[#7A8069] font-medium block">
            System Architecture & Production Setup
          </span>
          <h2 className="font-serif text-2xl text-[#262622]">
            Database, Payments & Notifications Integration
          </h2>
          <p className="text-xs text-[#66665E] mt-1 leading-relaxed">
            This studio website includes a complete, functioning simulation layer with localStorage persistence and strict business logic. Below are the production setup specifications for connecting Supabase PostgreSQL, Stripe, and transactional email.
          </p>
        </div>

        {/* Integration Specs */}
        <div className="space-y-6 text-xs text-[#262622]">
          {INTEGRATION_SPECS.map((spec, i) => (
            <div key={i} className="border border-[#E8E0D5] p-5 bg-[#F7F5F0] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E0D5] pb-2">
                <div className="flex items-center gap-2 font-medium text-sm text-[#262622]">
                  {spec.service.includes('Supabase') && <Database className="w-4 h-4 text-[#7A8069]" />}
                  {spec.service.includes('Stripe') && <CreditCard className="w-4 h-4 text-[#7A8069]" />}
                  {spec.service.includes('Email') && <Mail className="w-4 h-4 text-[#7A8069]" />}
                  <span>{spec.service}</span>
                </div>

                <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-[#EAE8E2] border border-[#D5D0C5] text-[#55554E] self-start sm:self-auto">
                  {spec.status}
                </span>
              </div>

              <p className="text-xs text-[#55554E] leading-relaxed">
                {spec.description}
              </p>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-semibold block mb-1">
                  Required Production Steps:
                </span>
                <ul className="space-y-1 text-[11px] text-[#66665E]">
                  {spec.setupInstructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#7A8069]">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {spec.sqlSchema && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A8069] font-semibold">
                      SQL Migration Script:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="px-2 py-0.5 text-[10px] border border-[#262622] hover:bg-[#262622] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-[#262622] text-[#E8E0D5] text-[10px] font-mono overflow-x-auto max-h-40 border border-[#3D3D36]">
                    {spec.sqlSchema.trim()}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-[#E8E0D5] pt-4 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs uppercase tracking-wider bg-[#262622] text-white hover:bg-[#3D3D36] cursor-pointer"
          >
            Close Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
