import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  color
}) => {
  const IconComponent = (Icons as any)[icon] as LucideIcon;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} p-3 rounded-lg text-white`}>
          <IconComponent size={24} />
        </div>
        <div className={`flex items-center text-sm font-medium ${
          changeType === 'increase' ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {changeType === 'increase' ? (
            <Icons.TrendingUp size={16} className="mr-1" />
          ) : (
            <Icons.TrendingDown size={16} className="mr-1" />
          )}
          {Math.abs(change)}%
        </div>
      </div>
      
      <div>
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};