import { PredictionInput, PredictionResult, InfluencingFactor } from '../types';
import { DEMO_PRODUCTS } from '../data/demoProducts';

export const mockPredictionService = {
  async generatePrediction(input: PredictionInput): Promise<PredictionResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const prodObj = DEMO_PRODUCTS.find(p => p.name === input.product) || DEMO_PRODUCTS[0];
    let basePrice = prodObj.defaultPrice;

    // Adjust price based on availability
    if (input.availability === 'Low') basePrice *= 1.15;
    else if (input.availability === 'High') basePrice *= 0.88;

    // Adjust price based on demand
    if (input.demand === 'High') basePrice *= 1.12;
    else if (input.demand === 'Low') basePrice *= 0.90;

    // Adjust for period forecast drift
    const periodFactor = 1 + (input.periodDays * 0.008);
    const predictedPrice = Math.round(basePrice * periodFactor);

    const margin = Math.max(2, Math.round(predictedPrice * 0.07));
    const rangeMin = predictedPrice - margin;
    const rangeMax = predictedPrice + margin;

    // Calculate trend
    let trend: 'Up' | 'Down' | 'Stable' = 'Stable';
    if (predictedPrice > prodObj.defaultPrice * 1.04) trend = 'Up';
    else if (predictedPrice < prodObj.defaultPrice * 0.96) trend = 'Down';

    // Calculate simulated reliability score
    let reliability = 82;
    if (input.periodDays === 1) reliability = 89;
    else if (input.periodDays === 3) reliability = 84;
    else if (input.periodDays === 7) reliability = 78;
    else if (input.periodDays === 14) reliability = 71;

    // Influencing factors
    const influences: InfluencingFactor[] = [
      {
        title: 'Previous Price Trend',
        desc: trend === 'Up' 
          ? 'Prices have shown an upward movement over the past 7 days across regional mandis.'
          : trend === 'Down'
          ? 'Prices have registered a gradual decline following increased wholesale arrivals.'
          : 'Prices remain stable within a tight price band across local trading hubs.',
        icon: 'TrendingUp',
        impact: trend === 'Up' ? 'up' : trend === 'Down' ? 'down' : 'neutral',
      },
      {
        title: 'Availability',
        desc: `Current market availability is logged as ${input.availability.toLowerCase()}. ${
          input.availability === 'Low' ? 'Tight supplies pushing spot prices higher.' : 'Adequate supply buffer prevents sharp spikes.'
        }`,
        icon: 'Package',
        impact: input.availability === 'Low' ? 'up' : input.availability === 'High' ? 'down' : 'neutral',
      },
      {
        title: 'Demand',
        desc: `Buyer demand from local retail and catering sectors is reported as ${input.demand.toLowerCase()}.`,
        icon: 'ShoppingCart',
        impact: input.demand === 'High' ? 'up' : input.demand === 'Low' ? 'down' : 'neutral',
      },
      {
        title: 'Weather Conditions',
        desc: 'Monsoon rainfall patterns in Coimbatore & Nilgiris transport corridors may moderately impact transport schedules.',
        icon: 'CloudRain',
        impact: 'neutral',
      }
    ];

    return {
      product: input.product,
      market: input.market,
      periodDays: input.periodDays,
      predictedPrice,
      rangeMin,
      rangeMax,
      trend,
      reliabilityScore: reliability,
      influences,
      generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  }
};
