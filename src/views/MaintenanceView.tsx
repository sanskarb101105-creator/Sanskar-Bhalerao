import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import {
  Wrench,
  Calendar,
  CheckCircle,
  Clock,
  Plus,
  AlertCircle,
  Search,
  User,
  Check,
  CheckCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { ScheduleMaintenanceModal } from '../components/ScheduleMaintenanceModal';

export const MaintenanceView: React.FC = () => {
  const { maintenance, completeMaintenance, setSelectedPanel, panels } = useSolar();

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Pending' | 'In Progress' | 'Completed'>('ALL');
  const [search, setSearch] = useState('');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const filteredRecords = maintenance.filter(m => {
    const matchesFilter = filterStatus === 'ALL' || m.status === filterStatus;
    const matchesSearch =
      m.panelId.toLowerCase().includes(search.toLowerCase()) ||
      m.issue.toLowerCase().includes(search.toLowerCase()) ||
      m.technician.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = maintenance.filter(m => m.status === 'Pending').length;
  const inProgressCount = maintenance.filter(m => m.status === 'In Progress').length;
  const completedCount = maintenance.filter(m => m.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Preventive & Corrective Maintenance Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Service schedules, technician work orders, and field repair verification ledgers
          </p>
        </div>

        {/* Schedule Maintenance Button */}
        <button
          onClick={() => setScheduleModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Schedule Maintenance</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Pending Work Orders
            </span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-800 mt-2 font-mono">{pendingCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Awaiting field dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              In Progress
            </span>
            <Wrench className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-800 mt-2 font-mono">{inProgressCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Technicians actively on-site</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Completed Records
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-800 mt-2 font-mono">{completedCount}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Verified & calibrated</span>
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
            placeholder="Search Panel ID, issue, or technician..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          {(['ALL', 'Pending', 'In Progress', 'Completed'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                filterStatus === st
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Maintenance Table / Records List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 text-left">Panel ID</th>
                <th className="py-3.5 px-4 text-left">Diagnostic Issue</th>
                <th className="py-3.5 px-4 text-left">Assigned Lead</th>
                <th className="py-3.5 px-4 text-left">Last Service</th>
                <th className="py-3.5 px-4 text-left">Next Service</th>
                <th className="py-3.5 px-4 text-left">Maintenance Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No maintenance records found for the current query
                  </td>
                </tr>
              ) : (
                filteredRecords.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    {/* Panel ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <button
                        onClick={() => {
                          const p = panels.find(x => x.id === m.panelId);
                          if (p) setSelectedPanel(p);
                        }}
                        className="text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5"
                      >
                        <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-[10px]">
                          {m.panelId}
                        </span>
                        <span>Panel {m.panelId.replace('P', '')}</span>
                      </button>
                    </td>

                    {/* Issue */}
                    <td className="py-3.5 px-4 text-slate-800 font-medium max-w-xs">
                      <div className="truncate">{m.issue}</div>
                      {m.notes && (
                        <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                          {m.notes}
                        </div>
                      )}
                    </td>

                    {/* Technician */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{m.technician}</span>
                      </div>
                    </td>

                    {/* Last Service */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono">{m.lastMaintenance}</td>

                    {/* Next Service */}
                    <td className="py-3.5 px-4 text-slate-800 font-mono font-medium">
                      {m.nextMaintenance}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          m.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : m.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {m.status === 'Completed' ? (
                          <CheckCheck className="w-3 h-3 text-emerald-600" />
                        ) : m.status === 'In Progress' ? (
                          <Wrench className="w-3 h-3 text-blue-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        {m.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Details */}
                        <button
                          onClick={() => {
                            const p = panels.find(x => x.id === m.panelId);
                            if (p) setSelectedPanel(p);
                          }}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded border border-slate-200 font-medium"
                        >
                          View
                        </button>

                        {/* Mark as Completed */}
                        {m.status !== 'Completed' ? (
                          <button
                            onClick={() => completeMaintenance(m.id, 'Routine check completed, glass cleaned and calibrated.')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium shadow-xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark Completed</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-semibold px-2">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Maintenance Modal Component */}
      <ScheduleMaintenanceModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
};
