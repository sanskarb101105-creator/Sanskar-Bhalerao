import React, { useState, useEffect, useRef } from 'react';
import { useSolar } from '../context/SolarContext';
import {
  Sun,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Calendar,
  LogOut,
  ChevronDown,
  Activity,
  Sliders,
  Check,
} from 'lucide-react';

interface TopNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  toggleSimDrawer: () => void;
  isSimDrawerOpen: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeView,
  setActiveView,
  toggleSimDrawer,
  isSimDrawerOpen,
}) => {
  const {
    user,
    logout,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    alerts,
    kpis,
    isSimulating,
  } = useSolar();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Live ticking clock
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  const activeAlertCount = alerts.filter(a => a.status === 'Active').length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-3 select-none">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand Identity & Active Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Sun className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  SolarPulse
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  CEP Project
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Solar Panel Performance Monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Center: System Status & Live Clock */}
        <div className="hidden lg:flex items-center gap-5 text-xs text-slate-600">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800">SYSTEM: ONLINE</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-medium">10 kW Plant</span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3 text-slate-600 font-mono tabular-nums">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentDate}</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Right: Actions, Simulation Controls, Notifications & Profile */}
        <div className="flex items-center gap-2.5">
          {/* Demo Controls Drawer Toggle */}
          <button
            onClick={toggleSimDrawer}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isSimDrawerOpen
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Configure Sensor Simulation & Weather"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulation Controls</span>
            {isSimulating ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              aria-label="View notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 text-left">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No notifications available
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3 ${
                          !n.read ? 'bg-slate-50/70' : ''
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {n.type === 'alert' && (
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                          )}
                          {n.type === 'success' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {n.type === 'info' && <Info className="w-4 h-4 text-blue-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                            {n.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Active System Alerts: <strong className="text-slate-800">{activeAlertCount}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveView('alerts');
                      setShowNotifications(false);
                    }}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold"
                  >
                    View All Alerts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 leading-tight">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  {user?.role || 'Plant Supervisor'}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 text-left">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                  <p className="text-[11px] text-slate-500">{user?.department}</p>
                  <p className="text-[10px] text-emerald-700 mt-1 font-medium">
                    Demo Mode · Role: {user?.role}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setActiveView('system-info');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Activity className="w-3.5 h-3.5 text-slate-500" />
                    System Specifications
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('reports');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Export Energy Audit
                  </button>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out (Demo Login)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
