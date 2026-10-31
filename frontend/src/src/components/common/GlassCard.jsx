import React from 'react';

export default function GlassCard({
  children,
  className = '',
  glowColor = 'cyan', // 'cyan' | 'violet' | 'emerald' | 'pink' | 'amber' | 'none'
  hoverEffect = true,
  onClick,
  ...props
}) {
  const glowMap = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-glow-cyan',
    violet: 'hover:border-violet-500/50 hover:shadow-glow-violet',
    emerald: 'hover:border-emerald-500/50 hover:shadow-glow-emerald',
    pink: 'hover:border-pink-500/50 hover:shadow-glow-pink',
    amber: 'hover:border-amber-500/50 hover:shadow-glow-amber',
    none: ''
  };

  return (
    <div
      onClick={onClick}
      className={`glass-card rounded-2xl p-5 border ${
        hoverEffect ? glowMap[glowColor] || glowMap.cyan : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
