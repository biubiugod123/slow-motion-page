
export const PAPER_TITLE = "Slow-Motion Video Synthesis for Basketball Using Frame Interpolation";
export const AUTHOR = "Jiantang Huang";
export const AFFILIATION = "Northeastern University, Boston, MA, USA";

export const CHART_DATA = [
  { name: 'RIFE Baseline', PSNR: 33.0, SSIM: 0.931, fullMark: 40 },
  { name: 'Super SloMo', PSNR: 32.2, SSIM: 0.941, fullMark: 40 },
  { name: 'RIFE (Fine-tuned)', PSNR: 34.3, SSIM: 0.949, fullMark: 40 },
];

export const PAPER_CONTENT = `
Title: Slow-Motion Video Synthesis for Basketball Using Frame Interpolation
Author: Jiantang Huang (Northeastern University)

Abstract:
Basketball broadcast footage is traditionally captured at 30-60 fps, limiting viewers' ability to appreciate rapid plays such as dunks and crossovers. We present a real-time slow-motion synthesis system that produces high-quality basketball-specific interpolated frames by fine-tuning the recent Real-Time Intermediate Flow Estimation (RIFE) network on the SportsSloMo dataset. Our pipeline isolates the basketball subset of SportsSloMo, extracts training triplets, and fine-tunes RIFE with human-aware random cropping. We compare the resulting model against Super SloMo and the baseline RIFE model using Peak Signal-to-Noise Ratio (PSNR) and Structural Similarity (SSIM) on held-out clips. The fine-tuned RIFE attains a mean PSNR of 34.3 dB and SSIM of 0.949, outperforming Super SloMo by 2.1 dB and the baseline RIFE by 1.3 dB. A lightweight Gradio interface demonstrates end-to-end 4x slow-motion generation on a single RTX-4070 Ti Super at 30 fps.

Introduction:
Slow-motion replays are ubiquitous in sports broadcasting, allowing audiences and analysts to examine fast plays in greater detail. Traditional approaches rely on expensive high-speed cameras, which capture footage at hundreds of frames per second (fps) but increase bandwidth and production cost. Video Frame Interpolation (VFI) seeks a computational alternative by synthesizing intermediate frames between low-fps captures. Recent deep neural networks have achieved impressive accuracy, yet most training datasets (e.g., Vimeo-90K) contain everyday scenes, not high-motion, person-centric sports. Consequently, off-the-shelf VFI models exhibit artifacts when applied to basketball footage—players' limbs ghost, the ball blurs, and motion boundaries wobble. Our goal is to bridge this gap by adapting a state-of-the-art VFI model to the basketball domain and validating its efficacy both quantitatively and qualitatively.

Related Work:
A. Video Frame Interpolation
RIFE by Huang et al. proposes an Intermediate Flow Estimation network that achieves real-time inference without relying on pre-trained optical-flow backbones. We adopt RIFE as our base due to its favorable accuracy–speed trade-off. Super SloMo (Jiang et al., 2018) warps bidirectional optical flow to synthesize intermediate frames. Although older, it remains a widely cited baseline for VFI research. It computes bi-directional optical flows between input frames using a U-Net architecture. Although Super SloMo is computationally intensive, its approach to handling occlusions and motion boundaries is relevant.

B. Sports-specific Benchmarks
SportsSloMo by Chen & Jiang introduces > 130k high-resolution clips across 22 sports with human-centric annotations. The authors demonstrate substantial accuracy drops when evaluating generic VFI models on this benchmark, motivating domain-specific adaptation.

Methods:
A. Dataset Preparation
We extract the basketball subset (~ 1.7k clips) of SportsSloMo. For each clip, frames are sampled at 30 fps and partitioned into disjoint train/val/test splits (80/10/10%). Triplets <It, It+1, It+2> are formed such that It+1 serves as ground-truth for interpolation between It and It+2.

B. Model Architecture and Fine-tuning
We initialize RIFE with official ECCV 2022 weights. The network is fine-tuned for 10 epochs using AdamW with a warm-up and cosine annealing learning rate schedule, weight decay 1 × 10^-2, and batch size 16. Random 448×256 crops augment spatial diversity; horizontal flips and temporal reversals augment motion.

C. Baselines
The baseline RIFE and Super SloMo (Adobe240 checkpoint) are evaluated without additional tuning. We upgraded the Super SloMo environment to CUDA 12.x for modern GPU compatibility (RTX 4070 Ti Super).

Results:
We evaluate quality using PSNR (dB) and SSIM.
- RIFE Baseline: 33.0 PSNR, 0.931 SSIM
- Super SloMo: 32.2 PSNR, 0.941 SSIM
- RIFE (fine-tuned): 34.3 PSNR, 0.949 SSIM
Fine-tuned RIFE surpasses both baselines by clear margins while maintaining real-time throughput.

Discussion:
Our study confirms that domain-specific fine-tuning significantly improves slow-motion quality for basketball. Despite using only 10 epochs and modest hardware, the adapted RIFE model achieves both superior fidelity and real-time speed. Limitations include reliance on 30fps source material.
`;