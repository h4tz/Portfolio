export interface Role {
  role: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
  tech: string[];
}

/**
 * Verified from resume (docs/Hari_Anant_Tiwari_Resume_Immediate.pdf).
 * Newest first. Publish at resume-level specificity.
 */
export const experience: Role[] = [
  {
    role: "AI Engineer",
    company: "Palcode.ai",
    period: "May 2026 – Jul 2026",
    summary:
      "Built AI-assisted workflows and authenticated integrations that turned unstructured source material into usable, reviewed output.",
    points: [
      "Built an AI research-to-WordPress workflow that generated structured drafts with human review before publishing.",
      "Developed authenticated FastAPI integrations with DrChrono for patient, provider, office, and scheduling workflows.",
      "Implemented Procore OAuth/project-data workflows and PDF extraction pipelines to convert unstructured data into usable records.",
    ],
    tech: ["Python", "FastAPI", "LLM APIs", "OAuth", "PDF extraction"],
  },
  {
    role: "Backend Developer",
    company: "PyCray",
    period: "Oct 2025 – Mar 2026",
    summary:
      "Built and optimized Django/DRF backends, offloading heavy work to AWS for a measured latency improvement.",
    points: [
      "Developed Django/DRF APIs with JWT auth, PostgreSQL workflows, Redis caching, and third-party integrations.",
      "Offloaded compute-intensive tasks to AWS Lambda, reducing API response latency by ~40% for affected operations.",
      "Containerized services with Docker and supported AWS event-driven workloads and CloudWatch troubleshooting.",
    ],
    tech: ["Django", "DRF", "PostgreSQL", "Redis", "AWS Lambda", "Docker"],
  },
  {
    role: "Full Stack Engineer",
    company: "Dakshit Dolphin Designer Pvt. Ltd.",
    period: "Nov 2024 – Oct 2025",
    summary:
      "Built a two-sided marketplace end to end, including real-time updates and payment/messaging flows.",
    points: [
      "Built a two-sided Django/PostgreSQL marketplace for businesses and advocates — onboarding, listings, matching, optimized data access.",
      "Implemented real-time updates with Django Channels / WebSockets.",
      "Built Razorpay/Twilio webhook-driven payment and messaging flows.",
    ],
    tech: ["Django", "PostgreSQL", "Django Channels", "WebSockets", "Razorpay"],
  },
  {
    role: "Frontend Developer (Intern → Full-time)",
    company: "CODTECH IT SOLUTIONS",
    period: "Jan 2024 – Oct 2024",
    summary:
      "Grew from intern to full-time, shipping reusable React/TypeScript interfaces and API integrations.",
    points: [
      "Delivered reusable React/TypeScript interfaces and REST API integrations.",
      "Built responsive layouts with solid form and error handling.",
    ],
    tech: ["React", "TypeScript", "REST APIs", "HTML/CSS"],
  },
];

export const education = {
  degree: "B.Tech, Computer Science",
  school: "Jaypee Institute of Information Technology, Noida",
  period: "2021 – 2025",
};

export const skills = {
  "Languages & Frontend": [
    "Python",
    "TypeScript",
    "JavaScript",
    "SQL",
    "React",
    "Next.js",
    "HTML/CSS",
  ],
  "Backend & Integration": [
    "Django",
    "DRF",
    "FastAPI",
    "REST APIs",
    "OAuth",
    "JWT",
    "Webhooks",
    "Django Channels",
    "WebSockets",
  ],
  "Cloud & Data": [
    "AWS Lambda",
    "API Gateway",
    "EventBridge",
    "S3",
    "RDS",
    "CloudWatch",
    "PostgreSQL",
    "Redis",
    "Celery",
    "Docker",
    "Git",
  ],
  "AI & Automation": [
    "LLM APIs",
    "AI content workflows",
    "PDF parsing",
    "Structured extraction",
    "Human-in-the-loop pipelines",
  ],
} as const;
