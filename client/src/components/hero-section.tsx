import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";
import AnimatedCounter from "./animated-counter";
import EnhancedScrollAnimated, { ParallaxScroll, MouseTracking } from "./enhanced-scroll-animations";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center gradient-bg trading-grid-bg overflow-hidden">
      {/* Trading Grid Background */}
      <div className="absolute inset-0 z-0 trading-grid-bg opacity-30"></div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent opacity-30 rounded-full animate-float" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 border-2 border-emerald-500 rotate-12 animate-float" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="container mx-auto px-6 text-center z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Luxury trading floor panoramic view */}
          <ParallaxScroll offset={100} className="mb-8 relative">
            <EnhancedScrollAnimated direction="scale" duration={1.5}>
              <MouseTracking intensity={0.1}>
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Luxury trading floor with multiple monitors" 
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary animate-float opacity-80 hover:scale-110 transition-transform duration-700" 
                />
              </MouseTracking>
            </EnhancedScrollAnimated>
          </ParallaxScroll>

          <EnhancedScrollAnimated direction="scale" duration={1.2}>
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent brand-3d premium-text-glow animate-bounce-in">
                MARKHOR
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent brand-3d premium-text-glow animate-bounce-in" style={{animationDelay: "0.3s"}}>
                TRADER
              </span>
            </h1>
          </EnhancedScrollAnimated>

          <EnhancedScrollAnimated delay={400} direction="up" duration={1.0}>
            <div className="mb-8">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2 premium-text-glow">Professional Trading Excellence</div>
              <div className="text-lg text-accent font-semibold">Advanced algorithms • Real-time data • Premium execution</div>
            </div>
          </EnhancedScrollAnimated>

          <EnhancedScrollAnimated delay={600} direction="up" duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <MouseTracking intensity={0.05}>
                <Button size="lg" className="gold-gradient text-primary-foreground font-bold text-lg px-12 py-4 rounded-xl hover:scale-110 transition-all duration-500 animate-pulse-glow">
                  <Rocket className="mr-3" size={20} />
                  Start Premium Trading
                </Button>
              </MouseTracking>
              <MouseTracking intensity={0.05}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="ultra-glass border-2 border-primary text-primary font-semibold text-lg px-12 py-4 rounded-xl hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-500"
                >
                  <Play className="mr-3" size={20} />
                  Watch Demo
                </Button>
              </MouseTracking>
            </div>
          </EnhancedScrollAnimated>

          {/* Premium Trading Metrics */}
          <EnhancedScrollAnimated delay={800} direction="up" duration={1.0}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <MouseTracking intensity={0.03}>
                <div className="text-center ultra-glass p-8 rounded-3xl border border-primary/30 hover:border-primary/60 transition-all duration-700 hover:scale-105 market-pulse">
                  <div className="w-16 h-16 mx-auto mb-4 gold-gradient rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-navy">₿</span>
                  </div>
                  <AnimatedCounter target={847.2} decimals={1} className="text-4xl font-black text-primary font-mono premium-text-glow" />
                  <div className="text-sm font-semibold text-emerald-500">BTC Price (K)</div>
                  <div className="text-xs text-muted-foreground mt-1">+2.4% Today</div>
                </div>
              </MouseTracking>

              <MouseTracking intensity={0.03}>
                <div className="text-center ultra-glass p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-700 hover:scale-105 market-pulse" style={{animationDelay: "0.5s"}}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">📈</span>
                  </div>
                  <AnimatedCounter target={2.8} decimals={1} className="text-4xl font-black text-emerald-500 font-mono premium-text-glow" />
                  <div className="text-sm font-semibold text-emerald-500">Billion Volume</div>
                  <div className="text-xs text-muted-foreground mt-1">24h Trading</div>
                </div>
              </MouseTracking>

              <MouseTracking intensity={0.03}>
                <div className="text-center ultra-glass p-8 rounded-3xl border border-accent/30 hover:border-accent/60 transition-all duration-700 hover:scale-105 market-pulse" style={{animationDelay: "1s"}}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">⚡</span>
                  </div>
                  <AnimatedCounter target={99.99} decimals={2} className="text-4xl font-black text-accent font-mono premium-text-glow" />
                  <div className="text-sm font-semibold text-accent">Uptime %</div>
                  <div className="text-xs text-muted-foreground mt-1">Enterprise Grade</div>
                </div>
              </MouseTracking>

              <MouseTracking intensity={0.03}>
                <div className="text-center ultra-glass p-8 rounded-3xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-700 hover:scale-105 market-pulse" style={{animationDelay: "1.5s"}}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">🌍</span>
                  </div>
                  <AnimatedCounter target={195} className="text-4xl font-black text-purple-500 font-mono premium-text-glow" />
                  <div className="text-sm font-semibold text-purple-500">Global Markets</div>
                  <div className="text-xs text-muted-foreground mt-1">Worldwide Access</div>
                </div>
              </MouseTracking>
            </div>
          </EnhancedScrollAnimated>
        </div>
      </div>
    </section>
  );
}