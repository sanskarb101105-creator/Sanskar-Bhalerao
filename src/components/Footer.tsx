import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-5 px-4 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center">
            <Sun className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-slate-800">
              SolarPulse – Solar Panel Performance Monitoring System
            </span>
            <span className="mx-2 text-slate-300">·</span>
            <span className="text-slate-600 font-medium">CEP Practical Project</span>
            <span className="mx-2 text-slate-300">·</span>
            <span>© 2026</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            DEMO MODE – Simulated Sensor Data
          </span>
          <span className="hidden sm:inline text-slate-400">
            For college demonstration & technical evaluation
          </span>
        </div>
      </div>
    </footer>
  );
};
