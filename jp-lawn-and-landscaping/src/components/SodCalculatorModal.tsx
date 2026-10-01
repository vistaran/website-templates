import React, { useState } from 'react';
import { X, Calculator, Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';

interface SodCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToQuote: (details: { materialType: string; sqft: number; quantity: string; costEstimate: string }) => void;
}

export const SodCalculatorModal: React.FC<SodCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyToQuote,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'sod' | 'mulch'>('sod');

  // Dimension inputs
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(30);
  const [directSqFt, setDirectSqFt] = useState<number>(1500);
  const [useDimensions, setUseDimensions] = useState<boolean>(true);
  const [includeWaste, setIncludeWaste] = useState<boolean>(true);

  // Sod settings
  const [sodVariety, setSodVariety] = useState<string>('Tall Fescue');

  // Mulch settings
  const [mulchDepth, setMulchDepth] = useState<number>(3); // inches
  const [mulchType, setMulchType] = useState<string>('Triple Shredded Brown Mulch');

  // Computations
  const rawSqFt = useDimensions ? length * width : directSqFt;
  const effectiveSqFt = includeWaste ? Math.round(rawSqFt * 1.1) : rawSqFt;

  // Sod metrics (Standard NC sod pallet = 450-500 sq.ft, rolls ~ 10 sq.ft each)
  const sodPallets = Math.ceil(effectiveSqFt / 450);
  const sodRolls = Math.ceil(effectiveSqFt / 10);
  
  // Cost estimates ($1.20 - $1.65/sqft fully prepped & installed depending on turf)
  let sodRatePerSqFt = 1.35;
  if (sodVariety === 'Zoysia') sodRatePerSqFt = 1.70;
  if (sodVariety === 'Bermuda') sodRatePerSqFt = 1.25;
  const estimatedSodCostMin = Math.round(effectiveSqFt * (sodRatePerSqFt * 0.95));
  const estimatedSodCostMax = Math.round(effectiveSqFt * (sodRatePerSqFt * 1.15));

  // Mulch metrics (1 cubic yard covers ~108 sq.ft at 3 inches, or (SqFt * DepthInches) / 324)
  const cubicYards = Math.max(1, Math.round(((effectiveSqFt * mulchDepth) / 324) * 10) / 10);
  const pineStrawBales = Math.ceil(effectiveSqFt / 45); // ~40-50 sqft per bale

  let mulchCostEstimate = `$${Math.round(cubicYards * 75)} – $${Math.round(cubicYards * 95)} installed`;
  if (mulchType.includes('Pine Straw')) {
    mulchCostEstimate = `$${Math.round(pineStrawBales * 9)} – $${Math.round(pineStrawBales * 12)} installed (${pineStrawBales} bales)`;
  }

  const handleApply = () => {
    if (activeTab === 'sod') {
      onApplyToQuote({
        materialType: `${sodVariety} Sod`,
        sqft: effectiveSqFt,
        quantity: `${sodPallets} Pallets (${effectiveSqFt} sq.ft)`,
        costEstimate: `$${estimatedSodCostMin.toLocaleString()} – $${estimatedSodCostMax.toLocaleString()}`,
      });
    } else {
      onApplyToQuote({
        materialType: mulchType,
        sqft: effectiveSqFt,
        quantity: mulchType.includes('Pine Straw') ? `${pineStrawBales} Bales` : `${cubicYards} Cubic Yards`,
        costEstimate: mulchCostEstimate,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white p-6 relative flex justify-between items-start">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Project Material & Cost Estimator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Sod & Mulch Quantity Calculator
            </h3>
            <p className="text-xs text-stone-300">
              Tailored for Kannapolis & Concord NC yards with realistic local material & installation rates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200 flex gap-3">
          <button
            onClick={() => setActiveTab('sod')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'sod'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🌱 Sod Installation
          </button>
          <button
            onClick={() => setActiveTab('mulch')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'mulch'
                ? 'bg-emerald-700 text-white shadow'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            🍂 Mulch & Pine Straw
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Measurement Mode */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Yard Measurements
              </label>
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setUseDimensions(true)}
                  className={`font-semibold cursor-pointer ${useDimensions ? 'text-emerald-700 underline underline-offset-4' : 'text-stone-500'}`}
                >
                  Length × Width
                </button>
                <span className="text-stone-300">|</span>
                <button
                  type="button"
                  onClick={() => setUseDimensions(false)}
                  className={`font-semibold cursor-pointer ${!useDimensions ? 'text-emerald-700 underline underline-offset-4' : 'text-stone-500'}`}
                >
                  Total Sq. Ft
                </button>
              </div>
            </div>

            {useDimensions ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">
                    Length (feet)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={length || ''}
                    onChange={(e) => setLength(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">
                    Width (feet)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={width || ''}
                    onChange={(e) => setWidth(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs text-stone-600 font-medium mb-1">
                  Total Lawn / Bed Area (sq. ft)
                </label>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  value={directSqFt || ''}
                  onChange={(e) => setDirectSqFt(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                />
              </div>
            )}

            {/* Waste Buffer Checkbox */}
            <label className="flex items-center gap-2 pt-1 text-xs text-stone-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeWaste}
                onChange={(e) => setIncludeWaste(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
              />
              <span>Add 10% recommended buffer for cutting curves, edges & wastage</span>
            </label>
          </div>

          {/* Tab-Specific Options */}
          {activeTab === 'sod' ? (
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Select Turfgrass Variety
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Tall Fescue', desc: 'Cool-season, stays green all winter, shade tolerant' },
                  { name: 'Bermuda', desc: 'Warm-season, thrives in NC sun, tough & fast healing' },
                  { name: 'Zoysia', desc: 'Dense luxury carpet, weed resistant, low mowing' },
                ].map((turf) => (
                  <button
                    key={turf.name}
                    type="button"
                    onClick={() => setSodVariety(turf.name)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      sodVariety === turf.name
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="text-sm font-bold">{turf.name}</div>
                    <div className="text-xs text-stone-500 mt-1 leading-snug font-normal">{turf.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Mulch / Groundcover
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Triple Shredded Brown Mulch',
                    'Premium Black Designer Mulch',
                    'NC Longleaf Pine Straw (Bales)',
                    'Decorative River Rock (Stone)',
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setMulchType(type)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer font-semibold ${
                        mulchType === type
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {!mulchType.includes('Pine Straw') && (
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">
                    Desired Depth: <strong>{mulchDepth} inches</strong> (3" recommended for weed control)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={mulchDepth}
                    onChange={(e) => setMulchDepth(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>1 inch (Top-dress)</span>
                    <span>3 inches (Recommended)</span>
                    <span>5 inches (Heavy suppress)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Summary Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 text-white border border-stone-800 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-medium text-stone-400">Total Effective Area:</span>
              <span className="text-base font-extrabold text-emerald-400">
                {effectiveSqFt.toLocaleString()} sq. ft
              </span>
            </div>

            {activeTab === 'sod' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="text-xl sm:text-2xl font-black text-white">{sodPallets}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 font-medium">Pallets Needed</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="text-xl sm:text-2xl font-black text-white">{sodRolls}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5 font-medium">Sod Rolls (~10 sqft)</div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-emerald-950 border border-emerald-700">
                  <div className="text-base sm:text-lg font-black text-emerald-300">
                    ${estimatedSodCostMin.toLocaleString()} – ${estimatedSodCostMax.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5 font-medium">Installed Estimate</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {mulchType.includes('Pine Straw') ? `${pineStrawBales} Bales` : `${cubicYards} Cu. Yds`}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5 font-medium">Material Required</div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-700">
                  <div className="text-base sm:text-lg font-black text-emerald-300">
                    {mulchCostEstimate}
                  </div>
                  <div className="text-[11px] text-emerald-200 mt-0.5 font-medium">Installed Estimate</div>
                </div>
              </div>
            )}

            <p className="text-[11px] text-stone-400 italic">
              *Estimates include full site grading, soil prep, and installation. Final pricing confirmed during free on-site visit in Kannapolis/Concord.
            </p>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-semibold text-sm hover:bg-stone-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Pre-fill Free Estimate with this Calculation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
