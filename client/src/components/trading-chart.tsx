import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const generateRealisticData = (hours: number = 48): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 45000;
  
  for (let i = 0; i < hours; i++) {
    const volatility = 0.008 + Math.random() * 0.012;
    const trend = Math.sin(i / 6) * 0.002;
    const noise = (Math.random() - 0.5) * volatility;
    
    const open = basePrice;
    const priceChange = trend + noise;
    const close = open * (1 + priceChange);
    
    const intradayVol = volatility * 0.6;
    const high = Math.max(open, close) * (1 + Math.random() * intradayVol);
    const low = Math.min(open, close) * (1 - Math.random() * intradayVol);
    
    data.push({
      time: Date.now() - (hours - i) * 3600000,
      open,
      high,
      low,
      close,
      volume: 800000 + Math.random() * 400000
    });
    
    basePrice = close;
  }
  
  return data;
};

export default function TradingChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<CandlestickData[]>(() => generateRealisticData());
  const [currentPrice, setCurrentPrice] = useState(45000);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    setupCanvas();

    const drawChart = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const bgGradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGradient.addColorStop(1, 'rgba(30, 41, 59, 0.95)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      if (data.length === 0) return;

      const padding = { top: 40, right: 80, bottom: 60, left: 80 };
      const chartWidth = rect.width - padding.left - padding.right;
      const chartHeight = rect.height - padding.top - padding.bottom;

      const prices = data.flatMap(d => [d.high, d.low]);
      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);
      const priceRange = maxPrice - minPrice;
      const paddedMax = maxPrice + priceRange * 0.05;
      const paddedMin = minPrice - priceRange * 0.05;
      const paddedRange = paddedMax - paddedMin;

      // Grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 8; i++) {
        const y = padding.top + (i * chartHeight) / 8;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        
        const price = paddedMax - (i * paddedRange) / 8;
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '11px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(price.toLocaleString('en-US', { maximumFractionDigits: 0 }), padding.left - 10, y + 4);
      }

      for (let i = 0; i <= 6; i++) {
        const x = padding.left + (i * chartWidth) / 6;
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + chartHeight);
        ctx.stroke();
      }

      // Candlesticks
      const candleWidth = Math.max(2, chartWidth / data.length * 0.7);

      data.forEach((candle, index) => {
        const x = padding.left + (index * chartWidth) / (data.length - 1);
        
        const openY = padding.top + ((paddedMax - candle.open) / paddedRange) * chartHeight;
        const closeY = padding.top + ((paddedMax - candle.close) / paddedRange) * chartHeight;
        const highY = padding.top + ((paddedMax - candle.high) / paddedRange) * chartHeight;
        const lowY = padding.top + ((paddedMax - candle.low) / paddedRange) * chartHeight;

        const isGreen = candle.close > candle.open;
        const bodyHeight = Math.abs(closeY - openY);
        const bodyTop = Math.min(openY, closeY);

        const greenColor = '#10B981';
        const redColor = '#EF4444';
        const wickColor = isGreen ? greenColor : redColor;
        
        // Wick
        ctx.strokeStyle = wickColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Body
        if (bodyHeight < 1) {
          ctx.strokeStyle = wickColor;
          ctx.beginPath();
          ctx.moveTo(x - candleWidth/2, openY);
          ctx.lineTo(x + candleWidth/2, openY);
          ctx.stroke();
        } else {
          ctx.fillStyle = isGreen ? greenColor : redColor;
          ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
          
          if (!isGreen) {
            ctx.strokeStyle = redColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
          }
        }
      });

      // Current price line
      const latestPrice = data[data.length - 1]?.close || currentPrice;
      const priceY = padding.top + ((paddedMax - latestPrice) / paddedRange) * chartHeight;
      
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(padding.left, priceY);
      ctx.lineTo(padding.left + chartWidth, priceY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#F59E0B';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`$${latestPrice.toLocaleString()}`, padding.left + chartWidth + 10, priceY + 4);

      // Volume bars
      const volumeHeight = 40;
      const maxVolume = Math.max(...data.map(d => d.volume));
      
      data.forEach((candle, index) => {
        const x = padding.left + (index * chartWidth) / (data.length - 1);
        const barHeight = (candle.volume / maxVolume) * volumeHeight;
        const barY = rect.height - padding.bottom + 20;
        
        ctx.fillStyle = candle.close > candle.open ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)';
        ctx.fillRect(x - candleWidth/2, barY - barHeight, candleWidth, barHeight);
      });
    };

    drawChart();

    const updateInterval = setInterval(() => {
      const lastCandle = data[data.length - 1];
      if (!lastCandle) return;

      const volatility = 0.003;
      const change = (Math.random() - 0.5) * volatility;
      const newPrice = lastCandle.close * (1 + change);
      
      setCurrentPrice(newPrice);
      setPriceChange(((newPrice - data[0].close) / data[0].close) * 100);
      
      setData(prev => {
        const updated = [...prev];
        const current = updated[updated.length - 1];
        updated[updated.length - 1] = {
          ...current,
          high: Math.max(current.high, newPrice),
          low: Math.min(current.low, newPrice),
          close: newPrice
        };
        return updated;
      });
      
      drawChart();
    }, 2000);

    const handleResize = () => {
      setupCanvas();
      drawChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(updateInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [data, currentPrice]);

  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Activity className="text-primary" size={24} />
            <div>
              <h3 className="text-xl font-bold text-white">BTC/USDT</h3>
              <p className="text-sm text-muted-foreground">Bitcoin / Tether</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold text-white font-mono">
                ${currentPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {['1H', '4H', '1D', '1W'].map((timeframe, index) => (
            <button 
              key={timeframe}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                index === 2
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      
      <canvas 
        ref={chartRef} 
        className="w-full h-full cursor-crosshair"
        style={{ height: 'calc(100% - 100px)' }}
      />
    </div>
  );
}
