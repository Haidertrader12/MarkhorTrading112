
import Navigation from "@/components/navigation";
import TradingBotsSection from "@/components/trading-bots-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import EnhancedScrollAnimated from "@/components/enhanced-scroll-animations";

export default function TradingBots() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-foreground overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-emerald-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <EnhancedScrollAnimated direction="up" duration={1.0}>
            <div className="text-center">
              <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                AI Trading Bots
              </h1>
              <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
                Advanced automated trading solutions powered by artificial intelligence and machine learning
              </p>
            </div>
          </EnhancedScrollAnimated>
        </div>
      </section>

      {/* Trading Bots Content */}
      <TradingBotsSection />

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
