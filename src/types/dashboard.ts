export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }>;
}

export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface ReportConfig {
  id: string;
  name: string;
  type: 'travel' | 'inventory';
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: string[];
}

export type DashboardMode = 'travel' | 'inventory';