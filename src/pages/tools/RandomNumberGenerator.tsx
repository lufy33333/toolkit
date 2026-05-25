import { useNavigate } from 'react-router-dom';
import { useToolStore } from '@/store/toolStore';
import { ArrowLeft, Heart, Star, Share2, Copy, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function RandomNumberGenerator() {
  const navigate = useNavigate();
  const { tools, favorites, addToFavorites, removeFromFavorites, addToHistory } = useToolStore();
  const [copied, setCopied] = useState(false);
  
  const tool = tools.find(t => t.id === '11');
  const isFavorite = favorites.includes('11');
  const IconComponent: React.ComponentType<{ className?: string }> = (tool ? Icons[tool.icon as keyof typeof Icons] : Icons.Wrench) as React.ComponentType<{ className?: string }>;

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <Icons.Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">工具不存在</h3>
          <button onClick={() => navigate('/tools')} className="text-blue-600 hover:text-blue-700 font-medium">
            返回工具库
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    addToHistory('11');
  }, []);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites('11');
    } else {
      addToFavorites('11');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [result, setResult] = useState<number | null>(null);

  const generate = () => {
    const minVal = parseInt(min) || 1;
    const maxVal = parseInt(max) || 100;
    
    if (minVal > maxVal) {
      alert('最小值不能大于最大值');
      return;
    }
    
    const random = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setResult(random);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/tools')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500">{tool.usageCount.toLocaleString()} 次使用</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{tool.name}</h2>
                <p className="text-gray-500">{tool.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleFavoriteClick} className={cn(
                "p-3 rounded-xl transition-all",
                isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              )}>
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </button>
              <button onClick={handleCopy} className="p-3 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
              <button className="p-3 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">最小值</label>
                <input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">最大值</label>
                <input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <button onClick={generate} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              生成随机数
            </button>
            {result !== null && (
              <div className="text-center py-6 bg-gray-50 rounded-xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}