import { useParams, useNavigate } from 'react-router-dom';
import { useToolStore } from '@/store/toolStore';
import { ArrowLeft, Heart, Star, Share2, Copy, Check, Wrench } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

export function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tools, favorites, addToFavorites, removeFromFavorites, addToHistory } = useToolStore();
  const [copied, setCopied] = useState(false);
  
  const tool = tools.find(t => t.id === id);
  const isFavorite = favorites.includes(id || '');
  const IconComponent = tool ? iconMap[tool.icon] || Wrench : Wrench;

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icons.Wrench className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">工具不存在</h3>
          <button
            onClick={() => navigate('/tools')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            返回工具库
          </button>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(tool.id);
    } else {
      addToFavorites(tool.id);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  addToHistory(tool.id);

  const ToolInterface = () => {
    switch (tool.id) {
      case '1': return <BMICalculator />;
      case '2': return <CurrencyConverter />;
      case '3': return <PasswordGenerator />;
      case '4': return <JsonFormatter />;
      case '5': return <UrlEncoder />;
      case '6': return <EmailValidator />;
      case '7': return <ColorPicker />;
      case '8': return <TimestampConverter />;
      case '9': return <IpValidator />;
      case '10': return <Base64Converter />;
      case '11': return <RandomNumberGenerator />;
      case '12': return <HtmlFormatter />;
      default: return <DefaultTool />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/tools')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-sm text-gray-500">
                  {tool.usageCount.toLocaleString()} 次使用
                </span>
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
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{tool.name}</h2>
                <p className="text-gray-500">{tool.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                )}
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </button>
              <button
                onClick={handleCopy}
                className="p-3 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
              <button className="p-3 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <ToolInterface />
        </div>
      </div>
    </div>
  );
}

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    
    if (h && w) {
      const bmi = w / (h * h);
      setResult(Math.round(bmi * 10) / 10);
      
      if (bmi < 18.5) setCategory('偏瘦');
      else if (bmi < 24) setCategory('正常');
      else if (bmi < 28) setCategory('偏胖');
      else setCategory('肥胖');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="输入身高"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">体重 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="输入体重"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      <button
        onClick={calculateBMI}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        计算 BMI
      </button>
      {result !== null && (
        <div className="text-center py-6 bg-gray-50 rounded-xl">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {result}
          </div>
          <div className="text-gray-600">您的 BMI 属于 <span className="font-semibold text-blue-600">{category}</span></div>
        </div>
      )}
    </div>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('CNY');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState<string | null>(null);

  const rates: Record<string, number> = {
    CNY: 1,
    USD: 0.14,
    EUR: 0.13,
    GBP: 0.11,
    JPY: 21.5,
  };

  const convert = () => {
    const amt = parseFloat(amount);
    if (amt) {
      const rate = rates[to] / rates[from];
      setResult((amt * rate).toFixed(2));
    }
  };

  const currencies = ['CNY', 'USD', 'EUR', 'GBP', 'JPY'];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">金额</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="输入金额"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">从</label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            {currencies.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">到</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            {currencies.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <button
        onClick={convert}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        转换
      </button>
      {result !== null && (
        <div className="text-center py-6 bg-gray-50 rounded-xl">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {amount} {from} = {result} {to}
          </div>
        </div>
      )}
    </div>
  );
}

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) return;

    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">密码长度: {length}</label>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">包含大写字母 (A-Z)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">包含小写字母 (a-z)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">包含数字 (0-9)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">包含特殊字符 (!@#$)</span>
        </label>
      </div>
      <button
        onClick={generatePassword}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        生成密码
      </button>
      {password && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <code className="flex-1 font-mono text-sm text-gray-700 break-all">{password}</code>
          <button
            onClick={copyPassword}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      )}
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError('无效的 JSON 格式');
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输入 JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name":"John","age":30}'
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输出</label>
          <textarea
            value={output}
            readOnly
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm"
          />
        </div>
      </div>
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}
      <div className="flex gap-4">
        <button
          onClick={formatJson}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          格式化
        </button>
        <button
          onClick={minifyJson}
          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          压缩
        </button>
        <button
          onClick={clearAll}
          className="py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          清空
        </button>
      </div>
    </div>
  );
}

function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    if (mode === 'encode') {
      setOutput(encodeURIComponent(input));
    } else {
      try {
        setOutput(decodeURIComponent(input));
      } catch {
        setOutput('无效的 URL 编码');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('encode')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          URL 编码
        </button>
        <button
          onClick={() => setMode('decode')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          URL 解码
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com/path with spaces"
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输出</label>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm"
          />
        </div>
      </div>
      <button
        onClick={convert}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        {mode === 'encode' ? '编码' : '解码'}
      </button>
    </div>
  );
}

function EmailValidator() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<'valid' | 'invalid' | null>(null);

  const validateEmail = () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setResult(re.test(email) ? 'valid' : 'invalid');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
      <button
        onClick={validateEmail}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        验证邮箱
      </button>
      {result !== null && (
        <div className={cn(
          "text-center py-6 rounded-xl",
          result === 'valid' ? 'bg-green-50' : 'bg-red-50'
        )}>
          <div className={cn(
            "text-lg font-semibold",
            result === 'valid' ? 'text-green-600' : 'text-red-600'
          )}>
            {result === 'valid' ? '✓ 邮箱地址有效' : '✗ 邮箱地址无效'}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState('#6366f1');

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-xl border-4 border-gray-200" style={{ backgroundColor: color }} />
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">选择颜色</label>
          <div className="flex gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <div className="text-sm text-gray-500 mb-1">Hex</div>
          <code className="font-mono text-sm text-gray-700">{color}</code>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <div className="text-sm text-gray-500 mb-1">RGB</div>
          <code className="font-mono text-sm text-gray-700">
            {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '-'}
          </code>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <div className="text-sm text-gray-500 mb-1">HSL</div>
          <code className="font-mono text-sm text-gray-700">
            {hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : '-'}
          </code>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl text-center">
          <div className="text-sm text-gray-500 mb-1">CSS Var</div>
          <code className="font-mono text-sm text-gray-700">var(--color)</code>
        </div>
      </div>
    </div>
  );
}

function TimestampConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate');

  const convert = () => {
    if (mode === 'toDate') {
      const timestamp = parseInt(input);
      if (!isNaN(timestamp)) {
        const date = new Date(timestamp * 1000);
        setResult(date.toLocaleString('zh-CN'));
      } else {
        setResult('无效的时间戳');
      }
    } else {
      const date = new Date(input);
      if (!isNaN(date.getTime())) {
        setResult(Math.floor(date.getTime() / 1000).toString());
      } else {
        setResult('无效的日期格式');
      }
    }
  };

  const getCurrentTimestamp = () => {
    setInput(Math.floor(Date.now() / 1000).toString());
    setMode('toDate');
    convert();
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('toDate')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'toDate' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          时间戳 → 日期
        </button>
        <button
          onClick={() => setMode('toTimestamp')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'toTimestamp' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          日期 → 时间戳
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {mode === 'toDate' ? '输入时间戳' : '输入日期'}
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'toDate' ? '1699999999' : '2024-01-01 12:00:00'}
          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={convert}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          转换
        </button>
        <button
          onClick={getCurrentTimestamp}
          className="py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          当前时间戳
        </button>
      </div>
      {result && (
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-500 mb-1">结果</div>
          <code className="font-mono text-gray-700">{result}</code>
        </div>
      )}
    </div>
  );
}

function IpValidator() {
  const [ip, setIp] = useState('');
  const [result, setResult] = useState<'ipv4' | 'ipv6' | 'invalid' | null>(null);

  const validateIp = () => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^([0-9a-fA-F]{1,4}:){1,7}:$/;
    
    if (ipv4Regex.test(ip)) {
      setResult('ipv4');
    } else if (ipv6Regex.test(ip)) {
      setResult('ipv6');
    } else {
      setResult('invalid');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">IP 地址</label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="192.168.1.1 或 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
          className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
      <button
        onClick={validateIp}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        验证 IP 地址
      </button>
      {result !== null && (
        <div className={cn(
          "text-center py-6 rounded-xl",
          result === 'invalid' ? 'bg-red-50' : 'bg-green-50'
        )}>
          <div className={cn(
            "text-lg font-semibold",
            result === 'invalid' ? 'text-red-600' : 'text-green-600'
          )}>
            {result === 'ipv4' ? '✓ IPv4 地址有效' : result === 'ipv6' ? '✓ IPv6 地址有效' : '✗ 无效的 IP 地址'}
          </div>
        </div>
      )}
    </div>
  );
}

function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const convert = () => {
    if (mode === 'encode') {
      setOutput(btoa(input));
    } else {
      try {
        setOutput(atob(input));
      } catch {
        setOutput('无效的 Base64 编码');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('encode')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'encode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          Base64 编码
        </button>
        <button
          onClick={() => setMode('decode')}
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-all",
            mode === 'decode' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          Base64 解码
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入文本..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输出</label>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm"
          />
        </div>
      </div>
      <button
        onClick={convert}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        {mode === 'encode' ? '编码' : '解码'}
      </button>
    </div>
  );
}

function RandomNumberGenerator() {
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
      <button
        onClick={generate}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
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
  );
}

function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const formatHtml = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/html');
      const formatted = doc.body.innerHTML;
      setOutput(formatted);
    } catch {
      setOutput('无效的 HTML');
    }
  };

  const minifyHtml = () => {
    setOutput(input.replace(/[\s\n]+/g, ' ').trim());
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输入 HTML</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<div><p>Hello</p></div>'
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">输出</label>
          <textarea
            value={output}
            readOnly
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={formatHtml}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          格式化
        </button>
        <button
          onClick={minifyHtml}
          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
        >
          压缩
        </button>
      </div>
    </div>
  );
}

function DefaultTool() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icons.Wrench className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">工具开发中</h3>
      <p className="text-gray-500">该工具正在开发中，敬请期待</p>
    </div>
  );
}
