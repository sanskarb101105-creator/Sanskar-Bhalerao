import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import { SolarPanel, PanelStatus } from '../types/solar';
import {
  Search,
  Filter,
  Grid,
  List,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Zap,
  Thermometer,
  Gauge,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const SolarPanelsView: React.FC = () => {
  const { panels, setSelectedPanel, searchTerm, setSearchTerm, panelFilter, setPanelFilter } =
    useSolar();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter panels based on search and status
  const filteredPanels = panels.filter(p => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = panelFilter === 'ALL' || p.status === panelFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: PanelStatus) => {
    switch (status) {
      case 'NORMAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            NORMAL
          </span>
        );
      case 'WARNING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3 h-3" />
            WARNING
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Wrench className="w-3 h-3" />
            MAINTENANCE
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Individual Solar Panel Fleet
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time individual panel diagnostic telemetry, efficiency ratings, and service records
          </p>
        </div>

        {/* Fleet Count Summary */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
            10 Normal
          </span>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-medium">
            1 Warning
          </span>
          <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium">
            1 Maintenance
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Panel ID, name, or location..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
        </div>

        {/* Status Filters & View Mode */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['ALL', 'NORMAL', 'WARNING', 'MAINTENANCE'] as const).map(status => (
              <button
                key={status}
                onClick={() => setPanelFilter(status)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  panelFilter === status
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status === 'ALL' ? 'All (12)' : status}
              </button>
            ))}
          </div>

          {/* Grid vs Table Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Panels Display: Grid or Table */}
      {filteredPanels.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Filter className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No panels match the selected filters</h3>
          <p className="text-xs text-slate-400 mt-1">Try clearing your search term or status filter</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setPanelFilter('ALL');
            }}
            className="mt-4 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPanels.map(panel => (
            <div
              key={panel.id}
              onClick={() => setSelectedPanel(panel)}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group text-left"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                      {panel.id}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {panel.name}
                      </h3>
                      <p className="text-[10px] text-slate-400">Row {panel.row} · Col {panel.col}</p>
                    </div>
                  </div>
                  {getStatusBadge(panel.status)}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Power</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      {panel.power.toFixed(2)} kW
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Efficiency</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">
                      {panel.efficiency.toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Temperature</span>
                    <span
                      className={`font-bold font-mono text-sm ${
                        panel.temperature > 45 ? 'text-rose-600' : 'text-slate-900'
                      }`}
                    >
                      {panel.temperature}°C
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 block font-medium">Energy</span>
                    <span className="font-bold text-emerald-700 font-mono text-sm">
                      {panel.energyToday.toFixed(1)} kWh
                    </span>
                  </div>
                </div>

                {/* Diagnostic Issue Note if any */}
                {panel.issueDescription && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 line-clamp-2 mb-2">
                    {panel.issueDescription}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>V: {panel.voltage}V · I: {panel.current}A</span>
                <span className="text-emerald-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Inspect <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 text-left">Panel ID</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-right">Power (kW)</th>
                  <th className="py-3 px-4 text-right">Voltage (V)</th>
                  <th className="py-3 px-4 text-right">Current (A)</th>
                  <th className="py-3 px-4 text-right">Temp (°C)</th>
                  <th className="py-3 px-4 text-right">Efficiency (%)</th>
                  <th className="py-3 px-4 text-right">Energy (kWh)</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {filteredPanels.map(p => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPanel(p)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 font-sans flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-900 text-white text-[10px] flex items-center justify-center font-mono">
                        {p.id}
                      </span>
                      {p.name}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-sans">{p.location}</td>
                    <td className="py-3 px-4 font-sans">{getStatusBadge(p.status)}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {p.power.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">{p.voltage.toFixed(1)}</td>
                    <td className="py-3 px-4 text-right text-slate-600">{p.current.toFixed(1)}</td>
                    <td
                      className={`py-3 px-4 text-right font-bold ${
                        p.temperature > 45 ? 'text-rose-600' : 'text-slate-800'
                      }`}
                    >
                      {p.temperature}°C
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-blue-700">
                      {p.efficiency.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-bold">
                      {p.energyToday.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-center font-sans">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedPanel(p);
                        }}
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
