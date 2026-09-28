import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import { AlertSeverity, AlertStatus } from '../types/solar';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Check,
  CheckCheck,
  ShieldAlert,
  Flame,
  Zap,
  TrendingDown,
  Wrench,
  Activity,
  PlusCircle,
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, triggerAnomaly, setSelectedPanel, panels } =
    useSolar();

  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | AlertSeverity>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AlertStatus>('ALL');

  // Filter alerts
  const filteredAlerts = alerts.filter(a => {
    const matchesSearch =
      a.panelId.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const activeCount = alerts.filter(a => a.status === 'Active').length;
  const ackCount = alerts.filter(a => a.status === 'Acknowledged').length;
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Active
          </span>
        );
      case 'Acknowledged':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Check className="w-3 h-3" />
            Acknowledged
          </span>
        );
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCheck className="w-3 h-3" />
            Resolved
          </span>
        );
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'HIGH TEMPERATURE':
        return <Flame className="w-4 h-4 text-rose-600" />;
      case 'LOW POWER OUTPUT':
        return <TrendingDown className="w-4 h-4 text-amber-600" />;
      case 'EFFICIENCY DROP':
        return <Activity className="w-4 h-4 text-amber-600" />;
      case 'ABNORMAL VOLTAGE':
        return <Zap className="w-4 h-4 text-indigo-600" />;
      case 'MAINTENANCE REQUIRED':
        return <Wrench className="w-4 h-4 text-slate-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            System Fault & Alert Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated sensor threshold detection, severity triage, and engineering acknowledgement workflows
          </p>
        </div>

        {/* Demo trigger anomaly button for College Demo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerAnomaly('P03', 'overheat')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Trigger Demo Fault (P03 Overheat)</span>
          </button>
        </div>
      </div>

      {/* Alert Stats Top Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Incident Logs
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1 font-mono">{alerts.length}</p>
          <span className="text-[10px] text-slate-400">All recorded triggers</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
            Active Alerts
          </span>
          <p className="text-2xl font-extrabold text-rose-600 mt-1 font-mono">{activeCount}</p>
          <span className="text-[10px] text-slate-400">Awaiting engineering action</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            Acknowledged
          </span>
          <p className="text-2xl font-extrabold text-blue-600 mt-1 font-mono">{ackCount}</p>
          <span className="text-[10px] text-slate-400">Technician dispatched</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            Resolved
          </span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">{resolvedCount}</p>
          <span className="text-[10px] text-slate-400">Verified nominal state</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Alert, Panel ID or description..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(sev => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  severityFilter === sev
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['ALL', 'Active', 'Acknowledged', 'Resolved'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs text-left">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No alerts match current criteria</h3>
            <p className="text-xs text-slate-400 mt-1">Select &apos;ALL&apos; or trigger a simulated fault</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  alert.status === 'Active'
                    ? alert.severity === 'HIGH'
                      ? 'bg-rose-50/40 hover:bg-rose-50/70'
                      : 'bg-amber-50/30 hover:bg-amber-50/60'
                    : 'hover:bg-slate-50'
                }`}
              >
                {/* Left: Icon, Details, and Message */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      alert.severity === 'HIGH'
                        ? 'bg-rose-100 text-rose-700'
                        : alert.severity === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {getAlertIcon(alert.type)}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{alert.title}</span>
                      <button
                        onClick={() => {
                          const p = panels.find(x => x.id === alert.panelId);
                          if (p) setSelectedPanel(p);
                        }}
                        className="font-mono text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                        title="View Panel Details"
                      >
                        {alert.panelId}
                      </button>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                      <span>·</span>
                      <span>Incident ID: {alert.id}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {alert.status === 'Active' && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Acknowledge</span>
                    </button>
                  )}

                  {alert.status !== 'Resolved' && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark Resolved</span>
                    </button>
                  )}

                  {alert.status === 'Resolved' && (
                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 px-3 py-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
