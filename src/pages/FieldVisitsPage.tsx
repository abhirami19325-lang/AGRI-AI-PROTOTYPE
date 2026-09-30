import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  User, 
  Sparkles, 
  FileText, 
  ChevronRight,
  X,
  Plus
} from 'lucide-react';
import { mockMarketService } from '../services/mockMarketService';
import { FieldVisit, PageId } from '../types';

interface FieldVisitsPageProps {
  onNavigate: (page: PageId) => void;
}

export const FieldVisitsPage: React.FC<FieldVisitsPageProps> = ({ onNavigate }) => {
  const visits = mockMarketService.getVisits();
  const [selectedVisit, setSelectedVisit] = useState<FieldVisit | null>(null);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-lg text-agri-dark flex items-center gap-2">
            <MapPin className="w-5 h-5 text-agri-leaf" /> Field Visit Timeline & Audit Log
          </h3>
          <p className="text-xs text-agri-slateText">
            Chronological records of physical market research visits conducted by investigators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-2.5 py-1 rounded-full border border-agri-leaf/20">
            <Sparkles className="w-2.5 h-2.5 inline mr-1" /> {visits.length} Logged Field Visits
          </span>

          <button
            onClick={() => onNavigate('field-observation')}
            className="px-3.5 py-2 rounded-xl bg-agri-leaf hover:bg-agri-leafHover text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Visit</span>
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-agri-leaf via-agri-gold before:to-agri-emerald">
        {visits.map((visit) => (
          <div key={visit.id} className="relative group">
            {/* Circle Node on Timeline */}
            <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-agri-leaf group-hover:border-agri-gold transition-colors shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-agri-dark" />
            </div>

            {/* Visit Card */}
            <div 
              onClick={() => setSelectedVisit(visit)}
              className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft hover:shadow-card hover:border-agri-leaf/30 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-agri-leaf flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-agri-gold" /> {visit.date}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-semibold text-agri-dark flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-agri-gold" /> {visit.marketName}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-agri-dark">
                  📍 {visit.location}
                </h4>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-agri-slateText mr-1">Products logged:</span>
                  {visit.products.map(p => (
                    <span key={p} className="text-[11px] bg-agri-offwhite text-agri-dark px-2 py-0.5 rounded-md font-semibold border border-agri-dark/5">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right status & count */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 shrink-0">
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{visit.status}</span>
                </div>

                <div className="text-xs text-agri-slateText sm:mt-2 font-medium flex items-center gap-1">
                  <strong>{visit.observationsCount}</strong> observations <ChevronRight className="w-4 h-4 text-agri-leaf" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Side Panel / Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-agri-dark/10 relative">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] bg-agri-gold/20 text-agri-dark font-bold px-2 py-0.5 rounded uppercase">
                  Field Research Log
                </span>
                <h3 className="font-extrabold text-lg text-agri-dark mt-1">
                  {selectedVisit.marketName} Visit
                </h3>
                <p className="text-xs text-agri-slateText">{selectedVisit.date} • {selectedVisit.location}</p>
              </div>

              <button
                onClick={() => setSelectedVisit(null)}
                className="p-1 rounded-lg text-agri-slateText hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-agri-dark">
              <div className="flex items-center gap-2 p-3 bg-agri-offwhite rounded-xl border border-agri-dark/5">
                <User className="w-4 h-4 text-agri-gold shrink-0" />
                <div>
                  <span className="text-agri-slateText block text-[11px]">Primary Investigator</span>
                  <strong className="font-bold text-agri-dark">{selectedVisit.investigator}</strong>
                </div>
              </div>

              <div>
                <span className="font-bold block mb-1 text-agri-dark">Observed Crop Consignments</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVisit.products.map(p => (
                    <span key={p} className="bg-agri-lightLeaf text-agri-leaf px-2.5 py-1 rounded-lg font-bold border border-agri-leaf/20">
                      🌾 {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold block mb-1 text-agri-dark flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-agri-leaf" /> Field Visit Summary & Notes
                </span>
                <p className="p-3 bg-agri-creamLight rounded-xl border border-agri-gold/30 text-agri-charcoal leading-relaxed">
                  {selectedVisit.summaryNotes}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-agri-slateText">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-agri-gold" /> Total Logs: {selectedVisit.observationsCount} entries</span>
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="px-4 py-1.5 bg-agri-dark text-white rounded-xl font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
