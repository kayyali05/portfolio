import portraitImage from "@/assets/abdallah.png";

const baseUrl = import.meta.env.BASE_URL;

// ============================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================

export const portfolioData = {
  // Personal Info
  personal: {
    name: "Abdallah Alkayyali",
    title: "Computer Science Major",
    subtitle: "Web & App Developer",
    tagline: "Designing clean, fast experiences for web and mobile.",
    email: "abdallahjmk@gmail.com",
    location: "Amman, Jordan",
    resumeUrl: "#",
    portrait: portraitImage,
    badges: ["Open to Work", "CS", "Full Stack"],
  },

  // Navigation
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  // About Section
  about: {
    bio: `I'm a Computer Science major focused on building modern web and mobile apps. 
    I care about clean architecture, thoughtful UI, and performance that feels effortless.
    I enjoy turning real-world ideas into polished, usable products.`,
    facts: [
      { label: "Location", value: "Amman, Jordan" },
      { label: "Education", value: "Computer Science" },
      { label: "Focus", value: "Web & App Development" },
      { label: "Interests", value: "UI/UX, Performance, Mobile" },
    ],
    strengths: [
      "Problem Solver",
      "Quick Learner",
      "Team Player",
      "Detail Oriented",
    ],
  },

  // Skills Section
  skills: {
    categories: [
      {
        name: "Languages",
        icon: "code",
        items: [
          { name: "TypeScript", level: 90 },
          { name: "Python", level: 85 },
          { name: "JavaScript", level: 95 },
          { name: "Java", level: 75 },
          { name: "C++", level: 70 },
          { name: "Go", level: 60 },
        ],
      },
      {
        name: "Frameworks",
        icon: "layers",
        items: [
          { name: "React", level: 95 },
          { name: "Next.js", level: 85 },
          { name: "Node.js", level: 90 },
          { name: "Express", level: 85 },
          { name: "FastAPI", level: 75 },
          { name: "TailwindCSS", level: 95 },
        ],
      },
    ],
  },

  // Projects Section
  projects: [
    {
      title: "Raqam",
      description: "A marketplace app for buying and selling premium number plates and mobile numbers, built for a fast, simple browsing experience.",
      image: "",
      slug: "raqam",
      images: [
        `${baseUrl}images/raqam/iPhone 16 Pro Max.png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (1).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (2).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (3).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (4).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (5).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (6).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (7).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (8).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (9).png`,
        `${baseUrl}images/raqam/iPhone 16 Pro Max (10).png`,
      ],
      tags: ["React", "TypeScript", "Mobile"],
      github: "https://github.com/kayyali05/Raqam",
      demo: "",
      featured: true,
    },
  ],

  // Experience Section
  experience: [
    {
      type: "education",
      title: "B.S. Computer Science",
      organization: "University of Petra",
      location: "Amman, Jordan",
      period: "Present",
      description: "Computer Science major focused on web and mobile application development.",
      technologies: ["Web Development", "Mobile Apps"],
    },
    {
      type: "education",
      title: "Continuous Learning",
      organization: "Self-Directed",
      location: "Amman, Jordan",
      period: "Ongoing",
      description: "Continuously learning new web and app technologies through personal projects, tutorials, and practice.",
      technologies: ["React", "TypeScript", "Mobile Development"],
    },
  ],

  // Achievements Section
  achievements: [
    {
      title: "Google Summer of Code",
      description: "Selected for GSoC 2024 with Mozilla Foundation",
      year: "2024",
    },
    {
      title: "Hackathon Winner",
      description: "1st Place at HackMIT 2023",
      year: "2023",
    },
    {
      title: "AWS Certified",
      description: "Solutions Architect - Associate",
      year: "2023",
    },
    {
      title: "Open Source Contributor",
      description: "100+ contributions to major open source projects",
      year: "2022-Present",
    },
  ],

  // Social Links
  socials: [
    { platform: "GitHub", url: "https://github.com/kayyali05", icon: "github" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/abdallah-alkayyali-020785315", icon: "linkedin" },
    { platform: "Instagram", url: "https://instagram.com/kayyali05", icon: "instagram" },
  ],

  // SEO
  seo: {
    title: "Abdallah Alkayyali | Software Engineer & CS Student",
    description: "Full-stack software engineer and computer science student specializing in React, Node.js, and AI. Building innovative solutions for the modern web.",
    keywords: ["software engineer", "computer science", "full stack developer", "react", "node.js", "portfolio"],
    ogImage: "/og-image.jpg",
  },
};

export type PortfolioData = typeof portfolioData;
