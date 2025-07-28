import React, { useState } from 'react';
import { Download, Calendar, FileText, Filter } from 'lucide-react';

interface ReportGeneratorProps {
  mode: 'travel' | 'inventory';
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ mode }) => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const travelMetrics = [
    'Total Bookings',
    'Revenue',
    'Load Factor',
    'Customer Satisfaction',
    'Route Performance',
    'Seasonal Trends'
  ];

  const inventoryMetrics = [
    'Stock Levels',
    'Turnover Rate',
    'Low Stock Items',
    'Supplier Performance',
    'Cost Analysis',
    'Demand Forecasting'
  ];

  const availableMetrics = mode === 'travel' ? travelMetrics : inventoryMetrics;

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        title: `${mode === 'travel' ? 'Travel Analytics' : 'Inventory'} Report`,
        dateRange,
        metrics: selectedMetrics,
        generatedAt: new Date().toISOString()
      };
      
      // Create and download a mock report file
      const blob = new Blob([JSON.stringify(reportData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mode}-report-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <FileText className="text-blue-500 mr-3" size={24} />
        <h3 className="text-lg font-semibold text-gray-900">Generate Report</h3>
      </div>

      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline mr-2" size={16} />
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Metrics Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Filter className="inline mr-2" size={16} />
            Select Metrics
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableMetrics.map((metric) => (
              <label key={metric} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric)}
                  onChange={() => handleMetricToggle(metric)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{metric}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateReport}
          disabled={selectedMetrics.length === 0 || isGenerating}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedMetrics.length === 0 || isGenerating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2" size={16} />
              Generate Report
            </>
          )}
        </button>
      </div>
    </div>
  );
};