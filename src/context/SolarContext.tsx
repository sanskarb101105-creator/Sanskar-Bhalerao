import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  SolarPanel,
  SystemKPIs,
  Alert,
  MaintenanceRecord,
  SystemNotification,
  PowerTimePoint,
  WeatherScenario,
  PanelStatus,
} from '../types/solar';
import {
  INITIAL_PANELS,
  INITIAL_ALERTS,
  INITIAL_MAINTENANCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_HOURLY_POWER,
} from '../data/initialData';

interface UserSession {
  username: string;
  name: string;
  role: string;
  department: string;
  loginTime: string;
}

interface SolarContextType {
  user: UserSession | null;
  login: (u: string, p: string, remember: boolean) => { success: boolean; error?: string };
  logout: () => void;
  panels: SolarPanel[];
  kpis: SystemKPIs;
  alerts: Alert[];
  maintenance: MaintenanceRecord[];
  notifications: SystemNotification[];
  hourlyPower: PowerTimePoint[];
  selectedPanel: SolarPanel | null;
  setSelectedPanel: (panel: SolarPanel | null) => void;
  isSimulating: boolean;
  toggleSimulation: () => void;
  weatherScenario: WeatherScenario;
  setWeatherScenario: (scenario: WeatherScenario) => void;
  simulationSpeed: 1 | 2 | 5;
  setSimulationSpeed: (speed: 1 | 2 | 5) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  scheduleMaintenance: (record: Omit<MaintenanceRecord, 'id'>) => void;
  completeMaintenance: (id: string, actionNote: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (id: string) => void;
  triggerAnomaly: (panelId: string, type: 'overheat' | 'dust' | 'voltage_drift') => void;
  resetToDefaults: () => void;
  timeFilter: '1h' | '6h' | 'today';
  setTimeFilter: (f: '1h' | '6h' | 'today') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  panelFilter: 'ALL' | PanelStatus;
  setPanelFilter: (f: 'ALL' | PanelStatus) => void;
}

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export const SolarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('solarpulse_user');
      if (saved) return JSON.parse(saved);
      // Auto-logged in by default for seamless demonstration to college guests, or can be logged out
      return {
        username: 'admin',
        name: 'Prof. / Admin Operator',
        role: 'Solar Plant Supervisor',
        department: 'Dept. of Electrical & Renewable Energy (CEP)',
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    } catch {
      return null;
    }
  });

  const [panels, setPanels] = useState<SolarPanel[]>(INITIAL_PANELS);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [hourlyPower, setHourlyPower] = useState<PowerTimePoint[]>(INITIAL_HOURLY_POWER);
  const [selectedPanel, setSelectedPanel] = useState<SolarPanel | null>(null);

  // Simulation controls
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [weatherScenario, setWeatherScenario] = useState<WeatherScenario>('optimal');
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2 | 5>(1);

  // Global filters
  const [timeFilter, setTimeFilter] = useState<'1h' | '6h' | 'today'>('today');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [panelFilter, setPanelFilter] = useState<'ALL' | PanelStatus>('ALL');

  // Computed KPIs
  const [kpis, setKpis] = useState<SystemKPIs>({
    totalEnergyToday: 1248.0,
    currentPower: 8.6,
    expectedPower: 10.0,
    systemEfficiency: 86.4,
    solarIrradiance: 824,
    panelTemperature: 42,
    systemHealth: 'GOOD',
    voltage: 420.0,
    current: 20.5,
    performanceRatio: 86.4,
    energyLoss: 1.4,
    systemAvailability: 99.4,
    co2SavedKg: 1023.4,
    peakPowerToday: 8.9,
    lastUpdated: 'Just now',
  });

  const login = (u: string, p: string, remember: boolean) => {
    if (u.trim().toLowerCase() === 'admin' && p === 'admin123') {
      const sessionUser: UserSession = {
        username: 'admin',
        name: 'CEP Lead Administrator',
        role: 'Solar Plant Supervisor',
        department: 'Electrical Engineering CEP Demonstration',
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setUser(sessionUser);
      if (remember) {
        localStorage.setItem('solarpulse_user', JSON.stringify(sessionUser));
      }
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Use admin / admin123.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('solarpulse_user');
  };

  const toggleSimulation = () => setIsSimulating(prev => !prev);

  // Simulation tick loop
  useEffect(() => {
    if (!isSimulating) return;

    const intervalMs = Math.round(3000 / simulationSpeed);

    const timer = setInterval(() => {
      // 1. Calculate base environmental factor based on weather scenario
      let targetIrradiance = 824;
      let targetBaseTemp = 42;
      let powerFactor = 1.0;

      switch (weatherScenario) {
        case 'optimal':
          targetIrradiance = 820 + (Math.random() * 20 - 10);
          targetBaseTemp = 41 + (Math.random() * 2 - 1);
          powerFactor = 1.0;
          break;
        case 'partly_cloudy':
          targetIrradiance = 620 + (Math.sin(Date.now() / 8000) * 120) + (Math.random() * 20 - 10);
          targetBaseTemp = 37 + (Math.random() * 2 - 1);
          powerFactor = targetIrradiance / 820;
          break;
        case 'high_temp':
          targetIrradiance = 940 + (Math.random() * 20 - 10);
          targetBaseTemp = 51 + (Math.random() * 2 - 1);
          // High temperature thermal derating (-0.4%/°C above 25°C standard test condition)
          powerFactor = 1.12 * (1 - (targetBaseTemp - 25) * 0.004);
          break;
        case 'overcast':
          targetIrradiance = 320 + (Math.random() * 30 - 15);
          targetBaseTemp = 28 + (Math.random() * 2 - 1);
          powerFactor = 0.42;
          break;
      }

      setPanels(prevPanels => {
        const updated = prevPanels.map(p => {
          // Slight natural jitter
          const jitter = (Math.random() * 0.04 - 0.02);

          let panelPwr = p.power;
          let panelTemp = p.temperature;
          let panelVolt = p.voltage;
          let panelCurr = p.current;
          let panelEff = p.efficiency;

          if (p.status === 'NORMAL') {
            const expectedMax = 1.45;
            panelPwr = Number(Math.max(0.2, (expectedMax * powerFactor * (1 + jitter))).toFixed(2));
            panelVolt = Number((41.0 + (Math.random() * 0.6 - 0.3)).toFixed(1));
            // Power = Voltage * Current -> Current = (Power in W) / Voltage
            panelCurr = Number(((panelPwr * 1000) / panelVolt).toFixed(1));
            panelTemp = Math.round(targetBaseTemp + (p.row === 1 ? -1 : 0) + (Math.random() * 1.5 - 0.75));
            panelEff = Number(Math.min(96, Math.max(82, ((panelPwr / expectedMax) * 100))).toFixed(1));
          } else if (p.status === 'WARNING') {
            if (p.id === 'P03') {
              // High Temp hotspot
              panelTemp = Math.round(targetBaseTemp + 7 + Math.random() * 1.5);
              panelPwr = Number(Math.max(0.4, 0.91 * powerFactor * (1 + jitter)).toFixed(2));
              panelVolt = Number((36.5 + (Math.random() * 0.6 - 0.3)).toFixed(1));
              panelCurr = Number(((panelPwr * 1000) / panelVolt).toFixed(1));
              panelEff = Number(((panelPwr / 1.4) * 100).toFixed(1));
            } else if (p.id === 'P08') {
              // Voltage drift
              panelTemp = Math.round(targetBaseTemp + 1 + Math.random());
              panelVolt = Number((45.5 + (Math.random() * 0.6 - 0.3)).toFixed(1));
              panelPwr = Number(Math.max(0.5, 1.20 * powerFactor * (1 + jitter)).toFixed(2));
              panelCurr = Number(((panelPwr * 1000) / panelVolt).toFixed(1));
              panelEff = Number(((panelPwr / 1.45) * 100).toFixed(1));
            } else {
              panelPwr = Number((p.power * (1 + jitter)).toFixed(2));
            }
          } else if (p.status === 'MAINTENANCE') {
            // Panel 05 dirty or under inspection
            panelPwr = Number(Math.max(0.1, 0.52 * powerFactor * (1 + jitter)).toFixed(2));
            panelTemp = Math.round(targetBaseTemp + 4 + Math.random());
            panelVolt = Number((28.5 + (Math.random() * 0.4 - 0.2)).toFixed(1));
            panelCurr = Number(((panelPwr * 1000) / panelVolt).toFixed(1));
            panelEff = Number(((panelPwr / 1.4) * 100).toFixed(1));
          }

          const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          const newHistory = [
            ...p.history.slice(-15),
            {
              time: nowTime,
              power: panelPwr,
              temperature: panelTemp,
              voltage: panelVolt,
              current: panelCurr,
            }
          ];

          return {
            ...p,
            power: panelPwr,
            voltage: panelVolt,
            current: panelCurr,
            temperature: panelTemp,
            efficiency: panelEff,
            irradiance: Math.round(targetIrradiance),
            energyToday: Number((p.energyToday + (panelPwr * 0.0004)).toFixed(1)),
            history: newHistory,
          };
        });

        // Update selected panel in sync if open
        if (selectedPanel) {
          const matched = updated.find(x => x.id === selectedPanel.id);
          if (matched) setSelectedPanel(matched);
        }

        // Recompute plant-wide KPIs
        const totalPwr = Number(updated.reduce((sum, item) => sum + item.power, 0).toFixed(2));
        const avgTemp = Math.round(updated.reduce((sum, item) => sum + item.temperature, 0) / updated.length);
        const avgIrrad = Math.round(updated.reduce((sum, item) => sum + item.irradiance, 0) / updated.length);
        const plantExpected = Number((10.0 * (avgIrrad / 824)).toFixed(1));
        const plantEff = Number(Math.min(99.9, Math.max(10, ((totalPwr / Math.max(0.5, plantExpected)) * 100))).toFixed(1));
        const stringVolt = Number((420.0 + (Math.random() * 2 - 1)).toFixed(1));
        const stringCurr = Number(((totalPwr * 1000) / stringVolt).toFixed(1));
        const warningCount = updated.filter(p => p.status === 'WARNING').length;
        const maintCount = updated.filter(p => p.status === 'MAINTENANCE').length;
        const healthStatus: 'GOOD' | 'WARNING' | 'CRITICAL' =
          maintCount > 2 || warningCount > 3 ? 'CRITICAL' : maintCount > 0 || warningCount > 0 ? 'GOOD' : 'GOOD';

        setKpis(prev => ({
          ...prev,
          currentPower: totalPwr,
          expectedPower: plantExpected,
          systemEfficiency: plantEff,
          solarIrradiance: avgIrrad,
          panelTemperature: avgTemp,
          totalEnergyToday: Number((prev.totalEnergyToday + (totalPwr * 0.0004)).toFixed(1)),
          co2SavedKg: Number(((prev.totalEnergyToday + (totalPwr * 0.0004)) * 0.82).toFixed(1)),
          voltage: stringVolt,
          current: stringCurr,
          performanceRatio: plantEff,
          energyLoss: Number(Math.max(0, plantExpected - totalPwr).toFixed(2)),
          systemHealth: healthStatus,
          peakPowerToday: Math.max(prev.peakPowerToday, totalPwr),
          lastUpdated: 'Just now',
        }));

        return updated;
      });

      // Update live power graph buffer
      setHourlyPower(prev => {
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const last = prev[prev.length - 1];
        if (last && last.time === nowStr) {
          // update existing point slightly
          return prev.map((pt, idx) => idx === prev.length - 1 ? {
            ...pt,
            actualPower: Number((targetIrradiance * 0.0105 * powerFactor).toFixed(2)),
            irradiance: Math.round(targetIrradiance),
            temperature: Math.round(targetBaseTemp),
          } : pt);
        }
        return [
          ...prev.slice(-24),
          {
            time: nowStr,
            actualPower: Number((targetIrradiance * 0.0105 * powerFactor).toFixed(2)),
            expectedPower: Number((10.0 * (targetIrradiance / 824)).toFixed(1)),
            irradiance: Math.round(targetIrradiance),
            temperature: Math.round(targetBaseTemp),
          }
        ];
      });

    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, weatherScenario, selectedPanel]);

  // Alert Actions
  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Acknowledged' } : a));
  }, []);

  const resolveAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
  }, []);

  // Maintenance Actions
  const scheduleMaintenance = useCallback((record: Omit<MaintenanceRecord, 'id'>) => {
    const newRecord: MaintenanceRecord = {
      ...record,
      id: `MNT-${Math.floor(100 + Math.random() * 900)}`,
    };
    setMaintenance(prev => [newRecord, ...prev]);

    // Also update panel status to MAINTENANCE
    setPanels(prev => prev.map(p => p.id === record.panelId ? {
      ...p,
      status: 'MAINTENANCE',
      nextMaintenance: record.nextMaintenance,
      issueDescription: record.issue,
    } : p));

    // Add alert & notification
    const newAlert: Alert = {
      id: `ALT-${Math.floor(200 + Math.random() * 800)}`,
      type: 'MAINTENANCE REQUIRED',
      panelId: record.panelId,
      title: `Scheduled Maintenance for ${record.panelId}`,
      message: `${record.issue}. Assigned to ${record.technician}.`,
      timestamp: new Date().toLocaleString(),
      severity: record.priority === 'Urgent' ? 'HIGH' : 'LOW',
      status: 'Active',
    };
    setAlerts(prev => [newAlert, ...prev]);

    setNotifications(prev => [{
      id: `NOTIF-${Date.now()}`,
      title: 'Maintenance Scheduled',
      message: `Work order dispatched for ${record.panelId} (${record.issue})`,
      time: 'Just now',
      read: false,
      type: 'info',
    }, ...prev]);
  }, []);

  const completeMaintenance = useCallback((id: string, actionNote: string) => {
    let affectedPanelId = '';
    setMaintenance(prev => prev.map(m => {
      if (m.id === id) {
        affectedPanelId = m.panelId;
        return {
          ...m,
          status: 'Completed',
          actionTaken: actionNote || 'Inspection performed and issue resolved.',
          lastMaintenance: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        };
      }
      return m;
    }));

    if (affectedPanelId) {
      setPanels(prev => prev.map(p => {
        if (p.id === affectedPanelId) {
          return {
            ...p,
            status: 'NORMAL',
            efficiency: 91.5,
            power: 1.42,
            temperature: 40,
            issueDescription: undefined,
            lastMaintenance: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          };
        }
        return p;
      }));

      // Resolve matching active alerts for this panel
      setAlerts(prev => prev.map(a => a.panelId === affectedPanelId && a.status !== 'Resolved' ? { ...a, status: 'Resolved' } : a));

      setNotifications(prev => [{
        id: `NOTIF-${Date.now()}`,
        title: 'Maintenance Completed',
        message: `${affectedPanelId} restored to NORMAL operational status.`,
        time: 'Just now',
        read: false,
        type: 'success',
      }, ...prev]);
    }
  }, []);

  // Notifications
  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Demonstration fault injection (crucial for CEP faculty demonstration)
  const triggerAnomaly = useCallback((panelId: string, type: 'overheat' | 'dust' | 'voltage_drift') => {
    let alertTitle = '';
    let alertMsg = '';
    let alertType: Alert['type'] = 'HIGH TEMPERATURE';
    let severity: Alert['severity'] = 'HIGH';

    setPanels(prev => prev.map(p => {
      if (p.id === panelId) {
        if (type === 'overheat') {
          alertTitle = `High Temperature Alert – ${p.name}`;
          alertMsg = `${p.name} temperature reached 52°C. Thermal hot-spot detected.`;
          alertType = 'HIGH TEMPERATURE';
          severity = 'HIGH';
          return {
            ...p,
            status: 'WARNING',
            temperature: 52,
            efficiency: 68.2,
            power: 0.88,
            issueDescription: 'Thermal junction hotspot detected (+11°C array anomaly).',
          };
        } else if (type === 'dust') {
          alertTitle = `Low Power Output & Soiling – ${p.name}`;
          alertMsg = `${p.name} power output dropped to 0.45 kW due to surface soiling.`;
          alertType = 'LOW POWER OUTPUT';
          severity = 'MEDIUM';
          return {
            ...p,
            status: 'MAINTENANCE',
            power: 0.45,
            efficiency: 51.0,
            issueDescription: 'Heavy surface dust/particulate matter blocking solar cells.',
          };
        } else {
          alertTitle = `Abnormal Voltage Detected – ${p.name}`;
          alertMsg = `${p.name} open-circuit voltage drifted to 48.2 V.`;
          alertType = 'ABNORMAL VOLTAGE';
          severity = 'MEDIUM';
          return {
            ...p,
            status: 'WARNING',
            voltage: 48.2,
            current: 21.0,
            issueDescription: 'Voltage regulation drift detected on branch circuit.',
          };
        }
      }
      return p;
    }));

    const newAlert: Alert = {
      id: `ALT-${Math.floor(500 + Math.random() * 500)}`,
      type: alertType,
      panelId,
      title: alertTitle,
      message: alertMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      severity,
      status: 'Active',
    };
    setAlerts(prev => [newAlert, ...prev]);

    setNotifications(prev => [{
      id: `NOTIF-${Date.now()}`,
      title: alertTitle,
      message: alertMsg,
      time: 'Just now',
      read: false,
      type: 'alert',
    }, ...prev]);
  }, []);

  const resetToDefaults = useCallback(() => {
    setPanels(INITIAL_PANELS);
    setAlerts(INITIAL_ALERTS);
    setMaintenance(INITIAL_MAINTENANCE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setWeatherScenario('optimal');
    setIsSimulating(true);
  }, []);

  return (
    <SolarContext.Provider
      value={{
        user,
        login,
        logout,
        panels,
        kpis,
        alerts,
        maintenance,
        notifications,
        hourlyPower,
        selectedPanel,
        setSelectedPanel,
        isSimulating,
        toggleSimulation,
        weatherScenario,
        setWeatherScenario,
        simulationSpeed,
        setSimulationSpeed,
        acknowledgeAlert,
        resolveAlert,
        scheduleMaintenance,
        completeMaintenance,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotification,
        triggerAnomaly,
        resetToDefaults,
        timeFilter,
        setTimeFilter,
        searchTerm,
        setSearchTerm,
        panelFilter,
        setPanelFilter,
      }}
    >
      {children}
    </SolarContext.Provider>
  );
};

export const useSolar = () => {
  const context = useContext(SolarContext);
  if (!context) {
    throw new Error('useSolar must be used within a SolarProvider');
  }
  return context;
};
