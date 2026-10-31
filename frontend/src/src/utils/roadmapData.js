/**
 * Personalized Career Roadmap Catalog
 * Provides structured phased milestones, skills checklists, tips, and project ideas.
 * Aligns with Course Syllabus: State Management, Conditional Rendering, Lists, Custom Hooks
 */

export const CAREER_ROADMAPS = [
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    icon: '🧠',
    category: 'Artificial Intelligence & Data',
    salary: '₹14 - 30 LPA',
    description: 'Master data pipelines, statistical modeling, neural networks, and scalable ML model inference.',
    phases: [
      {
        id: 'ml-p1',
        title: 'Phase 1: Python & Mathematical Foundations',
        steps: [
          {
            id: 'ml-s1',
            title: 'Core Python & Algorithmic Problem Solving',
            skills: ['Python Basics', 'OOPs in Python', 'File Handling & JSON', 'List Comprehensions', 'Decorators & Generators'],
            learningTips: 'Write clean idiomatic Python 3 code with type hinting and exception handling.',
            projectIdea: 'Build an automated CLI dataset cleaner that validates null values and data types.'
          },
          {
            id: 'ml-s2',
            title: 'Mathematics, Linear Algebra & Statistics',
            skills: ['Descriptive Statistics', 'Probability Distributions', 'Matrix Multiplication & Vectors', 'Calculus & Gradients'],
            learningTips: 'Understand mean, variance, covariance, eigenvalues, and how gradient descent minimizes loss.',
            projectIdea: 'Implement linear regression and gradient descent from scratch using only Python math.'
          }
        ]
      },
      {
        id: 'ml-p2',
        title: 'Phase 2: Scientific Data Stack & Feature Engineering',
        steps: [
          {
            id: 'ml-s3',
            title: 'NumPy for Matrix & Vector Operations',
            skills: ['NumPy Arrays', 'Broadcasting', 'Vectorized Operations', 'Array Slicing & Reshaping'],
            learningTips: 'Avoid slow Python loops by leveraging vectorized NumPy C-speed array operations.',
            projectIdea: 'Create an image filter processor that transforms image matrices with NumPy broadcasting.'
          },
          {
            id: 'ml-s4',
            title: 'Pandas for Data Manipulation & Wrangling',
            skills: ['DataFrames & Series', 'GroupBy & Aggregations', 'Missing Data Imputation', 'Data Merging & Concat'],
            learningTips: 'Master pandas indexing (.loc, .iloc), datetime operations, and pivot tables.',
            projectIdea: 'Analyze Kaggle Titanic or Housing Prices dataset and generate statistical insights.'
          }
        ]
      },
      {
        id: 'ml-p3',
        title: 'Phase 3: Machine Learning Algorithms & Model Evaluation',
        steps: [
          {
            id: 'ml-s5',
            title: 'Scikit-Learn & Classical Machine Learning',
            skills: ['Linear & Logistic Regression', 'Decision Trees & Random Forests', 'K-Means Clustering', 'Cross Validation & Hyperparameter Tuning'],
            learningTips: 'Focus on train-test splits, overfitting vs underfitting, and precision/recall/F1 metrics.',
            projectIdea: 'Train an end-to-end customer churn prediction classifier with ROC-AUC curve evaluation.'
          },
          {
            id: 'ml-s6',
            title: 'Deep Learning & Neural Networks',
            skills: ['Perceptrons & Multi-Layer Neural Nets', 'PyTorch / TensorFlow Basics', 'Convolutional Neural Networks (CNN)', 'Recurrent / Transformers'],
            learningTips: 'Understand backpropagation, activation functions (ReLU, Softmax), and Adam optimizer.',
            projectIdea: 'Build an MNIST handwritten digit classifier or sentiment classifier with PyTorch.'
          }
        ]
      },
      {
        id: 'ml-p4',
        title: 'Phase 4: MLOps, Containerization & Production Deployment',
        steps: [
          {
            id: 'ml-s7',
            title: 'Model Deployment & REST API Serving',
            skills: ['FastAPI / Flask for ML', 'Docker Containerization', 'Model Serialization (Pickle/ONNX)', 'Cloud Deployment (AWS/GCP)'],
            learningTips: 'Wrap your trained ML model inside a containerized FastAPI endpoint ready for production.',
            projectIdea: 'Deploy a live Resumate AI score predictor API containerized with Docker on cloud.'
          }
        ]
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Web Developer',
    icon: '⚡',
    category: 'Web & Cloud Engineering',
    salary: '₹10 - 24 LPA',
    description: 'Architect modern responsive frontend client applications, RESTful backend APIs, and database schemas.',
    phases: [
      {
        id: 'fs-p1',
        title: 'Phase 1: Frontend Core & Responsive Design',
        steps: [
          {
            id: 'fs-s1',
            title: 'HTML5, CSS3, Flexbox & Grid',
            skills: ['Semantic HTML5', 'Box Model & Responsive Design', 'Flexbox & CSS Grid', 'Mobile-First Layouts', 'Tailwind CSS'],
            learningTips: 'Prioritize accessibility (ARIA), fluid layouts, and clean utility classes.',
            projectIdea: 'Build a responsive cyber-themed landing page with mobile hamburger drawer navigation.'
          },
          {
            id: 'fs-s2',
            title: 'Modern JavaScript (ES6+)',
            skills: ['Let/Const & Scope', 'Arrow Functions & Destructuring', 'Promises & Async/Await', 'Fetch API & DOM Handling', 'LocalStorage & JSON'],
            learningTips: 'Master asynchronous event loops, array methods (map, filter, reduce), and module imports.',
            projectIdea: 'Develop an interactive client-side Task Manager with search, filter, and localStorage.'
          }
        ]
      },
      {
        id: 'fs-p2',
        title: 'Phase 2: Modern React Architecture & State Management',
        steps: [
          {
            id: 'fs-s3',
            title: 'React Fundamentals & Component Architecture',
            skills: ['JSX & Props', 'useState & State Management', 'Lists & Conditional Rendering', 'Controlled Forms & Events'],
            learningTips: 'Keep components pure, reusable, and practice lifting state up to common ancestors.',
            projectIdea: 'Create an interactive ATS Resume Score previewer with live field updates.'
          },
          {
            id: 'fs-s4',
            title: 'Advanced React Hooks & React Router',
            skills: ['useEffect & Data Fetching', 'useRef, useMemo, useCallback', 'React Router (Routes, Route, Dynamic Params)', 'Context API for Global State'],
            learningTips: 'Optimize render cycles with useMemo and architect clean SPA routes with 404 pages.',
            projectIdea: 'Build a multi-page portfolio site with protected routes and dynamic theme switcher.'
          }
        ]
      },
      {
        id: 'fs-p3',
        title: 'Phase 3: Backend APIs & Database Persistence',
        steps: [
          {
            id: 'fs-s5',
            title: 'Node.js, Express & REST APIs',
            skills: ['Node.js Runtime', 'Express Router & Middleware', 'RESTful API Standards', 'JWT Authentication & Cookies', 'Input Validation'],
            learningTips: 'Follow REST conventions with proper HTTP status codes (200, 201, 400, 404, 500).',
            projectIdea: 'Build a secure authentication & user profile REST API with JWT tokens.'
          },
          {
            id: 'fs-s6',
            title: 'Relational & NoSQL Databases',
            skills: ['PostgreSQL & SQL Queries', 'Foreign Keys & Joins', 'Prisma ORM / Mongoose', 'Database Indexing & Transactions'],
            learningTips: 'Write optimized queries and ensure relational schema integrity with foreign keys.',
            projectIdea: 'Design a Job Board database schema with applications, recruiters, and candidate profiles.'
          }
        ]
      },
      {
        id: 'fs-p4',
        title: 'Phase 4: Full-Stack Capstone & CI/CD Deployment',
        steps: [
          {
            id: 'fs-s7',
            title: 'Full Stack Integration & Production Launch',
            skills: ['Full Stack CRUD Workflows', 'Debounce & Pagination', 'Git & GitHub Collaboration', 'Vercel / Render Deployment', 'CI/CD Pipelines'],
            learningTips: 'Combine frontend React with backend Node.js and deploy live with automated GitHub Actions.',
            projectIdea: 'Deploy the complete Resumate Career Portal with real-time job application tracking.'
          }
        ]
      }
    ]
  },
  {
    id: 'java_backend',
    title: 'Java Backend Specialist',
    icon: '☕',
    category: 'Enterprise Engineering',
    salary: '₹12 - 25 LPA',
    description: 'Build enterprise-grade, high-scale microservices using Java, Spring Boot, Hibernate, and Apache Kafka.',
    phases: [
      {
        id: 'java-p1',
        title: 'Phase 1: Core Java & Object-Oriented Design',
        steps: [
          {
            id: 'java-s1',
            title: 'Core Java Fundamentals & OOPs',
            skills: ['OOPs (Polymorphism, Inheritance, Encapsulation)', 'Java Collections Framework', 'Exception Handling', 'Generics & Lambdas', 'Multithreading Basics'],
            learningTips: 'Understand memory models (Heap vs Stack), immutable objects, and stream APIs.',
            projectIdea: 'Build a banking transaction console system implementing OOPs principles.'
          },
          {
            id: 'java-s2',
            title: 'Data Structures & Algorithms in Java',
            skills: ['Arrays & HashMaps', 'LinkedLists & Trees', 'Sorting & Binary Search', 'Time & Space Complexity (Big-O)'],
            learningTips: 'Practice solving standard LeetCode problems with optimal O(N) time complexity.',
            projectIdea: 'Implement a LRU Cache data structure using HashMap and Doubly LinkedList.'
          }
        ]
      },
      {
        id: 'java-p2',
        title: 'Phase 2: Spring Boot & Enterprise Persistence',
        steps: [
          {
            id: 'java-s3',
            title: 'Spring Framework & Spring Boot',
            skills: ['Dependency Injection & IoC', 'Spring MVC & REST Controllers', 'Spring Boot Auto-Configuration', 'Application Properties & Profiles'],
            learningTips: 'Learn how Spring manages Bean lifecycles and creates clean REST microservices.',
            projectIdea: 'Develop a Job Application REST microservice with CRUD endpoints in Spring Boot.'
          },
          {
            id: 'java-s4',
            title: 'Hibernate, JPA & Relational Databases',
            skills: ['Hibernate ORM', 'JPA Repositories', 'Entity Relationships (OneToMany, ManyToMany)', 'PostgreSQL / MySQL Integration'],
            learningTips: 'Avoid N+1 query problem by using JOIN FETCH and index critical lookup columns.',
            projectIdea: 'Build an E-Commerce backend with user, product, order, and payment JPA entities.'
          }
        ]
      },
      {
        id: 'java-p3',
        title: 'Phase 3: Microservices, Kafka & Docker',
        steps: [
          {
            id: 'java-s5',
            title: 'Microservices Architecture & Event Streaming',
            skills: ['API Gateway & Service Discovery', 'Apache Kafka Messaging', 'Docker Containerization', 'JUnit & Mockito Testing'],
            learningTips: 'Use Kafka topics for decoupling services and write automated unit tests with Mockito.',
            projectIdea: 'Build an asynchronous notification microservice that listens to Kafka job events.'
          }
        ]
      }
    ]
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst & Business Intelligence',
    icon: '📊',
    category: 'Analytics & Business Insights',
    salary: '₹8 - 18 LPA',
    description: 'Master SQL data extraction, exploratory data analysis with Pandas, and executive dashboards with Tableau.',
    phases: [
      {
        id: 'da-p1',
        title: 'Phase 1: Advanced SQL & Data Extraction',
        steps: [
          {
            id: 'da-s1',
            title: 'Relational Database Querying & Aggregations',
            skills: ['SELECT, WHERE, GROUP BY', 'JOINs (INNER, LEFT, FULL)', 'Window Functions (ROW_NUMBER, RANK)', 'Subqueries & CTEs'],
            learningTips: 'Write fast aggregation queries and understand partition window functions.',
            projectIdea: 'Analyze a retail database to find customer lifetime value and repeat purchase rates.'
          }
        ]
      },
      {
        id: 'da-p2',
        title: 'Phase 2: Python for Data Analysis',
        steps: [
          {
            id: 'da-s2',
            title: 'Pandas, NumPy & Exploratory Data Analysis (EDA)',
            skills: ['Pandas Data Cleaning', 'Handling Outliers & Missing Values', 'Matplotlib & Seaborn Visualizations', 'Hypothesis Testing'],
            learningTips: 'Use correlation heatmaps and boxplots to spot actionable business trends.',
            projectIdea: 'Perform full exploratory analysis on job market salaries and tech stack trends.'
          }
        ]
      },
      {
        id: 'da-p3',
        title: 'Phase 3: Business Intelligence & Dashboards',
        steps: [
          {
            id: 'da-s3',
            title: 'Tableau, PowerBI & Storytelling',
            skills: ['Interactive Dashboards', 'Calculated Fields & Parameters', 'Executive KPI Cards', 'Data Storytelling & Presentations'],
            learningTips: 'Design clean visual hierarchies with high data-to-ink ratios for executives.',
            projectIdea: 'Build an interactive HR Analytics dashboard tracking hiring pipelines and dropouts.'
          }
        ]
      }
    ]
  }
];

/**
 * Calculates total skills count for a roadmap
 */
export function getRoadmapStats(roadmap) {
  let totalSkills = 0;
  roadmap.phases.forEach(phase => {
    phase.steps.forEach(step => {
      totalSkills += step.skills.length;
    });
  });
  return totalSkills;
}
