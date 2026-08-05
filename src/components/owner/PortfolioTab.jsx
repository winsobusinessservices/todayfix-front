import React, { useState } from 'react';
import { Upload, X, Camera, Plus, Check } from 'lucide-react';

const INITIAL_GALLERY = [
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=400'
];

const PortfolioTab = () => {
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [details, setDetails] = useState({
    name: "AC Experts",
    about: "Professional AC repair and servicing with over 10 years of experience. Fast, reliable, and guaranteed work."
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }, 800);
  };

  const deleteImage = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const mockUpload = () => {
    // Mocking an upload by adding a random tech/ac related image
    const newImages = [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1527515637-640a3e8bc8ce?auto=format&fit=crop&q=80&w=400'
    ];
    const randomImg = newImages[Math.floor(Math.random() * newImages.length)];
    setGallery([...gallery, randomImg]);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-text-primary mb-2">Portfolio & Profile</h1>
        <p className="text-zinc-400">Update your public profile and showcase your best work.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Profile Editor */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            <h2 className="text-xl font-bold tracking-tight text-text-primary mb-6">Business Details</h2>
            
            <div className="space-y-4">
              {/* Logo Upload */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-full bg-surface-secondary border-2 border-dashed border-border-primary flex items-center justify-center relative group cursor-pointer overflow-hidden">
                  <span className="text-2xl font-bold text-text-primary group-hover:opacity-0 transition-opacity">
                    {details.name.substring(0,2).toUpperCase()}
                  </span>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-zinc-500 font-medium">Update Logo</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">Business Name</label>
                <input 
                  type="text" 
                  value={details.name}
                  onChange={(e) => setDetails({...details, name: e.target.value})}
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-text-primary mb-2">About Us</label>
                <textarea 
                  rows={4}
                  value={details.about}
                  onChange={(e) => setDetails({...details, about: e.target.value})}
                  className="w-full bg-surface-secondary border border-border-primary text-text-primary rounded-xl px-4 py-3 focus:outline-none focus:border-text-primary transition-colors resize-none font-medium"
                />
              </div>

              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 bg-surface-dark text-text-inverted font-bold rounded-xl hover:scale-[0.98] transition-transform shadow-md mt-4 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                   <span className="w-5 h-5 border-2 border-text-inverted border-t-transparent rounded-full animate-spin"></span>
                ) : isSaved ? (
                   <><Check className="w-5 h-5" /> Saved</>
                ) : (
                   "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Gallery */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cover Image */}
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            <h2 className="text-xl font-bold tracking-tight text-text-primary mb-4">Cover Image</h2>
            <div className="w-full h-48 rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-border-primary transition-colors group">
              <div className="p-4 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Upload className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm font-bold text-text-primary">Click to upload cover</p>
              <p className="text-xs text-zinc-500">1920x1080px recommended</p>
            </div>
          </div>

          {/* Work Gallery */}
          <div className="bg-surface-primary rounded-3xl border border-border-primary p-6 shadow-2xl shadow-black/5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-text-primary">Work Gallery</h2>
              <span className="text-sm text-zinc-500 font-medium">{gallery.length} / 10 Images</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => deleteImage(i)} className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Upload New Button */}
              {gallery.length < 10 && (
                <div onClick={mockUpload} className="aspect-square rounded-2xl bg-surface-secondary border-2 border-dashed border-border-primary flex flex-col items-center justify-center cursor-pointer hover:bg-border-primary transition-colors group">
                  <div className="p-2 bg-surface-primary rounded-full border border-border-primary mb-2 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-zinc-400" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">Add Photo</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PortfolioTab;
