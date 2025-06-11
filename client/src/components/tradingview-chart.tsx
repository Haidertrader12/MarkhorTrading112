import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  interval?: string;
  theme?: 'light' | 'dark';
  style?: string;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  width?: string | number;
  height?: string | number;
  range?: string;
  hide_side_toolbar?: boolean;
  allow_symbol_change?: boolean;
  save_image?: boolean;
  container_id?: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export default function TradingViewChart({
  symbol,
  interval = "15",
  theme = "dark",
  style = "1",
  locale = "en",
  toolbar_bg = "#f1f3f6",
  enable_publishing = false,
  width = "100%",
  height = 500,
  range = "1D",
  hide_side_toolbar = false,
  allow_symbol_change = true,
  save_image = false,
  container_id
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById(container_id);
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: allow_symbol_change,
      container_id: container_id,
      save_image: save_image,
      studies: [
        "Volume@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies"
      ],
      height: height
    });

    try {
      container.appendChild(script);
    } catch (error) {
      console.error('Error loading TradingView chart:', error);
    }

    return () => {
      try {
        if (container && script.parentNode === container) {
          container.removeChild(script);
        }
      } catch (error) {
        console.error('Error cleaning up TradingView chart:', error);
      }
    };
  }, [symbol, interval, theme, container_id, allow_symbol_change, save_image, height]);

  return (
    <div 
      ref={containerRef}
      id={container_id || `tradingview_${symbol.replace(/[^a-zA-Z0-9]/g, '_')}`}
      className="w-full rounded-lg overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm"
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    />
  );
}