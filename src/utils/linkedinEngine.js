/**
 * LinkedIn Profile Analyzer & AI Enhancement Engine
 * Evaluates Headline, About/Summary, and Skills against tech recruiter search criteria.
 * Generates 3 high-converting headlines and structured recruiter-ready About sections.
 */

// Common high-impact action verbs and metric keywords
const POWER_VERBS = [
  'architect', 'engineered', 'scaled', 'optimized', 'spearheaded', 'delivered', 
  'developed', 'mentored', 'streamlined', 'pioneered', 'boosted', 'designed'
];

const METRIC_PATTERNS = [
  /\b\d+%\b/,           // percentage (e.g. 40%)
  /\b\$\d+[\w]*\b/,     // monetary values (e.g. $100k, $2M)
  /\b\d+\+?\s*(users|clients|projects|million|k|team members|developers)\b/i,
  /\b\d+x\b/i           // multipliers (e.g. 2x, 5x)
];

export function analyzeLinkedInProfile({ headline = '', about = '', skills = '', targetRole = '', language = 'en' }) {
  const normHeadline = headline.trim();
  const normAbout = about.trim();
  const normSkills = skills.trim();
  const roleName = targetRole.trim() || 'Software Engineer';

  // 1. Audit Headline
  let headlineScore = 40;
  const headlineFeedback = [];

  if (normHeadline.length >= 30 && normHeadline.length <= 150) {
    headlineScore += 20;
    headlineFeedback.push('Good length (30-150 characters) fits well on desktop and mobile previews.');
  } else if (normHeadline.length < 30) {
    headlineFeedback.push('Headline is too short. Add your core tech stack and unique value proposition.');
  } else {
    headlineFeedback.push('Headline is over 150 characters. Front-load critical role titles before truncation.');
  }

  // Check for separator like | or • or -
  if (/[|•\-/]/.test(normHeadline)) {
    headlineScore += 15;
    headlineFeedback.push('Effective use of visual separators (| or •) enhances reader scanability.');
  } else {
    headlineFeedback.push('Tip: Use visual dividers like "|" or "•" to cleanly separate role, skills, and achievements.');
  }

  // Check role keywords
  const hasRoleMention = normHeadline.toLowerCase().includes(roleName.toLowerCase().split(' ')[0]) || 
    /developer|engineer|analyst|architect|specialist/i.test(normHeadline);
  if (hasRoleMention) {
    headlineScore += 15;
  } else {
    headlineFeedback.push(`Explicitly mention your target title ("${roleName}") so recruiters find you in candidate search.`);
  }

  // Check power verbs or metrics in headline
  if (POWER_VERBS.some(v => normHeadline.toLowerCase().includes(v)) || METRIC_PATTERNS.some(p => p.test(normHeadline))) {
    headlineScore += 10;
    headlineFeedback.push('Contains impactful action-oriented keywords or quantifiable metrics.');
  }

  headlineScore = Math.min(100, Math.max(20, headlineScore));

  // 2. Audit About Section
  let aboutScore = 30;
  const aboutFeedback = [];
  const wordCount = normAbout.split(/\s+/).filter(Boolean).length;

  if (wordCount >= 70 && wordCount <= 350) {
    aboutScore += 25;
    aboutFeedback.push(`Optimal word count (${wordCount} words). Comprehensive without causing recruiter fatigue.`);
  } else if (wordCount < 70) {
    aboutFeedback.push(`About section is brief (${wordCount} words). Expand with your career story, technical specialties, and projects.`);
  } else {
    aboutFeedback.push(`About section is quite lengthy (${wordCount} words). Use bullet points and paragraphs to improve readability.`);
  }

  // Check for Call To Action (CTA)
  const hasCTA = /\b(connect|reach out|email|let's talk|open to|contact me|feel free)\b/i.test(normAbout);
  if (hasCTA) {
    aboutScore += 20;
    aboutFeedback.push('Strong Call-To-Action (CTA) encouraging recruiters to message or email you.');
  } else {
    aboutFeedback.push('Missing a clear Call-To-Action (CTA). End with: "Open to new opportunities — reach me at [email] or DM!"');
  }

  // Check for quantifiable impact / metrics in About
  const hasMetrics = METRIC_PATTERNS.some(p => p.test(normAbout));
  if (hasMetrics) {
    aboutScore += 15;
    aboutFeedback.push('Great use of quantifiable achievements (% increase, team size, users served).');
  } else {
    aboutFeedback.push('No measurable numbers detected. Add metrics (e.g. "reduced latency by 35%", "delivered 8+ client apps").');
  }

  // Check for Tech Stack list
  const hasStackList = /(tech stack|technologies|proficient in|skills|tools|languages)/i.test(normAbout);
  if (hasStackList) {
    aboutScore += 10;
  }

  aboutScore = Math.min(100, Math.max(20, aboutScore));

  // 3. Keyword & Recruiter SEO Score
  let keywordScore = 50;
  if (normSkills.length > 20) keywordScore += 25;
  if (normHeadline.length > 20 && normAbout.length > 50) keywordScore += 25;
  keywordScore = Math.min(100, keywordScore);

  // Overall Weighted Score
  const overallScore = Math.round((headlineScore * 0.35) + (aboutScore * 0.45) + (keywordScore * 0.20));

  // 4. Generate 3 AI High-Converting Headline Variations
  const userSkillList = normSkills ? normSkills.split(',').map(s => s.trim()).filter(Boolean) : ['React', 'Node.js', 'TypeScript', 'AWS'];
  const topSkills = userSkillList.slice(0, 3).join(' • ');

  const generatedHeadlines = [
    {
      type: 'Role & Stack Focused',
      headline: `${roleName} | ${topSkills} | Building Scalable High-Performance Systems`
    },
    {
      type: 'Metric & Impact Focused',
      headline: `${roleName} @ Tech | Optimized Platform Latency by 40% & Architected Cloud Microservices | ${userSkillList[0] || 'React'} Specialist`
    },
    {
      type: 'Value Proposition & Problem Solver',
      headline: `Passionate ${roleName} Crafting Resilient Digital Experiences | ${topSkills} | Open Source Contributor`
    }
  ];

  // 5. Generate AI Enhanced Recruiter-Ready About Section
  let generatedAbout = '';
  if (language === 'hi') {
    generatedAbout = `नमस्ते! मैं एक परिणाम-उन्मुख ${roleName} हूँ, जो आधुनिक वेब तकनीकों और स्केलेबल सॉफ्टवेयर आर्किटेक्चर के निर्माण में रुचि रखता हूँ।

🚀 मेरी मुख्य तकनीकी विशेषज्ञता:
• कोर भाषाएं एवं फ्रेमवर्क: ${userSkillList.join(', ') || 'React, JavaScript, Node.js, Python, SQL'}
• डेटाबेस एवं क्लाउड: PostgreSQL, Docker, AWS, Git, RESTful APIs
• समस्या समाधान एवं सिस्टम डिजाइन: डेटा स्ट्रक्चर्स, क्लीन कोड और एजाइल वर्कफ्लो

💡 मेरी करियर उपलब्धियां:
• स्केलेबल और रिस्पॉन्सिव वेब एप्लीकेशन्स का सफल निर्माण और डिप्लॉयमेंट।
• आधुनिक कोडिंग मानकों का पालन करते हुए सिस्टम परफॉरमेंस में 30%+ का सुधार।
• टीम के साथ मिलकर समय पर हाई-क्वालिटी फीचर्स डिलीवर करना।

📫 आइए जुड़ें!
मैं हमेशा नई तकनीकी चुनौतियों और रोमांचक करियर अवसरों के लिए उत्सुक हूँ।
मुझसे लिंक्डइन पर सीधे कनेक्ट करें या ईमेल के माध्यम से संपर्क करें!`;
  } else if (language === 'pa') {
    generatedAbout = `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਇੱਕ ਉਤਸ਼ਾਹੀ ${roleName} ਹਾਂ, ਜੋ ਆਧੁਨਿਕ ਤਕਨੀਕਾਂ ਨਾਲ ਮਜ਼ਬੂਤ ਅਤੇ ਤੇਜ਼ ਸਾਫਟਵੇਅਰ ਸਿਸਟਮ ਬਣਾਉਣ ਵਿੱਚ ਮਾਹਰ ਹਾਂ।

🚀 ਮੇਰੇ ਮੁੱਖ ਤਕਨੀਕੀ ਹੁਨਰ:
• ਫਰੇਮਵਰਕ ਅਤੇ ਭਾਸ਼ਾਵਾਂ: ${userSkillList.join(', ') || 'React, JavaScript, Node.js, Java, SQL'}
• ਡਾਟਾਬੇਸ ਅਤੇ ਕਲਾਉਡ: Docker, PostgreSQL, REST APIs, Git, AWS
• ਐਲਗੋਰਿਦਮ ਅਤੇ ਸਮੱਸਿਆ ਹੱਲ: Data Structures & Clean Architecture

💡 ਪ੍ਰਾਪਤੀਆਂ ਅਤੇ ਪ੍ਰੋਜੈਕਟ:
• ਉੱਚ ਪੱਧਰੀ ਰਿਸਪਾਂਸਿਵ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨਾਂ ਤਿਆਰ ਅਤੇ ਲਾਂਚ ਕੀਤੀਆਂ।
• ਟੀਮ ਨਾਲ ਮਿਲ ਕੇ ਬਿਹਤਰੀਨ ਫੀਚਰ ਸਮੇਂ ਸਿਰ ਮੁਕੰਮਲ ਕੀਤੇ।

📫 ਆਓ ਜੁੜੀਏ!
ਮੈਂ ਨਵੇਂ ਕਰੀਅਰ ਮੌਕਿਆਂ ਅਤੇ ਸਹਿਯੋਗ ਲਈ ਹਮੇਸ਼ਾ ਤਿਆਰ ਹਾਂ। ਮੇਰੇ ਨਾਲ ਲਿੰਕਡਇਨ 'ਤੇ ਸਿੱਧਾ ਸੰਪਰਕ ਕਰੋ!`;
  } else {
    generatedAbout = `I am a results-driven ${roleName} passionate about architecting scalable, high-performance web applications and resilient distributed systems.

🚀 Core Technical Arsenal:
• Frontend & Architecture: ${userSkillList.slice(0, 4).join(', ') || 'React, TypeScript, Next.js, Tailwind CSS'}
• Backend & Cloud: ${userSkillList.slice(4).join(', ') || 'Node.js, Express, PostgreSQL, Docker, AWS, REST APIs'}
• Methodologies: Clean Architecture, CI/CD, Agile Sprint Delivery & Automated Testing

💡 Career Highlights & Impact:
• Architected enterprise-grade applications serving high-concurrency user traffic with 99.9% uptime.
• Reduced API response latency by 35% through query optimization and caching strategies.
• Passionate mentor and collaborative team player committed to clean code and continuous learning.

📫 Let's Connect!
I am actively seeking exciting opportunities to build transformative products. Feel free to connect directly here on LinkedIn or drop me an email!`;
  }

  return {
    overallScore,
    headlineScore,
    aboutScore,
    keywordScore,
    headlineFeedback,
    aboutFeedback,
    generatedHeadlines,
    generatedAbout
  };
}
