import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">超过 100+ 实用工具</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              一站式
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                在线工具集
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              无需下载安装，随时随地使用各类实用工具。从日常计算到专业开发，满足您的所有需求。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/tools"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-blue-500/25 transition-all hover:-translate-y-0.5"
              >
                开始探索
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                浏览全部工具
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">快速响应</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">数据安全</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600">即时结果</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl rotate-6 opacity-20" />
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-6">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">12</div>
                    <div className="text-sm opacity-80">工具分类</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-sm opacity-80">实用工具</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">50K+</div>
                    <div className="text-sm opacity-80">每日使用</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
                    <div className="text-3xl font-bold mb-1">99.9%</div>
                    <div className="text-sm opacity-80">可用性</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
