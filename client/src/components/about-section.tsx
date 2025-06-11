
import { Shield, Award, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import EnhancedScrollAnimated from './enhanced-scroll-animations';

export default function AboutSection() {
  const stats = [
    { icon: Users, label: 'Active Traders', value: '50,000+', color: 'text-blue-400' },
    { icon: Award, label: 'Years Experience', value: '15+', color: 'text-green-400' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', color: 'text-purple-400' },
    { icon: Shield, label: 'Secured Funds', value: '$2.5B+', color: 'text-orange-400' }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <EnhancedScrollAnimated direction="up" duration={1.0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About MarkhorTrader
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Leading the future of trading with cutting-edge technology and unparalleled expertise
            </p>
          </div>
        </EnhancedScrollAnimated>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <EnhancedScrollAnimated direction="left" delay={200}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At MarkhorTrader, we're revolutionizing the trading landscape by combining advanced AI technology 
                with deep market expertise. Our platform empowers traders of all levels to make informed decisions 
                and achieve consistent profitability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by industry veterans with decades of combined experience, we understand the challenges 
                traders face and have built solutions that address real market needs.
              </p>
              <div className="pt-6">
                <h4 className="text-xl font-semibold text-white mb-4">Why Choose Us?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Real-time market analysis with AI-powered insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">24/7 customer support from trading experts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">Comprehensive educational resources and courses</span>
                  </li>
                </ul>
              </div>
            </div>
          </EnhancedScrollAnimated>

          <EnhancedScrollAnimated direction="right" delay={400}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Professional trading environment"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/800x400/1e293b/64748b?text=Trading+Platform";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </EnhancedScrollAnimated>
        </div>

        {/* Stats Section */}
        <EnhancedScrollAnimated delay={600} direction="up" duration={1.0}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`${stat.color} group-hover:scale-110 transition-transform duration-300`} size={28} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-2 font-mono`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </EnhancedScrollAnimated>
      </div>
    </section>
  );
}
