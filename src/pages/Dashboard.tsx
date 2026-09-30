import React from 'react';
import { StatCard } from '../components/StatCard';
import { PriceChart } from '../components/PriceChart';
import { MarketComparisonChart } from '../components/MarketComparisonChart';
import { IntelligenceScoreCard } from '../components/IntelligenceScoreCard';
import { QuickInsightCard } from '../components/QuickInsightCard';
import { DataTable } from '../components/DataTable';
import { FieldObservation, PageId } from '../types';
import { Store, Carrot, ClipboardCheck, BrainCircuit } from 'lucide-react';

interface DashboardProps {
  observations: FieldObservation[];
  onNavigate: (page: PageId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ observations, onNavigate }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. KPI Cards Grid (Section 5) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Products Tracked"
          value={24}
          icon={Carrot}
          trendText="+3 new crops added"
          trendUp={true}
        />
        <StatCard
          title="Field Records"
          value={186}
          icon={ClipboardCheck}
          trendText="+24 observations this week"
          trendUp={true}
        />
        <StatCard
          title="Markets"
          value={4}
          icon={Store}
          trendText="Coimbatore, Pollachi"
          trendUp={true}
        />
        <StatCard
          title="Predictions"
          value={72}
          icon={BrainCircuit}
          trendText="High reliability score"
          trendUp={true}
        />
      </section>

      {/* 2. Charts Section (Sections 6 & 7) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart />
        </div>
        <div className="lg:col-span-1">
          <MarketComparisonChart />
        </div>
      </section>

      {/* 3. AI Quick Insight & Field Intelligence Score (Sections 8 & 19) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IntelligenceScoreCard />
        <QuickInsightCard onNavigate={onNavigate} />
      </section>

      {/* 4. Recent Field Observations Data Table (Section 21) */}
      <section>
        <DataTable 
          observations={observations} 
          onAddFirstObservation={() => onNavigate('field-observation')}
        />
      </section>
    </div>
  );
};
