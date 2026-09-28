import { SolarPanel, Alert, MaintenanceRecord, SystemNotification, PowerTimePoint, EnergyPeriodData } from '../types/solar';

export const INITIAL_PANELS: SolarPanel[] = [
  {
    id: 'P01',
    name: 'Panel 01',
    row: 1,
    col: 1,
    location: 'Array Block A – East String 1',
    status: 'NORMAL',
    voltage: 41.2,
    current: 34.5,
    power: 1.42,
    temperature: 39,
    irradiance: 825,
    efficiency: 91.2,
    energyToday: 114.5,
    lastMaintenance: '2026-09-10',
    nextMaintenance: '2026-12-10',
    history: generateMockHistory(1.42, 39, 41.2, 34.5)
  },
  {
    id: 'P02',
    name: 'Panel 02',
    row: 1,
    col: 2,
    location: 'Array Block A – East String 2',
    status: 'NORMAL',
    voltage: 40.8,
    current: 33.8,
    power: 1.38,
    temperature: 40,
    irradiance: 824,
    efficiency: 89.0,
    energyToday: 111.2,
    lastMaintenance: '2026-08-25',
    nextMaintenance: '2026-11-25',
    history: generateMockHistory(1.38, 40, 40.8, 33.8)
  },
  {
    id: 'P03',
    name: 'Panel 03',
    row: 1,
    col: 3,
    location: 'Array Block A – Center String 3',
    status: 'WARNING',
    voltage: 36.4,
    current: 25.0,
    power: 0.91,
    temperature: 48,
    irradiance: 820,
    efficiency: 67.4,
    energyToday: 73.8,
    lastMaintenance: '2026-09-01',
    nextMaintenance: '2026-10-05',
    issueDescription: 'Thermal junction hotspot detected. Surface temperature elevated by +7°C above array average.',
    history: generateMockHistory(0.91, 48, 36.4, 25.0)
  },
  {
    id: 'P04',
    name: 'Panel 04',
    row: 1,
    col: 4,
    location: 'Array Block A – Center String 4',
    status: 'NORMAL',
    voltage: 41.4,
    current: 35.0,
    power: 1.45,
    temperature: 41,
    irradiance: 826,
    efficiency: 92.5,
    energyToday: 116.8,
    lastMaintenance: '2026-09-12',
    nextMaintenance: '2026-12-12',
    history: generateMockHistory(1.45, 41, 41.4, 35.0)
  },
  {
    id: 'P05',
    name: 'Panel 05',
    row: 1,
    col: 5,
    location: 'Array Block A – West String 5',
    status: 'MAINTENANCE',
    voltage: 28.5,
    current: 18.2,
    power: 0.52,
    temperature: 46,
    irradiance: 822,
    efficiency: 54.0,
    energyToday: 42.1,
    lastMaintenance: '2026-09-15',
    nextMaintenance: '2026-10-15',
    issueDescription: 'Partial shading & heavy localized soiling accumulation. Scheduled for technician cleaning.',
    history: generateMockHistory(0.52, 46, 28.5, 18.2)
  },
  {
    id: 'P06',
    name: 'Panel 06',
    row: 1,
    col: 6,
    location: 'Array Block A – West String 6',
    status: 'NORMAL',
    voltage: 41.0,
    current: 34.1,
    power: 1.40,
    temperature: 41,
    irradiance: 824,
    efficiency: 90.2,
    energyToday: 113.0,
    lastMaintenance: '2026-08-30',
    nextMaintenance: '2026-11-30',
    history: generateMockHistory(1.40, 41, 41.0, 34.1)
  },
  {
    id: 'P07',
    name: 'Panel 07',
    row: 2,
    col: 1,
    location: 'Array Block B – East String 1',
    status: 'NORMAL',
    voltage: 41.1,
    current: 34.2,
    power: 1.41,
    temperature: 40,
    irradiance: 824,
    efficiency: 90.8,
    energyToday: 113.8,
    lastMaintenance: '2026-09-05',
    nextMaintenance: '2026-12-05',
    history: generateMockHistory(1.41, 40, 41.1, 34.2)
  },
  {
    id: 'P08',
    name: 'Panel 08',
    row: 2,
    col: 2,
    location: 'Array Block B – East String 2',
    status: 'WARNING',
    voltage: 45.8,
    current: 26.2,
    power: 1.20,
    temperature: 43,
    irradiance: 823,
    efficiency: 78.5,
    energyToday: 96.4,
    lastMaintenance: '2026-08-20',
    nextMaintenance: '2026-11-20',
    issueDescription: 'Abnormal open-circuit voltage drift (+11% nominal) observed during mid-day string balance.',
    history: generateMockHistory(1.20, 43, 45.8, 26.2)
  },
  {
    id: 'P09',
    name: 'Panel 09',
    row: 2,
    col: 3,
    location: 'Array Block B – Center String 3',
    status: 'NORMAL',
    voltage: 41.3,
    current: 34.8,
    power: 1.44,
    temperature: 41,
    irradiance: 825,
    efficiency: 92.1,
    energyToday: 115.9,
    lastMaintenance: '2026-09-08',
    nextMaintenance: '2026-12-08',
    history: generateMockHistory(1.44, 41, 41.3, 34.8)
  },
  {
    id: 'P10',
    name: 'Panel 10',
    row: 2,
    col: 4,
    location: 'Array Block B – Center String 4',
    status: 'NORMAL',
    voltage: 40.9,
    current: 33.9,
    power: 1.39,
    temperature: 41,
    irradiance: 824,
    efficiency: 89.6,
    energyToday: 112.1,
    lastMaintenance: '2026-08-28',
    nextMaintenance: '2026-11-28',
    history: generateMockHistory(1.39, 41, 40.9, 33.9)
  },
  {
    id: 'P11',
    name: 'Panel 11',
    row: 2,
    col: 5,
    location: 'Array Block B – West String 5',
    status: 'NORMAL',
    voltage: 41.2,
    current: 34.4,
    power: 1.42,
    temperature: 42,
    irradiance: 824,
    efficiency: 91.0,
    energyToday: 114.2,
    lastMaintenance: '2026-09-04',
    nextMaintenance: '2026-12-04',
    history: generateMockHistory(1.42, 42, 41.2, 34.4)
  },
  {
    id: 'P12',
    name: 'Panel 12',
    row: 2,
    col: 6,
    location: 'Array Block B – West String 6',
    status: 'NORMAL',
    voltage: 41.0,
    current: 34.0,
    power: 1.39,
    temperature: 41,
    irradiance: 824,
    efficiency: 89.8,
    energyToday: 112.4,
    lastMaintenance: '2026-09-14',
    nextMaintenance: '2026-12-14',
    history: generateMockHistory(1.39, 41, 41.0, 34.0)
  }
];

function generateMockHistory(basePower: number, baseTemp: number, baseVolt: number, baseCurr: number) {
  const points = [];
  const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  const factors = [0.35, 0.65, 0.88, 0.98, 1.0, 0.96, 0.92];
  
  for (let i = 0; i < hours.length; i++) {
    points.push({
      time: hours[i],
      power: Number((basePower * factors[i]).toFixed(2)),
      temperature: Math.round(baseTemp - (1 - factors[i]) * 10),
      voltage: Number((baseVolt * (0.95 + factors[i] * 0.05)).toFixed(1)),
      current: Number((baseCurr * factors[i]).toFixed(1))
    });
  }
  return points;
}

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'ALT-101',
    type: 'HIGH TEMPERATURE',
    panelId: 'P03',
    title: 'High Panel Temperature',
    message: 'Panel 03 temperature reached 48°C, exceeding the 45°C nominal threshold.',
    timestamp: '2026-09-28 02:45 PM',
    severity: 'HIGH',
    status: 'Active'
  },
  {
    id: 'ALT-102',
    type: 'LOW POWER OUTPUT',
    panelId: 'P05',
    title: 'Low Power Output Detected',
    message: 'Panel 05 is producing 0.52 kW, significantly below expected output of 1.40 kW.',
    timestamp: '2026-09-28 01:15 PM',
    severity: 'HIGH',
    status: 'Active'
  },
  {
    id: 'ALT-103',
    type: 'EFFICIENCY DROP',
    panelId: 'P05',
    title: 'Efficiency Degradation',
    message: 'Panel 05 efficiency dropped to 54.0%, below acceptable baseline limit (>75%).',
    timestamp: '2026-09-28 01:20 PM',
    severity: 'MEDIUM',
    status: 'Active'
  },
  {
    id: 'ALT-104',
    type: 'ABNORMAL VOLTAGE',
    panelId: 'P08',
    title: 'Abnormal String Voltage',
    message: 'Panel 08 voltage is 45.8 V, outside the normal operating tolerance (38V - 43V).',
    timestamp: '2026-09-28 11:30 AM',
    severity: 'MEDIUM',
    status: 'Acknowledged'
  },
  {
    id: 'ALT-105',
    type: 'MAINTENANCE REQUIRED',
    panelId: 'P05',
    title: 'Maintenance Service Required',
    message: 'Panel 05 requires on-site inspection for heavy dust soiling and diode health check.',
    timestamp: '2026-09-28 09:10 AM',
    severity: 'LOW',
    status: 'Active'
  }
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MNT-401',
    panelId: 'P05',
    issue: 'Low Efficiency & Dust Soiling',
    lastMaintenance: '15 Sept 2026',
    nextMaintenance: '15 Oct 2026',
    status: 'Pending',
    technician: 'Eng. Rajesh Sharma',
    priority: 'Urgent',
    notes: 'Severe dust deposition detected on surface glass. Clean with demineralized water rinse and verify bypass diode integrity.'
  },
  {
    id: 'MNT-402',
    panelId: 'P03',
    issue: 'Thermal Anomaly (48°C Hotspot)',
    lastMaintenance: '01 Sept 2026',
    nextMaintenance: '05 Oct 2026',
    status: 'In Progress',
    technician: 'Tech. Priya Patel',
    priority: 'Urgent',
    notes: 'Infrared thermography scan scheduled to isolate defective cell junction.'
  },
  {
    id: 'MNT-403',
    panelId: 'P08',
    issue: 'Voltage Drift & Inverter Terminal Check',
    lastMaintenance: '20 Aug 2026',
    nextMaintenance: '20 Nov 2026',
    status: 'Pending',
    technician: 'Eng. Rajesh Sharma',
    priority: 'Scheduled',
    notes: 'Verify MC4 connector contact resistance and MPPT tracking profile.'
  },
  {
    id: 'MNT-404',
    panelId: 'P01',
    issue: 'Quarterly Sensor Calibration & Cleaning',
    lastMaintenance: '10 Sept 2026',
    nextMaintenance: '10 Dec 2026',
    status: 'Completed',
    technician: 'Tech. Priya Patel',
    priority: 'Routine',
    actionTaken: 'Pyranometer calibrated, glass surfaces buffed, junction box weather seals verified.'
  },
  {
    id: 'MNT-405',
    panelId: 'P04',
    issue: 'String Cabling Insulation Resistance Test',
    lastMaintenance: '12 Sept 2026',
    nextMaintenance: '12 Dec 2026',
    status: 'Completed',
    technician: 'Eng. Rajesh Sharma',
    priority: 'Routine',
    actionTaken: 'Megger insulation test passed (>100 MΩ), cable ties secured.'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-1',
    title: 'High Temperature Alert',
    message: 'Panel 03 temperature reached 48°C.',
    time: '5 mins ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'NOTIF-2',
    title: 'Efficiency Warning',
    message: 'Panel 05 efficiency dropped below 60%.',
    time: '24 mins ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'NOTIF-3',
    title: 'Generation Milestone',
    message: 'Daily energy target of 1,200 kWh achieved.',
    time: '1 hour ago',
    read: false,
    type: 'success'
  },
  {
    id: 'NOTIF-4',
    title: 'Maintenance Reminder',
    message: 'Maintenance reminder for Panel 05 scheduled.',
    time: '2 hours ago',
    read: true,
    type: 'info'
  },
  {
    id: 'NOTIF-5',
    title: 'Grid Sync Nominal',
    message: 'Central inverter synchronized at 50.02 Hz.',
    time: '4 hours ago',
    read: true,
    type: 'info'
  }
];

export const INITIAL_HOURLY_POWER: PowerTimePoint[] = [
  { time: '06:00', actualPower: 0.4, expectedPower: 0.5, irradiance: 65, temperature: 24 },
  { time: '07:00', actualPower: 1.8, expectedPower: 2.1, irradiance: 180, temperature: 27 },
  { time: '08:00', actualPower: 3.9, expectedPower: 4.3, irradiance: 390, temperature: 31 },
  { time: '09:00', actualPower: 5.7, expectedPower: 6.2, irradiance: 570, temperature: 35 },
  { time: '10:00', actualPower: 7.2, expectedPower: 7.9, irradiance: 710, temperature: 38 },
  { time: '11:00', actualPower: 8.3, expectedPower: 9.1, irradiance: 805, temperature: 40 },
  { time: '12:00', actualPower: 8.9, expectedPower: 10.0, irradiance: 845, temperature: 43 },
  { time: '13:00', actualPower: 8.7, expectedPower: 9.9, irradiance: 830, temperature: 43 },
  { time: '14:00', actualPower: 8.6, expectedPower: 9.8, irradiance: 824, temperature: 42 },
  { time: '15:00', actualPower: 7.8, expectedPower: 8.7, irradiance: 740, temperature: 41 },
  { time: '16:00', actualPower: 5.4, expectedPower: 6.1, irradiance: 520, temperature: 38 },
  { time: '17:00', actualPower: 2.8, expectedPower: 3.2, irradiance: 280, temperature: 33 },
  { time: '18:00', actualPower: 0.8, expectedPower: 1.0, irradiance: 95, temperature: 29 }
];

export const WEEKLY_ENERGY_DATA: EnergyPeriodData[] = [
  { label: 'Mon', actualEnergy: 1180, expectedEnergy: 1250, peakPower: 9.2, avgEfficiency: 87.2 },
  { label: 'Tue', actualEnergy: 1220, expectedEnergy: 1260, peakPower: 9.4, avgEfficiency: 88.0 },
  { label: 'Wed', actualEnergy: 1140, expectedEnergy: 1250, peakPower: 8.8, avgEfficiency: 85.5 },
  { label: 'Thu', actualEnergy: 1265, expectedEnergy: 1280, peakPower: 9.6, avgEfficiency: 89.1 },
  { label: 'Fri', actualEnergy: 1210, expectedEnergy: 1250, peakPower: 9.1, avgEfficiency: 87.8 },
  { label: 'Sat', actualEnergy: 1290, expectedEnergy: 1290, peakPower: 9.7, avgEfficiency: 89.9 },
  { label: 'Sun (Today)', actualEnergy: 1248, expectedEnergy: 1280, peakPower: 8.9, avgEfficiency: 86.4 }
];

export const MONTHLY_ENERGY_DATA: EnergyPeriodData[] = [
  { label: 'Week 1', actualEnergy: 8450, expectedEnergy: 8800, peakPower: 9.8, avgEfficiency: 88.2 },
  { label: 'Week 2', actualEnergy: 8620, expectedEnergy: 8900, peakPower: 9.9, avgEfficiency: 88.7 },
  { label: 'Week 3', actualEnergy: 8190, expectedEnergy: 8750, peakPower: 9.4, avgEfficiency: 86.1 },
  { label: 'Week 4', actualEnergy: 8553, expectedEnergy: 8850, peakPower: 9.7, avgEfficiency: 87.4 }
];
