import React from 'react';

export interface ChartData {
  name: string;
  PSNR: number;
  SSIM: number;
  stdPSNR?: number;
  stdSSIM?: number;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export enum ComparisonType {
  BeforeAfter = 'BeforeAfter',
}