import { useState, useEffect, useCallback } from 'react';
import { KPIMetric, ChartData, Alert, DashboardMode } from '../types/dashboard';

const generateMockData = (mode: DashboardMode) => {
  const travelKPIs: KPIMetric[] = [
    {
      id: '1',
      title: 'Total Bookings',
      value: '12,847',
      change: 12.5,
      changeType: 'increase',
      icon: 'Ticket',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Revenue',
      value: '$2.8M',
      change: 8.2,
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'bg-emerald-500'
    },
    {
      id: '3',
      title: 'Avg Load Factor',
      value: '87.3%',
      change: -2.1,
      changeType: 'decrease',
      icon: 'Users',
      color: 'bg-amber-500'
    },
    {
      id: '4',
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: 5.7,
      changeType: 'increase',
      icon: 'Star',
      color: 'bg-purple-500'
    }
  ];

  const inventoryKPIs: KPIMetric[] = [
    {
      id: '1',
      title: 'Total Items',
      value: '45,892',
      change: 3.4,
      changeType: 'increase',
      icon: 'Package',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Stock Value',
      value: '$1.2M',
      change: 15.8,
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'bg-emerald-500'
    },
    {
      id: '3',
      title: 'Low Stock Items',
      value: '127',
      change: -8.3,
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'bg-red-500'
    },
    {
      id: '4',
      title: 'Turnover Rate',
      value: '2.4x',
      change: 12.1,
      changeType: 'increase',
      icon: 'RotateCcw',
      color: 'bg-indigo-500'
    }
  ];

  return mode === 'travel' ? travelKPIs : inventoryKPIs;
};

const generateChartData = (mode: DashboardMode): ChartData => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  if (mode === 'travel') {
    return {
      labels,
      datasets: [
        {
          label: 'Bookings',
          data: [2100, 2800, 3200, 2900, 3800, 4200],
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          fill: true
        },
        {
          label: 'Revenue (thousands)',
          data: [420, 560, 640, 580, 760, 840],
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2,
          fill: true
        }
      ]
    };
  }

  return {
    labels,
    datasets: [
      {
        label: 'Stock Levels',
        data: [8500, 9200, 8800, 9500, 9100, 8900],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Orders Fulfilled',
        data: [1200, 1400, 1100, 1600, 1300, 1500],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        fill: true
      }
    ]
  };
};

const generateAlerts = (mode: DashboardMode): Alert[] => {
  const travelAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Demand Route',
      message: 'NYC-LAX route showing 95% booking rate for next week',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Revenue Target Met',
      message: 'Monthly revenue target achieved 5 days early',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      acknowledged: true
    },
    {
      id: '3',
      type: 'error',
      title: 'System Integration Alert',
      message: 'Payment gateway showing intermittent connectivity issues',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      acknowledged: false
    }
  ];

  const inventoryAlerts: Alert[] = [
    {
      id: '1',
      type: 'error',
      title: 'Critical Stock Level',
      message: '12 items below minimum threshold requiring immediate reorder',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'Supplier Delay',
      message: 'Expected delivery from Supplier ABC delayed by 3 days',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      acknowledged: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Inventory Audit',
      message: 'Quarterly inventory audit scheduled for next week',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      acknowledged: true
    }
  ];

  return mode === 'travel' ? travelAlerts : inventoryAlerts;
};

export const useDashboardData = (mode: DashboardMode) => {
  const [kpis, setKpis] = useState<KPIMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setKpis(generateMockData(mode));
      setChartData(generateChartData(mode));
      setAlerts(generateAlerts(mode));
      setLoading(false);
    }, 500);
  }, [mode]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(current => 
        current.map(kpi => ({
          ...kpi,
          value: typeof kpi.value === 'string' && kpi.value.includes('$') 
            ? kpi.value 
            : typeof kpi.value === 'string' && kpi.value.includes('%')
            ? kpi.value
            : String(Math.floor(Math.random() * 1000) + 10000)
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(current =>
      current.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  return {
    kpis,
    chartData,
    alerts,
    loading,
    refreshData,
    acknowledgeAlert
  };
};