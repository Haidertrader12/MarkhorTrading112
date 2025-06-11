import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from "lucide-react";
import EnhancedScrollAnimated from "./enhanced-scroll-animations";
import AnimatedCounter from "./animated-counter";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sparkline: number[];
}

const generateSparkline = (days: number = 7): number[] => {
  const data = [];
  let baseValue = 100;
  
  for (let i = 0; i < days * 24; i++) {
    const change = (Math.random() - 0.5) * 0.05;
    baseValue *= (1 + change);
    data.push(baseValue);
  }
  
  return data;
};

const marketData: MarketData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 45234.67,
    change: 1234.56,
    changePercent: 2.81,
    volume: 28500000000,
    marketCap: 890000000000,
    sparkline: generateSparkline()
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2856.92,
    change: -45.23,
    changePercent: -1.56,
    volume: 15200000000,
    marketCap: 343000000000,
    sparkline: generateSparkline()
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.45,
    change: 12.34,
    changePercent: 14.32,
    volume: 2100000000,
    marketCap: 42000000000,
    sparkline: generateSparkline()
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.467,
    change: 0.023,
    changePercent: 5.18,
    volume: 890000000,
    marketCap: 16400000000,
    sparkline: generateSparkline()
  }
];

const MiniSparkline = ({ data, isPositive }: { data: number[], isPositive: boolean }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-20 h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? "#10B981" : "#EF4444"}
        strokeWidth="2"
        className="opacity-80"
      />
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity="0.0"/>
        </linearGradient>
      </defs>
      <polyline
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
      />
    </svg>
  );
};

export default function AdvancedMarketOverview() {
  const [liveData, setLiveData] = useState(marketData);
  const [totalMarketCap, setTotalMarketCap] = useState(0);

  useEffect(() => {
    const updatePrices = () => {
      setLiveData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() - 0.5) * 0.01),
        change: coin.change + (Math.random() - 0.5) * 50,
        changePercent: coin.changePercent + (Math.random() - 0.5) * 2,
        volume: coin.volume * (1 + (Math.random() - 0.5) * 0.1)
      })));
    };

    const interval = setInterval(updatePrices, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTotalMarketCap(liveData.reduce((sum, coin) => sum + coin.marketCap, 0));
  }, [liveData]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <EnhancedScrollAnimated direction="up" duration={1.0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
              Live Market Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time cryptocurrency prices and market data with professional-grade analytics
            </p>
          </div>
        </EnhancedScrollAnimated>

        {/* Market Stats */}
        <EnhancedScrollAnimated delay={200} direction="up" duration={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <DollarSign className="text-primary" size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Market Cap</span>
              </div>
              <AnimatedCounter 
                target={totalMarketCap / 1e12} 
                decimals={2} 
                className="text-3xl font-bold text-white font-mono" 
              />
              <span className="text-lg text-white font-mono">T</span>
            </div>

            <div className="bg-gradient-to-br from-emerald-800/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">24h Volume</span>
              </div>
              <AnimatedCounter 
                target={124.8} 
                decimals={1} 
                className="text-3xl font-bold text-emerald-400 font-mono" 
              />
              <span className="text-lg text-emerald-400 font-mono">B</span>
            </div>

            <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="text-blue-400" size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Active Trades</span>
              </div>
              <AnimatedCounter 
                target={1547} 
                className="text-3xl font-bold text-blue-400 font-mono" 
              />
            </div>

            <div className="bg-gradient-to-br from-purple-800/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="text-purple-400" size={20} />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Fear & Greed</span>
              </div>
              <AnimatedCounter 
                target={73} 
                className="text-3xl font-bold text-purple-400 font-mono" 
              />
              <span className="text-sm text-purple-400/80">Greed</span>
            </div>
          </div>
        </EnhancedScrollAnimated>

        {/* Cryptocurrency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveData.map((coin, index) => (
            <EnhancedScrollAnimated 
              key={coin.symbol} 
              delay={index * 100} 
              direction="up" 
              duration={0.8}
            >
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-500 group hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-white">
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{coin.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{coin.name}</p>
                    </div>
                  </div>
                  
                  <MiniSparkline data={coin.sparkline} isPositive={coin.changePercent >= 0} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-2xl font-bold text-white font-mono">
                      ${coin.price.toLocaleString('en-US', { 
                        minimumFractionDigits: coin.price < 1 ? 3 : 2,
                        maximumFractionDigits: coin.price < 1 ? 3 : 2
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                    <div className={`flex items-center gap-1 ${
                      coin.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {coin.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span className="font-bold font-mono">
                        {coin.changePercent >= 0 ? '+' : ''}{coin.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Volume</p>
                    <p className="text-lg font-semibold text-white font-mono">
                      ${(coin.volume / 1e9).toFixed(2)}B
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                    <p className="text-lg font-semibold text-white font-mono">
                      ${(coin.marketCap / 1e9).toFixed(0)}B
                    </p>
                  </div>
                </div>
              </div>
            </EnhancedScrollAnimated>
          ))}
        </div>
      </div>
    </section>
  );
}