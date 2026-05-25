export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
  usageCount: number;
  path: string;
}

export const categories = [
  { id: 'all', name: '全部工具', icon: 'Grid3X3' },
  { id: 'calculator', name: '计算器', icon: 'Calculator' },
  { id: 'converter', name: '转换器', icon: 'RefreshCw' },
  { id: 'generator', name: '生成器', icon: 'Sparkles' },
  { id: 'validator', name: '验证器', icon: 'CheckCircle' },
  { id: 'formatter', name: '格式化', icon: 'Code' },
];

export const tools: Tool[] = [
  {
    id: '1',
    name: 'BMI计算器',
    description: '快速计算您的身体质量指数，了解健康状况',
    category: 'calculator',
    icon: 'Activity',
    rating: 4.8,
    usageCount: 12580,
    path: 'bmi-calculator',
  },
  {
    id: '2',
    name: '货币转换器',
    description: '支持全球多种货币实时汇率转换',
    category: 'converter',
    icon: 'Coins',
    rating: 4.9,
    usageCount: 23450,
    path: 'currency-converter',
  },
  {
    id: '3',
    name: '密码生成器',
    description: '生成安全可靠的随机密码',
    category: 'generator',
    icon: 'Lock',
    rating: 4.7,
    usageCount: 18920,
    path: 'password-generator',
  },
  {
    id: '4',
    name: 'JSON格式化',
    description: '格式化和美化JSON代码',
    category: 'formatter',
    icon: 'FileJson',
    rating: 4.6,
    usageCount: 15670,
    path: 'json-formatter',
  },
  {
    id: '5',
    name: 'URL编码解码',
    description: '对URL进行编码或解码操作',
    category: 'converter',
    icon: 'Link',
    rating: 4.5,
    usageCount: 9870,
    path: 'url-encoder',
  },
  {
    id: '6',
    name: '邮箱验证器',
    description: '验证邮箱地址格式是否正确',
    category: 'validator',
    icon: 'Mail',
    rating: 4.4,
    usageCount: 8760,
    path: 'email-validator',
  },
  {
    id: '7',
    name: '颜色选择器',
    description: '快速获取颜色的各种格式值',
    category: 'generator',
    icon: 'Palette',
    rating: 4.8,
    usageCount: 14520,
    path: 'color-picker',
  },
  {
    id: '8',
    name: '时间戳转换',
    description: 'Unix时间戳与日期时间的相互转换',
    category: 'converter',
    icon: 'Clock',
    rating: 4.6,
    usageCount: 11230,
    path: 'timestamp-converter',
  },
  {
    id: '9',
    name: 'IP地址验证',
    description: '验证IPv4和IPv6地址的有效性',
    category: 'validator',
    icon: 'Globe',
    rating: 4.3,
    usageCount: 7650,
    path: 'ip-validator',
  },
  {
    id: '10',
    name: 'Base64编码解码',
    description: '对文本进行Base64编码和解码',
    category: 'converter',
    icon: 'Binary',
    rating: 4.5,
    usageCount: 10340,
    path: 'base64-converter',
  },
  {
    id: '11',
    name: '随机数生成器',
    description: '生成指定范围内的随机数',
    category: 'generator',
    icon: 'Shuffle',
    rating: 4.4,
    usageCount: 8920,
    path: 'random-number-generator',
  },
  {
    id: '12',
    name: 'HTML格式化',
    description: '格式化和美化HTML代码',
    category: 'formatter',
    icon: 'Code2',
    rating: 4.7,
    usageCount: 12890,
    path: 'html-formatter',
  },
];