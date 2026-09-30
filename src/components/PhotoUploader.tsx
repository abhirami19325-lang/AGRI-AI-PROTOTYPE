import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, Camera, Sparkles } from 'lucide-react';
import { UploadedPhoto } from '../types';

interface PhotoUploaderProps {
  onShowToast: (msg: string) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onShowToast }) => {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([
    {
      id: 'photo-1',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      product: 'Tomato Mandi Inspection',
      location: 'Ukkadam Market',
      date: '30 Sep 2026',
    },
    {
      id: 'photo-2',
      url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      product: 'Onion Consignment Unloading',
      location: 'Singanallur Market',
      date: '29 Sep 2026',
    }
  ]);

  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: UploadedPhoto = {
          id: `photo-${Date.now()}`,
          url: reader.result as string,
          product: 'Field Visit Evidence',
          location: 'Selected Market Yard',
          date: '30 Sep 2026',
        };
        setPhotos([newPhoto, ...photos]);
        onShowToast('Field evidence photo uploaded locally for demo.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
    onShowToast('Field evidence photo deleted.');
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-agri-dark/8 shadow-soft space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-agri-dark flex items-center gap-2">
            <Camera className="w-5 h-5 text-agri-leaf" /> Field Evidence Upload
          </h3>
          <p className="text-xs text-agri-slateText">
            Attach photo proof from your physical market visits for audit & verification.
          </p>
        </div>

        <span className="text-[10px] bg-agri-lightLeaf text-agri-leaf font-bold px-2 py-0.5 rounded border border-agri-leaf/20">
          <Sparkles className="w-2.5 h-2.5 inline mr-1" /> Demo Local Preview
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
          }
        }}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative ${
          dragOver 
            ? 'border-agri-leaf bg-agri-lightLeaf/50 scale-[1.01]' 
            : 'border-agri-dark/20 bg-agri-offwhite/50 hover:border-agri-leaf hover:bg-agri-lightLeaf/20'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />

        <div className="w-12 h-12 rounded-2xl bg-agri-lightLeaf text-agri-leaf flex items-center justify-center mx-auto mb-3 shadow-sm">
          <UploadCloud className="w-6 h-6" />
        </div>

        <h4 className="font-bold text-sm text-agri-dark mb-1">
          Drag & drop photos from your field visit
        </h4>
        <p className="text-xs text-agri-slateText mb-2">
          Or click to browse JPEG, PNG images (Max 5MB)
        </p>

        <span className="inline-block text-[11px] font-semibold text-agri-leaf bg-white px-3 py-1 rounded-full border border-agri-leaf/30 shadow-xs">
          + Select Photo File
        </span>
      </div>

      {/* Photo Cards Grid */}
      <div>
        <h4 className="font-bold text-xs text-agri-slateText uppercase tracking-wider mb-3">
          Uploaded Field Photos ({photos.length})
        </h4>

        {photos.length === 0 ? (
          <div className="text-center py-6 text-xs text-agri-slateText bg-agri-offwhite rounded-xl border border-dashed border-agri-dark/10">
            <ImageIcon className="w-8 h-8 mx-auto text-agri-slateText/50 mb-1" />
            No photos uploaded yet. Drag & drop above to add evidence.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-xl overflow-hidden border border-agri-dark/10 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="h-40 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={photo.url}
                    alt={photo.product}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Delete Icon Overlay */}
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors shadow"
                    title="Delete photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-agri-dark truncate">
                      {photo.product}
                    </h5>
                    <p className="text-[11px] text-agri-slateText mt-0.5">
                      📍 {photo.location}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-agri-slateText">
                    <span>Logged: {photo.date}</span>
                    <span className="font-bold text-agri-leaf">Local Preview</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
