import React from 'react';
import { useSolar } from '../context/SolarContext';
import {
  Play,
  Pause,
  CloudSun,
  Sun,
  Flame,
  CloudRain,
  AlertTriangle,
  RotateCcw,
  Zap,
  CheckCircle,
  HelpCircle,
  X,
} from 'lucide-react';
import { WeatherScenario } from '../types/solar';

interface DemoSimulationBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoSimulationBar: React.FC<DemoSimulationBarProps> = ({ isOpen, onClose }) => {
  const {
    isSimulating,
    toggleSimulation,
    weatherScenario,
    setWeatherScenario,
    simulationSpeed,
    setSimulationSpeed,
    triggerAnomaly,
    resetToDefaults,
  } = useSolar();

  if (!isOpen) return null;

  return (
    <div className="bg-slate-900 text-white border-b border-slate-700 px-4 py-3 text-xs shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Indicator & Description */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-emerald-500/20 text-emerald-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wider text-emerald-400 text-[11px]">
                Faculty & Guest Demo Control Center
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                Interactive CEP Sandbox
              </span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Simulate sensor inputs, environmental weather shifts, and live fault triggers in real time.
            </p>
          </div>
        </div>

        {/* Center / Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Play */}
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold transition-colors ${
              isSimulating
                ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimulating ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            {([1, 2, 5] as const).map(speed => (
              <button
                key={speed}
                onClick={() => setSimulationSpeed(speed)}
                className={`px-2 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                  simulationSpeed === speed
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Weather Presets */}
          <div className="flex items-center bg-slate-800 rounded p-0.5 border border-slate-700">
            <button
              onClick={() => setWeatherScenario('optimal')}
              title="Optimal Sunlight (824 W/m², 42°C nominal)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                weatherScenario === 'optimal'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Optimal</span>
            </button>
            <button
              onClick={() => setWeatherScenario('partly_cloudy')}
              title="Partly Cloudy (Oscillating irradiance 600-750 W/m²)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                weatherScenario === 'partly_cloudy'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CloudSun className="w-3 h-3 text-blue-300" />
              <span>Cloudy</span>
            </button>
            <button
              onClick={() => setWeatherScenario('high_temp')}
              title="Extreme Thermal Load (51°C, thermal derating)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                weatherScenario === 'high_temp'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>High Heat</span>
            </button>
            <button
              onClick={() => setWeatherScenario('overcast')}
              title="Overcast / Low Irradiance (~320 W/m²)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                weatherScenario === 'overcast'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CloudRain className="w-3 h-3 text-sky-300" />
              <span>Overcast</span>
            </button>
          </div>

          {/* Fault Injections for viva demonstration */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => triggerAnomaly('P03', 'overheat')}
              className="px-2 py-1.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[11px] font-medium transition-colors"
              title="Simulate thermal hotspot on Panel 03"
            >
              + Fault: P03 Overheat
            </button>
            <button
              onClick={() => triggerAnomaly('P05', 'dust')}
              className="px-2 py-1.5 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800 text-[11px] font-medium transition-colors"
              title="Simulate dust soiling on Panel 05"
            >
              + Fault: P05 Soiling
            </button>
            <button
              onClick={resetToDefaults}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Reset all panels to default state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 shrink-0"
          title="Minimize Demo Controls"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
