import React, { useRef, useEffect } from 'react';
import { ChartData } from '../types/dashboard';

interface ChartProps {
  data: ChartData;
  type: 'line' | 'bar';
  title: string;
}

export const Chart: React.FC<ChartProps> = ({ data, type, title }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.labels.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up dimensions
    const padding = 60;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Find max value for scaling
    const maxValue = Math.max(
      ...data.datasets.flatMap(dataset => dataset.data)
    );

    // Draw background grid
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Vertical grid lines
    for (let i = 0; i < data.labels.length; i++) {
      const x = padding + (chartWidth / (data.labels.length - 1)) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';

    // X-axis labels
    data.labels.forEach((label, i) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * i;
      ctx.fillText(label, x, canvas.height - padding + 20);
    });

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * (5 - i));
      const y = padding + (chartHeight / 5) * i + 5;
      ctx.fillText(value.toString(), padding - 10, y);
    }

    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      const color = dataset.borderColor || '#3b82f6';
      
      if (type === 'line') {
        // Draw line
        ctx.strokeStyle = color;
        ctx.lineWidth = dataset.borderWidth || 2;
        ctx.beginPath();

        dataset.data.forEach((value, i) => {
          const x = padding + (chartWidth / (data.labels.length - 1)) * i;
          const y = canvas.height - padding - (value / maxValue) * chartHeight;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();

        // Draw fill area if specified
        if (dataset.fill && dataset.backgroundColor) {
          ctx.fillStyle = dataset.backgroundColor;
          ctx.lineTo(canvas.width - padding, canvas.height - padding);
          ctx.lineTo(padding, canvas.height - padding);
          ctx.closePath();
          ctx.fill();
        }

        // Draw points
        ctx.fillStyle = color;
        dataset.data.forEach((value, i) => {
          const x = padding + (chartWidth / (data.labels.length - 1)) * i;
          const y = canvas.height - padding - (value / maxValue) * chartHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      } else {
        // Draw bars
        const barWidth = chartWidth / data.labels.length * 0.6;
        const barSpacing = chartWidth / data.labels.length * 0.4;
        
        ctx.fillStyle = dataset.backgroundColor || color;
        
        dataset.data.forEach((value, i) => {
          const x = padding + (chartWidth / data.labels.length) * i + barSpacing / 2;
          const barHeight = (value / maxValue) * chartHeight;
          const y = canvas.height - padding - barHeight;
          
          ctx.fillRect(x, y, barWidth, barHeight);
        });
      }
    });

  }, [data, type]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-64"
        />
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: dataset.borderColor || dataset.backgroundColor }}
            />
            <span className="text-sm text-gray-600">{dataset.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};