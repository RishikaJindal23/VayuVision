// Bullet-Point Impact Scorer & Metric Fixer Engine

export const POWER_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Accelerated', 'Streamlined', 'Deployed',
  'Orchestrated', 'Optimized', 'Automated', 'Revamped', 'Pioneered', 'Scaled',
  'Constructed', 'Formulated', 'Innovated', 'Boosted', 'Elevated', 'Overhauled',
  'Designed', 'Implemented', 'Authored', 'Centralized', 'Decreased', 'Maximized',
  'Mitigated', 'Negotiated', 'Consolidated', 'Launched', 'Supervised', 'Executed'
];

export const WEAK_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'assisted in', 'duties included',
  'handled', 'took part in', 'participated in', 'tasked with', 'aided with', 'attempted to'
];

export function analyzeBullet(bulletText = '') {
  const text = bulletText.trim();
  if (!text) {
    return null;
  }

  const words = text.split(/\s+/);
  const lower = text.toLowerCase();

  const firstWord = words[0]?.replace(/[^a-zA-Z]/g, '');
  const startsWithPowerVerb = POWER_VERBS.some(v => v.toLowerCase() === firstWord?.toLowerCase());
  const containsAnyPowerVerb = POWER_VERBS.some(v => new RegExp(`\\b${v}\\b`, 'i').test(text));

  const foundWeakPhrases = WEAK_PHRASES.filter(wp => lower.includes(wp));

  const metricRegex = /(\d+[\%kKmMbB]?|\$\d+[\d,]*|\b\d+\b|\b\d+x\b|\b\d+ms\b|\b\d+\s*(percent|hours|users|customers|million|billion|k|seconds))/i;
  const hasMetrics = metricRegex.test(text);
  const metricMatches = text.match(/(\$\d+[\d,]*|\d+[\%kKmMbB]?|\b\d+x\b|\b\d+\s*(percent|users|ms|hours))/gi) || [];

  const wordCount = words.length;
  let lengthStatus = 'ideal';
  if (wordCount < 10) lengthStatus = 'too_short';
  else if (wordCount > 35) lengthStatus = 'too_long';

  const hasOutcome = /(resulting in|increasing|reducing|saving|driving|delivering|yielding|cutting|boosting|generating)/i.test(text);
  const hasMethod = /(by|using|utilizing|leveraging|through|implementing|via|building)/i.test(text);
  const adheresToXYZ = (hasMetrics || hasOutcome) && (hasMethod || startsWithPowerVerb);

  let score = 50;
  if (startsWithPowerVerb) score += 20;
  else if (containsAnyPowerVerb) score += 10;

  if (hasMetrics) score += 25;
  if (hasOutcome) score += 10;
  if (hasMethod) score += 5;
  
  if (foundWeakPhrases.length > 0) score -= (foundWeakPhrases.length * 15);
  if (lengthStatus === 'too_short') score -= 15;
  if (lengthStatus === 'too_long') score -= 10;

  score = Math.max(10, Math.min(100, score));

  let grade = 'Needs Work';
  let gradeColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  if (score >= 85) {
    grade = 'Elite Impact';
    gradeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (score >= 70) {
    grade = 'Strong Bullet';
    gradeColor = 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/10';
  } else if (score >= 50) {
    grade = 'Moderate Impact';
    gradeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  }

  const aiRewrites = generateBulletRewrites(text, startsWithPowerVerb ? firstWord : 'Engineered');

  return {
    text,
    score,
    grade,
    gradeColor,
    wordCount,
    lengthStatus,
    startsWithPowerVerb,
    firstWord,
    containsAnyPowerVerb,
    foundWeakPhrases,
    hasMetrics,
    metricMatches,
    adheresToXYZ,
    hasOutcome,
    aiRewrites
  };
}

export function generateBulletRewrites(originalText, baseVerb = 'Engineered') {
  let coreText = originalText.replace(/^(•|-|\*)\s*/, '');
  WEAK_PHRASES.forEach(wp => {
    const reg = new RegExp(`\\b${wp}\\b`, 'gi');
    coreText = coreText.replace(reg, '');
  });
  coreText = coreText.trim();
  if (!coreText) coreText = 'high-performance systems and web architecture';

  const sanitized = coreText.charAt(0).toLowerCase() + coreText.slice(1);

  return [
    {
      id: 'metric_focused',
      title: 'Metrics & Performance Focused (Recommended)',
      bullet: `Architected and deployed modern solutions to ${sanitized}, boosting throughput by 34% and cutting latency by 45ms across 100K+ active users.`,
      tags: ['Quantified 34%', 'Latency Cut', 'XYZ Formula']
    },
    {
      id: 'executive_leadership',
      title: 'Executive & Strategic Impact',
      bullet: `Spearheaded cross-functional delivery to ${sanitized}, reducing operational bottlenecks by $65,000 annually while accelerating feature release velocity by 2.5x.`,
      tags: ['Cost Savings $65K', 'Velocity 2.5x', 'Leadership']
    },
    {
      id: 'streamlined_concise',
      title: 'Concise & Technical Precision',
      bullet: `Engineered scalable end-to-end architecture for ${sanitized} leveraging industry best practices, achieving 99.98% reliability and eliminating manual QA overhead.`,
      tags: ['99.98% Uptime', 'Automation', 'Scalability']
    }
  ];
}

export function analyzeAllBullets(fullText = '') {
  if (!fullText) return [];
  const lines = fullText.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || (l.length > 25 && /^[A-Z]/.test(l)));

  return lines.slice(0, 8).map(line => analyzeBullet(line)).filter(Boolean);
}
