import React from 'react';
import { SolarPanel } from '../types/solar';
import {
  X,
  Zap,
  Thermometer,
  Sun,
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Gauge,
  TrendingUp,
} from 'lucide-react';

interface PanelDetailModalProps {
  panel: SolarPanel | null;
  onClose: () => void;
  onScheduleMaintenance: (panelId: string) => void;
}

export const PanelDetailModal: React.FC<PanelDetailModalProps> = ({
  panel,
  onClose,
  onScheduleMaintenance,
}) => {
  if (!panel) return null;

  const statusColors = {
    NORMAL: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle,
      text: 'NORMAL',
    },
    WARNING: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      text: 'WARNING',
    },
    MAINTENANCE: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Wrench,
      text: 'MAINTENANCE',
    },
  };

  const statusInfo = statusColors[panel.status];
  const StatusIcon = statusInfo.icon;

  // Max power in history for micro graph scaling
  const maxHistPower = Math.max(...panel.history.map(h => h.power), 1.5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              {panel.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{panel.name}</h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.badge}`}
                >
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.text}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{panel.location}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Issue Notice if warning or maintenance */}
          {panel.issueDescription && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                panel.status === 'WARNING'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-800'
                  : 'bg-rose-50/70 border-rose-200 text-rose-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Diagnostic Advisory:</span>
                <span className="mt-0.5 block">{panel.issueDescription}</span>
              </div>
            </div>
          )}

          {/* Telemetry Metric Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Power Output */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Power Output
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.power.toFixed(2)}{' '}
                <span className="text-xs font-normal text-slate-500">kW</span>
              </p>
              <span className="text-[10px] text-slate-400">P = V × I</span>
            </div>

            {/* Efficiency */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                Efficiency
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.efficiency.toFixed(1)}%
              </p>
              <span className="text-[10px] text-slate-400">Actual vs rated</span>
            </div>

            {/* Voltage */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                Voltage
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.voltage.toFixed(1)}{' '}
                <span className="text-xs font-normal text-slate-500">V</span>
              </p>
              <span className="text-[10px] text-slate-400">Vmp nominal: 41.0V</span>
            </div>

            {/* Current */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Activity className="w-3.5 h-3.5 text-indigo-500" />
                Current
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.current.toFixed(1)}{' '}
                <span className="text-xs font-normal text-slate-500">A</span>
              </p>
              <span className="text-[10px] text-slate-400">Imp string current</span>
            </div>

            {/* Temperature */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Thermometer
                  className={`w-3.5 h-3.5 ${
                    panel.temperature > 45 ? 'text-rose-500' : 'text-slate-500'
                  }`}
                />
                Temperature
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.temperature}°C
              </p>
              <span className="text-[10px] text-slate-400">Thermal threshold: 45°C</span>
            </div>

            {/* Solar Irradiance */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                Irradiance
              </span>
              <p className="text-lg font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {panel.irradiance}{' '}
                <span className="text-xs font-normal text-slate-500">W/m²</span>
              </p>
              <span className="text-[10px] text-slate-400">Pyranometer input</span>
            </div>

            {/* Energy Generated Today */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 col-span-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Energy Generated Today
              </span>
              <p className="text-lg font-bold text-emerald-700 mt-1 font-mono tabular-nums">
                {panel.energyToday.toFixed(1)}{' '}
                <span className="text-xs font-normal text-slate-500">kWh</span>
              </p>
              <span className="text-[10px] text-slate-400">Cumulative array share</span>
            </div>
          </div>

          {/* Micro Performance Graph */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Panel Performance History Curve
                </h4>
                <p className="text-[11px] text-slate-500">
                  Recent power output (kW) & temperature correlation
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Peak: {Math.max(...panel.history.map(h => h.power)).toFixed(2)} kW
              </span>
            </div>

            {/* SVG Visual Representation */}
            <div className="h-32 w-full pt-2">
              <div className="flex items-end justify-between h-24 gap-1.5 px-2 border-b border-slate-200">
                {panel.history.map((pt, idx) => {
                  const heightPercent = Math.min(100, Math.max(10, (pt.power / maxHistPower) * 100));
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-md pointer-events-none whitespace-nowrap z-20 font-mono">
                        {pt.time}: {pt.power} kW | {pt.temperature}°C
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t-sm transition-all duration-300 ${
                          panel.status === 'WARNING'
                            ? 'bg-amber-500/80 group-hover:bg-amber-600'
                            : panel.status === 'MAINTENANCE'
                            ? 'bg-rose-500/80 group-hover:bg-rose-600'
                            : 'bg-emerald-500/80 group-hover:bg-emerald-600'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5 px-2">
                <span>{panel.history[0]?.time || '08:00'}</span>
                <span>Midday Peak</span>
                <span>{panel.history[panel.history.length - 1]?.time || 'Now'}</span>
              </div>
            </div>
          </div>

          {/* Maintenance Metadata Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Last Service Record</span>
                <strong className="text-slate-800 font-medium">{panel.lastMaintenance}</strong>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <Wrench className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-500 block">Next Scheduled Service</span>
                <strong className="text-slate-800 font-medium">{panel.nextMaintenance}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <button
            onClick={() => {
              onScheduleMaintenance(panel.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Schedule Maintenance</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
