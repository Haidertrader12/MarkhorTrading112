import { useState, useEffect } from 'react';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnhancedScrollAnimated from './enhanced-scroll-animations';

interface ForexFactoryEvent {
  id: string;
  date: string;
  time: string;
  currency: string;
  impact: 'low' | 'medium' | 'high';
  detail: string;
  actual: string;
  forecast: string;
  previous: string;
  flag: string;
}

export default function NewsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [events, setEvents] = useState<ForexFactoryEvent[]>([]);

  useEffect(() => {
    loadForexFactoryData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      loadForexFactoryData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const loadForexFactoryData = () => {
    // Simulated Forex Factory data - in production, you would fetch from actual Forex Factory API
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const mockEvents: ForexFactoryEvent[] = [
      {
        id: '1',
        date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '08:30',
        currency: 'USD',
        impact: 'high',
        detail: 'Non-Farm Payrolls',
        actual: '180K',
        forecast: '175K',
        previous: '170K',
        flag: '🇺🇸'
      },
      {
        id: '2',
        date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '10:00',
        currency: 'EUR',
        impact: 'medium',
        detail: 'German Factory Orders',
        actual: '',
        forecast: '0.5%',
        previous: '-0.2%',
        flag: '🇪🇺'
      },
      {
        id: '3',
        date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '14:00',
        currency: 'GBP',
        impact: 'high',
        detail: 'BOE Interest Rate Decision',
        actual: '',
        forecast: '4.75%',
        previous: '4.50%',
        flag: '🇬🇧'
      },
      {
        id: '4',
        date: today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '15:30',
        currency: 'USD',
        impact: 'medium',
        detail: 'Initial Jobless Claims',
        actual: '225K',
        forecast: '230K',
        previous: '240K',
        flag: '🇺🇸'
      },
      {
        id: '5',
        date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '09:00',
        currency: 'JPY',
        impact: 'high',
        detail: 'BOJ Monetary Policy Statement',
        actual: '',
        forecast: '',
        previous: '',
        flag: '🇯🇵'
      },
      {
        id: '6',
        date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        time: '12:30',
        currency: 'CAD',
        impact: 'medium',
        detail: 'Employment Change',
        actual: '',
        forecast: '15K',
        previous: '12K',
        flag: '🇨🇦'
      }
    ];

    setEvents(mockEvents);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadForexFactoryData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10"></div>
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <EnhancedScrollAnimated direction="up" duration={1.0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Forex Factory Economic Calendar
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Real-time economic events and market-moving news from around the world
            </p>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <Button 
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="border-blue-500/30 hover:bg-blue-500/10"
                disabled={isRefreshing}
              >
                <RefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} size={16} />
                {isRefreshing ? 'Updating...' : 'Refresh Data'}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live Forex Factory Data
              </div>
            </div>
          </div>
        </EnhancedScrollAnimated>

        {/* Forex Factory Table */}
        <EnhancedScrollAnimated delay={200} direction="up" duration={1.0}>
          <Card className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Calendar className="text-blue-400" />
                Economic Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-2 p-4 bg-slate-800/80 border-b border-slate-700/50 font-semibold text-sm text-slate-300 sticky top-0">
                <div className="col-span-1 text-center">Date</div>
                <div className="col-span-1 text-center">Time</div>
                <div className="col-span-1 text-center">Currency</div>
                <div className="col-span-1 text-center">Impact</div>
                <div className="col-span-3">Detail</div>
                <div className="col-span-1 text-center">Actual</div>
                <div className="col-span-1 text-center">Forecast</div>
                <div className="col-span-1 text-center">Previous</div>
                <div className="col-span-2 text-center">Graph</div>
              </div>

              {/* Table Body */}
              <div className="max-h-96 overflow-y-auto">
                {events.map((event, index) => (
                  <div 
                    key={event.id}
                    className={`grid grid-cols-12 gap-2 p-3 border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors text-sm ${
                      index % 2 === 0 ? 'bg-slate-800/10' : ''
                    }`}
                  >
                    {/* Date */}
                    <div className="col-span-1 text-center text-slate-300 font-mono">
                      {event.date}
                    </div>

                    {/* Time */}
                    <div className="col-span-1 text-center text-blue-400 font-mono flex items-center justify-center gap-1">
                      <Clock size={12} />
                      {event.time}
                    </div>

                    {/* Currency */}
                    <div className="col-span-1 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-lg">{event.flag}</span>
                        <span className="text-white font-bold">{event.currency}</span>
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="col-span-1 text-center flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{getImpactIcon(event.impact)}</span>
                        <div className={`w-3 h-3 rounded-full ${getImpactColor(event.impact)}`}></div>
                      </div>
                    </div>

                    {/* Detail */}
                    <div className="col-span-3 text-white font-medium flex items-center">
                      {event.detail}
                    </div>

                    {/* Actual */}
                    <div className="col-span-1 text-center font-mono">
                      {event.actual ? (
                        <span className={`font-bold ${
                          event.forecast && parseFloat(event.actual.replace(/[^\d.-]/g, '')) > parseFloat(event.forecast.replace(/[^\d.-]/g, ''))
                            ? 'text-green-400' 
                            : event.forecast && parseFloat(event.actual.replace(/[^\d.-]/g, '')) < parseFloat(event.forecast.replace(/[^\d.-]/g, ''))
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}>
                          {event.actual}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </div>

                    {/* Forecast */}
                    <div className="col-span-1 text-center text-blue-400 font-mono">
                      {event.forecast || '-'}
                    </div>

                    {/* Previous */}
                    <div className="col-span-1 text-center text-slate-400 font-mono">
                      {event.previous || '-'}
                    </div>

                    {/* Graph */}
                    <div className="col-span-2 flex items-center justify-center">
                      {event.actual && event.previous ? (
                        <div className="w-full max-w-20 h-4 bg-slate-700 rounded overflow-hidden flex items-center">
                          <div 
                            className={`h-full ${
                              parseFloat(event.actual.replace(/[^\d.-]/g, '')) > parseFloat(event.previous.replace(/[^\d.-]/g, ''))
                                ? 'bg-green-500' 
                                : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${Math.min(100, Math.abs(
                                (parseFloat(event.actual.replace(/[^\d.-]/g, '')) / 
                                 parseFloat(event.previous.replace(/[^\d.-]/g, ''))) * 50
                              ))}%` 
                            }}
                          ></div>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs">No data</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </EnhancedScrollAnimated>

        {/* Footer Info */}
        <EnhancedScrollAnimated delay={400} direction="fade" duration={1.0}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Data updates every 5 minutes - Last updated: {new Date().toLocaleTimeString()}
              </span>
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Economic calendar data simulated for demonstration. In production, this would connect to real Forex Factory API.
            </p>
          </div>
        </EnhancedScrollAnimated>
      </div>
    </section>
  );
}