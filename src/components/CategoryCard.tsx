import * as Icons from 'lucide-react';
import { Grid3X3 } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Grid3X3: Icons.Grid3X3,
  Calculator: Icons.Calculator,
  RefreshCw: Icons.RefreshCw,
  Sparkles: Icons.Sparkles,
  CheckCircle: Icons.CheckCircle,
  Code: Icons.Code,
};

export function CategoryCard({ id, name, icon, count, isActive, onClick }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Grid3X3;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105'
          : 'bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 text-gray-700'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
        isActive ? 'bg-white/20' : 'bg-gray-100'
      }`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <span className="font-medium text-sm">{name}</span>
      <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
        {count} 个工具
      </span>
    </button>
  );
}
