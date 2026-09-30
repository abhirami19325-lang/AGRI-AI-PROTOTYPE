import React from 'react';
import { FieldForm } from '../components/FieldForm';
import { PhotoUploader } from '../components/PhotoUploader';
import { FieldObservation } from '../types';

interface FieldObservationPageProps {
  onAddObservation: (obs: FieldObservation) => void;
  onShowToast: (msg: string) => void;
}

export const FieldObservationPage: React.FC<FieldObservationPageProps> = ({
  onAddObservation,
  onShowToast,
}) => {
  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Observation Entry Form */}
      <FieldForm 
        onAddObservation={onAddObservation} 
        onShowToast={onShowToast} 
      />

      {/* Field Photo Upload Evidence Section (Section 10) */}
      <PhotoUploader onShowToast={onShowToast} />
    </div>
  );
};
