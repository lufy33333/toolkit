import { Hero } from '@/components/Hero';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard } from '@/components/CategoryCard';
import { useToolStore } from '@/store/toolStore';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Home() {
  const { tools, categories, selectedCategory, setSelectedCategory } = useToolStore();
  
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? tools.length : tools.filter(t => t.category === cat.id).length
  }));
  
  const featuredTools = tools.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              工具分类
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">按类别浏览</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">选择一个类别，快速找到您需要的工具</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {categoryCounts.map(category => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                count={category.count}
                isActive={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                }}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">热门工具</h2>
              <p className="text-gray-600">最受欢迎的实用工具</p>
            </div>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">开始使用 ToolHub</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            无需注册即可使用所有工具。注册账户可保存收藏和使用历史，体验更便捷。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:shadow-xl transition-all"
            >
              立即体验
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white rounded-xl font-medium border border-white/30 hover:bg-white/30 transition-all"
            >
              注册账户
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <span className="font-semibold text-gray-900">ToolHub</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>© 2024 ToolHub. All rights reserved.</span>
              <a href="#" className="hover:text-blue-600 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-blue-600 transition-colors">使用条款</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
