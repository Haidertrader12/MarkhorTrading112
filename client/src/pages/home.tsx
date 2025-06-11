import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TradingChart from "@/components/trading-chart";
import AdvancedMarketOverview from "@/components/advanced-market-overview";
import TradingPlatform from "@/components/trading-platform";
import PremiumServices from "@/components/premium-services";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import EnhancedScrollAnimated from "@/components/enhanced-scroll-animations";
import NewsSection from "@/components/news-section";
import AboutSection from "@/components/about-section";

import TradingViewChart from "@/components/tradingview-chart";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />

      {/* Live EUR/USD Trading Chart */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <EnhancedScrollAnimated direction="fade" duration={1.0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Live EUR/USD Trading Chart
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional-grade live trading charts powered by TradingView with real-time market data
              </p>
            </div>
          </EnhancedScrollAnimated>

          <EnhancedScrollAnimated delay={300} direction="scale" duration={1.2}>
            <div className="max-w-6xl mx-auto">
              <TradingViewChart
                symbol="FX:EURUSD"
                height={600}
                interval="15"
                theme="dark"
                container_id="main_eurusd_chart"
                allow_symbol_change={true}
                save_image={true}
              />
            </div>
          </EnhancedScrollAnimated>
        </div>
      </section>

      {/* Professional Trading Chart Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <EnhancedScrollAnimated direction="fade" duration={1.0}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Advanced Trading Analytics
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real-time candlestick charts with professional-grade analysis tools and live market data
              </p>
            </div>
          </EnhancedScrollAnimated>

          <div className="grid lg:grid-cols-2 gap-8">
            <EnhancedScrollAnimated delay={200} direction="left" duration={1.2}>
              <TradingChart />
            </EnhancedScrollAnimated>

            <EnhancedScrollAnimated delay={400} direction="right" duration={1.2}>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl border border-primary/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Market Analytics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <div className="text-emerald-400 text-2xl font-bold">+12.5%</div>
                      <div className="text-sm text-muted-foreground">24h Change</div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="text-blue-400 text-2xl font-bold">$45,230</div>
                      <div className="text-sm text-muted-foreground">Current Price</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="text-yellow-400 text-2xl font-bold">2.1M</div>
                      <div className="text-sm text-muted-foreground">Volume</div>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <div className="text-purple-400 text-2xl font-bold">RSI 68</div>
                      <div className="text-sm text-muted-foreground">Technical</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl border border-accent/20 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      Buy Order
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                      Sell Order
                    </button>
                  </div>
                </div>
              </div>
            </EnhancedScrollAnimated>
          </div>
        </div>
      </section>

      {/* Advanced Market Overview */}
      <AdvancedMarketOverview />

      {/* About Us Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <EnhancedScrollAnimated direction="fade" duration={1.0}>
            <AboutSection />
          </EnhancedScrollAnimated>
        </div>
      </section>

      

      {/* Trading Platform Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-blue-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <EnhancedScrollAnimated direction="up" duration={1.0}>
            <TradingPlatform />
          </EnhancedScrollAnimated>
        </div>
      </section>

      {/* Premium Services */}
      {/* <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <EnhancedScrollAnimated direction="blur" duration={1.0}>
            <PremiumServices />
          </EnhancedScrollAnimated>
        </div>
      </section> */}

       {/* News Section */}
       <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <EnhancedScrollAnimated direction="blur" duration={1.0}>
            <NewsSection />
          </EnhancedScrollAnimated>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <EnhancedScrollAnimated direction="scale" duration={1.0}>
            <ContactSection />
          </EnhancedScrollAnimated>
        </div>
      </section>

      <Footer />
    </div>
  );
}