// Comprehensive Keyword Database for ATS Parser
export const SKILL_CATEGORIES = {
  programmingLanguages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'go', 'rust',
    'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'dart', 'shell', 'bash', 'powershell',
    'sql', 'nosql', 'html', 'css', 'sass', 'scss'
  ],
  frontend: [
    'react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'vue', 'vue.js', 'vuejs', 'angular',
    'svelte', 'redux', 'mobx', 'zustand', 'tailwind', 'tailwind css', 'bootstrap',
    'material ui', 'chakra ui', 'shadcn', 'vite', 'webpack', 'babel', 'graphql',
    'rest api', 'restful api', 'websockets', 'webrtc', 'pwa', 'responsive design',
    'storybook', 'figma', 'framer motion', 'three.js', 'd3.js', 'canvas'
  ],
  backend: [
    'node.js', 'nodejs', 'express', 'express.js', 'nest.js', 'nestjs', 'django', 'flask',
    'fastapi', 'spring', 'spring boot', 'ruby on rails', 'rails', 'asp.net', '.net core',
    'laravel', 'gin', 'grpc', 'microservices', 'serverless', 'lambda', 'apollo graphql',
    'kafka', 'rabbitmq', 'redis', 'celery', 'jwt', 'oauth', 'saml', 'cors'
  ],
  databases: [
    'postgresql', 'postgres', 'mysql', 'mongodb', 'sqlite', 'redis', 'elasticsearch',
    'dynamodb', 'cassandra', 'oracle', 'firebase', 'supabase', 'prisma', 'typeorm',
    'mongoose', 'mariadb', 'neo4j', 'snowflake', 'bigquery', 'redshift'
  ],
  cloudDevOps: [
    'aws', 'amazon web services', 'ec2', 's3', 'lambda', 'ecs', 'rds', 'cloudformation',
    'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'terraform',
    'ci/cd', 'github actions', 'gitlab ci', 'jenkins', 'circleci', 'ansible',
    'helm', 'nginx', 'linux', 'unix', 'prometheus', 'grafana', 'datadog', 'new relic',
    'sentry', 'cloudflare', 'vercel'
  ],
  aiDataScience: [
    'machine learning', 'deep learning', 'artificial intelligence', 'nlp', 'natural language processing',
    'computer vision', 'llm', 'large language models', 'langchain', 'rag', 'openai',
    'pytorch', 'tensorflow', 'keras', 'scikit-learn', 'pandas', 'numpy', 'scipy',
    'matplotlib', 'seaborn', 'spark', 'apache spark', 'hadoop', 'airflow', 'dbt',
    'tableau', 'power bi', 'prompt engineering', 'vector database', 'pinecone', 'chromadb'
  ],
  softSkills: [
    'leadership', 'mentorship', 'communication', 'collaboration', 'problem solving',
    'critical thinking', 'agile', 'scrum', 'kanban', 'jira', 'confluence',
    'cross-functional', 'project management', 'stakeholder management', 'system design',
    'code review', 'continuous improvement', 'conflict resolution', 'time management',
    'teamwork', 'adaptability', 'strategic planning', 'client relations'
  ],
  toolsAndPractices: [
    'git', 'github', 'gitlab', 'bitbucket', 'docker', 'postman', 'jest', 'vitest',
    'cypress', 'playwright', 'selenium', 'mocha', 'chai', 'unit testing', 'integration testing',
    'end-to-end testing', 'tdd', 'test driven development', 'clean architecture', 'solid principles',
    'design patterns', 'dry', 'seo', 'accessibility', 'a11y', 'performance optimization'
  ]
};

// Flattened list of all recognized skill tokens
export const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

/**
 * Normalizes text to tokens and clean lower-case sentences
 */
export function cleanText(text = '') {
  return text.toLowerCase().replace(/[\r\n]+/g, ' ').trim();
}

/**
 * Extracts recognized skills and keyword occurrences from text
 */
export function extractKeywords(text = '') {
  if (!text) return { foundSkills: [], categories: {}, counts: {} };

  const normalized = ` ${cleanText(text)} `;
  const foundSkills = [];
  const counts = {};
  const categories = {
    hardSkills: [],
    softSkills: [],
    tools: [],
    cloudDb: []
  };

  // Check multi-word and single-word skills safely
  ALL_SKILLS.forEach(skill => {
    // Regex boundary check (handles symbols like .js, c++, c# gracefully)
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+.])${escaped}(?:$|[^a-zA-Z0-9#+.])`, 'gi');
    const matches = normalized.match(regex);

    if (matches && matches.length > 0) {
      foundSkills.push(skill);
      counts[skill] = matches.length;

      if (SKILL_CATEGORIES.softSkills.includes(skill)) {
        categories.softSkills.push(skill);
      } else if (SKILL_CATEGORIES.toolsAndPractices.includes(skill)) {
        categories.tools.push(skill);
      } else if (SKILL_CATEGORIES.cloudDevOps.includes(skill) || SKILL_CATEGORIES.databases.includes(skill)) {
        categories.cloudDb.push(skill);
      } else {
        categories.hardSkills.push(skill);
      }
    }
  });

  return {
    foundSkills: Array.from(new Set(foundSkills)),
    categories,
    counts
  };
}

/**
 * Checks resume searchability, formatting health, and ATS structure
 */
export function auditFormatting(resumeText = '') {
  const issues = [];
  const passes = [];
  let formatScore = 100;

  const raw = resumeText || '';
  const wordCount = raw.trim().split(/\s+/).filter(Boolean).length;
  const lower = raw.toLowerCase();

  // 1. Email check
  const emailRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/i;
  const hasEmail = emailRegex.test(raw);
  if (hasEmail) {
    passes.push({ id: 'email', label: 'Contact Email Detected', detail: 'Valid email format found for recruiter outreach.' });
  } else {
    formatScore -= 18;
    issues.push({ id: 'no-email', type: 'critical', label: 'Missing Email Address', fix: 'Add a professional email address at the top header.' });
  }

  // 2. Phone check
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const hasPhone = phoneRegex.test(raw);
  if (hasPhone) {
    passes.push({ id: 'phone', label: 'Phone Number Present', detail: 'Direct contact phone detected.' });
  } else {
    formatScore -= 12;
    issues.push({ id: 'no-phone', type: 'warning', label: 'Missing Phone Number', fix: 'Include your direct mobile number in the header.' });
  }

  // 3. Web Presence (LinkedIn / GitHub / Portfolio)
  const hasWebLink = /linkedin\.com|github\.com|portfolio|http[s]?:\/\//i.test(raw);
  if (hasWebLink) {
    passes.push({ id: 'links', label: 'Professional Links Included', detail: 'LinkedIn, GitHub, or portfolio links detected.' });
  } else {
    formatScore -= 10;
    issues.push({ id: 'no-links', type: 'tip', label: 'Missing Online Profile', fix: 'Add your LinkedIn or GitHub profile URL.' });
  }

  // 4. Standard Headings
  const headings = ['experience', 'education', 'skills', 'projects', 'summary'];
  const foundHeadings = headings.filter(h => lower.includes(h));
  if (foundHeadings.length >= 3) {
    passes.push({ id: 'sections', label: `Standard Section Headers (${foundHeadings.length}/5)`, detail: `Found: ${foundHeadings.join(', ')}` });
  } else {
    formatScore -= 15;
    issues.push({ id: 'headings', type: 'critical', label: 'Missing Standard Section Headers', fix: 'Ensure explicit sections: Experience, Education, Skills, and Projects.' });
  }

  // 5. Length & Word Count Check
  if (wordCount >= 300 && wordCount <= 900) {
    passes.push({ id: 'wordcount', label: `Optimal Word Count (${wordCount} words)`, detail: 'Fits standard 1-page to 2-page ATS target volume (300-900 words).' });
  } else if (wordCount < 300) {
    formatScore -= 15;
    issues.push({ id: 'short', type: 'warning', label: `Resume Too Short (${wordCount} words)`, fix: 'Expand your experience bullets and detail key accomplishments (target at least 350 words).' });
  } else {
    formatScore -= 10;
    issues.push({ id: 'long', type: 'tip', label: `Resume Wordy (${wordCount} words)`, fix: 'Consider condensing to keep recruiters focused on high-impact results.' });
  }

  // 6. Measurable Metrics Density (%, $, numbers, multipliers)
  const metricMatches = raw.match(/(\d+%\s*|\$\s*\d+|\d+\s*(?:users|clients|million|billion|k|x|increase|reduced|improved))/gi) || [];
  if (metricMatches.length >= 3) {
    passes.push({ id: 'metrics', label: `Quantifiable Results (${metricMatches.length} metrics)`, detail: 'Strong evidence of metrics and numbers across bullet points.' });
  } else {
    formatScore -= 15;
    issues.push({ id: 'low-metrics', type: 'warning', label: 'Few Quantified Metrics', fix: 'Add measurable impact (e.g., "boosted speed by 42%", "scaled to 50k users").' });
  }

  return {
    score: Math.max(25, Math.min(100, formatScore)),
    issues,
    passes,
    wordCount,
    hasEmail,
    hasPhone,
    hasWebLink
  };
}

/**
 * Main ATS Scoring Function
 */
export function calculateAtsMatch(resumeText = '', jobDescriptionText = '') {
  if (!resumeText.trim() || !jobDescriptionText.trim()) {
    return {
      overallScore: 0,
      hardSkillScore: 0,
      softSkillScore: 0,
      formatScore: 0,
      matchPercentage: 0,
      jdKeywords: { foundSkills: [], categories: {}, counts: {} },
      resumeKeywords: { foundSkills: [], categories: {}, counts: {} },
      matchedSkills: [],
      missingSkills: [],
      hardSkillGap: { matched: [], missing: [] },
      softSkillGap: { matched: [], missing: [] },
      formatAudit: auditFormatting(resumeText)
    };
  }

  const jdParsed = extractKeywords(jobDescriptionText);
  const resumeParsed = extractKeywords(resumeText);
  const formatAudit = auditFormatting(resumeText);

  const targetJdSkills = jdParsed.foundSkills;
  const resumeSkills = new Set(resumeParsed.foundSkills);

  // If JD has few explicit dictionary skills, extract prominent word stems
  let effectiveJdSkills = [...targetJdSkills];
  if (effectiveJdSkills.length < 4) {
    const fallbackWords = jobDescriptionText
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 4 && !['years', 'experience', 'ability', 'working', 'company', 'position', 'requirements'].includes(w));
    
    const uniqueFallback = Array.from(new Set(fallbackWords)).slice(0, 10);
    uniqueFallback.forEach(w => {
      if (!effectiveJdSkills.includes(w)) effectiveJdSkills.push(w);
      if (resumeText.toLowerCase().includes(w)) resumeSkills.add(w);
    });
  }

  const matchedSkills = effectiveJdSkills.filter(skill => resumeSkills.has(skill));
  const missingSkills = effectiveJdSkills.filter(skill => !resumeSkills.has(skill));

  // Hard skill vs soft skill breakdown
  const hardJd = effectiveJdSkills.filter(s => !SKILL_CATEGORIES.softSkills.includes(s));
  const softJd = effectiveJdSkills.filter(s => SKILL_CATEGORIES.softSkills.includes(s));

  const hardMatched = hardJd.filter(s => resumeSkills.has(s));
  const hardMissing = hardJd.filter(s => !resumeSkills.has(s));

  const softMatched = softJd.filter(s => resumeSkills.has(s));
  const softMissing = softJd.filter(s => !resumeSkills.has(s));

  const hardSkillScore = hardJd.length > 0 ? Math.round((hardMatched.length / hardJd.length) * 100) : 80;
  const softSkillScore = softJd.length > 0 ? Math.round((softMatched.length / softJd.length) * 100) : 75;
  const matchPercentage = effectiveJdSkills.length > 0 ? Math.round((matchedSkills.length / effectiveJdSkills.length) * 100) : 70;

  // Overall ATS Formula: 50% Hard Skills + 20% Soft Skills + 20% Formatting/Health + 10% Density
  const overallScore = Math.round(
    (hardSkillScore * 0.50) +
    (softSkillScore * 0.20) +
    (formatAudit.score * 0.20) +
    (Math.min(100, (resumeParsed.foundSkills.length * 5)) * 0.10)
  );

  return {
    overallScore: Math.max(10, Math.min(99, overallScore)),
    hardSkillScore,
    softSkillScore,
    formatScore: formatAudit.score,
    matchPercentage,
    jdKeywords: jdParsed,
    resumeKeywords: resumeParsed,
    matchedSkills,
    missingSkills,
    hardSkillGap: {
      matched: hardMatched,
      missing: hardMissing
    },
    softSkillGap: {
      matched: softMatched,
      missing: softMissing
    },
    formatAudit
  };
}

// Sample test data presets
export const SAMPLE_RESUMES = {
  softwareEngineer: `ALEX RIVERA
San Francisco, CA | alex.rivera@email.com | (555) 342-9812 | linkedin.com/in/alexrivera-dev | github.com/alexrivera

SUMMARY
Results-driven Full Stack Software Engineer with 4+ years of experience building high-scale distributed systems, performant React frontends, and RESTful microservices. Improved latency by 38% for 1.2M monthly active users.

PROFESSIONAL EXPERIENCE
Senior Frontend Engineer | NexaTech Solutions (2022 - Present)
• Architected dynamic client web applications using React, TypeScript, Tailwind CSS, and Next.js, boosting lighthouse performance score from 64 to 98.
• Reduced initial bundle size by 42% through code splitting, tree shaking, and dynamic lazy loading across 40+ view routes.
• Engineered real-time WebSockets notification engine handling 50k concurrent connection spikes with zero downtime.
• Mentored 5 junior engineers and led weekly code reviews, establishing strict CI/CD linting with GitHub Actions.

Software Engineer | CloudScale Inc (2020 - 2022)
• Developed scalable RESTful backend microservices in Node.js, Express, and PostgreSQL, supporting 250k daily transactions.
• Containerized core services with Docker and deployed via Kubernetes clusters on AWS EC2 & S3.
• Implemented Redis distributed caching layer, reducing database read response times from 180ms to 24ms.
• Collaborated closely with Product and UX teams in fast-paced 2-week Agile/Scrum sprint cycles.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley (2016 - 2020)

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
Frameworks: React, Next.js, Node.js, Express, Tailwind CSS, Redux
Cloud & Databases: AWS, Docker, Kubernetes, PostgreSQL, MongoDB, Redis, Git, CI/CD, Jest`,

  productManager: `SARAH CHEN
New York, NY | sarah.chen@productmail.com | (555) 789-1234 | linkedin.com/in/sarahchen-pm

SUMMARY
Strategic Senior Product Manager with 5+ years driving SaaS product growth, cross-functional roadmaps, and AI feature execution. Spearheaded enterprise product launch that generated $3.4M ARR in Year 1.

EXPERIENCE
Senior Product Manager | Veloce Systems (2021 - Present)
• Led end-to-end product lifecycle for flagship B2B analytics platform, increasing Net Retention Rate (NRR) from 104% to 128%.
• Prioritized roadmap using data-driven OKRs, customer feedback loops, and competitive intelligence across 6 engineering squads.
• Launched AI-assisted recommendation engine, lifting user daily engagement by 34% and reducing churn by 18%.
• Managed cross-functional alignment across Engineering, UX Design, Marketing, and Enterprise Sales.

Product Manager | Horizon Tech (2019 - 2021)
• Conducted over 120 customer interviews and translated user research into actionable PRDs and Jira user stories.
• Optimized onboarding funnel conversion by 27% via A/B testing and interactive walkthroughs.
• Partnered with Data Science team to implement Tableau analytics dashboards tracking North Star metrics.

EDUCATION & SKILLS
B.S. in Business Information Systems | NYU Stern
Skills: Product Management, Agile, Scrum, Jira, Roadmapping, SQL, A/B Testing, Stakeholder Management, User Research, Tableau`
};

export const SAMPLE_JOB_DESCRIPTIONS = {
  seniorReactNode: `Job Title: Senior Full Stack Engineer (React / TypeScript / Node.js)
Location: Remote (US)
Company: Apex Innovations

About The Role:
We are seeking a talented Senior Full Stack Software Engineer to build high-performance web applications and resilient cloud backends. You will work across modern frontend frameworks (React, Next.js, TypeScript) and backend microservices (Node.js, PostgreSQL, AWS).

Key Responsibilities:
• Build modern, responsive, accessible web applications using React, TypeScript, Tailwind CSS, and Next.js.
• Design and scale RESTful APIs and microservices using Node.js, Express, and PostgreSQL.
• Deploy and maintain scalable services on AWS cloud (ECS, Lambda, S3, Docker, Kubernetes).
• Implement robust unit and integration testing using Jest and Cypress.
• Collaborate with cross-functional teams in an Agile/Scrum environment, participating in system design and code reviews.
• Optimize application performance, caching with Redis, and monitoring with Datadog.

Qualifications & Skills Required:
• 4+ years of professional software engineering experience.
• Strong proficiency in JavaScript, TypeScript, React, Node.js, and SQL databases.
• Experience with AWS, Docker, CI/CD, Git, and REST API architecture.
• Excellent communication, problem-solving, and cross-functional leadership skills.`,

  productLead: `Job Title: Lead Product Manager - Core Platform
Location: Remote / New York, NY

We are hiring an experienced Lead Product Manager to spearhead our core SaaS platform and drive enterprise growth.

Responsibilities:
• Define product strategy, visionary roadmaps, and measurable OKRs for core features.
• Lead cross-functional collaboration with engineering, UX design, and go-to-market teams.
• Conduct in-depth customer discovery, market analysis, and user research.
• Leverage SQL, Tableau, and A/B testing to make data-driven product decisions.
• Drive agile sprint planning, write clear PRDs, and guide releases in Jira.

Requirements:
• 4+ years in SaaS product management.
• Demonstrated track record of launching successful digital products and growing ARR.
• Strong stakeholder management, communication, and strategic planning capabilities.`
};
