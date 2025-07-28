import React from 'react';
import { 
  BarChart3, 
  Plane, 
  Package, 
  Bell, 
  FileText, 
  Settings, 
  RefreshCw,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  mode: 'travel' | 'inventory';
  onModeChange: (mode: 'travel' | 'inventory') => void;
  onRefresh: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mode,
  onModeChange,
  onRefresh,
  isCollapsed,
  onToggleCollapse
}) => {
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: true },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 transition-all duration-300 z-50 ${
        isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics Hub</h1>
                <p className="text-sm text-gray-500">Smart Dashboard System</p>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                System Mode
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onModeChange('travel')}
                  className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === 'travel'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Plane size={16} className="mr-2" />
                  Travel
                </button>
                <button
                  onClick={() => onModeChange('inventory')}
                  className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    mode === 'inventory'
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package size={16} className="mr-2" />
                  Inventory
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full flex items-center p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.active
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
                  {!isCollapsed && item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Refresh Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={onRefresh}
            className="w-full flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-md"
          >
            <RefreshCw size={16} className={isCollapsed ? 'mx-auto' : 'mr-2'} />
            {!isCollapsed && 'Refresh Data'}
          </button>
        </div>
      </div>
    </>
  );
};