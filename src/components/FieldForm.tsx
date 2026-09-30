import React, { useState } from 'react';
import { 
  ClipboardEdit, 
  Store, 
  Tag, 
  IndianRupee, 
  Activity, 
  CloudSun, 
  FileText, 
  Save, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DEMO_PRODUCTS } from '../data/demoProducts';
import { DEMO_MARKETS } from '../data/demoMarkets';
import { mockMarketService } from '../services/mockMarketService';
import { FieldObservation, AvailabilityLevel, DemandLevel } from '../types';

interface FieldFormProps {
  onAddObservation: (obs: FieldObservation) => void;
  onShowToast: (msg: string) => void;
}

export const FieldForm: React.FC<FieldFormProps> = ({ onAddObservation, onShowToast }) => {
  const [productName, setProductName] = useState('Tomato');
  const [category, setCategory] = useState('Vegetables');
  const [variety, setVariety] = useState('Nattu (Local)');

  const [marketName, setMarketName] = useState('Ukkadam Market');
  const [location, setLocation] = useState('Coimbatore');
  const [vendorType, setVendorType] = useState('Wholesale Yard');

  const [price, setPrice] = useState<string>('42');
  const [minPrice, setMinPrice] = useState<string>('38');
  const [maxPrice, setMaxPrice] = useState<string>('45');

  const [availability, setAvailability] = useState<AvailabilityLevel>('Medium');
  const [demand, setDemand] = useState<DemandLevel>('High');

  const [date, setDate] = useState('2026-09-30');
  const [temperature, setTemperature] = useState<string>('31');
  const [rainfall, setRainfall] = useState('Light Rain (2.5mm)');
  const [season, setSeason] = useState('South-West Monsoon');

  const [notes, setNotes] = useState('Vendor / field observation details...');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!productName.trim()) errs.productName = 'Product name is required';
    if (!marketName.trim()) errs.marketName = 'Market name is required';
    if (!date) errs.date = 'Date is required';

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) errs.price = 'Enter a valid price greater than 0';

    const numTemp = Number(temperature);
    if (isNaN(numTemp) || numTemp < -10 || numTemp > 60) errs.temperature = 'Enter a valid temperature (-10°C to 60°C)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedMarket = DEMO_MARKETS.find(m => m.name === marketName);

    const saved = mockMarketService.addObservation({
      date,
      product: productName,
      market: marketName,
      marketId: matchedMarket ? matchedMarket.id : 'm1',
      category,
      variety,
      location,
      vendorType,
      price: Number(price),
      minPrice: Number(minPrice) || Number(price) - 3,
      maxPrice: Number(maxPrice) || Number(price) + 3,
      availability,
      demand,
      temperature: Number(temperature),
      rainfall,
      season,
      notes,
    });

    onAddObservation(saved);
    onShowToast('Field observation saved locally for demo.');
  };

  const handleProductChange = (name: string) => {
    setProductName(name);
    const prod = DEMO_PRODUCTS.find(p => p.name === name);
    if (prod) {
      setCategory(prod.category);
      setPrice(prod.defaultPrice.toString());
      setMinPrice((prod.defaultPrice - 4).toString());
      setMaxPrice((prod.defaultPrice + 4).toString());
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-agri-dark/8 shadow-soft">
      <div className="flex items-center justify-between border-b border-agri-dark/5 pb-4 mb-6">
        <div>
          <h3 className="font-extrabold text-lg text-agri-dark flex items-center gap-2">
            <ClipboardEdit className="w-5 h-5 text-agri-leaf" /> Record Field Visit Observation
          </h3>
          <p className="text-xs text-agri-slateText">
            Mobile-optimized observation log form for agricultural field investigators.
          </p>
        </div>

        <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-2 py-1 rounded-full border border-agri-leaf/30">
          <Sparkles className="w-2.5 h-2.5 inline mr-1" /> Form Validation Active
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Product */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-leaf flex items-center gap-1.5 pb-1 border-b border-gray-100">
            <Tag className="w-4 h-4 text-agri-gold" /> Product Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Product Name *</label>
              <select
                value={productName}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              >
                {DEMO_PRODUCTS.map(p => (
                  <option key={p.id} value={p.name}>{p.icon} {p.name}</option>
                ))}
              </select>
              {errors.productName && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.productName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Variety</label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Nattu / Hybrid"
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Market */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-leaf flex items-center gap-1.5 pb-1 border-b border-gray-100">
            <Store className="w-4 h-4 text-agri-gold" /> Market Location
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Market Name *</label>
              <select
                value={marketName}
                onChange={(e) => {
                  setMarketName(e.target.value);
                  const m = DEMO_MARKETS.find(item => item.name === e.target.value);
                  if (m) setLocation(m.city);
                }}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-semibold text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              >
                {DEMO_MARKETS.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
              {errors.marketName && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.marketName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Vendor Type</label>
              <select
                value={vendorType}
                onChange={(e) => setVendorType(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              >
                <option value="Wholesale Yard">Wholesale Mandi Yard</option>
                <option value="Farmer Direct Hub">Farmer Direct Hub</option>
                <option value="Retail Vendor">Retail Vendor Stall</option>
                <option value="Agricultural Mandi">Agricultural Auction Block</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Price */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-leaf flex items-center gap-1.5 pb-1 border-b border-gray-100">
            <IndianRupee className="w-4 h-4 text-agri-gold" /> Price Information (₹ / kg)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Current Spot Price *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-bold text-agri-leaf focus:ring-2 focus:ring-agri-leaf"
              />
              {errors.price && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.price}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Minimum Price</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Maximum Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Market Conditions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-leaf flex items-center gap-1.5 pb-1 border-b border-gray-100">
            <Activity className="w-4 h-4 text-agri-gold" /> Market Conditions
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-agri-offwhite/80 rounded-xl border border-agri-dark/5">
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-2">Availability</label>
              <div className="flex items-center gap-4">
                {(['Low', 'Medium', 'High'] as AvailabilityLevel[]).map(l => (
                  <label key={l} className="flex items-center gap-1.5 text-xs font-semibold text-agri-dark cursor-pointer">
                    <input
                      type="radio"
                      name="form-availability"
                      value={l}
                      checked={availability === l}
                      onChange={() => setAvailability(l)}
                      className="accent-agri-leaf"
                    />
                    <span>{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-2">Demand</label>
              <div className="flex items-center gap-4">
                {(['Low', 'Medium', 'High'] as DemandLevel[]).map(l => (
                  <label key={l} className="flex items-center gap-1.5 text-xs font-semibold text-agri-dark cursor-pointer">
                    <input
                      type="radio"
                      name="form-demand"
                      value={l}
                      checked={demand === l}
                      onChange={() => setDemand(l)}
                      className="accent-agri-gold"
                    />
                    <span>{l}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Environment */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-agri-leaf flex items-center gap-1.5 pb-1 border-b border-gray-100">
            <CloudSun className="w-4 h-4 text-agri-gold" /> Environmental Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
              {errors.date && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Temperature (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
              {errors.temperature && <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.temperature}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Rainfall</label>
              <input
                type="text"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                placeholder="e.g. Light Rain"
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-agri-dark mb-1">Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl px-3 py-2 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
              >
                <option value="South-West Monsoon">South-West Monsoon</option>
                <option value="North-East Monsoon">North-East Monsoon</option>
                <option value="Winter">Winter Season</option>
                <option value="Summer">Summer Season</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 6: Notes */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-agri-dark flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-agri-gold" /> Vendor / Field Observation Notes
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-agri-offwhite border border-agri-dark/15 rounded-xl p-3 text-xs font-medium text-agri-dark focus:ring-2 focus:ring-agri-leaf"
            placeholder="Record comments from vendors, quality assessment, or consignment arrivals..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-agri-leaf to-agri-emerald text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:from-agri-leafHover flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4 text-agri-gold" />
          <span>Save Field Observation</span>
        </button>
      </form>
    </div>
  );
};
