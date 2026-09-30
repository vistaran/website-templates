import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Sprout, Leaf, Check } from 'lucide-react';

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
  const [calcType, setCalcType] = useState<'sod' | 'mulch'>('sod');

  // Sod inputs
  const [sodLength, setSodLength] = useState<string>('50');
  const [sodWidth, setSodWidth] = useState<string>('30');
  const [sodVariety, setSodVariety] = useState<string>('Bermuda');

  // Mulch inputs
  const [mulchAreaSqFt, setMulchAreaSqFt] = useState<string>('400');
  const [mulchDepthInches, setMulchDepthInches] = useState<string>('3');
  const [mulchMaterial, setMulchMaterial] = useState<string>('Dark Hardwood Mulch');

  if (!isOpen) return null;

  // Sod calculations (standard NC sod pallet is ~450 sq. ft.)
  const lengthNum = parseFloat(sodLength) || 0;
  const widthNum = parseFloat(sodWidth) || 0;
  const totalSodSqFt = Math.round(lengthNum * widthNum);
  const palletsNeeded = (totalSodSqFt / 450).toFixed(1);
  const palletsWithWaste = ( (totalSodSqFt * 1.1) / 450 ).toFixed(1); // 10% cutting waste

  // Mulch calculations: (sqFt * depthInches / 12) / 27 cubic yards
  const areaNum = parseFloat(mulchAreaSqFt) || 0;
  const depthNum = parseFloat(mulchDepthInches) || 3;
  const cubicYardsNeeded = ((areaNum * (depthNum / 12)) / 27).toFixed(1);
  const pineStrawBales = Math.ceil(areaNum / 45); // standard roll covers ~45-50 sq ft at 3"

  const handleApply = () => {
    if (calcType === 'sod') {
      const details = `Estimated ${totalSodSqFt} sq. ft. (~${palletsWithWaste} pallets including 10% cutting allowance) of ${sodVariety} sod.`;
      onApplyEstimate('Sod Installation', details);
    } else {
      const details = mulchMaterial.includes('Pine Straw')
        ? `Estimated ${mulchAreaSqFt} sq. ft. bed area (~${pineStrawBales} rolls of Longleaf Pine Straw).`
        : `Estimated ${mulchAreaSqFt} sq. ft. bed area (~${cubicYardsNeeded} cubic yards of ${mulchMaterial} at ${mulchDepthInches}" depth).`;
      onApplyEstimate('Mulch & Pine Straw', details);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calculator-title"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-500" />
            <h3 id="calculator-title" className="font-bold text-lg font-heading">
              Charlotte Yard Material Estimator
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
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setCalcType('sod')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                calcType === 'sod'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-500" />
              Sod Pallet Estimator
            </button>
            <button
              type="button"
              onClick={() => setCalcType('mulch')}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-all ${
                calcType === 'mulch'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-500" />
              Mulch & Pine Straw
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {calcType === 'sod' ? (
            <>
              <p className="text-xs text-slate-700/80 leading-relaxed">
                Enter your lawn length and width to calculate required square footage and NC pallets (standard 450 sq. ft. per pallet).
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lawn Length (ft)
                  </label>
                  <input
                    type="number"
                    value={sodLength}
                    onChange={(e) => setSodLength(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    placeholder="e.g. 50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lawn Width (ft)
                  </label>
                  <input
                    type="number"
                    value={sodWidth}
                    onChange={(e) => setSodWidth(e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                    placeholder="e.g. 30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Grass Variety for Charlotte
                </label>
                <select
                  value={sodVariety}
                  onChange={(e) => setSodVariety(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                >
                  <option value="Bermuda (Tifway 419)">Bermuda (Tifway 419) – Full Sun / High Traffic</option>
                  <option value="Tall Fescue">Tall Fescue – Year-round green / Shade tolerant</option>
                  <option value="Zoysia (Zeon / Emerald)">Zoysia – Luxury carpet feel / Low maintenance</option>
                  <option value="Not Sure / Need Recommendation">Not Sure – Need Soil/Shade Evaluation</option>
                </select>
              </div>

              {/* Sod Output Card */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-900">
                  <span>Total Lawn Area:</span>
                  <span className="text-base font-bold">{totalSodSqFt.toLocaleString()} sq. ft.</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-700">
                  <span>Exact Pallets (450 sq ft/pal):</span>
                  <span className="font-semibold">{palletsNeeded} pallets</span>
                </div>
                <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-1 border-t border-emerald-500/20">
                  <span>Recommended (with 10% cut waste):</span>
                  <span className="text-emerald-800">{palletsWithWaste} pallets</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-700/80 leading-relaxed">
                Estimate how many cubic yards of bulk shredded mulch or rolls of NC longleaf pine straw your landscape beds need.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Landscape Bed Area (Square Feet)
                </label>
                <input
                  type="number"
                  value={mulchAreaSqFt}
                  onChange={(e) => setMulchAreaSqFt(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                  placeholder="e.g. 400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Coverage Depth
                  </label>
                  <select
                    value={mulchDepthInches}
                    onChange={(e) => setMulchDepthInches(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="2">2 inches (Touch up)</option>
                    <option value="3">3 inches (Recommended)</option>
                    <option value="4">4 inches (New bed / Weed control)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Material
                  </label>
                  <select
                    value={mulchMaterial}
                    onChange={(e) => setMulchMaterial(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-slate-900 outline-none"
                  >
                    <option value="Dark Hardwood Mulch">Dark Brown Hardwood</option>
                    <option value="Black Dyed Mulch">Black Dyed Mulch</option>
                    <option value="Natural Hardwood Mulch">Natural Double-Shredded</option>
                    <option value="NC Longleaf Pine Straw">Longleaf Pine Straw</option>
                  </select>
                </div>
              </div>

              {/* Mulch Output Card */}
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-500/30 space-y-2">
                {mulchMaterial.includes('Pine Straw') ? (
                  <>
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-900">
                      <span>Pine Straw Rolls / Bales:</span>
                      <span className="text-base font-bold">{pineStrawBales} rolls</span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Covers ~{mulchAreaSqFt} sq. ft. tucked and rolled for crisp natural bed edges.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-900">
                      <span>Bulk Mulch Needed:</span>
                      <span className="text-base font-bold">{cubicYardsNeeded} Cubic Yards</span>
                    </div>
                    <p className="text-xs text-slate-700">
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
              All estimates include site preparation, bed edging trenching, soil grading, and full post-job cleanup.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2.5 bg-gradient-to-tr from-emerald-600 to-green-400 hover:from-emerald-500 hover:to-green-300 text-white font-bold text-sm rounded-xl inline-flex items-center gap-2  transition-colors cursor-pointer"
          >
            <span>Apply to Quote Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
