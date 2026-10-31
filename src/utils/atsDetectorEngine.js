// ATS Detector Engine
// Identifies Greenhouse, Lever, Workday, Taleo, iCIMS, Ashby, SmartRecruiters

export const ATS_SYSTEMS = [
  {
    id: 'greenhouse',
    name: 'Greenhouse ATS',
    confidence: 'high',
    urlPatterns: [/greenhouse\.io/i, /boards\.greenhouse\.io/i, /grnh\.se/i],
    textPatterns: [/powered by greenhouse/i, /greenhouse/i, /candidate application hosted by greenhouse/i],
    parsingDifficulty: 'Moderate (Clean text parser)',
    characteristics: 'Accurately parses standard PDF and DOCX single-column text. Favors direct chronological experience sections.',
    tips: [
      'Greenhouse extracts standard heading names easily (Experience, Education, Skills).',
      'Avoid multi-column tables as Greenhouse might combine left and right columns horizontally.',
      'Supports standard hyperlinks for GitHub and Portfolio.',
      'Keep dates formatted as Month Year (e.g. June 2022 – Present).'
    ]
  },
  {
    id: 'lever',
    name: 'Lever',
    confidence: 'high',
    urlPatterns: [/jobs\.lever\.co/i, /lever\.co/i],
    textPatterns: [/lever\.co/i, /powered by lever/i, /lever co/i],
    parsingDifficulty: 'Friendly (Modern Parser)',
    characteristics: 'Lever has one of the cleanest modern parsers with strong plain-text extraction and portfolio link scraping.',
    tips: [
      'Lever automatically parses GitHub and LinkedIn URLs in the header.',
      'Simple Markdown-style or standard bullet points parse cleanly.',
      'Lever groups skills automatically based on frequency in your bullet points.',
      'Include a concise 2-3 line Summary right under your header.'
    ]
  },
  {
    id: 'workday',
    name: 'Workday ATS',
    confidence: 'high',
    urlPatterns: [/myworkdayjobs\.com/i, /workday\.com/i, /wd1\.myworkday/i, /wd3\.myworkday/i, /wd5\.myworkday/i],
    textPatterns: [/myworkdayjobs/i, /workday/i, /powered by workday/i],
    parsingDifficulty: 'Strict / High Formatting Sensitivity',
    characteristics: 'Workday is strict and older versions often scramble complex layouts, tables, and nested icons.',
    tips: [
      'DO NOT use two-column layouts, graphics, or text boxes.',
      'Stick to standard single-column linear layout.',
      'Ensure standard section titles: "Work Experience", "Education", "Skills".',
      'Avoid fancy bullet symbols; use standard round bullets (•) or hyphens (-).',
      'Upload as clean PDF with selectable text.'
    ]
  },
  {
    id: 'taleo',
    name: 'Oracle Taleo',
    confidence: 'high',
    urlPatterns: [/taleo\.net/i, /oraclecloud\.com/i, /taleo/i],
    textPatterns: [/taleo/i, /oracle taleo/i, /taleo enterprise/i],
    parsingDifficulty: 'Legacy Strict',
    characteristics: 'Legacy enterprise ATS used by Fortune 500 corporations. Strict exact-match keyword algorithms.',
    tips: [
      'Taleo matches exact spelling of keywords; include both acronyms and full phrases (e.g. "AWS (Amazon Web Services)").',
      'Never place critical text in headers or footers, as Taleo strips headers entirely.',
      'Use standard clean fonts like Outfit, Arial, or Inter.',
      'Keep job titles conventional (e.g. "Senior Software Engineer").'
    ]
  },
  {
    id: 'icims',
    name: 'iCIMS',
    confidence: 'medium',
    urlPatterns: [/icims\.com/i, /careers-.*\.icims\.com/i],
    textPatterns: [/icims/i, /powered by icims/i],
    parsingDifficulty: 'Moderate',
    characteristics: 'Used by major healthcare, finance, and logistics firms. Evaluates keyword density and tenure.',
    tips: [
      'iCIMS checks duration of skills used; mention key tech stacks alongside specific work tenures.',
      'Ensure job location (City, State) is explicitly listed next to employer names.',
      'Include a distinct "Technical Skills" section with comma-separated keywords.'
    ]
  },
  {
    id: 'ashby',
    name: 'Ashby HQ',
    confidence: 'high',
    urlPatterns: [/jobs\.ashbyhq\.com/i, /ashbyhq\.com/i],
    textPatterns: [/ashbyhq/i, /ashby/i, /powered by ashby/i],
    parsingDifficulty: 'Modern & Flexible',
    characteristics: 'Next-gen startup ATS built for fast high-growth tech companies. High tolerance for clean modern PDF templates.',
    tips: [
      'Ashby indexes project links, demo URLs, and GitHub repos effectively.',
      'Focus on quantified achievements (metrics, scale, users, latency reduction).',
      'Supports modern clean typography and single/split column standard resumes.'
    ]
  },
  {
    id: 'smartrecruiters',
    name: 'SmartRecruiters',
    confidence: 'high',
    urlPatterns: [/smartrecruiters\.com/i, /smrtr\.io/i],
    textPatterns: [/smartrecruiters/i, /smart recruiters/i, /powered by smartrecruiters/i],
    parsingDifficulty: 'Moderate',
    characteristics: 'Global enterprise ATS with strong automated candidate matching and semantic skill mapping.',
    tips: [
      'Match core JD competency tags in your summary and experience.',
      'Ensure clear graduation dates and degree names under Education.',
      'Use standard reverse-chronological order.'
    ]
  }
];

export function detectATS(inputUrlOrText = '') {
  if (!inputUrlOrText) {
    return {
      detected: false,
      system: null,
      defaultAdvice: getDefaultATSAdvice()
    };
  }

  const cleanInput = inputUrlOrText.trim().toLowerCase();

  for (const sys of ATS_SYSTEMS) {
    for (const pattern of sys.urlPatterns) {
      if (pattern.test(cleanInput)) {
        return {
          detected: true,
          system: sys,
          matchMethod: 'URL Pattern Match',
          confidence: '99%'
        };
      }
    }
  }

  for (const sys of ATS_SYSTEMS) {
    for (const pattern of sys.textPatterns) {
      if (pattern.test(cleanInput)) {
        return {
          detected: true,
          system: sys,
          matchMethod: 'Job Description Text Match',
          confidence: '85%'
        };
      }
    }
  }

  return {
    detected: false,
    system: null,
    defaultAdvice: getDefaultATSAdvice()
  };
}

function getDefaultATSAdvice() {
  return {
    name: 'Universal ATS Optimization Protocol',
    characteristics: 'Standard Applicant Tracking Systems (Workday, Greenhouse, Taleo, Lever, iCIMS, Ashby)',
    parsingDifficulty: 'Universal Standard Guidelines',
    tips: [
      'Use clean single-column structure with standard margins (0.5" - 0.75").',
      'Use common section titles: "Work Experience", "Technical Skills", "Education", "Projects".',
      'Quantify results using metrics (%, $, scale, users, speed improvements).',
      'Include both exact acronyms and spelled-out terms (e.g., "AWS (Amazon Web Services)").',
      'Avoid graphics, charts, or floating text boxes.'
    ]
  };
}
