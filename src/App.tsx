import React, { useState } from 'react';
import { SolarProvider, useSolar } from './context/SolarContext';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginView } from './components/LoginView';
import { DemoSimulationBar } from './components/DemoSimulationBar';
import { PanelDetailModal } from './components/PanelDetailModal';
import { ScheduleMaintenanceModal } from './components/ScheduleMaintenanceModal';

// Views
import { DashboardView } from './views/DashboardView';
import { LiveMonitoringView } from './views/LiveMonitoringView';
import { SolarPanelsView } from './views/SolarPanelsView';
import { PlantOverviewView } from './views/PlantOverviewView';
import { PerformanceAnalysisView } from './views/PerformanceAnalysisView';
import { AlertsView } from './views/AlertsView';
import { EnergyReportsView } from './views/EnergyReportsView';
import { MaintenanceView } from './views/MaintenanceView';
import { SystemInfoView } from './views/SystemInfoView';
import { Menu, Radio } from 'lucide-react';

const SolarPulseApp: React.FC = () => {
  const { user, selectedPanel, setSelectedPanel } = useSolar();
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isSimDrawerOpen, setIsSimDrawerOpen] = useState<boolean>(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState<boolean>(false);
  const [scheduledTargetPanel, setScheduledTargetPanel] = useState<string>('P01');

  // If not logged in, display professional login screen
  if (!user) {
    return <LoginView />;
  }

  const handleOpenSchedule = (panelId: string) => {
    setScheduledTargetPanel(panelId);
    setScheduleModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView setActiveView={setActiveView} />;
      case 'live-monitoring':
        return <LiveMonitoringView />;
      case 'solar-panels':
        return <SolarPanelsView />;
      case 'plant-overview':
        return <PlantOverviewView />;
      case 'performance':
        return <PerformanceAnalysisView />;
      case 'alerts':
        return <AlertsView />;
      case 'reports':
        return <EnergyReportsView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'system-info':
        return <SystemInfoView />;
      default:
        return <DashboardView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased text-slate-800">
      {/* Top Navigation */}
      <TopNav
        activeView={activeView}
        setActiveView={setActiveView}
        toggleSimDrawer={() => setIsSimDrawerOpen(prev => !prev)}
        isSimDrawerOpen={isSimDrawerOpen}
      />

      {/* Demo Sensor Simulation Control Bar */}
      <DemoSimulationBar
        isOpen={isSimDrawerOpen}
        onClose={() => setIsSimDrawerOpen(false)}
      />

      {/* Mobile Top Bar Toggler */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          <Menu className="w-4 h-4 text-emerald-400" />
          <span>Menu</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 font-mono">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>LIVE DEMO</span>
        </div>
      </div>

      {/* Main Layout Area: Sidebar + Active View */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
        />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-x-hidden">
          <div className="flex-1">
            {renderActiveView()}
          </div>
          <Footer />
        </main>
      </div>

      {/* Panel Detail Modal */}
      <PanelDetailModal
        panel={selectedPanel}
        onClose={() => setSelectedPanel(null)}
        onScheduleMaintenance={handleOpenSchedule}
      />

      {/* Schedule Maintenance Modal */}
      <ScheduleMaintenanceModal
        initialPanelId={scheduledTargetPanel}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <SolarProvider>
      <SolarPulseApp />
    </SolarProvider>
  );
}
