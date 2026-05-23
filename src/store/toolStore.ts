import { create } from 'zustand';
import { tools, categories, type Tool } from '@/data/tools';

interface ToolStore {
  tools: Tool[];
  categories: typeof categories;
  selectedCategory: string;
  favorites: string[];
  history: string[];
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  addToFavorites: (toolId: string) => void;
  removeFromFavorites: (toolId: string) => void;
  addToHistory: (toolId: string) => void;
  filteredTools: () => Tool[];
  getFavoriteTools: () => Tool[];
  getHistoryTools: () => Tool[];
}

export const useToolStore = create<ToolStore>((set, get) => ({
  tools,
  categories,
  selectedCategory: 'all',
  favorites: [],
  history: [],
  searchQuery: '',

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  addToFavorites: (toolId) => set((state) => ({
    favorites: state.favorites.includes(toolId) 
      ? state.favorites 
      : [...state.favorites, toolId]
  })),

  removeFromFavorites: (toolId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== toolId)
  })),

  addToHistory: (toolId) => set((state) => ({
    history: [toolId, ...state.history.filter(id => id !== toolId)].slice(0, 10)
  })),

  filteredTools: () => {
    const { tools, selectedCategory, searchQuery } = get();
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  },

  getFavoriteTools: () => {
    const { tools, favorites } = get();
    return tools.filter(tool => favorites.includes(tool.id));
  },

  getHistoryTools: () => {
    const { tools, history } = get();
    return history.map(id => tools.find(tool => tool.id === id)).filter(Boolean) as Tool[];
  },
}));
