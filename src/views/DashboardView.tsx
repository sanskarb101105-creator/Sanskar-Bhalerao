import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import {
  Zap,
  TrendingUp,
  Gauge,
  Sun,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Layers,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { LivePowerChart, EnergyGenerationChart } from '../components/SolarCharts';
import { SolarPanel } from '../types/solar';

interface DashboardViewProps {
  setActiveView: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView }) => {
  const {
    kpis,
    panels,
    hourlyPower,
    alerts,
    setSelectedPanel,
    timeFilter,
    setTimeFilter,
    acknowledgeAlert,
    isSimulating,
  } = useSolar();

  const [energyFilter, setEnergyFilter] = useState<'today' | 'week' | 'month'>('today');

  const activeAlerts = alerts.filter(a => a.status !== 'Resolved').slice(0, 3);

  // Group panels by row for mini plant overview
  const row1 = panels.filter(p => p.row === 1);
  const row2 = panels.filter(p => p.row === 2);

  const getStatusColor = (status: SolarPanel['status']) => {
    switch (status) {
      case 'NORMAL':
        return 'bg-emerald-500 hover:bg-emerald-600 text-white';
      case 'WARNING':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      case 'MAINTENANCE':
        return 'bg-rose-500 hover:bg-rose-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Solar Plant Operational Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time telemetry, efficiency indexes, and photovoltaic array diagnostic status
          </p>
        </div>

        {/* Live Refresh Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
            <RefreshCw
              className={`w-3.5 h-3.5 text-emerald-600 ${isSimulating ? 'animate-spin' : ''}`}
            />
            <span>Auto-Updated: <strong className="text-slate-800 font-mono">{kpis.lastUpdated}</strong></span>
          </div>

          <button
            onClick={() => setActiveView('live-monitoring')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
          >
            <span>Live Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. DASHBOARD SUMMARY CARDS (Top KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. TOTAL ENERGY TODAY */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Energy Today
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {kpis.totalEnergyToday.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-500">kWh</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>↑ 8.4% from yesterday</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Target: 1,200 kWh/day</p>
          </div>
        </div>

        {/* 2. CURRENT POWER */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Current Power
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {kpis.currentPower.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-slate-500">kW</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>↑ 6.2% from yesterday</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Installed Peak: 10.0 kW</p>
          </div>
        </div>

        {/* 3. SYSTEM EFFICIENCY */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              System Efficiency
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {kpis.systemEfficiency.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Performance: GOOD</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">PR Baseline: &gt; 80%</p>
          </div>
        </div>

        {/* 4. SOLAR IRRADIANCE */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Solar Irradiance
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {kpis.solarIrradiance}
              </span>
              <span className="text-xs font-medium text-slate-500">W/m²</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 mt-2">
              <span>● Pyranometer Sensor</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Global Horizontal Irradiance</p>
          </div>
        </div>

        {/* 5. PANEL TEMPERATURE */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Panel Temperature
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                {kpis.panelTemperature}°C
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 mt-2">
              <span>Within Safe Limits</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Max rated threshold: 45°C</p>
          </div>
        </div>

        {/* 6. SYSTEM HEALTH */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              System Health
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-emerald-700">
                {kpis.systemHealth}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 mt-2">
              <span>11 / 12 Panels Active</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Inverter Grid: Synchronized</p>
          </div>
        </div>
      </div>

      {/* Main Charts Row: 7. LIVE POWER GRAPH & 8. ENERGY GENERATION GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIVE POWER GENERATION GRAPH */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live Power Generation</h2>
              <p className="text-xs text-slate-500">
                Real-time dynamic power generation curve (X: Time, Y: Power in kW)
              </p>
            </div>

            {/* Time Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
              {(['1h', '6h', 'today'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeFilter(tf)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    timeFilter === tf
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tf === '1h' ? '1 Hour' : tf === '6h' ? '6 Hours' : 'Today'}
                </button>
              ))}
            </div>
          </div>

          <LivePowerChart data={hourlyPower} filter={timeFilter} />
        </div>

        {/* ENERGY GENERATION GRAPH */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Energy Generation</h2>
              <p className="text-xs text-slate-500">
                Cumulative energy harvest vs theoretical expected baseline
              </p>
            </div>

            {/* Energy Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
              {(['today', 'week', 'month'] as const).map(ef => (
                <button
                  key={ef}
                  onClick={() => setEnergyFilter(ef)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    energyFilter === ef
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ef === 'today' ? 'Today' : ef === 'week' ? 'This Week' : 'This Month'}
                </button>
              ))}
            </div>
          </div>

          <EnergyGenerationChart filter={energyFilter} />

          {/* Metric Summary Indicators */}
          <div className="grid grid-cols-3 gap-3 pt-3 mt-2 border-t border-slate-100 text-center font-mono">
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Energy Generated
              </span>
              <strong className="text-sm font-bold text-slate-900">
                {energyFilter === 'today'
                  ? `${kpis.totalEnergyToday} kWh`
                  : energyFilter === 'week'
                  ? '8,553 kWh'
                  : '33,813 kWh'}
              </strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Average Generation
              </span>
              <strong className="text-sm font-bold text-slate-900">
                {energyFilter === 'today'
                  ? '208 kWh/h'
                  : energyFilter === 'week'
                  ? '1,221 kWh/day'
                  : '8,453 kWh/wk'}
              </strong>
            </div>
            <div className="p-2 rounded-lg bg-slate-50">
              <span className="text-[10px] text-slate-500 uppercase block font-sans">
                Peak Generation
              </span>
              <strong className="text-sm font-bold text-emerald-700">
                {kpis.peakPowerToday.toFixed(2)} kW
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: 11. Mini Solar Plant Layout & 14. Live Alerts Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOLAR PLANT OVERVIEW (Simplified layout map) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Photovoltaic Array Layout</h2>
              <p className="text-xs text-slate-500">
                12 Monocrystalline panels in 2 strings. Click any panel to view diagnostic telemetry.
              </p>
            </div>
            <button
              onClick={() => setActiveView('plant-overview')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
            >
              <span>Full Plant Map</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Plant Grid: ROW 1 and ROW 2 */}
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {/* ROW 1 */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>ROW 1 · String Inverter A (Panels 01 – 06)</span>
                <span className="text-[11px] text-slate-400 font-mono">Nominal: 400V DC</span>
              </div>
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {row1.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPanel(p)}
                    className={`p-2.5 rounded-lg text-center transition-all transform hover:-translate-y-0.5 shadow-xs flex flex-col items-center justify-center cursor-pointer ${getStatusColor(
                      p.status
                    )}`}
                    title={`${p.name}: ${p.power} kW | ${p.temperature}°C | ${p.efficiency}%`}
                  >
                    <span className="text-[11px] font-bold block">{p.id}</span>
                    <span className="text-xs font-mono font-semibold block mt-0.5">
                      {p.power.toFixed(1)} kW
                    </span>
                    <span className="text-[9px] opacity-90 block">{p.temperature}°C</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 2 */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
                <span>ROW 2 · String Inverter B (Panels 07 – 12)</span>
                <span className="text-[11px] text-slate-400 font-mono">Nominal: 400V DC</span>
              </div>
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {row2.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPanel(p)}
                    className={`p-2.5 rounded-lg text-center transition-all transform hover:-translate-y-0.5 shadow-xs flex flex-col items-center justify-center cursor-pointer ${getStatusColor(
                      p.status
                    )}`}
                    title={`${p.name}: ${p.power} kW | ${p.temperature}°C | ${p.efficiency}%`}
                  >
                    <span className="text-[11px] font-bold block">{p.id}</span>
                    <span className="text-xs font-mono font-semibold block mt-0.5">
                      {p.power.toFixed(1)} kW
                    </span>
                    <span className="text-[9px] opacity-90 block">{p.temperature}°C</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Legend */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Normal (10)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Warning (1)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>Maintenance (1)</span>
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Click panel block for deep inspection</span>
            </div>
          </div>
        </div>

        {/* RECENT ALERTS WIDGET */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900">Active Alerts</h2>
              </div>
              <button
                onClick={() => setActiveView('alerts')}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {activeAlerts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  All array parameters within nominal limits
                </div>
              ) : (
                activeAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border text-xs ${
                      alert.severity === 'HIGH'
                        ? 'bg-rose-50/70 border-rose-200'
                        : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{alert.type}</span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          alert.severity === 'HIGH'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-slate-700 mt-1 text-[11px] leading-tight">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60 text-[10px] text-slate-500">
                      <span>{alert.timestamp}</span>
                      {alert.status === 'Active' && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-emerald-700 font-bold hover:underline"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Health Quick Card */}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Grid Availability:</span>
              <strong className="text-slate-900 font-mono">{kpis.systemAvailability}%</strong>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-slate-500">CO₂ Offset Today:</span>
              <strong className="text-emerald-700 font-mono">{kpis.co2SavedKg} kg</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
