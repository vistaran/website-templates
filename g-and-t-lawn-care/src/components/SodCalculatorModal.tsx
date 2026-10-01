import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Scissors, Leaf, Check } from 'lucide-react';

interface SodCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (service: string, details: string) => void;
}

export const SodCalculatorModal: React.FC<SodCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyEstimate,
}) => {
  const [calcType, setCalcType] = useState<'mowing' | 'mulch'>('mowing');

  // Mowing inputs
  const [yardLength, setYardLength] = useState<string>('80');
  const [yardWidth, setYardWidth] = useState<string>('60');
  const [mowFrequency, setMowFrequency] = useState<string>('Weekly Mowing (Recommended)');

  // Mulch inputs
  const [mulchAreaSqFt, setMulchAreaSqFt] = useState<string>('400');
  const [mulchDepthInches, setMulchDepthInches] = useState<string>('3');
  const [mulchMaterial, setMulchMaterial] = useState<string>('Dark Hardwood Mulch');

  if (!isOpen) return null;

  // Mowing calculations
  const lengthNum = parseFloat(yardLength) || 0;
  const widthNum = parseFloat(yardWidth) || 0;
  const totalYardSqFt = Math.round(lengthNum * widthNum);
  const acreage = (totalYardSqFt / 43560).toFixed(2);

  // Mulch calculations: (sqFt * depthInches / 12) / 27 cubic yards
  const areaNum = parseFloat(mulchAreaSqFt) || 0;
  const depthNum = parseFloat(mulchDepthInches) || 3;
  const cubicYardsNeeded = ((areaNum * (depthNum / 12)) / 27).toFixed(1);
  const pineStrawBales = Math.ceil(areaNum / 45); // standard roll covers ~45-50 sq ft at 3"

  const handleApply = () => {
    if (calcType === 'mowing') {
      const details = `Estimated ${totalYardSqFt.toLocaleString()} sq. ft. (~${acreage} acres) yard size for ${mowFrequency}. Includes blade edging and surface blowout.`;
      onApplyEstimate('Routine Lawn Mowing & Striping', details);
    } else {
      const details = mulchMaterial.includes('Pine Straw')
        ? `Estimated ${mulchAreaSqFt} sq. ft. bed area (~${pineStrawBales} rolls of Longleaf Pine Straw).`
        : `Estimated ${mulchAreaSqFt} sq. ft. bed area (~${cubicYardsNeeded} cubic yards of ${mulchMaterial} at ${mulchDepthInches}" depth).`;
      onApplyEstimate('Mulch & Pine Straw Bed Refresh', details);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-emerald-900/10 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-title"
      >
        {/* Modal Header */}
        <div className="bg-[#022c22] text-white p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 id="calculator-title" className="font-extrabold text-lg font-heading tracking-tight">
              Gastonia Lawn & Yard Estimator
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close estimator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-5 pb-0">
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setCalcType('mowing')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                calcType === 'mowing'
                  ? 'bg-white text-[#022c22] shadow-xs'
                  : 'text-slate-600 hover:text-[#022c22]'
              }`}
            >
              <Scissors className="w-4 h-4 text-emerald-700" />
              Lawn Mowing Size
            </button>
            <button
              type="button"
              onClick={() => setCalcType('mulch')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                calcType === 'mulch'
                  ? 'bg-white text-[#022c22] shadow-xs'
                  : 'text-slate-600 hover:text-[#022c22]'
              }`}
            >
              <Leaf className="w-4 h-4 text-amber-600" />
              Mulch & Pine Straw
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {calcType === 'mowing' ? (
            <>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your approximate yard length and width to estimate total mowing square footage. All G & T cuts include vertical sidewalk edging and debris cleanup.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Yard Length (ft)
                  </label>
                  <input
                    type="number"
                    value={yardLength}
                    onChange={(e) => setYardLength(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#064e3b] outline-none"
                    placeholder="e.g. 80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Yard Width (ft)
                  </label>
                  <input
                    type="number"
                    value={yardWidth}
                    onChange={(e) => setYardWidth(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#064e3b] outline-none"
                    placeholder="e.g. 60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Frequency
                </label>
                <select
                  value={mowFrequency}
                  onChange={(e) => setMowFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#064e3b] outline-none font-medium"
                >
                  <option value="Weekly Mowing (Recommended)">Weekly Grass Cutting (Peak Carolina Season)</option>
                  <option value="Bi-Weekly Mowing">Bi-Weekly Grass Cutting (Standard Upkeep)</option>
                  <option value="One-Time Yard Cut & Cleanup">One-Time Cut & Overgrown Cleanup</option>
                </select>
              </div>

              {/* Mowing Output Card */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <div className="flex justify-between items-center text-sm font-bold text-[#022c22]">
                  <span>Total Estimated Turf Area:</span>
                  <span className="text-base font-black text-emerald-900">{totalYardSqFt.toLocaleString()} sq. ft.</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-700">
                  <span>Acreage Equivalent:</span>
                  <span className="font-bold text-slate-900">~{acreage} Acres</span>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-800 pt-1 border-t border-emerald-200 font-semibold">
                  <span>Edging & Surface Blowout:</span>
                  <span>100% Included</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estimate how many cubic yards of bulk shredded mulch or rolls of NC longleaf pine straw your Gastonia flowerbeds need.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Landscape Bed Area (Square Feet)
                </label>
                <input
                  type="number"
                  value={mulchAreaSqFt}
                  onChange={(e) => setMulchAreaSqFt(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-[#064e3b] outline-none"
                  placeholder="e.g. 400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coverage Depth
                  </label>
                  <select
                    value={mulchDepthInches}
                    onChange={(e) => setMulchDepthInches(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#064e3b] outline-none"
                  >
                    <option value="2">2 inches (Seasonal touch up)</option>
                    <option value="3">3 inches (Recommended)</option>
                    <option value="4">4 inches (New bed / Weed control)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Material
                  </label>
                  <select
                    value={mulchMaterial}
                    onChange={(e) => setMulchMaterial(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#064e3b] outline-none"
                  >
                    <option value="Dark Hardwood Mulch">Dark Brown Hardwood</option>
                    <option value="Black Dyed Mulch">Black Dyed Mulch</option>
                    <option value="Natural Hardwood Mulch">Natural Double-Shredded</option>
                    <option value="NC Longleaf Pine Straw">Longleaf Pine Straw</option>
                  </select>
                </div>
              </div>

              {/* Mulch Output Card */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2">
                {mulchMaterial.includes('Pine Straw') ? (
                  <>
                    <div className="flex justify-between items-center text-sm font-bold text-[#022c22]">
                      <span>Pine Straw Rolls / Bales:</span>
                      <span className="text-base font-black text-amber-700">{pineStrawBales} rolls</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Covers ~{mulchAreaSqFt} sq. ft. rolled and hand-tucked for sharp natural bed borders.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-sm font-bold text-[#022c22]">
                      <span>Bulk Mulch Needed:</span>
                      <span className="text-base font-black text-amber-700">{cubicYardsNeeded} Cubic Yards</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Equivalent to ~{Math.ceil(parseFloat(cubicYardsNeeded) * 13.5)} standard 2-cu-ft bags.
                    </p>
                  </>
                )}
              </div>
            </>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
            <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              All quotes from G & T Lawn Care are 100% free with no commitment required.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="btn-vibrant btn-primary px-5 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Apply to Free Quote Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
