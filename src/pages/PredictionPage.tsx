import React from 'react';
import { PredictionCard } from '../components/PredictionCard';

export const PredictionPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <PredictionCard />
    </div>
  );
};
