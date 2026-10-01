import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Check, Info } from 'lucide-react';

interface SodCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToQuote: (details: {
    sqFt: number;
    materialType: string;
    palletsOrYards: number;
    estimatedCost: string;
  }) => void;
}

export const SodCalculatorModal: React.FC<SodCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyToQuote
}) => {
  const [calculatorMode, setCalculatorMode] = useState<'sod' | 'mulch'>('sod');
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(40);
  const [grassType, setGrassType] = useState<string>('fescue');
  const [mulchDepth, setMulchDepth] = useState<number>(3); // inches
  const [includeClayPrep, setIncludeClayPrep] = useState<boolean>(true);

  if (!isOpen) return null;

  const sqFt = length * width;

  // Sod calculation
  // 1 pallet of sod covers 450 sq ft
  // Add 10% waste for curves & perimeter cuts
  const wasteFactor = 1.10;
  const totalSqFtWithWaste = Math.round(sqFt * wasteFactor);
  const palletsNeeded = Math.ceil(totalSqFtWithWaste / 450);

  // Price calculations per sq ft based on turf type installed
  const turfPrices: Record<string, { min: number; max: number; label: string; sun: string }> = {
    fescue: { min: 1.10, max: 1.45, label: 'Tall Fescue Elite', sun: 'Sun & Partial Shade' },
    bermuda: { min: 1.15, max: 1.50, label: 'Tifway 419 Bermuda', sun: 'Full Sun (6+ hrs)' },
    zoysia: { min: 1.50, max: 1.95, label: 'Emerald Zoysia', sun: 'Sun to Moderate Shade' }
  };

  const selectedTurf = turfPrices[grassType] || turfPrices.fescue;
  const clayPrepAddon = includeClayPrep ? 0.20 : 0.0;
  const estimatedMinCost = Math.round(totalSqFtWithWaste * (selectedTurf.min + clayPrepAddon));
  const estimatedMaxCost = Math.round(totalSqFtWithWaste * (selectedTurf.max + clayPrepAddon));

  // Mulch calculation: (SqFt * depth in inches) / 324 = Cubic Yards
  const cubicYardsMulch = Math.ceil((sqFt * mulchDepth) / 324);
  const pineStrawBales = Math.ceil(sqFt / 45); // 1 bale covers ~40-50 sq ft

  const handleApply = () => {
    if (calculatorMode === 'sod') {
      onApplyToQuote({
        sqFt: totalSqFtWithWaste,
        materialType: `${selectedTurf.label} Sod (${palletsNeeded} Pallets)`,
        palletsOrYards: palletsNeeded,
        estimatedCost: `$${estimatedMinCost.toLocaleString()} – $${estimatedMaxCost.toLocaleString()}`
      });
    } else {
      onApplyToQuote({
        sqFt,
        materialType: `Double-Shredded Mulch (${cubicYardsMulch} Cu. Yards / ${pineStrawBales} Pine Straw Bales)`,
        palletsOrYards: cubicYardsMulch,
        estimatedCost: `$${(cubicYardsMulch * 85).toLocaleString()} installed`
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          aria-label="Close Calculator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-400 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#0c2317]">
              Carolina Yard Material Calculator
            </h3>
            <p className="text-xs text-neutral-500">
              Calibrated for Charlotte, NC residential lots & clay soil preparation
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-xl my-5">
          <button
            onClick={() => setCalculatorMode('sod')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              calculatorMode === 'sod'
                ? 'bg-white text-[#0c2317] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Lawn Sod & Turf Calculator
          </button>
          <button
            onClick={() => setCalculatorMode('mulch')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              calculatorMode === 'mulch'
                ? 'bg-white text-[#0c2317] shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Mulch & Pine Straw Calculator
          </button>
        </div>

        {/* Dimension Inputs */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Lawn Length (Feet)
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={length}
                onChange={(e) => setLength(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-800 font-semibold focus:ring-2 focus:ring-[#0c2317]/20 focus:border-[#0c2317]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Lawn Width (Feet)
              </label>
              <input
                type="number"
                min="10"
                max="500"
                value={width}
                onChange={(e) => setWidth(Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-neutral-800 font-semibold focus:ring-2 focus:ring-[#0c2317]/20 focus:border-[#0c2317]"
              />
            </div>
          </div>

          <div className="text-right text-xs text-neutral-500 font-medium">
            Calculated Surface Area: <span className="font-bold text-neutral-800 tabular-nums">{sqFt.toLocaleString()} sq ft</span>
          </div>

          {/* Sod Specific Options */}
          {calculatorMode === 'sod' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Select Carolina Grass Species
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fescue', name: 'Tall Fescue', sub: 'Year-Round Green' },
                    { id: 'bermuda', name: 'Tifway Bermuda', sub: 'Full Sun Heat' },
                    { id: 'zoysia', name: 'Emerald Zoysia', sub: 'Barefoot Luxury' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrassType(g.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        grassType === g.id
                          ? 'border-[#0c2317] bg-[#0c2317]/5 ring-1 ring-[#0c2317]'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-neutral-900">{g.name}</div>
                      <div className="text-[10px] text-neutral-500">{g.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Clay Soil Prep Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeClayPrep}
                  onChange={(e) => setIncludeClayPrep(e.target.checked)}
                  className="rounded text-emerald-800 focus:ring-emerald-700 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-neutral-900">Include Heavy Red Clay Soil Prep & Compost Tilling</span>
                  <p className="text-neutral-500 text-[11px]">Recommended in Charlotte to guarantee deep root establishment</p>
                </div>
              </label>
            </>
          )}

          {/* Mulch Specific Options */}
          {calculatorMode === 'mulch' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Mulch Depth (Inches)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMulchDepth(2)}
                  className={`p-3 rounded-xl border text-left ${mulchDepth === 2 ? 'border-[#0c2317] bg-[#0c2317]/5 ring-1 ring-[#0c2317]' : 'border-neutral-200'}`}
                >
                  <div className="font-bold text-xs">2 Inches</div>
                  <div className="text-[10px] text-neutral-500">Top dress refresh</div>
                </button>
                <button
                  type="button"
                  onClick={() => setMulchDepth(3)}
                  className={`p-3 rounded-xl border text-left ${mulchDepth === 3 ? 'border-[#0c2317] bg-[#0c2317]/5 ring-1 ring-[#0c2317]' : 'border-neutral-200'}`}
                >
                  <div className="font-bold text-xs">3 Inches (Standard)</div>
                  <div className="text-[10px] text-neutral-500">Full weed & heat barrier</div>
                </button>
              </div>
            </div>
          )}

          {/* Calculation Summary Box */}
          <div className="mt-6 p-5 rounded-2xl bg-[#0c2317] text-white space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-[#b0c4b7]">
                {calculatorMode === 'sod' ? 'Estimated Sod Required' : 'Estimated Material Required'}
              </span>
              <span className="font-display font-bold text-lg text-amber-400">
                {calculatorMode === 'sod' ? `${palletsNeeded} Pallets (${totalSqFtWithWaste.toLocaleString()} sq ft)` : `${cubicYardsMulch} Cu. Yards / ${pineStrawBales} Bales`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#b0c4b7]">
              <span>Estimated Installed Turnkey Range</span>
              <span className="font-bold text-white text-base">
                {calculatorMode === 'sod' 
                  ? `$${estimatedMinCost.toLocaleString()} – $${estimatedMaxCost.toLocaleString()}` 
                  : `$${(cubicYardsMulch * 85).toLocaleString()} installed`}
              </span>
            </div>

            <div className="text-[11px] text-[#8fa897] flex items-center gap-1.5 pt-1">
              <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span>Includes site grading, material delivery & clean perimeter installation</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-50"
            >
              Close
            </button>
            <button
              onClick={handleApply}
              className="flex-2 py-3 px-4 rounded-xl bg-[#0c2317] hover:bg-[#153c29] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transfer to Quote Form</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
