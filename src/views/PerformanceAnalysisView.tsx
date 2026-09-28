import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import {
  TrendingUp,
  Zap,
  Gauge,
  Activity,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import { LivePowerChart, EnergyGenerationChart } from '../components/SolarCharts';

export const PerformanceAnalysisView: React.FC = () => {
  const { kpis, hourlyPower } = useSolar();
  const [activePeriod, setActivePeriod] = useState<'today' | 'week' | 'month'>('today');

  // Dynamic values
  const actualPower = kpis.currentPower;
  const expectedPower = kpis.expectedPower;
  const efficiency = kpis.systemEfficiency;
  const performanceRatio = kpis.performanceRatio;
  const energyLoss = kpis.energyLoss;
  const availability = kpis.systemAvailability;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Performance & Degradation Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comparative analysis of expected vs actual generation, Performance Ratio (IEC 61724 standard), and loss breakdown
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['today', 'week', 'month'] as const).map(period => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activePeriod === period
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {period === 'today'
                ? "Today's Performance"
                : period === 'week'
                ? 'Weekly Performance'
                : 'Monthly Performance'}
            </button>
          ))}
        </div>
      </div>

      {/* 13. EFFICIENCY FORMULA & DYNAMIC CALCULATION CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                IEC 61724 Formula
              </span>
              <h2 className="text-base font-bold text-slate-900">
                System Efficiency & Performance Ratio Engine
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Efficiency (%) = (Actual Power Output / Expected Power Output) × 100
            </p>
          </div>

          {/* Large System Performance GOOD Badge */}
          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">
                Health Status
              </span>
              <span className="text-base font-extrabold text-emerald-800">
                System Performance: GOOD
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Calculation Live Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-sans block mb-1">
              Expected Nominal Power (P_exp)
            </span>
            <span className="text-2xl font-bold text-slate-700">
              {expectedPower.toFixed(2)} kW
            </span>
            <p className="text-[10px] text-slate-400 font-sans mt-1">
              Normalized for GHI {kpis.solarIrradiance} W/m²
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-sans block mb-1">
              Actual Output Power (P_act)
            </span>
            <span className="text-2xl font-bold text-emerald-700">
              {actualPower.toFixed(2)} kW
            </span>
            <p className="text-[10px] text-slate-400 font-sans mt-1">
              Measured at AC Inverter Bus
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <span className="text-xs text-blue-900 font-sans font-semibold block mb-1">
              Calculated Efficiency
            </span>
            <span className="text-2xl font-bold text-blue-700">
              {efficiency.toFixed(1)}%
            </span>
            <p className="text-[10px] text-blue-600 font-sans mt-1">
              ({actualPower.toFixed(2)} / {expectedPower.toFixed(2)}) × 100
            </p>
          </div>
        </div>
      </div>

      {/* 12. SIX KEY PERFORMANCE METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Expected Power */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Expected Power
          </span>
          <div className="text-xl font-bold text-slate-800 mt-1 font-mono">
            {expectedPower.toFixed(1)} kW
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Rating: 10 kWp</span>
        </div>

        {/* Actual Power */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Actual Power
          </span>
          <div className="text-xl font-bold text-emerald-700 mt-1 font-mono">
            {actualPower.toFixed(2)} kW
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Live Array Sum</span>
        </div>

        {/* Performance Ratio */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Performance Ratio
          </span>
          <div className="text-xl font-bold text-blue-700 mt-1 font-mono">
            {performanceRatio.toFixed(1)}%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Target &gt; 80% met
          </span>
        </div>

        {/* Efficiency */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Array Efficiency
          </span>
          <div className="text-xl font-bold text-slate-800 mt-1 font-mono">
            {efficiency.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Silicon conversion</span>
        </div>

        {/* Energy Loss */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Energy Loss
          </span>
          <div className="text-xl font-bold text-amber-700 mt-1 font-mono">
            {energyLoss.toFixed(2)} kW
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Thermal & Soiling</span>
        </div>

        {/* System Availability */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            System Availability
          </span>
          <div className="text-xl font-bold text-slate-800 mt-1 font-mono">
            {availability}%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Online & Synced
          </span>
        </div>
      </div>

      {/* Charts: EXPECTED vs ACTUAL POWER COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Expected vs Actual Power Generation
              </h2>
              <p className="text-xs text-slate-500">
                Hourly comparison curve showing real-time gap analysis and variance
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              PR: {performanceRatio.toFixed(1)}%
            </span>
          </div>

          <LivePowerChart data={hourlyPower} filter="today" />
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Generation Target Realization
              </h2>
              <p className="text-xs text-slate-500">
                Selected period ({activePeriod}) energy yield vs simulation budget
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Mode: Normalized
            </span>
          </div>

          <EnergyGenerationChart filter={activePeriod} />
        </div>
      </div>

      {/* Energy Loss Factor Decomposition Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Photovoltaic Loss Factor Decomposition
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Quantified engineering breakdown of generation losses from standard test conditions (STC 1000 W/m², 25°C)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-sans text-slate-600 block mb-1 font-semibold">
              1. Thermal Derating Loss:
            </span>
            <span className="text-base font-bold text-slate-800">
              -{((kpis.panelTemperature - 25) * 0.4).toFixed(1)}% (-0.68 kW)
            </span>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Cell Temp {kpis.panelTemperature}°C vs STC 25°C (-0.4%/°C coeff)
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-sans text-slate-600 block mb-1 font-semibold">
              2. Soiling & Shading Loss:
            </span>
            <span className="text-base font-bold text-slate-800">
              -4.2% (-0.42 kW)
            </span>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Localized dust accumulation on P05 module
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-sans text-slate-600 block mb-1 font-semibold">
              3. Inverter Conversion Loss:
            </span>
            <span className="text-base font-bold text-slate-800">
              -2.2% (-0.22 kW)
            </span>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              Inverter efficiency 97.8% AC/DC conversion
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-sans text-slate-600 block mb-1 font-semibold">
              4. Cable Ohmic Loss:
            </span>
            <span className="text-base font-bold text-slate-800">
              -0.8% (-0.08 kW)
            </span>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              6 mm² solar DC copper cabling resistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
