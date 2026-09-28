import React from 'react';
import { useSolar } from '../context/SolarContext';
import { SolarPanel } from '../types/solar';
import {
  Sun,
  Zap,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Compass,
  ArrowUpRight,
  Info,
  Maximize2,
} from 'lucide-react';

export const PlantOverviewView: React.FC = () => {
  const { panels, setSelectedPanel, kpis } = useSolar();

  const row1 = panels.filter(p => p.row === 1);
  const row2 = panels.filter(p => p.row === 2);

  const getStatusVisuals = (status: SolarPanel['status']) => {
    switch (status) {
      case 'NORMAL':
        return {
          border: 'border-emerald-500',
          bg: 'bg-emerald-50 hover:bg-emerald-100/80',
          indicator: 'bg-emerald-500',
          badgeText: 'NORMAL',
          badgeBg: 'bg-emerald-100 text-emerald-800',
        };
      case 'WARNING':
        return {
          border: 'border-amber-500',
          bg: 'bg-amber-50 hover:bg-amber-100/80',
          indicator: 'bg-amber-500',
          badgeText: 'WARNING',
          badgeBg: 'bg-amber-100 text-amber-800',
        };
      case 'MAINTENANCE':
        return {
          border: 'border-rose-500',
          bg: 'bg-rose-50 hover:bg-rose-100/80',
          indicator: 'bg-rose-500',
          badgeText: 'MAINTENANCE',
          badgeBg: 'bg-rose-100 text-rose-800',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Solar Plant Array Layout & Topology
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Physical layout schematic representing Row 1 & Row 2 string architecture at the demonstration site
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></span>
            Green = Normal (10)
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></span>
            Yellow = Warning (1)
          </span>
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs"></span>
            Red = Maintenance (1)
          </span>
        </div>
      </div>

      {/* Main Visual Plant Layout Canvas */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left">
        {/* Top Info Banner inside layout */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                10 kWp Demonstration Field Layout (2 Strings × 6 Modules)
              </h2>
              <p className="text-xs text-slate-500">
                Facing True South (Azimuth 180°) · Fixed Tilt Angle: 28° Optimal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
            <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Irradiance: <strong>{kpis.solarIrradiance} W/m²</strong>
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Mean Temp: <strong>{kpis.panelTemperature}°C</strong>
            </span>
          </div>
        </div>

        {/* Visual Layout Map: ROW 1 & ROW 2 */}
        <div className="space-y-6">
          {/* ROW 1 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[11px]">
                  ROW 1
                </span>
                <span>String Inverter A · West to East Alignment (P01 – P06)</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Combined Output: {row1.reduce((acc, p) => acc + p.power, 0).toFixed(2)} kW
              </span>
            </div>

            {/* Panels P01 to P06 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {row1.map(p => {
                const visuals = getStatusVisuals(p.status);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPanel(p)}
                    className={`rounded-xl border-2 p-3 text-left transition-all transform hover:-translate-y-1 hover:shadow-md cursor-pointer ${visuals.border} ${visuals.bg}`}
                  >
                    {/* Status Top Line */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {p.id}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${visuals.indicator}`} />
                    </div>

                    {/* Solar Cell Grid Lines Visual Aesthetic */}
                    <div className="w-full h-12 bg-slate-800/90 rounded mb-2.5 p-1 grid grid-cols-3 grid-rows-2 gap-0.5 border border-slate-700 shadow-inner">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-sky-950/80 rounded-xs border border-sky-800/40" />
                      ))}
                    </div>

                    {/* Live Telemetry Info */}
                    <div className="space-y-0.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Power:</span>
                        <strong className="text-slate-900">{p.power.toFixed(2)} kW</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Temp:</span>
                        <span className={p.temperature > 45 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                          {p.temperature}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Eff:</span>
                        <span className="text-blue-700 font-semibold">{p.efficiency.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${visuals.badgeBg}`}>
                        {visuals.badgeText}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">Inspect</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* String Bus Conduit Divider */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-mono my-2">
            <span className="h-px bg-slate-200 flex-1" />
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px]">
              Inter-Row Service Alleyway & DC Trunk Conduit (2.5 meters spacing)
            </span>
            <span className="h-px bg-slate-200 flex-1" />
          </div>

          {/* ROW 2 */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[11px]">
                  ROW 2
                </span>
                <span>String Inverter B · West to East Alignment (P07 – P12)</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                Combined Output: {row2.reduce((acc, p) => acc + p.power, 0).toFixed(2)} kW
              </span>
            </div>

            {/* Panels P07 to P12 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {row2.map(p => {
                const visuals = getStatusVisuals(p.status);
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPanel(p)}
                    className={`rounded-xl border-2 p-3 text-left transition-all transform hover:-translate-y-1 hover:shadow-md cursor-pointer ${visuals.border} ${visuals.bg}`}
                  >
                    {/* Status Top Line */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {p.id}
                      </span>
                      <span className={`w-2.5 h-2.5 rounded-full ${visuals.indicator}`} />
                    </div>

                    {/* Solar Cell Grid Lines Visual Aesthetic */}
                    <div className="w-full h-12 bg-slate-800/90 rounded mb-2.5 p-1 grid grid-cols-3 grid-rows-2 gap-0.5 border border-slate-700 shadow-inner">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-sky-950/80 rounded-xs border border-sky-800/40" />
                      ))}
                    </div>

                    {/* Live Telemetry Info */}
                    <div className="space-y-0.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Power:</span>
                        <strong className="text-slate-900">{p.power.toFixed(2)} kW</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Temp:</span>
                        <span className={p.temperature > 45 ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                          {p.temperature}°C
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-sans">Eff:</span>
                        <span className="text-blue-700 font-semibold">{p.efficiency.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${visuals.badgeBg}`}>
                        {visuals.badgeText}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">Inspect</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Array Technical Specifications Drawer */}
        <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-800 block mb-1">
              Array Specifications:
            </span>
            <ul className="space-y-1 text-slate-500">
              <li>• Monocrystalline Half-Cut Cell Technology</li>
              <li>• 120 Half-Cells per Module (550W rated nominal)</li>
              <li>• Anti-reflective hydrophobic coated glass</li>
            </ul>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-800 block mb-1">
              Electrical Configuration:
            </span>
            <ul className="space-y-1 text-slate-500">
              <li>• String 1: P01 to P06 in series (Vmp ~ 246V DC)</li>
              <li>• String 2: P07 to P12 in series (Vmp ~ 246V DC)</li>
              <li>• Dual MPPT Trackers connected to Central Inverter</li>
            </ul>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-800 block mb-1">
              Demonstration Features:
            </span>
            <ul className="space-y-1 text-slate-500">
              <li>• Click any panel module to open deep diagnostic telemetry</li>
              <li>• Use Simulation Controls to inject thermal hot-spot on P03</li>
              <li>• Inspect real-time status transitions (Green / Yellow / Red)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
