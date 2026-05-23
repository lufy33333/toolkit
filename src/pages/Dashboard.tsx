import { Link, useNavigate } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { useToolStore } from '@/store/toolStore';
import { useUserStore } from '@/store/userStore';
import { Heart, History, User, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const { getFavoriteTools, getHistoryTools, favorites, removeFromFavorites } = useToolStore();
  const { user, isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();
  
  const favoriteTools = getFavoriteTools();
  const historyTools = getHistoryTools();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">请先登录</h2>
          <p className="text-gray-600 mb-6">登录后可以保存收藏和查看使用历史</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium"
            >
              立即登录
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200"
            >
              注册账户
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">我的仪表盘</h1>
              <p className="text-gray-500">欢迎回来，{user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">我的收藏</h2>
                <p className="text-sm text-gray-500">{favoriteTools.length} 个工具</p>
              </div>
            </div>
            
            {favoriteTools.length > 0 ? (
              <div className="space-y-4">
                {favoriteTools.map(tool => (
                  <div key={tool.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between">
                      <Link to={`/tools/${tool.id}`} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-semibold">{tool.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(tool.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无收藏</h3>
                <p className="text-gray-500 mb-4">浏览工具库，收藏您喜欢的工具</p>
                <Link
                  to="/tools"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  浏览工具库
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">最近使用</h2>
                <p className="text-sm text-gray-500">{historyTools.length} 个工具</p>
              </div>
            </div>
            
            {historyTools.length > 0 ? (
              <div className="space-y-4">
                {historyTools.map(tool => (
                  <div key={tool.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                    <Link to={`/tools/${tool.id}`} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold">{tool.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-gray-500">{tool.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无使用记录</h3>
                <p className="text-gray-500 mb-4">使用工具后会在这里显示</p>
                <Link
                  to="/tools"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  开始使用工具
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
