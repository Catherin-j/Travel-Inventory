import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { KPICard } from './components/KPICard';
import { Chart } from './components/Chart';
import { AlertPanel } from './components/AlertPanel';
import { ReportGenerator } from './components/ReportGenerator';
import { useDashboardData } from './hooks/useDashboardData';
import { DashboardMode } from './types/dashboard';
import { Menu, RefreshCw } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<DashboardMode>('travel');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { kpis, chartData, alerts, loading, refreshData, acknowledgeAlert } = useDashboardData(mode);

  const handleModeChange = (newMode: DashboardMode) => {
    setMode(newMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Sidebar
        mode={mode}
        onModeChange={handleModeChange}
        onRefresh={refreshData}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden mr-4"
              >
                <Menu size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'travel' ? 'Travel Analytics' : 'Inventory Management'} Dashboard
                </h2>
                <p className="text-gray-600">
                  Real-time insights and performance metrics
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className="text-sm text-gray-600">
                  {loading ? 'Updating...' : 'Live'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
              <span className="ml-4 text-gray-600">Loading dashboard data...</span>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi) => (
                  <KPICard
                    key={kpi.id}
                    title={kpi.title}
                    value={kpi.value}
                    change={kpi.change}
                    changeType={kpi.changeType}
                    icon={kpi.icon}
                    color={kpi.color}
                  />
                ))}
              </div>

              {/* Charts and Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Chart
                  data={chartData}
                  type="line"
                  title={mode === 'travel' ? 'Booking Trends' : 'Inventory Flow'}
                />
                
                <div className="space-y-6">
                  <AlertPanel
                    alerts={alerts}
                    onAcknowledge={acknowledgeAlert}
                  />
                </div>
              </div>

              {/* Report Generation */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Chart
                    data={chartData}
                    type="bar"
                    title={mode === 'travel' ? 'Monthly Performance' : 'Stock Distribution'}
                  />
                </div>
                <ReportGenerator mode={mode} />
              </div>

              {/* Performance Insights */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  AI-Powered Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {mode === 'travel' ? 'Route Optimization' : 'Stock Optimization'}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {mode === 'travel' 
                        ? 'Consider increasing frequency on NYC-LAX route. Current demand exceeds capacity by 15%.'
                        : 'Items with ID #A2341-A2355 show consistent high turnover. Consider increasing stock levels.'
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <h4 className="font-medium text-emerald-900 mb-2">
                      {mode === 'travel' ? 'Revenue Opportunity' : 'Cost Savings'}
                    </h4>
                    <p className="text-sm text-emerald-700">
                      {mode === 'travel'
                        ? 'Dynamic pricing on weekend flights could increase revenue by $340K annually.'
                        : 'Bulk ordering for high-turnover items could reduce costs by 12% quarterly.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;