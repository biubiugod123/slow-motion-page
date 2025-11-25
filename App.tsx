import React from 'react';
import Hero from './components/Hero.tsx';
import Methodology from './components/Methodology.tsx';
import ResultsCharts from './components/ResultsCharts.tsx';
import ComparisonSlider from './components/ComparisonSlider.tsx';
import { FileText, Cpu, BarChart2 } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-gray-200 selection:bg-brand-orange selection:text-white">
      <Hero />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-32">
        
        {/* Abstract Section */}
        <section id="abstract" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-brand-orange" />
            <h2 className="text-3xl font-bold text-white">The Challenge: Motion in Sports</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
              <p>
                Basketball broadcast footage is traditionally captured at <strong>30–60 fps</strong>. 
                This framerate limits the viewer's ability to appreciate rapid, complex plays like dunks and crossovers in detail.
                When slowed down linearly, the footage appears choppy.
              </p>
              <p>
                Traditional approaches rely on expensive high-speed cameras which increase bandwidth. 
                Existing Video Frame Interpolation (VFI) models, such as standard RIFE, are trained on datasets like 
                <strong>Vimeo-90K</strong>, which consist mostly of everyday scenes with moderate motion.
              </p>
              <p>
                 Consequently, these off-the-shelf models exhibit severe artifacts when applied to basketball:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                  <li><strong>Ghosting limbs:</strong> Fast-moving arms and legs disappear or duplicate.</li>
                  <li><strong>Motion blur:</strong> The ball becomes a streak rather than a sphere.</li>
                  <li><strong>Boundary wobbling:</strong> Player outlines distort against the court background.</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Domain Gap</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                        <span className="text-gray-400">Generic VFI Training</span>
                        <span className="text-red-400 font-mono">Everyday Scenes</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                        <span className="text-gray-400">Target Domain</span>
                        <span className="text-brand-orange font-mono">High-Speed Sports</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-gray-400">Result</span>
                        <span className="text-gray-300">Artifacts & Blur</span>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="scroll-mt-24">
           <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-brand-orange" />
            <h2 className="text-3xl font-bold text-white">Methodology & Fine-Tuning</h2>
          </div>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl">
            To bridge the domain gap, we fine-tuned the Real-Time Intermediate Flow Estimation (RIFE) network 
            specifically for basketball using the <span className="text-white font-semibold">SportsSloMo</span> dataset.
            The process involved specific hyperparameter optimization to handle rapid non-linear motion.
          </p>
          <Methodology />
        </section>

        {/* Visual Results Section */}
        <section id="visual-results" className="scroll-mt-24">
           <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Visual Improvement</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
                Comparing the Baseline RIFE model (left) against our Fine-tuned version (right).
                The fine-tuned model preserves the structural integrity of the player and the ball during fast crossovers.
            </p>
          </div>
          <ComparisonSlider />
        </section>

        {/* Quantitative Results Section */}
        <section id="quantitative-results" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <BarChart2 className="text-brand-orange" />
            <h2 className="text-3xl font-bold text-white">Quantitative Performance</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
             <div className="lg:col-span-2">
                <p className="text-gray-300 mb-4 text-lg">
                    We evaluated the models using Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity (SSIM) on held-out test clips.
                    The Fine-tuned RIFE model demonstrates a significant improvement over both the baseline and the heavier Super SloMo architecture.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-sm">Testing Hardware</div>
                        <div className="text-white font-mono text-lg">NVIDIA RTX 4070 Ti Super</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-sm">Inference Speed</div>
                        <div className="text-white font-mono text-lg">30+ FPS (Real-time)</div>
                    </div>
                </div>
             </div>
          </div>
          <ResultsCharts />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Based on the paper <span className="text-gray-300">"Slow-Motion Video Synthesis for Basketball Using Frame Interpolation"</span> by Jiantang Huang.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;