import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  TrendingUp,
  Gauge,
  Zap,
  CheckCircle,
  Table,
  Filter,
} from 'lucide-react';
import { EnergyGenerationChart } from '../components/SolarCharts';
import { WEEKLY_ENERGY_DATA, MONTHLY_ENERGY_DATA } from '../data/initialData';

export const EnergyReportsView: React.FC = () => {
  const { kpis, panels } = useSolar();
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Generate and download real CSV
  const handleDownloadCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'SOLARPULSE ENERGY MONITORING AUDIT REPORT\n';
    csvContent += `Generated On,${new Date().toISOString()}\n`;
    csvContent += `Plant Capacity,10 kWp Monocrystalline Array\n`;
    csvContent += `Total Energy Today (kWh),${kpis.totalEnergyToday}\n`;
    csvContent += `Current Power (kW),${kpis.currentPower}\n`;
    csvContent += `System Efficiency (%),${kpis.systemEfficiency}\n`;
    csvContent += `CO2 Offset (kg),${kpis.co2SavedKg}\n\n`;

    csvContent += 'PANEL LEVEL AUDIT DATA\n';
    csvContent += 'Panel ID,Panel Name,Status,Power (kW),Voltage (V),Current (A),Temp (C),Efficiency (%),Energy Today (kWh),Last Maintenance\n';

    panels.forEach(p => {
      csvContent += `${p.id},"${p.name}",${p.status},${p.power},${p.voltage},${p.current},${p.temperature},${p.efficiency},${p.energyToday},"${p.lastMaintenance}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SolarPulse_Audit_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadNotice('CSV Report successfully generated and downloaded.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  // Generate and download / print PDF
  const handleDownloadPDF = () => {
    // Open system print preview tailored by @media print
    window.print();
    setDownloadNotice('PDF Print dialog initiated. Select "Save as PDF" to export.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Energy Generation & Audit Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Export certified energy generation ledgers, carbon offset certifications, and fleet performance metrics
          </p>
        </div>

        {/* Real Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>DOWNLOAD CSV</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>DOWNLOAD PDF / PRINT</span>
          </button>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* 16. SIX CORE REPORT METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-left">
        {/* Daily Energy */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Daily Energy
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            {kpis.totalEnergyToday.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-500">kWh</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            ↑ 8.4% vs target
          </span>
        </div>

        {/* Weekly Energy */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Weekly Energy
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            8,553 <span className="text-xs font-normal text-slate-500">kWh</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Past 7 days yield</span>
        </div>

        {/* Monthly Energy */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Monthly Energy
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            33,813 <span className="text-xs font-normal text-slate-500">kWh</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Current billing month</span>
        </div>

        {/* Average Efficiency */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Average Efficiency
          </span>
          <div className="text-xl font-bold text-blue-700 mt-1 font-mono">
            {kpis.systemEfficiency.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">PR Standard: GOOD</span>
        </div>

        {/* Maximum Power */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Maximum Power
          </span>
          <div className="text-xl font-bold text-emerald-700 mt-1 font-mono">
            {kpis.peakPowerToday.toFixed(2)}{' '}
            <span className="text-xs font-normal text-slate-500">kW</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Peak generation today</span>
        </div>

        {/* Total Energy Generated */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Generated
          </span>
          <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
            418.5 <span className="text-xs font-normal text-slate-500">MWh</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Plant Lifetime Total
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Comparative Energy Harvest Ledger
            </h2>
            <p className="text-xs text-slate-500">
              Actual harvested energy vs expected baseline yields
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg no-print">
            {(['daily', 'weekly', 'monthly'] as const).map(p => (
              <button
                key={p}
                onClick={() => setReportPeriod(p)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  reportPeriod === p
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p === 'daily' ? 'Daily' : p === 'weekly' ? 'Weekly' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        <EnergyGenerationChart
          filter={reportPeriod === 'daily' ? 'today' : reportPeriod === 'weekly' ? 'week' : 'month'}
        />
      </div>

      {/* Audit Data Table for download/print */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-left">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Module Level Performance Audit Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Certified readings exported for faculty evaluation and college CEP archives
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">12 Verified Channels</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 text-left">Module ID</th>
                <th className="py-3 px-4 text-left">Installation String</th>
                <th className="py-3 px-4 text-left">Operational State</th>
                <th className="py-3 px-4 text-right">Power (kW)</th>
                <th className="py-3 px-4 text-right">Voltage (V)</th>
                <th className="py-3 px-4 text-right">Current (A)</th>
                <th className="py-3 px-4 text-right">Temp (°C)</th>
                <th className="py-3 px-4 text-right">Efficiency (%)</th>
                <th className="py-3 px-4 text-right">Energy (kWh)</th>
                <th className="py-3 px-4 text-right">Last Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {panels.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 font-sans">{p.name} ({p.id})</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{p.location}</td>
                  <td className="py-3 px-4 font-sans font-semibold">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        p.status === 'NORMAL'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'WARNING'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{p.power.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{p.voltage.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{p.current.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right text-slate-800">{p.temperature}°C</td>
                  <td className="py-3 px-4 text-right font-bold text-blue-700">{p.efficiency.toFixed(1)}%</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">{p.energyToday.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right text-slate-500 font-sans">{p.lastMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
