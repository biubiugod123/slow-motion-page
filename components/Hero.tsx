import React from 'react';
import { PlayCircle, ArrowDown, ExternalLink } from 'lucide-react';
import { PAPER_TITLE, AUTHOR, AFFILIATION } from '../constants.ts';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-dark text-white px-4">
      {/* Background Abstract Visuals */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-orange rounded-full blur-[128px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent rounded-full blur-[128px]"></div>
      </div>

      <div className="z-10 text-center max-w-5xl mx-auto space-y-8 animate-fade-in-up">
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          {PAPER_TITLE}
        </h1>
        
        <div className="space-y-4 text-gray-400">
          <p className="text-xl md:text-2xl font-semibold text-brand-orange">{AUTHOR}</p>
          <div className="flex flex-col items-center gap-1 text-lg font-light">
            <p>{AFFILIATION}</p>
            <a 
              href="https://arxiv.org/abs/2511.11644" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-blue-400 mt-2 transition-colors border-b border-transparent hover:border-blue-400"
            >
              View Paper on arXiv <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
          Addressing the limitations of standard Video Frame Interpolation (VFI) in sports broadcasting. 
          By fine-tuning the RIFE network on the SportsSloMo dataset, this research achieves 
          high-fidelity slow-motion synthesis specifically for the complex, rapid movements of basketball, eliminating ghosting artifacts found in generic models.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => document.getElementById('abstract')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-orange-900/20">
            <PlayCircle size={20} />
            Explore the Study
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-gray-500">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;