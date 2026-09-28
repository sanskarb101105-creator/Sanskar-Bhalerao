import React from 'react';
import { useSolar } from '../context/SolarContext';
import {
  ShieldCheck,
  Server,
  Database,
  Radio,
  Cpu,
  Sun,
  MapPin,
  CheckCircle,
  Activity,
  Layers,
  Info,
  Calendar,
  Zap,
} from 'lucide-react';

export const SystemInfoView: React.FC = () => {
  const { kpis, panels } = useSolar();

  const healthItems = [
    { name: 'Solar Panels Fleet', status: 'ONLINE', detail: '12 / 12 strings transmitting telemetry', icon: Sun },
    { name: 'Environmental Sensors', status: 'ONLINE', detail: 'Class A pyranometer & RTD temp probes active', icon: Radio },
    { name: 'Data Collection Gateway', status: 'ONLINE', detail: 'Modbus RTU / RS485 loop polling every 3s', icon: Cpu },
    { name: 'Monitoring Server', status: 'ONLINE', detail: 'Local node runtime responsive (<5ms latency)', icon: Server },
    { name: 'Database & Storage', status: 'ONLINE', detail: 'Client-side telemetry cache & log repository', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            System Information & Plant Health Diagnostic
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            CEP demonstration specifications, hardware architecture, and telemetry infrastructure health
          </p>
        </div>

        {/* Demo Mode Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE DEMO MODE
          </span>
        </div>
      </div>

      {/* 17. SYSTEM HEALTH SECTION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Diagnostic Health Monitor
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Infrastructure Subsystem Telemetry
            </h2>
          </div>

          {/* Overall System Health Status */}
          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                Overall System Health
              </span>
              <span className="text-base font-extrabold text-emerald-800 font-mono">
                {kpis.systemHealth}
              </span>
            </div>
          </div>
        </div>

        {/* Health Item Rows */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-5">
          {healthItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-tight">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 18. SYSTEM INFORMATION SPECIFICATION GRID */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Technical Specifications & CEP Project Metadata
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Architectural parameters formulated for the college demonstration viva and evaluation jury
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Project Name */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Project Name:</span>
            <strong className="text-sm font-bold text-slate-900 mt-1 block">
              Solar Panel Performance Monitoring System
            </strong>
            <span className="text-[11px] text-emerald-700 mt-1 block font-medium">
              SolarPulse Platform
            </span>
          </div>

          {/* Installed Capacity */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Installed Capacity:</span>
            <strong className="text-xl font-bold text-slate-900 mt-1 font-mono block">
              10 kWp (Kilowatt-peak)
            </strong>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Grid-tied dual MPPT inverter setup
            </span>
          </div>

          {/* Number of Panels */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Number of Panels:</span>
            <strong className="text-xl font-bold text-slate-900 mt-1 font-mono block">
              12 Photovoltaic Modules
            </strong>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Configured as 2 Strings of 6 Panels each
            </span>
          </div>

          {/* Panel Type */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Panel Type:</span>
            <strong className="text-sm font-bold text-slate-900 mt-1 block">
              Monocrystalline Silicon (Half-Cut)
            </strong>
            <span className="text-[11px] text-slate-500 mt-1 block">
              High efficiency PERC cell structure
            </span>
          </div>

          {/* Monitoring Mode */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Monitoring Mode:</span>
            <strong className="text-sm font-bold text-emerald-700 mt-1 block">
              Real-Time Demo Mode
            </strong>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Continuous 3-second sensor polling loop
            </span>
          </div>

          {/* Location */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Physical Location:</span>
            <strong className="text-sm font-bold text-slate-900 mt-1 block">
              Solar Farm / College Demonstration Site
            </strong>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Rooftop Renewable Energy Laboratory
            </span>
          </div>

          {/* Data Source */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2 lg:col-span-3">
            <span className="text-slate-400 font-medium block">Data Source:</span>
            <strong className="text-sm font-bold text-slate-900 mt-1 block">
              Simulated Sensor Data (Mathematical Photovoltaic Model)
            </strong>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Due to physical laboratory hardware constraints, telemetry is generated via an IEC 61724 grounded simulation engine taking into account irradiance variation, temperature coefficients (-0.4%/°C), and electrical Ohm’s Law dynamics (P = V × I).
            </p>
          </div>
        </div>
      </div>

      {/* College CEP Practical Project Notice Box */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase">
                CEP Project
              </span>
              <h3 className="text-sm font-bold text-white">
                Demonstration Guide for College Guests & Faculty
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Department of Electrical & Renewable Energy · Academic Year 2026
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div>
            <strong className="text-white block mb-1">1. Live Dynamic Polling:</strong>
            <p className="text-slate-400 text-[11px]">
              Witness live updates every 3 seconds across power, voltage, and irradiance meters.
            </p>
          </div>
          <div>
            <strong className="text-white block mb-1">2. Fault Injection Demo:</strong>
            <p className="text-slate-400 text-[11px]">
              Click &apos;Simulation Controls&apos; in the top bar to trigger high temperature alerts on Panel 03.
            </p>
          </div>
          <div>
            <strong className="text-white block mb-1">3. Reports & Audits:</strong>
            <p className="text-slate-400 text-[11px]">
              Generate real downloadable CSV and printable PDF audit ledgers in Energy Reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
