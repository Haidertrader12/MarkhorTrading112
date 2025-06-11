import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart3, Shield, Activity, Zap, Target } from "lucide-react";
import EnhancedScrollAnimated, { ParallaxScroll, MouseTracking } from "./enhanced-scroll-animations";
import TradingViewChart from "./tradingview-chart";

export default function TradingPlatform() {
  return (
    <section id="trading" className="py-32 bg-gradient-to-b from-background to-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <EnhancedScrollAnimated direction="rotate" duration={1.2}>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
              Advanced Trading Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Harness the power of cutting-edge technology with our premium trading platform
            </p>
          </EnhancedScrollAnimated>
        </div>
        
        {/* Live TradingView Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <EnhancedScrollAnimated direction="left" delay={200}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center text-primary">EUR/USD Live Chart</h3>
              <TradingViewChart
                symbol="FX:EURUSD"
                height={400}
                interval="15"
                theme="dark"
                container_id="eurusd_chart"
              />
            </div>
          </EnhancedScrollAnimated>

          <EnhancedScrollAnimated direction="right" delay={300}>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center text-primary">Bitcoin Live Chart</h3>
              <TradingViewChart
                symbol="BITSTAMP:BTCUSD"
                height={400}
                interval="15"
                theme="dark"
                container_id="bitcoin_chart"
              />
            </div>
          </EnhancedScrollAnimated>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <EnhancedScrollAnimated direction="left" delay={400}>
            <Card className="trading-card ultra-glass border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 animate-scale-in group">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mr-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                    <Activity className="text-primary-foreground" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Live Market Data</h3>
                </div>
                <p className="text-muted-foreground">Real-time market feeds with microsecond precision and institutional-grade data quality.</p>
                <div className="mt-4 flex items-center text-sm text-primary">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                  Live • 0.001s latency
                </div>
              </CardContent>
            </Card>
          </EnhancedScrollAnimated>
          
          <EnhancedScrollAnimated direction="up" delay={500}>
            <Card className="trading-card ultra-glass border-accent/30 hover:border-accent/60 transition-all duration-500 hover:scale-105 animate-scale-in group" style={{animationDelay: "0.2s"}}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                    <Zap className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-accent">AI-Powered Signals</h3>
                </div>
                <p className="text-muted-foreground">Advanced algorithms analyze market patterns and provide intelligent trading signals.</p>
                <div className="mt-4 flex items-center text-sm text-accent">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse mr-2"></div>
                  89% accuracy rate
                </div>
              </CardContent>
            </Card>
          </EnhancedScrollAnimated>
          
          <EnhancedScrollAnimated direction="right" delay={600}>
            <Card className="trading-card ultra-glass border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 hover:scale-105 animate-scale-in group" style={{animationDelay: "0.4s"}}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mr-4 animate-pulse-glow group-hover:scale-110 transition-transform">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-500">Precision Trading</h3>
                </div>
                <p className="text-muted-foreground">Execute trades with institutional-grade precision and advanced risk management.</p>
                <div className="mt-4 flex items-center text-sm text-emerald-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  Sub-millisecond execution
                </div>
              </CardContent>
            </Card>
          </EnhancedScrollAnimated>
        </div>
      </div>
    </section>
  );
}
