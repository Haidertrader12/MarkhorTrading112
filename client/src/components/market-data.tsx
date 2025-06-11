import EnhancedScrollAnimated, { ParallaxScroll, MouseTracking } from "./enhanced-scroll-animations";
import TradingChart from "./trading-chart";

export default function MarketData() {
  return (
    <section id="analytics" className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <EnhancedScrollAnimated direction="rotate" duration={1.2}>
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
              Live Market Data
            </h2>
          </EnhancedScrollAnimated>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <EnhancedScrollAnimated direction="left" delay={200}>
            <MouseTracking intensity={0.08}>
              <TradingChart />
            </MouseTracking>
          </EnhancedScrollAnimated>
          
          <EnhancedScrollAnimated direction="right" delay={400}>
            <ParallaxScroll offset={50}>
              <MouseTracking intensity={0.05}>
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80" 
                  alt="Modern business professionals analyzing data in premium workspace" 
                  className="rounded-2xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </MouseTracking>
            </ParallaxScroll>
          </EnhancedScrollAnimated>
        </div>
      </div>
    </section>
  );
}
