// Initial default resume data for Alex Rivera
export const INITIAL_RESUME = {
  personal: {
    fullName: 'Alex Rivera',
    roleTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.rivera@email.com',
    phone: '(555) 342-9812',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    github: 'github.com/alexrivera',
    website: 'alexrivera.dev'
  },
  summary: 'Results-driven Full Stack Software Engineer with 4+ years of experience building high-scale distributed systems, performant React frontends, and RESTful microservices. Boosted application speed by 38% for 1.2M active users.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'NexaTech Solutions',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected dynamic client web applications using React, TypeScript, Tailwind CSS, and Next.js, boosting lighthouse performance score from 64 to 98.',
        'Reduced initial bundle size by 42% through code splitting, tree shaking, and dynamic lazy loading across 40+ view routes.',
        'Engineered real-time WebSockets notification engine handling 50k concurrent connection spikes with zero downtime.',
        'Mentored 5 junior engineers and led weekly code reviews, establishing strict CI/CD linting with GitHub Actions.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'CloudScale Inc',
      location: 'San Jose, CA',
      startDate: '2020-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Developed scalable RESTful backend microservices in Node.js, Express, and PostgreSQL, supporting 250k daily transactions.',
        'Containerized core services with Docker and deployed via Kubernetes clusters on AWS EC2 & S3.',
        'Implemented Redis distributed caching layer, reducing database read response times from 180ms to 24ms.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Resumate AI Copilot',
      link: 'github.com/alexrivera/resumate',
      techStack: 'React, TypeScript, Tailwind, Web Speech API',
      bullets: [
        'Built full-text ATS resume parsing and Google XYZ bullet scorer with 99.4% accuracy.',
        'Scaled client-side heuristics engine with 0ms server latency.'
      ]
    },
    {
      id: 'proj-2',
      name: 'DevFlow Cloud IDE',
      link: 'devflow.io',
      techStack: 'Node.js, WebSockets, Docker, Redis',
      bullets: [
        'Engineered collaborative in-browser code editor supporting 20+ concurrent coders per room.'
      ]
    }
  ],
  skills: {
    languages: 'JavaScript, TypeScript, Python, SQL, HTML5, CSS3, Bash',
    frameworks: 'React, Next.js, Node.js, Express, Tailwind CSS, Redux, Jest',
    cloudDatabases: 'AWS (S3, EC2, Lambda), Docker, Kubernetes, PostgreSQL, MongoDB, Redis, Git, CI/CD',
    methodologies: 'Agile, Scrum, System Design, REST APIs, Microservices, Performance Tuning'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      year: '2016 - 2020',
      gpa: '3.8 / 4.0'
    }
  ]
};

// Initial user profile
export const INITIAL_USER = {
  name: 'Alex Rivera',
  email: 'alex.rivera@resumate.io',
  isGuest: false,
  tier: 'Pro Member'
};

// Initial ATS scan records
export const INITIAL_SCAN_HISTORY = [
  { id: 'scan-1', role: 'Senior Full Stack Engineer', company: 'Apex Innovations', score: 92, date: '2026-08-18' },
  { id: 'scan-2', role: 'Staff Frontend Engineer', company: 'Stripe', score: 88, date: '2026-08-15' },
  { id: 'scan-3', role: 'React Core Developer', company: 'NexaTech', score: 79, date: '2026-08-12' }
];

// Initial Support Desk Tickets
export const INITIAL_SUPPORT_TICKETS = [
  { id: 'TKT-4892', subject: 'Custom PDF Export Margins', status: 'Resolved', date: '2026-08-17', category: 'Feature Request' },
  { id: 'TKT-4910', subject: 'Ashby ATS Parsing Advice', status: 'In Progress', date: '2026-08-19', category: 'ATS Consultation' }
];
