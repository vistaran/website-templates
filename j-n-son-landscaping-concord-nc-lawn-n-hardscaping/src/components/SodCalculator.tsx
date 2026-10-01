import React, { useState, useEffect } from "react";
import { Sprout, Layers, ArrowRight, CheckCircle2, DollarSign } from "lucide-react";

interface SodCalculatorProps {
  onQuoteWithCalc: (material: string, area: number, amount: number) => void;
}

export const SodCalculator: React.FC<SodCalculatorProps> = ({ onQuoteWithCalc }) => {
  const [calcType, setCalcType] = useState<"sod" | "mulch">("sod");
  const [inputType, setInputType] = useState<"dimensions" | "area">("dimensions");
  
  // Dimensions state
  const [width, setWidth] = useState<string>("30");
  const [length, setLength] = useState<string>("40");
  const [directArea, setDirectArea] = useState<string>("1200");
  
  // Depth state strictly for Mulch (inches)
  const [depth, setDepth] = useState<number>(3);

  // Result variables
  const [area, setArea] = useState<number>(1200);
  const [sodRolls, setSodRolls] = useState<number>(132);
  const [mulchYards, setMulchYards] = useState<number>(12.2);

  // Recalculate values automatically when inputs change
  useEffect(() => {
    let calculatedArea = 0;
    if (inputType === "dimensions") {
      const w = parseFloat(width) || 0;
      const l = parseFloat(length) || 0;
      calculatedArea = Math.round(w * l);
    } else {
      calculatedArea = Math.round(parseFloat(directArea) || 0);
    }
    setArea(calculatedArea);

    // Sod Roll calculation (1 standard roll is ~10 sq feet)
    // Plus 10% waste buffer factor for perimeter cutting & fitting
    const rollsNeeded = Math.ceil((calculatedArea * 1.1) / 10);
    setSodRolls(rollsNeeded);

    // Mulch calculation: (Area * Depth in inches) / 324 = Cubic Yards
    // Plus 10% buffer
    const yardsNeeded = Math.round(((calculatedArea * depth) / 324) * 1.1 * 10) / 10;
    setMulchYards(yardsNeeded);
  }, [width, length, directArea, inputType, depth, calcType]);

  const handleSubmitEstimate = () => {
    const materialLabel = calcType === "sod" ? "Premium Fescue Sod Installation" : `Premium Double-Shredded Hardwood Mulch (${depth}” Depth)`;
    const amount = calcType === "sod" ? sodRolls : mulchYards;
    onQuoteWithCalc(materialLabel, area, amount);
  };

  return (
    <section id="calculator" className="py-24 bg-brand-sage/20 border-b border-brand-sage/40">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Info, Real Material Photo & Description (5 cols) */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-clay uppercase block mb-3">
              04. INTERACTIVE YARD ESTIMATOR
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-brand-soil tracking-tight mb-5 leading-tight">
              Instant yard material calculation.
            </h2>
            <p className="text-base text-brand-soil/75 mb-6 leading-relaxed">
              Don't guess how much sod or mulch your property requires. Our calculator factors in standard 
              <strong className="font-semibold text-brand-moss"> 10% perimeter cutting margins</strong> so your project runs smoothly with zero shortages.
            </p>

            {/* Real Material Preview Image Frame */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-brand-sage shadow-md mb-6 bg-brand-soil">
              <img
                src={calcType === "sod" ? "/images/sod.jpg" : "/images/garden.jpg"}
                alt={calcType === "sod" ? "Fresh green tall fescue sod installation" : "Premium dark hardwood mulch"}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-soil/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-clay font-bold block">
                  SELECTED MATERIAL SPEC
                </span>
                <span className="text-sm font-serif font-bold text-brand-cream">
                  {calcType === "sod" ? "Certified NC Tall Fescue Turf" : "Double-Shredded Organic Hardwood Mulch"}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-4 bg-white border border-brand-sage rounded-2xl">
              <div className="flex items-center gap-2.5 text-xs text-brand-soil/80">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf shrink-0" />
                <span>Includes 10% cutting and perimeter curve buffer</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-brand-soil/80">
                <CheckCircle2 className="w-4 h-4 text-brand-leaf shrink-0" />
                <span>Delivered fresh daily from local Carolina turf farms</span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Calculator Board (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-brand-sage rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              
              {/* Calculator segment selector */}
              <div className="flex items-center gap-1.5 p-1 bg-brand-sage/40 rounded-xl mb-6">
                <button
                  onClick={() => setCalcType("sod")}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    calcType === "sod"
                      ? "bg-white text-brand-moss shadow-sm"
                      : "text-brand-soil/70 hover:text-brand-soil"
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>Sod Rolls (10 sq ft)</span>
                </button>
                <button
                  onClick={() => setCalcType("mulch")}
                  className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    calcType === "mulch"
                      ? "bg-white text-brand-moss shadow-sm"
                      : "text-brand-soil/70 hover:text-brand-soil"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Cubic Yards Mulch</span>
                </button>
              </div>

              {/* Input Type selection */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-brand-soil cursor-pointer">
                  <input
                    type="radio"
                    name="inputType"
                    checked={inputType === "dimensions"}
                    onChange={() => setInputType("dimensions")}
                    className="accent-brand-leaf w-4 h-4 cursor-pointer"
                  />
                  <span>Dimensions (Width × Length)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase text-brand-soil cursor-pointer">
                  <input
                    type="radio"
                    name="inputType"
                    checked={inputType === "area"}
                    onChange={() => setInputType("area")}
                    className="accent-brand-leaf w-4 h-4 cursor-pointer"
                  />
                  <span>Direct Square Footage</span>
                </label>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {inputType === "dimensions" ? (
                  <>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                        Yard Width (Feet)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none font-mono text-sm"
                        placeholder="e.g. 30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                        Yard Length (Feet)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none font-mono text-sm"
                        placeholder="e.g. 40"
                      />
                    </div>
                  </>
                ) : (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono font-bold uppercase text-brand-soil/65 mb-2">
                      Total Yard Area (Square Feet)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={directArea}
                      onChange={(e) => setDirectArea(e.target.value)}
                      className="w-full px-4 py-3 bg-brand-cream border border-brand-sage rounded-xl focus:border-brand-leaf focus:outline-none font-mono text-sm"
                      placeholder="e.g. 1200"
                    />
                  </div>
                )}
              </div>

              {/* Mulch depth slider */}
              {calcType === "mulch" && (
                <div className="p-4 bg-brand-sage/20 border border-brand-sage rounded-2xl mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase text-brand-soil">
                      Selected Mulch Depth
                    </label>
                    <span className="text-sm font-mono font-black text-brand-leaf">{depth} Inches</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={depth}
                    onChange={(e) => setDepth(parseInt(e.target.value))}
                    className="w-full accent-brand-leaf cursor-pointer h-1.5 bg-brand-sage rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-brand-soil/50 mt-2">
                    <span>1” (Light annual top-dress)</span>
                    <span>3” (Recommended Standard)</span>
                    <span>6” (Heavy slope erosion)</span>
                  </div>
                </div>
              )}

              {/* Live Output Scoreboard */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-brand-moss rounded-2xl text-brand-cream mb-6">
                <div className="border-r border-white/10 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-clay font-bold block mb-1">
                    Calculated Yard Area
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight tabular-nums block text-white">
                    {area.toLocaleString()}
                  </span>
                  <span className="text-xs text-brand-cream/60">Square Feet</span>
                </div>

                <div className="pl-2 text-left">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-clay font-bold block mb-1">
                    {calcType === "sod" ? "Recommended Rolls" : "Cubic Yards Needed"}
                  </span>
                  <span className="text-2xl sm:text-3xl font-mono font-black tracking-tight tabular-nums block text-white">
                    {calcType === "sod" ? sodRolls.toLocaleString() : mulchYards.toLocaleString()}
                  </span>
                  <span className="text-xs text-brand-cream/60">
                    {calcType === "sod" ? "Sod Rolls (with 10% buffer)" : `Cubic Yards (at ${depth}” depth)`}
                  </span>
                </div>
              </div>

              {/* Estimate Request Action */}
              <button
                onClick={handleSubmitEstimate}
                className="w-full py-4 bg-brand-leaf hover:bg-brand-moss text-brand-cream font-bold text-xs uppercase tracking-wider rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group shadow-sm cursor-pointer"
              >
                <span>Request J &amp; Son Quote with these Dimensions</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
