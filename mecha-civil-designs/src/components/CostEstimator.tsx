import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { EstimationInputs } from '../types';

interface CostEstimatorProps {
  onApplyToBooking: (estimateSummary: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyToBooking }) => {
  const [config, setConfig] = useState<EstimationInputs>({
    propertyType: '3bhk',
    carpetAreaSqFt: 1850,
    tier: 'luxury',
    includeCivilMasonry: true,
    includeFalseCeiling: true,
    includeModularKitchen: true,
    includeCustomMillwork: true,
    includeElectricalLighting: true,
    includeSurfaceStucco: true,
    includeLooseFurniture: false,
    includeSmartAutomation: false
  });

  // Base rates per sq.ft based on tier
  const tierRates = {
    signature: { baseRate: 1450, label: 'Contemporary Minimalist', desc: 'BWP Marine ply, matte acrylic laminate, modular fittings & ambient linear LED.' },
    luxury: { baseRate: 2150, label: 'Refined Luxury', desc: 'Natural teak veneer, Italian marble polishing, fluted panels, automated profile channels.' },
    bespoke: { baseRate: 3100, label: 'Haute Architectural Luxe', desc: 'Imported bookmatched marble, custom brass trim, acoustic baffles, full civil alterations.' }
  };

  const propertyDefaults: Record<string, number> = {
    '1bhk': 750,
    '2bhk': 1250,
    '3bhk': 1850,
    '4bhk': 2600,
    'penthouse-villa': 4200,
    'commercial-office': 3500,
    'retail-store': 1600
  };

  const handlePropertyChange = (pType: EstimationInputs['propertyType']) => {
    setConfig((prev) => ({
      ...prev,
      propertyType: pType,
      carpetAreaSqFt: propertyDefaults[pType] || prev.carpetAreaSqFt
    }));
  };

  // Calculations
  const calculatedEstimate = useMemo(() => {
    const basePerSqFt = tierRates[config.tier].baseRate;
    let multiplier = 1.0;

    // Adjust multipliers based on selected inclusions
    if (!config.includeCivilMasonry) multiplier -= 0.12;
    if (!config.includeFalseCeiling) multiplier -= 0.08;
    if (!config.includeModularKitchen) multiplier -= 0.14;
    if (!config.includeCustomMillwork) multiplier -= 0.18;
    if (!config.includeElectricalLighting) multiplier -= 0.08;
    if (!config.includeSurfaceStucco) multiplier -= 0.05;
    if (config.includeLooseFurniture) multiplier += 0.22;
    if (config.includeSmartAutomation) multiplier += 0.14;

    const effectiveRate = Math.round(basePerSqFt * Math.max(multiplier, 0.4));
    const totalCost = effectiveRate * config.carpetAreaSqFt;

    // Itemized breakdown estimates
    const civilCost = Math.round(totalCost * 0.18);
    const carpentryCost = Math.round(totalCost * 0.42);
    const electricalCost = Math.round(totalCost * 0.14);
    const ceilingPaintingCost = Math.round(totalCost * 0.12);
    const fixturesMiscCost = totalCost - (civilCost + carpentryCost + electricalCost + ceilingPaintingCost);

    const timelineWeeks = Math.max(6, Math.round(config.carpetAreaSqFt / 300));

    return {
      effectiveRate,
      totalCost,
      civilCost,
      carpentryCost,
      electricalCost,
      ceilingPaintingCost,
      fixturesMiscCost,
      timelineWeeks
    };
  }, [config]);

  const formatLakhs = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  };

  const handleTransfer = () => {
    const summary = `${tierRates[config.tier].label} estimate for ${config.propertyType.toUpperCase()} (${config.carpetAreaSqFt} sq.ft): Total ~${formatLakhs(calculatedEstimate.totalCost)}`;
    onApplyToBooking(summary);
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 border-b border-[#E7E0D5] bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8A6739] mb-2">
            Budget Transparency · Ahmedabad
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            Interior Budget & Materiality Estimator
          </h2>
          <p className="text-sm sm:text-base text-[#59524A] mt-2 font-light leading-relaxed">
            Honest architectural pricing engineered without hidden subcontractor markups. Adjust floor area and material tiers for instant turnkey figures in Ahmedabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Property Type Grid */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] space-y-4 shadow-xs">
              <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
                1. Space Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: '2bhk', label: '2BHK Apartment' },
                  { id: '3bhk', label: '3BHK Apartment' },
                  { id: '4bhk', label: '4BHK Apartment' },
                  { id: 'penthouse-villa', label: 'Villa / Penthouse' },
                  { id: 'commercial-office', label: 'Corporate Office' },
                  { id: 'retail-store', label: 'Retail / Boutique' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePropertyChange(item.id as EstimationInputs['propertyType'])}
                    className={`px-4 py-2.5 text-xs rounded-xl border text-center transition-all cursor-pointer ${
                      config.propertyType === item.id
                        ? 'border-[#24201D] bg-[#24201D] text-[#FAF8F5] font-medium shadow-xs'
                        : 'border-[#DED6C9] bg-[#FAF8F5] text-[#59524A] hover:border-[#C5B8A5]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Carpet Area Slider */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#736A5E] font-light">Carpet Area:</span>
                  <span className="text-[#8A6739] font-serif text-lg font-medium tabular-nums">
                    {config.carpetAreaSqFt.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="8000"
                  step="50"
                  value={config.carpetAreaSqFt}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, carpetAreaSqFt: Number(e.target.value) }))
                  }
                  className="w-full accent-[#8A6739] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A3998C] mt-1 font-mono">
                  <span>600 sq.ft</span>
                  <span>2,500 sq.ft</span>
                  <span>5,000 sq.ft</span>
                  <span>8,000+ sq.ft</span>
                </div>
              </div>
            </div>

            {/* Quality Finish Tier */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] space-y-4 shadow-xs">
              <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
                2. Select Specification & Finish Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['signature', 'luxury', 'bespoke'] as const).map((tierKey) => {
                  const t = tierRates[tierKey];
                  const isActive = config.tier === tierKey;
                  return (
                    <div
                      key={tierKey}
                      onClick={() => setConfig((prev) => ({ ...prev, tier: tierKey }))}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isActive
                          ? 'border-[#8A6739] bg-[#F5EFE6] text-[#1C1917]'
                          : 'border-[#E7E0D5] bg-[#FAF8F5] text-[#59524A] hover:border-[#DED6C9]'
                      }`}
                    >
                      <div>
                        <div className="font-serif text-base font-semibold text-[#1C1917] mb-1">{t.label}</div>
                        <div className="text-[#8A6739] font-mono text-sm font-semibold mb-2">
                          ~₹{t.baseRate} <span className="text-[10px] text-[#8C8275]">/ sq.ft</span>
                        </div>
                        <p className="text-[11px] text-[#736A5E] leading-relaxed font-light">{t.desc}</p>
                      </div>
                      {isActive && (
                        <div className="mt-3 text-[10px] font-mono text-[#8A6739] flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Selected Tier</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Turnkey Scope Checkboxes */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] space-y-4 shadow-xs">
              <label className="block text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
                3. Scope of Execution & Inclusions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'includeCivilMasonry', label: 'Civil Alterations & Demolition', note: 'Wall knockdowns & lintels' },
                  { key: 'includeFalseCeiling', label: 'False Ceiling & Cove Profile Lights', note: 'Gyproc boards & LED channels' },
                  { key: 'includeModularKitchen', label: 'Modular Kitchen & Quartz Island', note: 'Blum soft-close & tandem boxes' },
                  { key: 'includeCustomMillwork', label: 'Wardrobes & Architectural Panelling', note: 'BWP ply & natural veneer' },
                  { key: 'includeElectricalLighting', label: 'Concealed Wiring & Switchgear', note: 'Finolex / Schneider Electric' },
                  { key: 'includeSurfaceStucco', label: 'Venetian Stucco & Royal Paint', note: '4-coat durable breathable coats' },
                  { key: 'includeLooseFurniture', label: 'Curated Designer Loose Sofas & Dining', note: 'Custom upholstered seating' },
                  { key: 'includeSmartAutomation', label: 'Smart Lighting & Motorized Curtains', note: 'Touch panel & app controls' }
                ].map((item) => {
                  const isChecked = config[item.key as keyof EstimationInputs] as boolean;
                  return (
                    <div
                      key={item.key}
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          [item.key]: !isChecked
                        }))
                      }
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'border-[#C5B8A5] bg-[#F5EFE6] text-[#1C1917]'
                          : 'border-[#E7E0D5] bg-[#FAF8F5] text-[#8C8275] hover:border-[#DED6C9]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 accent-[#8A6739] cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-medium">{item.label}</div>
                        <div className="text-[10px] text-[#736A5E] font-light">{item.note}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Estimate Result Summary Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E7E0D5] shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D5]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#8A6739]" />
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#8A6739]">
                    Estimated Investment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#8A6739] bg-[#F5EFE6] px-2.5 py-0.5 rounded-full border border-[#DED6C9]">
                  Ahmedabad Standard
                </span>
              </div>

              {/* Total Figure */}
              <div>
                <div className="text-xs text-[#736A5E] font-light">Turnkey Projected Total:</div>
                <div className="font-serif text-4xl sm:text-5xl font-light text-[#1C1917] tabular-nums tracking-tight mt-1">
                  {formatLakhs(calculatedEstimate.totalCost)}
                </div>
                <div className="text-xs text-[#736A5E] mt-1.5 flex items-center gap-2 font-mono text-[11px]">
                  <span>~₹{calculatedEstimate.effectiveRate.toLocaleString()} / sq.ft</span>
                  <span aria-hidden="true" className="text-[#C5B8A5]">·</span>
                  <span>{config.carpetAreaSqFt.toLocaleString()} sq.ft</span>
                </div>
              </div>

              {/* Itemized breakdown table */}
              <div className="space-y-2.5 pt-2 border-t border-[#E7E0D5] text-xs">
                <div className="flex justify-between py-1 text-[#59524A]">
                  <span>Carpentry, Millwork & Veneer</span>
                  <span className="font-serif text-sm font-medium text-[#1C1917] tabular-nums">{formatLakhs(calculatedEstimate.carpentryCost)}</span>
                </div>
                <div className="flex justify-between py-1 text-[#59524A]">
                  <span>Civil Structural & Masonry</span>
                  <span className="font-serif text-sm font-medium text-[#1C1917] tabular-nums">{formatLakhs(calculatedEstimate.civilCost)}</span>
                </div>
                <div className="flex justify-between py-1 text-[#59524A]">
                  <span>Electrical, Conduits & Lighting</span>
                  <span className="font-serif text-sm font-medium text-[#1C1917] tabular-nums">{formatLakhs(calculatedEstimate.electricalCost)}</span>
                </div>
                <div className="flex justify-between py-1 text-[#59524A]">
                  <span>False Ceiling & Surface Stucco</span>
                  <span className="font-serif text-sm font-medium text-[#1C1917] tabular-nums">{formatLakhs(calculatedEstimate.ceilingPaintingCost)}</span>
                </div>
                <div className="flex justify-between py-1 text-[#59524A]">
                  <span>Hardware, Sanware & Fit-out Misc</span>
                  <span className="font-serif text-sm font-medium text-[#1C1917] tabular-nums">{formatLakhs(calculatedEstimate.fixturesMiscCost)}</span>
                </div>
              </div>

              {/* Projected Handover Timeline */}
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E7E0D5] flex items-center justify-between text-xs">
                <span className="text-[#736A5E]">Projected Handover Timeline:</span>
                <span className="font-serif text-base font-medium text-[#1C1917]">
                  ~{calculatedEstimate.timelineWeeks} Weeks ({Math.round(calculatedEstimate.timelineWeeks * 7)} Days)
                </span>
              </div>

              {/* Transparency Notice */}
              <div className="text-[11px] text-[#736A5E] flex items-start gap-2.5 leading-relaxed font-light">
                <ShieldCheck className="w-4 h-4 text-[#8A6739] shrink-0 mt-0.5" />
                <span>
                  All estimates include 10-year structural civil warranty, termite protection, and on-site supervisor oversight at Chandkheda / Ahmedabad sites.
                </span>
              </div>

              {/* Direct Booking Action */}
              <button
                onClick={handleTransfer}
                className="w-full py-3.5 px-4 rounded-full bg-[#24201D] hover:bg-[#3D3732] text-[#FAF8F5] font-medium text-xs sm:text-[13px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#24201D]/10 active:scale-95"
              >
                <span>Book Consultation With This Estimate</span>
                <ArrowRight className="w-4 h-4 text-[#CBB38D]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
