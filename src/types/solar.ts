export type PanelStatus = 'NORMAL' | 'WARNING' | 'MAINTENANCE';

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved';

export type WeatherScenario = 'optimal' | 'partly_cloudy' | 'high_temp' | 'overcast';

export interface PanelHistoryPoint {
  time: string;
  power: number;
  temperature: number;
  voltage: number;
  current: number;
}

export interface SolarPanel {
  id: string; // P01 .. P12
  name: string; // Panel 01 .. Panel 12
  row: 1 | 2;
  col: number; // 1 .. 6
  location: string;
  status: PanelStatus;
  voltage: number; // Volts (V)
  current: number; // Amperes (A)
  power: number; // Kilowatts (kW)
  temperature: number; // °C
  irradiance: number; // W/m²
  efficiency: number; // %
  energyToday: number; // kWh
  lastMaintenance: string;
  nextMaintenance: string;
  issueDescription?: string;
  history: PanelHistoryPoint[];
}

export interface SystemKPIs {
  totalEnergyToday: number; // kWh
  currentPower: number; // kW
  expectedPower: number; // kW
  systemEfficiency: number; // %
  solarIrradiance: number; // W/m²
  panelTemperature: number; // °C
  systemHealth: 'GOOD' | 'WARNING' | 'CRITICAL';
  voltage: number; // V
  current: number; // A
  performanceRatio: number; // %
  energyLoss: number; // kW
  systemAvailability: number; // %
  co2SavedKg: number; // kg
  peakPowerToday: number; // kW
  lastUpdated: string;
}

export interface Alert {
  id: string;
  type: 'HIGH TEMPERATURE' | 'LOW POWER OUTPUT' | 'EFFICIENCY DROP' | 'MAINTENANCE REQUIRED' | 'ABNORMAL VOLTAGE';
  panelId: string;
  title: string;
  message: string;
  timestamp: string;
  severity: AlertSeverity;
  status: AlertStatus;
}

export interface MaintenanceRecord {
  id: string;
  panelId: string;
  issue: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  technician: string;
  priority: 'Routine' | 'Urgent' | 'Scheduled';
  actionTaken?: string;
  notes?: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
}

export interface PowerTimePoint {
  time: string;
  actualPower: number;
  expectedPower: number;
  irradiance: number;
  temperature: number;
}

export interface EnergyPeriodData {
  label: string;
  actualEnergy: number;
  expectedEnergy: number;
  peakPower: number;
  avgEfficiency: number;
}
