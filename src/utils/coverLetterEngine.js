/**
 * Tailored Cover Letter Generator Engine
 * Generates role-specific, ATS-optimized cover letters in 4 distinct tones.
 */

export const TONE_STYLES = {
  professional: {
    id: 'professional',
    label: 'Professional & Polished',
    badge: 'Recommended for Corporate & Enterprise',
    accent: 'cyan'
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic & High-Growth',
    badge: 'Best for Tech Startups & Scaleups',
    accent: 'violet'
  },
  executive: {
    id: 'executive',
    label: 'Executive & Strategic',
    badge: 'Tailored for Leads, Managers & Directors',
    accent: 'emerald'
  },
  creative: {
    id: 'creative',
    label: 'Creative & Storyteller',
    badge: 'Ideal for Product, Design & Modern Teams',
    accent: 'pink'
  }
};

/**
 * Generates dynamic cover letter content
 */
export function generateCoverLetter({
  candidateName = 'Alex Rivera',
  candidateEmail = 'alex.rivera@email.com',
  candidatePhone = '(555) 342-9812',
  targetRole = 'Senior Full Stack Engineer',
  companyName = 'Apex Innovations',
  hiringManager = 'Hiring Team',
  keySkills = ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
  yearsOfExperience = '4+',
  keyAchievement = 'engineered a distributed real-time dashboard that increased user retention by 38% and reduced latency from 180ms to 24ms',
  tone = 'professional'
}) {
  const skillsList = Array.isArray(keySkills) ? keySkills.slice(0, 4).join(', ') : keySkills;
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let body = '';

  switch (tone) {
    case 'energetic':
      body = `Dear ${hiringManager},

When I saw the opening for the ${targetRole} position at ${companyName}, I immediately recognized an exceptional match for my passion for building fast, resilient, and delightful products. With over ${yearsOfExperience} years of hands-on experience shipping web applications using ${skillsList}, I am eager to bring my high-velocity engineering mindset to your team.

Throughout my career, I have thrived in fast-paced environments where ownership and rapid iteration matter. Most recently, I ${keyAchievement}. I love dissecting complex architectural challenges, eliminating bottlenecks, and collaborating closely with cross-functional partners to deliver solutions that customers love.

What excites me most about ${companyName} is your relentless focus on product excellence and innovation. I am confident that my technical expertise in ${skillsList}, paired with my proactive problem-solving drive, will allow me to hit the ground running and create immediate value.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my skill set aligns with your upcoming milestones.`;
      break;

    case 'executive':
      body = `Dear ${hiringManager},

I am writing to express my enthusiastic interest in the ${targetRole} role at ${companyName}. With a track record spanning ${yearsOfExperience} years of driving technical strategy, architecting scalable systems, and elevating engineering standards, I offer the leadership and domain depth necessary to accelerate ${companyName}'s organizational goals.

My background centers on aligning technical roadmap execution with core business KPIs. For instance, I ${keyAchievement}. In addition to technical execution across ${skillsList}, I place high priority on fostering cultures of mentorship, rigorous code review, and systematic operational efficiency.

${companyName} stands out as a distinguished industry leader with a clear trajectory of growth. I look forward to bringing my strategic mindset, cross-functional execution rigor, and deep mastery of ${skillsList} to empower your engineering squads.

I welcome the opportunity to discuss how my background and vision can support ${companyName}'s strategic objectives. Thank you for your review.`;
      break;

    case 'creative':
      body = `Dear ${hiringManager},

Great software is where elegant engineering meets human intuition. As an engineer with ${yearsOfExperience} years of crafting digital experiences, my mission has always been simple: build resilient systems that solve genuine problems while delighting end users. That philosophy is why I am thrilled to apply for the ${targetRole} opportunity at ${companyName}.

My core toolkit revolves around ${skillsList}, but what truly distinguishes my work is an obsession with craft and measurable impact. In my previous role, I ${keyAchievement}. I approach every sprint with curiosity, creative problem-solving, and a dedication to seamless user experiences.

I have long admired how ${companyName} balances technical ambition with intuitive product design. I would love the chance to bring my creative energy, technical versatility, and enthusiasm to your collaborative team.

Thank you for considering my application. I would love to connect and share more about how my background can elevate your current projects.`;
      break;

    case 'professional':
    default:
      body = `Dear ${hiringManager},

I am writing to submit my application for the ${targetRole} position at ${companyName}. With over ${yearsOfExperience} years of progressive experience in software engineering and deep hands-on expertise in ${skillsList}, I am confident in my ability to make a meaningful and immediate contribution to your engineering department.

In my recent roles, I have consistently focused on delivering robust code, optimizing system performance, and scaling infrastructure. Notably, I ${keyAchievement}. My approach combines disciplined software craftsmanship with strong Agile collaboration and continuous learning.

I am particularly drawn to ${companyName} due to your commitment to engineering excellence and customer-centric products. I am enthusiastic about the prospect of applying my skills in ${skillsList} to support your team's ongoing initiatives and long-term roadmap.

Thank you for your consideration of my application. I welcome the opportunity to speak with you further regarding my qualifications.`;
      break;
  }

  const fullLetter = `${candidateName}
${candidateEmail} | ${candidatePhone}
${today}

${companyName} Recruiting Team
Attn: ${hiringManager}

Re: Application for ${targetRole}

${body}

Sincerely,

${candidateName}`;

  return {
    fullLetter,
    body,
    candidateName,
    candidateEmail,
    candidatePhone,
    date: today,
    targetRole,
    companyName,
    tone
  };
}
