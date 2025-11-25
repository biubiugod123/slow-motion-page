import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { CHART_DATA } from '../constants.ts';

const ResultsCharts: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 my-12">
      <div className="flex-1 bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-xl">
        <h3 className="text-center text-white font-bold mb-6 text-lg">PSNR Comparison (Higher is Better)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={CHART_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis domain={[30, 36]} stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
              />
              <ReferenceLine y={33.0} stroke="#F87171" strokeDasharray="3 3" label={{ position: 'top', value: 'Baseline', fill: '#F87171', fontSize: 10 }} />
              <Bar 
                dataKey="PSNR" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]} 
                barSize={50} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
            Fine-tuned RIFE achieves <span className="text-green-400 font-bold">34.3 dB</span>, surpassing baselines.
        </p>
      </div>

      <div className="flex-1 bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-xl">
        <h3 className="text-center text-white font-bold mb-6 text-lg">SSIM Comparison (Higher is Better)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={CHART_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9CA3AF" tick={{fontSize: 12}} />
              <YAxis domain={[0.92, 0.96]} stroke="#9CA3AF" tickFormatter={(val) => val.toFixed(3)} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
              />
              <Bar 
                dataKey="SSIM" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]} 
                barSize={50} 
                animationDuration={1500}
                animationEasing="ease-out"
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
            Fine-tuned RIFE reaches <span className="text-green-400 font-bold">0.949</span> SSIM.
        </p>
      </div>
    </div>
  );
};

export default ResultsCharts;