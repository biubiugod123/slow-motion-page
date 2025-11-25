import React from 'react';
import { Database, Layers, Zap, Cpu } from 'lucide-react';

const Methodology: React.FC = () => {
  const steps = [
    {
      icon: <Database className="w-8 h-8 text-blue-400" />,
      title: "Dataset Preparation",
      description: "Extracted ~1.7k basketball clips from SportsSloMo. Sampled at 30fps and partitioned into train/val/test splits (80/10/10%). Triplets formed as (It, It+1, It+2)."
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-400" />,
      title: "Architecture",
      description: "RIFE (Real-Time Intermediate Flow Estimation) initialized with ECCV 2022 weights. Selected for its superior accuracy-speed trade-off compared to optical-flow based methods."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Fine-Tuning Strategy",
      description: "Trained for 10 epochs using AdamW optimizer. Weight decay 1×10⁻², batch size 16. Applied human-aware random cropping (448×256) and temporal reversals."
    },
    {
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      title: "Deployment",
      description: "Benchmarked on NVIDIA RTX 4070 Ti Super. Achieved 4× slow-motion generation at real-time speeds (30 fps), suitable for live broadcast applications."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      {steps.map((step, idx) => (
        <div key={idx} className="bg-gray-800/40 border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition-colors group">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gray-900 rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                {step.icon}
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Methodology;