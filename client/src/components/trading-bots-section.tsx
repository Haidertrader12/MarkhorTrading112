
import { Bot, Zap, Shield, TrendingUp, Settings, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnhancedScrollAnimated from './enhanced-scroll-animations';

const tradingBots = [
  {
    id: 1,
    name: "ScalpMaster AI",
    description: "High-frequency scalping bot designed for quick profits in volatile markets",
    performance: "+187%",
    trades: "12,500+",
    winRate: "89%",
    risk: "Medium",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY"],
    features: ["AI Pattern Recognition", "Risk Management", "Real-time Execution", "24/7 Trading"],
    price: "$299/month",
    popular: false
  },
  {
    id: 2,
    name: "TrendFollower Pro",
    description: "Advanced trend-following algorithm with machine learning capabilities",
    performance: "+245%",
    trades: "8,900+",
    winRate: "92%",
    risk: "Low",
    pairs: ["EUR/USD", "GBP/USD", "AUD/USD", "USD/CHF"],
    features: ["ML Trend Analysis", "Auto Position Sizing", "Multi-timeframe", "News Integration"],
    price: "$499/month",
    popular: true
  },
  {
    id: 3,
    name: "CryptoArb Bot",
    description: "Cryptocurrency arbitrage bot for cross-exchange profit opportunities",
    performance: "+156%",
    trades: "15,600+",
    winRate: "95%",
    risk: "Low",
    pairs: ["BTC/USD", "ETH/USD", "BNB/USD", "ADA/USD"],
    features: ["Cross-exchange Arbitrage", "Low Latency", "Portfolio Balancing", "DeFi Integration"],
    price: "$399/month",
    popular: false
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'text-green-400 bg-green-400/20';
    case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
    case 'High': return 'text-red-400 bg-red-400/20';
    default: return 'text-gray-400 bg-gray-400/20';
  }
};

export default function TradingBotsSection() {
  return (
    <section id="trading-bots" className="py-32 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <EnhancedScrollAnimated direction="up" duration={1.0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI Trading Bots
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automate your trading with our sophisticated AI-powered bots designed for consistent profitability
            </p>
          </div>
        </EnhancedScrollAnimated>

        {/* Features Overview */}
        <EnhancedScrollAnimated delay={200} direction="up" duration={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-gradient-to-br from-purple-800/30 to-purple-900/30 backdrop-blur-sm border border-purple-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Zap className="text-purple-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">Execute trades in milliseconds with our optimized algorithms</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-800/30 to-cyan-900/30 backdrop-blur-sm border border-cyan-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Shield className="text-cyan-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Risk Protected</h3>
                <p className="text-muted-foreground">Advanced risk management with stop-loss and position sizing</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-800/30 to-blue-900/30 backdrop-blur-sm border border-blue-500/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="text-blue-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Powered</h3>
                <p className="text-muted-foreground">Machine learning algorithms that adapt to market conditions</p>
              </CardContent>
            </Card>
          </div>
        </EnhancedScrollAnimated>

        {/* Trading Bots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tradingBots.map((bot, index) => (
            <EnhancedScrollAnimated
              key={bot.id}
              delay={index * 150}
              direction="up"
              duration={0.8}
            >
              <Card className={`relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border hover:border-primary/30 transition-all duration-500 group hover:scale-[1.02] ${
                bot.popular ? 'border-primary/50 ring-2 ring-primary/20' : 'border-white/10'
              }`}>
                {bot.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Bot className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {bot.name}
                      </h3>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(bot.risk)}`}>
                        {bot.risk} Risk
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {bot.description}
                  </p>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 font-mono">{bot.performance}</div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 font-mono">{bot.winRate}</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 font-mono">{bot.trades}</div>
                      <div className="text-xs text-muted-foreground">Trades</div>
                    </div>
                  </div>

                  {/* Trading Pairs */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Trading Pairs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {bot.pairs.map((pair, idx) => (
                        <span key={idx} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          {pair}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                    <div className="space-y-2">
                      {bot.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-white mb-1">{bot.price}</div>
                    <div className="text-sm text-muted-foreground">Cancel anytime</div>
                  </div>

                  <Button className={`w-full transition-all duration-300 group ${
                    bot.popular 
                      ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    <Settings size={16} className="mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    {bot.popular ? 'Start Free Trial' : 'Activate Bot'}
                  </Button>
                </CardContent>
              </Card>
            </EnhancedScrollAnimated>
          ))}
        </div>

        {/* Call to Action */}
        <EnhancedScrollAnimated delay={600} direction="up" duration={1.0}>
          <div className="text-center mt-16">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Automate Your Trading?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of traders who have automated their success with our AI-powered trading bots
                </p>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80">
                  <TrendingUp size={20} className="mr-2" />
                  Start Your Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </EnhancedScrollAnimated>
      </div>
    </section>
  );
}
