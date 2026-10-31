import React, { createContext, useContext, useState, useMemo } from 'react';
import { auditResumeSearchability } from '../utils/atsEngine';

const ResumeContext = createContext();

export const RESUME_PRESETS = {
  software_engineer: {
    personal: {
      fullName: 'Alex Vance',
      title: 'Senior Full Stack & Cloud Engineer',
      email: 'alex.vance@cybernet.io',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'alexvance.dev',
      linkedin: 'linkedin.com/in/alexvance-dev',
      github: 'github.com/alexvance'
    },
    summary: 'High-impact Senior Software Engineer with 6+ years of expertise in architecting high-scale distributed applications using React, TypeScript, Node.js, and AWS. Proven track record of boosting platform performance by 40% and leading high-velocity engineering teams.',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Tailwind CSS', 'Microservices'],
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Full Stack Engineer',
        company: 'Apex Cloud Systems',
        location: 'San Francisco, CA',
        startDate: '2023-01',
        endDate: 'Present',
        current: true,
        bullets: [
          'Architected and deployed enterprise micro-frontend architecture supporting 1.2M monthly active users, reducing first-contentful-paint by 42%.',
          'Spearheaded migration of monolithic APIs to scalable AWS serverless services, decreasing monthly cloud infrastructure costs by $35,000.',
          'Mentored 6 mid-level engineers in TypeScript best practices and automated CI/CD pipelines with GitHub Actions.'
        ]
      },
      {
        id: 'exp-2',
        role: 'Software Engineer',
        company: 'Pulse Dynamics',
        location: 'Austin, TX',
        startDate: '2020-06',
        endDate: '2022-12',
        current: false,
        bullets: [
          'Engineered real-time analytics streaming engine using Node.js, Redis, and WebSockets processing 25,000 events/sec.',
          'Built responsive design system in React and Tailwind CSS adopted across 4 core company web products.',
          'Improved automated unit and integration test coverage from 45% to 88% using Jest and Playwright.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2016',
        endDate: '2020',
        gpa: '3.85 / 4.0'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'OmniStream Distributed Cache',
        link: 'github.com/alexvance/omnistream',
        description: 'High-throughput in-memory caching layer built with Go and Redis protocol, achieving sub-2ms lookup latency.'
      },
      {
        id: 'proj-2',
        name: 'CyberGrid UI Component Library',
        link: 'cybergrid-ui.dev',
        description: 'Accessible, themeable glassmorphic React design library with 3,500+ GitHub stars.'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'AWS Certified Solutions Architect – Professional', issuer: 'Amazon Web Services', year: '2024' },
      { id: 'cert-2', name: 'Certified Kubernetes Administrator (CKA)', issuer: 'CNCF', year: '2023' }
    ]
  },
  product_manager: {
    personal: {
      fullName: 'Maya Lin',
      title: 'Senior Product Manager – Growth',
      email: 'maya.lin@productvision.io',
      phone: '+1 (555) 987-6543',
      location: 'New York, NY',
      website: 'mayalin.pm',
      linkedin: 'linkedin.com/in/mayalin-pm',
      github: ''
    },
    summary: 'Customer-obsessed Senior Product Manager with 7+ years driving 0-to-1 product launches and conversion funnels. Specializing in growth experimentation, A/B testing, and cross-functional leadership across product, design, and engineering teams.',
    skills: ['Product Discovery', 'A/B Testing', 'RICE Framework', 'SQL', 'Data Analytics', 'User Research', 'Roadmapping', 'Figma', 'Agile / Scrum', 'Amplitude', 'Mixpanel', 'Go-To-Market'],
    experience: [
      {
        id: 'exp-1',
        role: 'Lead Growth Product Manager',
        company: 'Synthetix Cloud',
        location: 'New York, NY',
        startDate: '2022-04',
        endDate: 'Present',
        current: true,
        bullets: [
          'Led end-to-end launch of conversational onboarding flow, increasing trial-to-paid conversion by 31% and adding $2.4M ARR.',
          'Executed 45+ iterative A/B experiments across user activation funnel, boosting 30-day retention from 41% to 63%.',
          'Managed cross-functional squad of 10 engineers, 2 UX designers, and 1 data scientist.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.A. in Economics & Cognitive Science',
        institution: 'Columbia University',
        location: 'New York, NY',
        startDate: '2015',
        endDate: '2019',
        gpa: '3.9'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'GrowthMetrics Open Blueprint',
        link: 'growthmetrics.pm',
        description: 'Comprehensive PLG experimentation playbook downloaded by 15,000+ tech founders and PMs.'
      }
    ],
    certifications: [
      { id: 'cert-1', name: 'Reforge Advanced Growth Series', issuer: 'Reforge', year: '2023' }
    ]
  }
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_active_resume');
      return saved ? JSON.parse(saved) : RESUME_PRESETS.software_engineer;
    } catch {
      return RESUME_PRESETS.software_engineer;
    }
  });

  const [activeTemplate, setActiveTemplate] = useState('modern_cyber');

  const updatePersonal = (field, value) => {
    setResumeData(prev => {
      const next = {
        ...prev,
        personal: { ...prev.personal, [field]: value }
      };
      try { localStorage.setItem('resumate_active_resume', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const updateSummary = (value) => {
    setResumeData(prev => {
      const next = { ...prev, summary: value };
      try { localStorage.setItem('resumate_active_resume', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const updateSkills = (skillsArray) => {
    setResumeData(prev => {
      const next = { ...prev, skills: skillsArray };
      try { localStorage.setItem('resumate_active_resume', JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const addExperience = () => {
    const newItem = {
      id: 'exp-' + Date.now(),
      role: 'Software Engineer',
      company: 'Company Name',
      location: 'City, State',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      bullets: ['Spearheaded critical engineering initiatives resulting in measurable performance improvement.']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newItem, ...prev.experience]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newItem = {
      id: 'edu-' + Date.now(),
      degree: 'B.S. in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2018',
      endDate: '2022',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newItem]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    const newItem = {
      id: 'proj-' + Date.now(),
      name: 'New Technical Project',
      link: 'github.com/user/project',
      description: 'Engineered scalable solution leveraging modern best practices.'
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newItem]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id)
    }));
  };

  const loadPreset = (presetKey) => {
    if (RESUME_PRESETS[presetKey]) {
      setResumeData(RESUME_PRESETS[presetKey]);
      try { localStorage.setItem('resumate_active_resume', JSON.stringify(RESUME_PRESETS[presetKey])); } catch (e) {}
    }
  };

  const resumePlainText = useMemo(() => {
    const p = resumeData.personal || {};
    const lines = [
      p.fullName,
      p.title,
      `${p.email} | ${p.phone} | ${p.location} | ${p.linkedin || ''} | ${p.github || ''} | ${p.website || ''}`,
      '\nSUMMARY',
      resumeData.summary,
      '\nSKILLS',
      (resumeData.skills || []).join(', '),
      '\nWORK EXPERIENCE'
    ];

    (resumeData.experience || []).forEach(exp => {
      lines.push(`${exp.role} - ${exp.company} (${exp.startDate} - ${exp.endDate})`);
      (exp.bullets || []).forEach(b => lines.push(`• ${b}`));
    });

    lines.push('\nEDUCATION');
    (resumeData.education || []).forEach(edu => {
      lines.push(`${edu.degree} - ${edu.institution} (${edu.startDate} - ${edu.endDate})`);
    });

    lines.push('\nPROJECTS');
    (resumeData.projects || []).forEach(proj => {
      lines.push(`${proj.name} (${proj.link}): ${proj.description}`);
    });

    return lines.filter(Boolean).join('\n');
  }, [resumeData]);

  const liveHealth = useMemo(() => {
    return auditResumeSearchability(resumePlainText);
  }, [resumePlainText]);

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      activeTemplate,
      setActiveTemplate,
      updatePersonal,
      updateSummary,
      updateSkills,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addProject,
      updateProject,
      removeProject,
      loadPreset,
      resumePlainText,
      liveHealth
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
