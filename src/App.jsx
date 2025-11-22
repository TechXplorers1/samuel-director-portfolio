import React, { useState, useEffect, useRef } from 'react';

/**
 * HOOK: useOnScreen
 * Detects if an element is in the viewport
 */
function useOnScreen(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

/**
 * COMPONENT: Section
 * Wrapper with animation on scroll
 */
const Section = ({ id, title, children }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, '-100px');

  return (
    <section 
      id={id} 
      ref={ref}
      className={`py-20 md:py-28 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
        <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
};

/**
 * COMPONENT: Header
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Apply theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-bold transition-colors text-gray-900 dark:text-white hover:text-sky-500">
            SO
          </a>

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300 font-medium text-sm">
                {link.label}
              </a>
            ))}
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <a href="/Samuel_Owusu_Resume.pdf" download className="px-4 py-2 border-2 border-sky-500 text-sky-500 font-bold rounded-md text-sm hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-all duration-300">
              Resume
            </a>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
             {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50 text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-3/4 bg-white dark:bg-slate-900 border-l dark:border-slate-800 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden shadow-2xl`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-xl text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
           <div className="flex items-center gap-4 pt-4">
              <a href="/Samuel_Owusu_Resume.pdf" download className="px-4 py-2 border-2 border-sky-500 text-sky-500 font-bold rounded-md text-sm hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-all duration-300">
                Resume
              </a>
           </div>
        </div>
      </div>
    </header>
  );
};

/**
 * COMPONENT: Hero
 */
const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const toRotate = ["Data Privacy Manager", "InfoSec Practitioner", "GRC Specialist"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const ticker = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-start">
      <div className="max-w-3xl">
        <p className="text-sky-500 text-lg font-medium mb-4">Hi, my name is</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
          Samuel Owusu.
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-600 dark:text-gray-400 mb-8">
          I am a <span className="border-b-4 border-sky-500/50">{text}</span>
          <span className="animate-ping text-gray-600 dark:text-gray-400">|</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-12">
          A seasoned Information Security and Data Privacy practitioner with deep expertise in building enterprise privacy programs, engineering data protection solutions, and governing sensitive information across complex environments.
        </p>
        <a href="#contact" className="px-8 py-4 bg-sky-500 text-white font-bold rounded-md hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/30">
          Get In Touch
        </a>
      </div>
    </section>
  );
};

/**
 * COMPONENT: About
 */
const About = () => {
  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center md:text-left">
          <p>
            I am a Senior Data Privacy Manager and Information Security Practitioner with extensive experience in developing and executing data governance strategies. I specialize in bridging legal, technical, and business domains to deliver secure, compliant, and privacy-preserving systems.
          </p>
          <p className="mt-4">
            My expertise covers regulatory compliance (GDPR, CCPA, HIPAA), data management, and the implementation of privacy-preserving technologies like tokenization and encryption. I have a proven track record of leading GRC programs and enhancing organizational security maturity.
          </p>
          <a href="/Samuel_Owusu_Resume.pdf" download className="mt-8 inline-block px-8 py-3 border-2 border-sky-500 text-sky-500 font-bold rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-all duration-300 transform hover:scale-105">
            Download Resume
          </a>
        </div>
        <div className="relative w-full max-w-sm mx-auto aspect-square">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl transform -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105"></div>
          <div className="relative w-full h-full bg-gray-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center p-4 border-2 border-white/20">
             {/* Placeholder for Headshot */}
             <div className="text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="font-mono text-sm">// Samuel Owusu <br/>// Headshot</p>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Skills
 */
const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
)

const SkillCard = ({ category, index }) => {
    return (
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 hover:border-sky-500 transform hover:-translate-y-2 transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
            <div className="flex justify-center">
                <ShieldIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">{category.title}</h3>
            <ul className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill) => (
                    <li key={skill.name} className="bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 text-sm font-medium px-4 py-2 rounded-full">
                        {skill.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const Skills = () => {
  const skillsData = [
    {
      title: 'Governance & Compliance',
      skills: [
        { name: 'GDPR' }, { name: 'CCPA' }, { name: 'HIPAA' },
        { name: 'Data Governance' }, { name: 'Data Stewardship' }, { name: 'Regulatory Compliance' },
      ],
    },
    {
      title: 'Privacy Engineering',
      skills: [
        { name: 'Privacy-by-Design' }, { name: 'Tokenization' }, { name: 'Anonymization' },
        { name: 'Encryption' }, { name: 'Identity Access Mgmt' }, { name: 'Data Mapping' },
      ],
    },
    {
      title: 'Risk Management',
      skills: [
        { name: 'Risk Assessments' }, { name: 'Vendor Risk' }, { name: 'Internal Audit' },
        { name: 'DPIA / PIA' }, { name: 'Incident Response' }, { name: 'Breach Mitigation' },
      ],
    },
    {
      title: 'Data Management Tools',
      skills: [
        { name: 'Data Catalogs' }, { name: 'Metadata Management' }, { name: 'Data Quality Tools' },
        { name: 'Cloud Platforms' }, { name: 'Data Lifecycle' }, { name: 'Analytics' },
      ],
    },
  ];

  return (
    <Section id="skills" title="Technical Competencies">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index}/>
        ))}
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Experience
 */
const Experience = () => {
    const experienceData = [
      {
        company: 'VA Dept of Social Services',
        role: 'Sr. Data Privacy Manager',
        period: '04/2020 - Present',
        points: [
          'Led the development and implementation of a GRC program that increased compliance alignment by 40% across regulatory frameworks.',
          'Established an enterprise-wide data governance framework and data stewardship model, improving data quality scores by 35%.',
          'Implemented the organizations first centralized data catalog, increasing data discoverability by 60%.',
          'Deployed privacy-preserving technologies (tokenization, anonymization, encryption) reducing sensitive data exposure by 70%.',
          'Built a complete privacy compliance program aligned with GDPR, CCPA, and HIPAA, reducing regulatory exposure by 40%.',
        ],
      },
      {
        company: 'Dept of Motor Vehicles',
        role: 'Senior IT Auditor',
        period: '03/2017 - 04/2020',
        points: [
          'Supported over 50 risk assessment and IT audit projects, identifying critical vulnerabilities and threats.',
          'Decreased risk exposure by over 30% across various platforms through strategic mitigations.',
          'Led compliance audit engagements leading to certifications.',
          'Briefed senior leaders on the threat landscape and recommended Security Strategy.',
          'Reviewed and assessed risk of cloud service providers and maintained vendor risk assessments.',
        ],
      },
      {
        company: 'Baltimore City College',
        role: 'InfoSec Risk Specialist',
        period: '02/2015 - 03/2017',
        points: [
          'Executed comprehensive application security strategy incorporating secure coding and continuous monitoring.',
          'Achieved 30% reduction in critical vulnerabilities across all major applications.',
          'Ensured compliance with stringent industry standards, notably OWASP Top 10.',
          'Performed quantitative and qualitative risk assessments and mitigated identified risks.',
          'Evaluated vulnerabilities of third-party applications.',
        ],
      },
       {
        company: 'Kohls',
        role: 'Support Analyst (Part-time)',
        period: '09/2013 - 02/2015',
        points: [
          'Supported Cloud and non-cloud privacy programs and due diligence programs.',
          'Created schedules to perform annual security assessments of sensitive systems.',
          'Developed security policies and ensured their continuous update.',
          'Supported the implementation and administration of privacy management technology.',
        ],
      },
    ];

    const [activeCompany, setActiveCompany] = useState(experienceData[0].company);
    const activeExperience = experienceData.find(exp => exp.company === activeCompany);

    return (
        <Section id="experience" title="Professional Experience">
            <div className="flex flex-col md:flex-row max-w-5xl mx-auto">
                {/* Company Tabs */}
                <div className="flex md:flex-col md:w-1/4 mb-8 md:mb-0 overflow-x-auto scrollbar-hide">
                    {experienceData.map((exp) => (
                        <button
                            key={exp.company}
                            onClick={() => setActiveCompany(exp.company)}
                            className={`text-left px-4 py-3 whitespace-nowrap text-sm md:text-base border-b-2 md:border-b-0 md:border-l-2 transition-all duration-300 ${
                                activeCompany === exp.company
                                    ? 'border-sky-500 text-sky-500 bg-sky-500/10 dark:bg-sky-500/20'
                                    : 'border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:bg-gray-400/10 hover:text-sky-500'
                            }`}
                        >
                            {exp.company}
                        </button>
                    ))}
                </div>

                {/* Experience Details */}
                <div className="md:w-3/4 md:pl-8">
                    {activeExperience && (
                        <div className="transition-opacity duration-500">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {activeExperience.role} <span className="text-sky-500">@ {activeExperience.company}</span>
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 font-mono text-sm mt-1 mb-6">{activeExperience.period}</p>
                            <ul className="space-y-4">
                                {activeExperience.points.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-4 h-4 mr-3 mt-1 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

/**
 * COMPONENT: Projects
 * Mapped from "Accomplishments" in resume
 */
const ProjectCard = ({ project }) => (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 hover:border-sky-500 transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
        <div className="flex-grow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
            {project.tags.map(tag => (
                <span key={tag} className="bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
            ))}
        </div>
    </div>
);

const Projects = () => {
  const projectData = [
    {
      title: 'Enterprise GRC Program Implementation',
      description: 'Led the development and implementation of a GRC program that increased compliance alignment by 40% across regulatory frameworks and internal standards, reducing organizational risk exposure.',
      tags: ['GRC', 'Compliance', 'Risk Reduction', 'Strategic Leadership'],
    },
    {
      title: 'Data Governance & Cataloging',
      description: 'Established an enterprise-wide data governance framework and implemented the organizations first centralized data catalog, increasing data discoverability by 60% and improving quality scores by 35%.',
      tags: ['Data Governance', 'Data Catalog', 'Data Quality', 'Metadata'],
    },
    {
      title: 'Privacy-Preserving Tech Architecture',
      description: 'Designed and deployed technologies such as tokenization, anonymization, and encryption across three enterprise platforms, successfully reducing sensitive data exposure by 70%.',
      tags: ['Encryption', 'Tokenization', 'Privacy Engineering', 'Security Architecture'],
    },
  ];

  return (
    <Section id="projects" title="Key Initiatives">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Certifications
 * Separated from Education
 */
const Certifications = () => {
  const certificationData = [
    { name: 'CISSP - Certified Information Systems Security Professional', issuer: 'ISC2' },
    { name: 'CISM - Certified Information Security Manager', issuer: 'ISACA' },
    { name: 'CISA - Certified Information Systems Auditor', issuer: 'ISACA' },
    { name: 'CIPT - Certified Information Privacy Technologist', issuer: 'IAPP' },
    { name: 'CompTIA Security+', issuer: 'CompTIA' },
  ];

  return (
    <Section id="certifications" title="Certifications">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificationData.map((cert) => (
          <div key={cert.name} className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-sky-500 transition-colors duration-300 flex flex-col justify-center">
            <h4 className="font-bold text-lg text-sky-600 dark:text-sky-400 mb-2">{cert.name}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{cert.issuer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Education
 * Separated from Certifications
 */
const Education = () => {
  const educationData = [
    {
      institution: 'Marymount University, Arlington, VA',
      degree: 'DSc. Cybersecurity',
      period: 'May 2023',
    },
    {
      institution: 'University of Maryland, Baltimore County',
      degree: 'M.Sc. in Information Systems',
      period: 'December 2013',
    },
    {
      institution: 'University of Education, Winneba, Ghana',
      degree: 'Bachelor of Education',
      period: 'June 2005',
    },
  ];

  return (
    <Section id="education" title="Education">
      <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {educationData.map((edu) => (
            <div key={edu.institution} className="bg-white/50 dark:bg-slate-800/50 p-8 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-sky-500 transition-colors duration-300">
              <h4 className="font-bold text-xl text-sky-600 dark:text-sky-400">{edu.institution}</h4>
              <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mt-2">{edu.degree}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-mono">{edu.period}</p>
            </div>
          ))}
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Contact
 */
const Contact = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          I'm currently seeking new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:owusamuel01@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-sky-500 transition-colors">
                    owusamuel01@gmail.com
                </a>
            </div>
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span className="text-gray-700 dark:text-gray-300">(443) 653-4409</span>
            </div>
        </div>
        <a href="mailto:owusamuel01@gmail.com" className="mt-12 inline-block px-10 py-4 border-2 border-sky-500 text-sky-500 font-bold rounded-md hover:bg-sky-500/10 dark:hover:bg-sky-500/20 transition-all duration-300 transform hover:scale-105">
            Say Hello
        </a>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Footer
 */
const Footer = () => {
    return (
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
            <p>&copy; {new Date().getFullYear()} Samuel Owusu. All rights reserved.</p>
            <p className="mt-2 font-medium">Built by Techxplorers PVT limited</p>
        </footer>
    );
};

/**
 * MAIN COMPONENT: App
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      <Header />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;