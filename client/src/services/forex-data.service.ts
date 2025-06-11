
export interface ForexPair {
  symbol: string;
  name: string;
  bid: number;
  ask: number;
  spread: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  lastUpdate: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  strength: number;
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  impact: 'low' | 'medium' | 'high';
  event: string;
  forecast?: string;
  previous?: string;
  actual?: string;
  country: string;
  flag: string;
}

export interface MarketSentiment {
  pair: string;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number;
  volume: number;
  momentum: number;
}

class ForexDataService {
  private static instance: ForexDataService;
  private baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  private economicCalendarUrl = 'https://nfs.faireconomy.media/ff_calendar_thisweek.json';

  static getInstance(): ForexDataService {
    if (!ForexDataService.instance) {
      ForexDataService.instance = new ForexDataService();
    }
    return ForexDataService.instance;
  }

  // Major currency pairs
  private majorPairs = [
    { symbol: 'EURUSD', name: 'Euro / US Dollar', base: 'EUR', quote: 'USD' },
    { symbol: 'GBPUSD', name: 'British Pound / US Dollar', base: 'GBP', quote: 'USD' },
    { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', base: 'USD', quote: 'JPY' },
    { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', base: 'USD', quote: 'CHF' },
    { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', base: 'AUD', quote: 'USD' },
    { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', base: 'USD', quote: 'CAD' },
    { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', base: 'NZD', quote: 'USD' },
    { symbol: 'EURGBP', name: 'Euro / British Pound', base: 'EUR', quote: 'GBP' },
    { symbol: 'EURJPY', name: 'Euro / Japanese Yen', base: 'EUR', quote: 'JPY' },
    { symbol: 'GBPJPY', name: 'British Pound / Japanese Yen', base: 'GBP', quote: 'JPY' },
  ];

  private getRandomPrice(base: number, volatility: number = 0.02): number {
    const change = (Math.random() - 0.5) * volatility;
    return base * (1 + change);
  }

  private calculateSignal(change: number, volume: number): { signal: 'BUY' | 'SELL' | 'HOLD', strength: number } {
    const absChange = Math.abs(change);
    const volumeWeight = Math.min(volume / 1000000, 1);
    const strength = (absChange * 10 + volumeWeight * 20) / 2;

    if (change > 0.5 && strength > 15) return { signal: 'BUY', strength };
    if (change < -0.5 && strength > 15) return { signal: 'SELL', strength };
    return { signal: 'HOLD', strength };
  }

  async getForexData(): Promise<ForexPair[]> {
    try {
      // Since we can't access real APIs directly, we'll simulate realistic forex data
      const forexData: ForexPair[] = this.majorPairs.map(pair => {
        const basePrice = this.getBasePrice(pair.symbol);
        const bid = this.getRandomPrice(basePrice, 0.008);
        const ask = bid + (bid * 0.0002); // Typical spread
        const change = (Math.random() - 0.5) * 2;
        const changePercent = (change / bid) * 100;
        const volume = 500000 + Math.random() * 2000000;
        const { signal, strength } = this.calculateSignal(changePercent, volume);

        return {
          symbol: pair.symbol,
          name: pair.name,
          bid: Number(bid.toFixed(5)),
          ask: Number(ask.toFixed(5)),
          spread: Number((ask - bid).toFixed(5)),
          change: Number(change.toFixed(5)),
          changePercent: Number(changePercent.toFixed(2)),
          high: Number((bid * 1.012).toFixed(5)),
          low: Number((bid * 0.988).toFixed(5)),
          volume: Math.round(volume),
          lastUpdate: new Date().toISOString(),
          signal,
          strength: Number(strength.toFixed(1))
        };
      });

      return forexData;
    } catch (error) {
      console.error('Error fetching forex data:', error);
      return this.getFallbackForexData();
    }
  }

  private getBasePrice(symbol: string): number {
    const basePrices: { [key: string]: number } = {
      'EURUSD': 1.0850,
      'GBPUSD': 1.2650,
      'USDJPY': 149.50,
      'USDCHF': 0.8750,
      'AUDUSD': 0.6580,
      'USDCAD': 1.3650,
      'NZDUSD': 0.6120,
      'EURGBP': 0.8580,
      'EURJPY': 162.20,
      'GBPJPY': 188.90,
    };
    return basePrices[symbol] || 1.0000;
  }

  private getFallbackForexData(): ForexPair[] {
    return this.majorPairs.map(pair => {
      const basePrice = this.getBasePrice(pair.symbol);
      const change = (Math.random() - 0.5) * 2;
      const changePercent = (change / basePrice) * 100;
      const volume = 500000 + Math.random() * 2000000;
      const { signal, strength } = this.calculateSignal(changePercent, volume);

      return {
        symbol: pair.symbol,
        name: pair.name,
        bid: Number(basePrice.toFixed(5)),
        ask: Number((basePrice + basePrice * 0.0002).toFixed(5)),
        spread: Number((basePrice * 0.0002).toFixed(5)),
        change: Number(change.toFixed(5)),
        changePercent: Number(changePercent.toFixed(2)),
        high: Number((basePrice * 1.012).toFixed(5)),
        low: Number((basePrice * 0.988).toFixed(5)),
        volume: Math.round(volume),
        lastUpdate: new Date().toISOString(),
        signal,
        strength: Number(strength.toFixed(1))
      };
    });
  }

  async getEconomicEvents(): Promise<EconomicEvent[]> {
    // Simulate economic calendar data
    const events: EconomicEvent[] = [
      {
        id: '1',
        time: '08:30',
        currency: 'USD',
        impact: 'high',
        event: 'Non-Farm Payrolls',
        forecast: '200K',
        previous: '187K',
        actual: '215K',
        country: 'United States',
        flag: '🇺🇸'
      },
      {
        id: '2',
        time: '10:00',
        currency: 'EUR',
        impact: 'medium',
        event: 'Consumer Price Index (YoY)',
        forecast: '2.4%',
        previous: '2.2%',
        country: 'European Union',
        flag: '🇪🇺'
      },
      {
        id: '3',
        time: '12:30',
        currency: 'GBP',
        impact: 'high',
        event: 'Bank of England Interest Rate Decision',
        forecast: '5.25%',
        previous: '5.00%',
        actual: '5.25%',
        country: 'United Kingdom',
        flag: '🇬🇧'
      },
      {
        id: '4',
        time: '14:00',
        currency: 'USD',
        impact: 'medium',
        event: 'FOMC Meeting Minutes',
        previous: 'Hawkish',
        country: 'United States',
        flag: '🇺🇸'
      },
      {
        id: '5',
        time: '15:30',
        currency: 'JPY',
        impact: 'low',
        event: 'Industrial Production (MoM)',
        forecast: '1.2%',
        previous: '0.8%',
        country: 'Japan',
        flag: '🇯🇵'
      },
      {
        id: '6',
        time: '16:00',
        currency: 'CAD',
        impact: 'medium',
        event: 'Employment Change',
        forecast: '25.0K',
        previous: '18.5K',
        country: 'Canada',
        flag: '🇨🇦'
      }
    ];

    return events;
  }

  getMarketSentiment(): MarketSentiment[] {
    return this.majorPairs.slice(0, 6).map(pair => {
      const score = Math.random() * 100;
      const sentiment = score > 60 ? 'BULLISH' : score < 40 ? 'BEARISH' : 'NEUTRAL';
      
      return {
        pair: pair.symbol,
        sentiment,
        score: Number(score.toFixed(1)),
        volume: 500000 + Math.random() * 2000000,
        momentum: Number(((Math.random() - 0.5) * 20).toFixed(1))
      };
    });
  }
}

export default ForexDataService;
