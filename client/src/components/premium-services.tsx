import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Brain, Network } from "lucide-react";
import EnhancedScrollAnimated, { MouseTracking, ParallaxScroll } from "./enhanced-scroll-animations";

export default function PremiumServices() {
  return (
    <section id="services" className="py-32 gradient-bg relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <EnhancedScrollAnimated direction="scale" duration={1.2}>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-muted bg-clip-text text-transparent">
              Exclusive Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium features designed for professional traders and institutions
            </p>
          </EnhancedScrollAnimated>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <EnhancedScrollAnimated direction="left" delay={200}>
            <MouseTracking>
              <Card className="trading-card ultra-glass border-primary/30 hover:border-primary/60 transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <ParallaxScroll offset={30}>
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Premium technology workspace with multiple trading monitors" 
                      className="w-full h-48 object-cover rounded-xl mb-6" 
                    />
                  </ParallaxScroll>
                  <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Crown className="text-primary-foreground" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">VIP Trading Desk</h3>
                  <p className="text-muted-foreground mb-6">Dedicated trading desk with personal account manager and premium execution.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-500"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </MouseTracking>
          </EnhancedScrollAnimated>
          
          <EnhancedScrollAnimated direction="scale" delay={400}>
            <MouseTracking>
              <Card className="trading-card ultra-glass border-accent/30 hover:border-accent/60 transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <ParallaxScroll offset={20}>
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="AI-powered financial analysis dashboard" 
                      className="w-full h-48 object-cover rounded-xl mb-6" 
                    />
                  </ParallaxScroll>
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Brain className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-accent mb-4">AI Analytics Pro</h3>
                  <p className="text-muted-foreground mb-6">Advanced AI-powered market analysis with predictive modeling and risk assessment.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 transition-all duration-500"
                  >
                    Explore AI
                  </Button>
                </CardContent>
              </Card>
            </MouseTracking>
          </EnhancedScrollAnimated>
          
          <EnhancedScrollAnimated direction="right" delay={600}>
            <MouseTracking>
              <Card className="trading-card ultra-glass border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 text-center">
                <CardContent className="p-8">
                  <ParallaxScroll offset={40}>
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" 
                      alt="Institutional-grade trading infrastructure and data center" 
                      className="w-full h-48 object-cover rounded-xl mb-6" 
                    />
                  </ParallaxScroll>
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Network className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-500 mb-4">Institutional API</h3>
                  <p className="text-muted-foreground mb-6">High-frequency trading APIs with ultra-low latency and institutional-grade infrastructure.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:scale-105 transition-all duration-500"
                  >
                    Get API Access
                  </Button>
                </CardContent>
              </Card>
            </MouseTracking>
          </EnhancedScrollAnimated>
        </div>

        {/* Premium Features Grid */}
        <div className="mt-32">
          <EnhancedScrollAnimated direction="rotate" delay={800}>
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                Premium Features
              </h2>
            </div>
          </EnhancedScrollAnimated>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🚀", title: "Ultra-Fast Execution", description: "Lightning-fast order execution with sub-millisecond latency" },
              { icon: "📱", title: "Mobile Trading", description: "Full-featured mobile app with all premium features" },
              { icon: "🎧", title: "24/7 Support", description: "Round-the-clock premium support from trading experts" },
              { icon: "🎓", title: "Trading Academy", description: "Exclusive educational content and masterclasses" }
            ].map((feature, index) => (
              <EnhancedScrollAnimated key={index} delay={1000 + index * 150} direction="scale">
                <MouseTracking intensity={0.05}>
                  <Card className="trading-card ultra-glass border-primary/30 hover:border-primary/60 transition-all duration-500 text-center hover:scale-105">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4 animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </MouseTracking>
              </EnhancedScrollAnimated>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
