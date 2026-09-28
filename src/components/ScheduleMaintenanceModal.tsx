import React, { useState } from 'react';
import { useSolar } from '../context/SolarContext';
import { X, Wrench, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';

interface ScheduleMaintenanceModalProps {
  initialPanelId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleMaintenanceModal: React.FC<ScheduleMaintenanceModalProps> = ({
  initialPanelId,
  isOpen,
  onClose,
}) => {
  const { panels, scheduleMaintenance } = useSolar();

  const [panelId, setPanelId] = useState(initialPanelId || panels[0]?.id || 'P01');
  const [issue, setIssue] = useState('Surface Soiling & Sensor Calibration');
  const [priority, setPriority] = useState<'Routine' | 'Urgent' | 'Scheduled'>('Scheduled');
  const [technician, setTechnician] = useState('Eng. Rajesh Sharma');
  const [nextDate, setNextDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('Perform high-pressure demineralized wash and check terminal box seals.');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMaintenance({
      panelId,
      issue,
      priority,
      technician,
      lastMaintenance: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      nextMaintenance: nextDate,
      status: 'Pending',
      notes,
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Schedule Solar Panel Maintenance
              </h3>
              <p className="text-xs text-slate-500">
                Create service ticket & assign maintenance engineer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Maintenance Work Order Created</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Work order dispatched for {panelId}. Status updated to MAINTENANCE and technician notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Panel Selector */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Target Solar Panel
              </label>
              <select
                value={panelId}
                onChange={e => setPanelId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {panels.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.id}) – {p.status} · Current Output: {p.power} kW
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Issue / Service Description
              </label>
              <input
                type="text"
                required
                value={issue}
                onChange={e => setIssue(e.target.value)}
                placeholder="e.g. Low Efficiency & Dust Soiling"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Priority */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Routine">Routine (Low)</option>
                  <option value="Scheduled">Scheduled (Medium)</option>
                  <option value="Urgent">Urgent (High)</option>
                </select>
              </div>

              {/* Next Maintenance Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Scheduled Service Date
                </label>
                <input
                  type="date"
                  required
                  value={nextDate}
                  onChange={e => setNextDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Assigned Technician */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Assigned Technician / Lead
              </label>
              <input
                type="text"
                required
                value={technician}
                onChange={e => setTechnician(e.target.value)}
                placeholder="e.g. Eng. Rajesh Sharma"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Field Instructions & Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
              >
                Create Work Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
