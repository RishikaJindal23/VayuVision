import React from 'react';

export default function ScoreGauge({
  score = 85,
  size = 140,
  strokeWidth = 10,
  label = 'ATS Score',
  sublabel = 'Match Rating',
  showGradient = true
}) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let strokeColor = '#06b6d4'; // cyan
  let statusText = 'Good Match';
  let badgeColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';

  if (normalizedScore >= 85) {
    strokeColor = '#10b981'; // emerald
    statusText = 'Excellent Match';
    badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (normalizedScore >= 70) {
    strokeColor = '#06b6d4'; // cyan
    statusText = 'Strong Candidate';
    badgeColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
  } else if (normalizedScore >= 50) {
    strokeColor = '#f59e0b'; // amber
    statusText = 'Needs Optimization';
    badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  } else {
    strokeColor = '#ef4444'; // red
    statusText = 'Low ATS Match';
    badgeColor = 'text-red-400 bg-red-500/10 border-red-500/30';
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Dynamic filled score circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.4s ease'
            }}
          />
        </svg>

        {/* Inner Score Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
            {normalizedScore}
            <span className="text-sm font-sans font-normal text-slate-400">%</span>
          </span>
          {label && (
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold mt-0.5">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {sublabel && (
        <div className="mt-2.5">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${badgeColor}`}>
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
}
