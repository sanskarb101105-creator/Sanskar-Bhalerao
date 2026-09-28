import React from 'react';
import { useSolar } from '../context/SolarContext';
import {
  LayoutDashboard,
  Activity,
  Layers,
  Grid,
  TrendingUp,
  AlertTriangle,
  FileText,
  Wrench,
  Info,
  LogOut,
  Radio,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  mobileOpen,
  setMobileOpen,
}) => {
  const { alerts, logout, isSimulating } = useSolar();

  const activeAlertCount = alerts.filter(a => a.status === 'Active').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-monitoring', label: 'Live Monitoring', icon: Activity },
    { id: 'solar-panels', label: 'Solar Panels', icon: Layers },
    { id: 'plant-overview', label: 'Plant Layout', icon: Grid },
    { id: 'performance', label: 'Performance Analysis', icon: TrendingUp },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertTriangle,
      badge: activeAlertCount > 0 ? activeAlertCount : undefined,
    },
    { id: 'reports', label: 'Energy Reports', icon: FileText },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'system-info', label: 'System Information', icon: Info },
  ];

  const handleSelect = (id: string) => {
    setActiveView(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 z-40 h-full lg:h-[calc(100vh-57px)] w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-3 py-4">
          {/* Mobile Top Header */}
          <div className="flex items-center justify-between px-3 mb-4 lg:hidden">
            <span className="text-sm font-bold text-white tracking-wide">
              SOLARPULSE MONITOR
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
            >
              ✕ Close
            </button>
          </div>

          {/* Plant Operational Status Card */}
          <div className="px-3 py-3 mb-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 font-medium">Monitoring Link</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Array Capacity:</span>
              <strong className="text-white font-mono">10.0 kWp</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300 mt-1">
              <span>Monitored Panels:</span>
              <strong className="text-white font-mono">12 Units</strong>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-emerald-700'
                          : 'bg-rose-500/90 text-white shadow-xs'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Demo Indicator & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950/40">
          {/* Visible Demo Mode Callout required by prompt */}
          <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LIVE DEMO MODE</span>
            </div>
            <p className="text-slate-400 leading-tight text-[10px]">
              Simulated Sensor Data · College CEP Practical Demonstration
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
