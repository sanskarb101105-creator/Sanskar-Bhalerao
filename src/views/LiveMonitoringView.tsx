import React from 'react';
import { useSolar } from '../context/SolarContext';
import {
  Activity,
  Zap,
  Sun,
  Thermometer,
  Gauge,
  TrendingUp,
  Cpu,
  RefreshCw,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { LivePowerChart } from '../components/SolarCharts';

export const LiveMonitoringView: React.FC = () => {
  const { kpis, hourlyPower, isSimulating, weatherScenario } = useSolar();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Real-Time Sensor Monitoring
            </h1>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              LIVE TELEMETRY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Photovoltaic array electrical characteristics, environmental irradiance, and thermography
          </p>
        </div>

        {/* Update timestamp & status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 shadow-xs">
            <RefreshCw
              className={`w-3.5 h-3.5 text-emerald-600 ${isSimulating ? 'animate-spin' : ''}`}
            />
            <span>Last Updated: <strong className="text-slate-900">{kpis.lastUpdated}</strong></span>
          </div>
        </div>
      </div>

      {/* 6. REAL-TIME MONITORING METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Voltage: 420 V */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Array Voltage
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {kpis.voltage.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-500">V</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              DC Bus Voltage · MPPT Target: 415–430 V
            </p>
            {/* Visual Bar Indicator */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.voltage / 500) * 100)}%` }}
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Current: 20.5 A */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              String Current
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {kpis.current.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-slate-500">A</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Aggregate String Current · Nominal: 20–22 A
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.current / 30) * 100)}%` }}
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Power: 8.6 kW */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Power Output
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-emerald-700 tabular-nums">
                {kpis.currentPower.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-slate-500">kW</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Instantaneous AC Power (V × I conversion)
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.currentPower / 10) * 100)}%` }}
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Temperature: 42°C */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Panel Temperature
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {kpis.panelTemperature}
              </span>
              <span className="text-sm font-semibold text-slate-500">°C</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Mean Surface Temperature (Array RTD)
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.panelTemperature / 70) * 100)}%` }}
                className={`${
                  kpis.panelTemperature > 45 ? 'bg-rose-500' : 'bg-emerald-500'
                } h-full rounded-full transition-all duration-500`}
              />
            </div>
          </div>
        </div>

        {/* Solar Irradiance: 824 W/m² */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Solar Irradiance
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {kpis.solarIrradiance}
              </span>
              <span className="text-sm font-semibold text-slate-500">W/m²</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Class A Pyranometer · GHI Level
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.solarIrradiance / 1000) * 100)}%` }}
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Energy Generated: 1,248 kWh */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Energy Generated
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {kpis.totalEnergyToday.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-slate-500">kWh</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Daily Cumulative Generation Index
            </p>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (kpis.totalEnergyToday / 1500) * 100)}%` }}
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Efficiency: 86.4% */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left relative overflow-hidden sm:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Efficiency (Performance Ratio)
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
            <div>
              <span className="text-3xl font-extrabold text-blue-700 tabular-nums">
                {kpis.systemEfficiency.toFixed(1)}%
              </span>
              <span className="text-xs font-normal text-slate-500 ml-2 font-sans">
                (Actual / Expected × 100)
              </span>
            </div>
            <div className="text-xs text-slate-600 font-sans">
              Status: <strong className="text-emerald-700">GOOD</strong> · Loss Factor: {kpis.energyLoss} kW
            </div>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              style={{ width: `${kpis.systemEfficiency}%` }}
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Real-time telemetry graph & Inverter stage diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Continuous Telemetry Stream
              </h2>
              <p className="text-xs text-slate-500">
                Live sensor polling synchronized every 3 seconds (Simulated Data Stream)
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Active Speed: {isSimulating ? 'Streaming' : 'Paused'}
            </span>
          </div>
          <LivePowerChart data={hourlyPower} filter="today" />
        </div>

        {/* Physical Conversion Chain Diagram */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-left space-y-4">
          <h2 className="text-base font-bold text-slate-900">Conversion Architecture</h2>
          <p className="text-xs text-slate-500">
            Real-time stage-by-stage electrical transformation efficiency
          </p>

          <div className="space-y-3 text-xs">
            {/* Stage 1: Solar Irradiance */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  1. Solar Input
                </span>
                <span className="font-mono">{kpis.solarIrradiance} W/m²</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Theoretical incident solar power: 10.0 kW equivalent
              </p>
            </div>

            {/* Stage 2: DC Array Generation */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-500" />
                  2. DC Output
                </span>
                <span className="font-mono">{kpis.voltage.toFixed(0)}V × {kpis.current.toFixed(1)}A</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                DC Array power: {(kpis.voltage * kpis.current / 1000).toFixed(2)} kW
              </p>
            </div>

            {/* Stage 3: Inverter AC Conversion */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  3. Inverter AC Grid
                </span>
                <span className="font-mono text-emerald-700">{kpis.currentPower.toFixed(2)} kW AC</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Inverter Efficiency: 97.8% · Frequency: 50.02 Hz
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Grid Synchronization Nominal</span>
            </div>
            <p className="text-[11px] mt-1 text-emerald-700">
              Power factor: 0.99 (Cos φ) · Pure sine wave AC output
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
