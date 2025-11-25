
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, AlertCircle, Columns, Layers, ImageOff } from 'lucide-react';

// Use relative paths for assets to support subdirectory deployment (e.g. GitHub Pages)
const originRife = './originrife.png';
const tuneRife = './tunerife.png';

interface ComparisonSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  beforeLabel = "Baseline RIFE", 
  afterLabel = "Fine-tuned RIFE" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    
    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
    }

    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const renderImage = (src: string, alt: string, id: string, className: string = "") => {
    if (imageErrors[id]) {
      return (
        <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500 border border-gray-700 ${className}`}>
          <ImageOff size={48} className="mb-2 opacity-50" />
          <p className="text-xs font-mono">{src}</p>
          <p className="text-sm font-semibold">Image not found</p>
        </div>
      );
    }
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        draggable={false}
        onError={() => handleImageError(id)}
      />
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
      <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
            <h3 className="text-lg font-semibold text-white">Visual Quality Comparison</h3>
            <p className="text-xs text-gray-400">
                {viewMode === 'slider' ? "Drag slider to compare" : "Side-by-side view"}
            </p>
        </div>
        
        <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'slider' ? 'bg-gray-700 text-white shadow ring-1 ring-gray-600' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
            >
                <Layers size={14} />
                <span>Slider</span>
            </button>
            <button
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${viewMode === 'side-by-side' ? 'bg-gray-700 text-white shadow ring-1 ring-gray-600' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
            >
                <Columns size={14} />
                <span>Side-by-Side</span>
            </button>
        </div>
      </div>
      
      {viewMode === 'slider' ? (
        <div 
            ref={containerRef}
            className="relative w-full aspect-video select-none cursor-ew-resize group bg-gray-800"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
        >
            {/* After Image (Fine-tuned) - Underneath */}
            <div className="absolute inset-0 w-full h-full">
                {renderImage(tuneRife, "Fine-tuned RIFE Result", 'tunerife', "w-full h-full object-contain")}
                <div className="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-md shadow-lg pointer-events-none z-10">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Baseline) - On Top with Clip Path */}
            <div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                   {renderImage(originRife, "Baseline RIFE Result", 'originrife', "w-full h-full object-contain")}
                </div>
                <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-md shadow-lg pointer-events-none z-10">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center z-20"
            style={{ left: `${sliderPosition}%` }}
            >
            <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-900 transform transition-transform hover:scale-110">
                <MoveHorizontal size={16} />
            </div>
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-gray-800 border-b border-gray-800">
            <div className="relative aspect-video bg-gray-900">
                {renderImage(originRife, "Baseline RIFE Result", 'originrife_side', "w-full h-full object-contain")}
                <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-md shadow-lg">
                    {beforeLabel}
                </div>
            </div>
            <div className="relative aspect-video bg-gray-900">
                {renderImage(tuneRife, "Fine-tuned RIFE Result", 'tunerife_side', "w-full h-full object-contain")}
                 <div className="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded backdrop-blur-md shadow-lg">
                    {afterLabel}
                </div>
            </div>
        </div>
      )}
      
      <div className="p-4 bg-gray-800/50 text-sm text-gray-300 flex items-start gap-2">
        <AlertCircle size={16} className="text-brand-orange mt-0.5 shrink-0" />
        <p>
            <span className="font-bold text-white">Observation:</span> The baseline model ({viewMode === 'slider' ? 'left' : 'left image'}) exhibits significant ghosting around the player's limbs and ball during fast motion. The fine-tuned model ({viewMode === 'slider' ? 'right' : 'right image'}) maintains structural coherence.
        </p>
      </div>
    </div>
  );
};

export default ComparisonSlider;
