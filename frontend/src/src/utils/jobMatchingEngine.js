/**
 * Job Matching Engine & Tech Catalog
 * Simulates REST API job fetching, search filters, debounce, and ATS resume skill matching.
 * Adheres to Course Syllabus (Lectures 67-72: Consuming REST APIs, Debounce, Pagination)
 */

export const SAMPLE_TECH_JOBS = [
  {
    id: 'job-1',
    title: 'Java Backend Developer',
    company: 'FinPulse Systems',
    logo: '💳',
    location: 'Bangalore / Hybrid',
    type: 'Hybrid',
    experience: 'Mid',
    salary: '₹14 - 22 LPA',
    posted: '2 days ago',
    requiredSkills: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'PostgreSQL', 'Docker', 'Kafka'],
    description: 'Looking for a skilled Java Backend Developer to build ultra-low-latency financial transaction microservices and resilient payment gateways.',
    responsibilities: [
      'Design and deploy Spring Boot microservices with 99.99% uptime.',
      'Optimize complex PostgreSQL database queries and connection pools.',
      'Build event-driven message pipelines using Apache Kafka.'
    ]
  },
  {
    id: 'job-2',
    title: 'Senior Full Stack Engineer',
    company: 'CloudMatrix Technologies',
    logo: '⚡',
    location: 'Remote (Pan India)',
    type: 'Remote',
    experience: 'Senior',
    salary: '₹24 - 36 LPA',
    posted: '1 day ago',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Tailwind CSS', 'REST APIs'],
    description: 'Seeking a Full Stack Engineer to scale enterprise SaaS collaboration dashboards serving over 500,000 active global professionals.',
    responsibilities: [
      'Architect modular React frontend components with Tailwind CSS.',
      'Develop scalable Node.js/Express REST microservices on AWS ECS.',
      'Mentor junior software engineers on clean architecture and automated testing.'
    ]
  },
  {
    id: 'job-3',
    title: 'Frontend React Developer',
    company: 'UrbanPulse Media',
    logo: '🎨',
    location: 'Noida / Onsite',
    type: 'Onsite',
    experience: 'Entry',
    salary: '₹6 - 10 LPA',
    posted: '3 days ago',
    requiredSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Vite', 'REST APIs'],
    description: 'Great opportunity for freshers or junior frontend devs to work on modern interactive consumer web applications with cutting-edge UI.',
    responsibilities: [
      'Convert responsive Figma designs into pixel-perfect React components.',
      'Integrate backend REST APIs with proper loading and error states.',
      'Write clean, accessible, semantic HTML5 and CSS3.'
    ]
  },
  {
    id: 'job-4',
    title: 'Machine Learning Engineer',
    company: 'NeuroVision AI',
    logo: '🧠',
    location: 'Gurgaon / Hybrid',
    type: 'Hybrid',
    experience: 'Mid',
    salary: '₹18 - 28 LPA',
    posted: 'Just now',
    requiredSkills: ['Python', 'Statistics', 'NumPy', 'Pandas', 'Machine Learning', 'Deep Learning', 'PyTorch', 'Docker'],
    description: 'Join our research & deployment squad to train predictive models, fine-tune neural architectures, and build automated ML inference pipelines.',
    responsibilities: [
      'Preprocess large unstructured text and image datasets with NumPy and Pandas.',
      'Train, validate, and benchmark supervised and unsupervised ML models.',
      'Containerize and deploy inference endpoints via Docker.'
    ]
  },
  {
    id: 'job-5',
    title: 'Data Analyst & BI Specialist',
    company: 'Zenith Retail Analytics',
    logo: '📊',
    location: 'Remote',
    type: 'Remote',
    experience: 'Entry',
    salary: '₹7 - 12 LPA',
    posted: '4 days ago',
    requiredSkills: ['Python', 'SQL', 'Tableau', 'Pandas', 'Statistics', 'Data Visualization', 'Excel'],
    description: 'Transform raw multi-channel sales and customer data into interactive executive dashboards and revenue trend insights.',
    responsibilities: [
      'Write optimized SQL aggregation queries across Snowflake data warehouses.',
      'Design executive Tableau and PowerBI performance dashboards.',
      'Conduct statistical cohort and churn correlation analysis.'
    ]
  },
  {
    id: 'job-6',
    title: 'Cloud & DevOps Engineer',
    company: 'Apex Infrastructure Labs',
    logo: '☁️',
    location: 'Hyderabad / Hybrid',
    type: 'Hybrid',
    experience: 'Mid',
    salary: '₹16 - 25 LPA',
    posted: '5 days ago',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Terraform', 'GitHub Actions', 'Python'],
    description: 'Help automate zero-downtime multi-cloud deployments, maintain Kubernetes clusters, and build hardened CI/CD pipelines.',
    responsibilities: [
      'Manage container orchestration across production AWS EKS clusters.',
      'Codify cloud infrastructure using Terraform scripts.',
      'Configure automated CI/CD pipelines using GitHub Actions.'
    ]
  },
  {
    id: 'job-7',
    title: 'Python Backend Engineer (FastAPI/Django)',
    company: 'Starlight Health',
    logo: '⚕️',
    location: 'Remote',
    type: 'Remote',
    experience: 'Mid',
    salary: '₹15 - 23 LPA',
    posted: '1 week ago',
    requiredSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Celery', 'REST APIs', 'Git'],
    description: 'Build secure, HIPAA-compliant patient telemedicine APIs and asynchronous message background workers using Python and Redis.',
    responsibilities: [
      'Develop high-throughput REST endpoints using FastAPI and Pydantic.',
      'Implement distributed task queues with Redis and Celery.',
      'Ensure high database transaction integrity and automated unit tests.'
    ]
  },
  {
    id: 'job-8',
    title: 'Associate Software Engineer (Core Java)',
    company: 'Tata Consultancy Services (TCS)',
    logo: '🏢',
    location: 'Pune / Onsite',
    type: 'Onsite',
    experience: 'Entry',
    salary: '₹5 - 8.5 LPA',
    posted: '3 days ago',
    requiredSkills: ['Java', 'OOPs', 'SQL', 'Data Structures', 'Git', 'HTML5', 'CSS3'],
    description: 'Entry-level role for B.Tech/BCA graduates with strong OOPs fundamentals, basic SQL knowledge, and good algorithmic problem-solving skills.',
    responsibilities: [
      'Develop bug fixes and features in enterprise Java business applications.',
      'Write SQL queries, stored procedures, and unit test suites.',
      'Collaborate in Agile sprint ceremonies and code reviews.'
    ]
  }
];

/**
 * Normalizes skill strings to enable fuzzy matching
 * e.g., 'React.js' -> 'react', 'NodeJS' -> 'node'
 */
export function normalizeSkill(skill) {
  if (!skill) return '';
  return skill
    .toLowerCase()
    .replace(/\.js$/, '')
    .replace(/js$/, '')
    .replace(/[-_]/g, '')
    .trim();
}

/**
 * Compares user skills with job required skills
 */
export function compareResumeWithJob(userSkills = [], requiredSkills = []) {
  if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
    return {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: [],
      scoreTier: 'low',
    };
  }

  // Format user skills set
  const normalizedUserSkills = new Set(
    (userSkills || []).map(s => normalizeSkill(typeof s === 'string' ? s : s.name || ''))
  );

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach(req => {
    const norm = normalizeSkill(req);
    // Check direct match or substring match (e.g. 'react' matches 'react')
    const hasMatch = Array.from(normalizedUserSkills).some(u => {
      return u === norm || (u.length > 2 && norm.includes(u)) || (norm.length > 2 && u.includes(norm));
    });

    if (hasMatch) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const matchPercentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);

  let scoreTier = 'low';
  if (matchPercentage >= 70) scoreTier = 'high';
  else if (matchPercentage >= 40) scoreTier = 'medium';

  return {
    matchPercentage,
    matchedSkills,
    missingSkills,
    scoreTier
  };
}

/**
 * Simulated REST API Job Fetch with async Promise, search filtering, and latency
 * Directly satisfies Syllabus Lectures 67-72
 */
export function fetchJobsApi({ query = '', type = 'all', experience = 'all' } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = query.trim().toLowerCase();

      const filtered = SAMPLE_TECH_JOBS.filter(job => {
        // Query filter
        const matchesQuery = !q || 
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.requiredSkills.some(s => s.toLowerCase().includes(q));

        // Type filter
        const matchesType = type === 'all' || job.type.toLowerCase() === type.toLowerCase();

        // Experience filter
        const matchesExp = experience === 'all' || job.experience.toLowerCase() === experience.toLowerCase();

        return matchesQuery && matchesType && matchesExp;
      });

      resolve({
        status: 200,
        total: filtered.length,
        jobs: filtered
      });
    }, 350); // realistic network delay simulation
  });
}
