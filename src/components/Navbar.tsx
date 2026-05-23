import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, User, Home, Wrench } from 'lucide-react';
import { useToolStore } from '@/store/toolStore';
import { useUserStore } from '@/store/userStore';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useToolStore();
  const { isLoggedIn, logout, user } = useUserStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/tools');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ToolHub
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>首页</span>
            </Link>
            <Link to="/tools" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Wrench className="w-4 h-4" />
              <span>工具库</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </Link>
                <div className="relative cursor-pointer group">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full bg-gray-200 object-cover"
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="p-4">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={logout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                      >
                        退出登录
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors">
                  登录
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  注册
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
            <div className="space-y-2">
              <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">首页</Link>
              <Link to="/tools" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">工具库</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">我的收藏</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">退出登录</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">登录</Link>
                  <Link to="/signup" className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center">注册</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
