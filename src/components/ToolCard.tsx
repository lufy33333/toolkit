import { Link } from 'react-router-dom';
import { Star, Heart, ArrowRight, Wrench } from 'lucide-react';
import * as Icons from 'lucide-react';
import { type Tool } from '@/data/tools';
import { useToolStore } from '@/store/toolStore';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
  showFavorite?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity: Icons.Activity,
  Coins: Icons.Coins,
  Lock: Icons.Lock,
  FileJson: Icons.FileJson,
  Link: Icons.Link,
  Mail: Icons.Mail,
  Palette: Icons.Palette,
  Clock: Icons.Clock,
  Globe: Icons.Globe,
  Binary: Icons.Binary,
  Shuffle: Icons.Shuffle,
  Code2: Icons.Code2,
};

export function ToolCard({ tool, showFavorite = true }: ToolCardProps) {
  const { favorites, addToFavorites, removeFromFavorites } = useToolStore();
  const isFavorite = favorites.includes(tool.id);
  const IconComponent = iconMap[tool.icon] || Wrench;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(tool.id);
    } else {
      addToFavorites(tool.id);
    }
  };

  return (
    <Link
      to={`/tools/${tool.path}`}
      className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        {showFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "p-2 rounded-lg transition-all",
              isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {tool.name}
      </h3>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {tool.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
          <span className="text-sm text-gray-400">({tool.usageCount.toLocaleString()}次使用)</span>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
