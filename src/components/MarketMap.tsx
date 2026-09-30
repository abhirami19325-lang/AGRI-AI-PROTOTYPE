import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { DEMO_MARKETS } from '../data/demoMarkets';
import { Market } from '../types';
import { Store, Eye, Sparkles } from 'lucide-react';

interface MarketMapProps {
  onSelectMarket: (market: Market) => void;
  heightClass?: string;
}

// Custom Leaflet Green Pin Icon
const createCustomIcon = (marketName: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: #0F2E23;
        border: 2px solid #D49E35;
        color: white;
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
      ">
        <span style="font-size: 12px;">🌾</span> ${marketName.split(' ')[0]}
      </div>
    `,
    iconSize: [100, 30],
    iconAnchor: [50, 15],
  });
};

export const MarketMap: React.FC<MarketMapProps> = ({ 
  onSelectMarket,
  heightClass = 'h-[500px]' 
}) => {
  // Center map around Coimbatore coordinates [10.9925, 76.9614]
  const centerPosition: [number, number] = [10.9925, 76.9614];

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-agri-dark/15 shadow-soft z-10`}>
      {/* Top Map Floating Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-agri-dark/10 shadow-md flex items-center gap-2 text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold text-agri-dark">Coimbatore Region Agricultural Map</span>
        <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf px-1.5 py-0.5 rounded font-semibold">
          <Sparkles className="w-2.5 h-2.5 inline mr-0.5" /> Leaflet OpenStreetMap
        </span>
      </div>

      <MapContainer
        center={centerPosition}
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {DEMO_MARKETS.map((market) => (
          <Marker
            key={market.id}
            position={market.coordinates}
            icon={createCustomIcon(market.name)}
          >
            <Popup>
              <div className="p-2 min-w-[200px] text-agri-dark">
                <div className="flex items-center gap-1.5 text-agri-leaf font-bold text-sm mb-1">
                  <Store className="w-4 h-4 text-agri-gold" />
                  {market.name}
                </div>
                
                <p className="text-[11px] text-agri-slateText mb-2">
                  📍 {market.address}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-agri-offwhite p-2 rounded-lg border border-agri-dark/5 mb-3">
                  <div>
                    <span className="text-agri-slateText block">Products</span>
                    <strong className="text-agri-dark font-bold">{market.productsCount} crops</strong>
                  </div>
                  <div>
                    <span className="text-agri-slateText block">Avg Spot Rate</span>
                    <strong className="text-agri-leaf font-bold">₹{market.avgPrice}/kg</strong>
                  </div>
                </div>

                <div className="text-[10px] text-agri-slateText mb-3">
                  Logged Records: <strong>{market.observationsCount}</strong> | Updated: <strong>{market.lastUpdated}</strong>
                </div>

                <button
                  onClick={() => onSelectMarket(market)}
                  className="w-full py-1.5 px-3 rounded-lg bg-agri-dark hover:bg-agri-leaf text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-agri-gold" />
                  <span>View Details</span>
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
