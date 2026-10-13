export type ProjectStatus =
  | "Live"
  | "Completed"
  | "Delivered"
  | "In Progress"
  | "Experiment"
  | "Archived";

export type ProjectCategory =
  | "Business Websites"
  | "Web Apps"
  | "Backend & APIs"
  | "AI & Automation"
  | "Infrastructure";

export interface Project {
  name: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  role: string;
  contribution: string;
  problem: string;
  architecture: string[];
  outcome: string | null;
  stack: string[];
  visual: string | null;
  repoUrl: string | null;
  demoUrl: string | null;
  approvedForPublic: boolean;
  confidential: boolean;
  featured: boolean;
  date: string; // ISO year-month for sorting
}

/**
 * Single source of truth for the project archive.
 * Add a new project by appending an object — no redesign required.
 * Only `approvedForPublic: true` entries render anywhere.
 * `outcome` stays null unless a verified result exists (never invent metrics).
 */
export const projects: Project[] = [
  {
    name: "Digital Store — Herbal Beauty Parlour",
    slug: "herbal-parlour",
    summary:
      "A productized digital home for a local business: services, prices, gallery, reviews, offers, hours, WhatsApp and enquiries in one page.",
    category: "Business Websites",
    status: "Live",
    role: "Solo — full build",
    contribution:
      "Designed and built the multi-business store end to end: `/s/[slug]` routing, server-rendered sections, admin pages, and an enquiry flow.",
    problem:
      "Local businesses lack a credible, single online home that shows services, proof, and a way to get in touch without a heavy custom build.",
    architecture: [
      "Next.js App Router with Server Components for fast, SEO-friendly sections",
      "Business data separated from presentation; one product, many business instances",
      "localStorage persistence for the MVP, data model clean enough to swap to Supabase",
      "WhatsApp `wa.me` deep links for contact — no backend required",
      "Mobile-first, fixed design with editable content",
    ],
    outcome: null,
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
    ],
    visual: null,
    repoUrl: "https://github.com/h4tz/DigitalStore",
    demoUrl:
      "https://digital-store-tan-six.vercel.app/s/herbal-parlour",
    approvedForPublic: true,
    confidential: false,
    featured: true,
    date: "2026-09",
  },
  {
    name: "AI Content Automation Pipeline",
    slug: "ai-content-automation",
    summary:
      "A document/topic-to-WordPress workflow that researches, structures, and drafts content for human review before publishing.",
    category: "AI & Automation",
    status: "Delivered",
    role: "Palcode.ai — AI Engineer",
    contribution:
      "Built the research-to-draft pipeline: AI-assisted research, structured generation, automated WordPress draft creation, and human-in-the-loop review.",
    problem:
      "Turning source documents and topics into publishable drafts is slow and repetitive when done entirely by hand.",
    architecture: [
      "LLM-assisted research and structured content generation",
      "Automated draft creation into WordPress",
      "Human-in-the-loop review gate before anything is published",
      "Authenticated FastAPI integrations for surrounding workflows",
    ],
    outcome: "Delivered and used in a real content workflow (qualitative).",
    stack: [
      "Python",
      "FastAPI",
      "LLM APIs",
      "WordPress",
      "Structured extraction",
    ],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: true,
    date: "2026-07",
  },
  {
    name: "Tweets — one API contract, three backends",
    slug: "tweets-three-backends",
    summary:
      "A Twitter-style REST API implemented three times — Django, TypeScript, and Spring Boot — with identical routes, status codes, and JSON shapes.",
    category: "Backend & APIs",
    status: "Completed",
    role: "Personal project",
    contribution:
      "Designed the shared API contract and implemented it across three backend stacks, then compared how each handles the same problems.",
    problem:
      "Understanding how the same API design maps onto different backend ecosystems — and where each one shines or fights you.",
    architecture: [
      "Django 5 + DRF + SimpleJWT (the original)",
      "TypeScript + Express + Prisma + SQLite",
      "Java + Spring Boot 3 + JPA + SQLite",
      "Identical routes, status codes, DRF-style snake_case bodies, cursor pagination",
      "`learnings.md` compares the three in practice",
    ],
    outcome: null,
    stack: [
      "Django",
      "DRF",
      "Express",
      "Prisma",
      "Spring Boot",
      "Java",
      "TypeScript",
      "JWT",
    ],
    visual: null,
    repoUrl: "https://github.com/h4tz/Tweets",
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: true,
    date: "2025-11",
  },
  {
    name: "Realtimechat — Django + FastAPI + Redis",
    slug: "realtimechat",
    summary:
      "A real-time chat service with WebSocket updates, JWT refresh-token rotation, and a growing pytest suite.",
    category: "Backend & APIs",
    status: "In Progress",
    role: "Personal project",
    contribution:
      "Built the realtime backend and hardened it: per-connection Redis pub/sub, user-keyed connections, graceful task cancellation, and secure token handling.",
    problem:
      "Real-time messaging is easy to demo but easy to get subtly wrong — connection lifecycle, auth, and token security are where it breaks.",
    architecture: [
      "FastAPI WebSocket service with per-connection Redis pub/sub",
      "User-keyed connections; graceful `asyncio` cancellation on disconnect",
      "JWT with JTI-based refresh-token rotation (reuse → 401)",
      "WebSocket auth via first-message pattern instead of URL token",
      "pytest suite (backend tests in progress)",
    ],
    outcome: null,
    stack: [
      "Django",
      "FastAPI",
      "Redis",
      "WebSockets",
      "JWT",
      "pytest",
    ],
    visual: null,
    repoUrl: "https://github.com/h4tz/Realtimechat",
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: true,
    date: "2026-03",
  },
  {
    name: "MeterPay",
    slug: "meterpay",
    summary:
      "Usage → metering → billing → payment. A Java backend for usage-based billing, in progress.",
    category: "Backend & APIs",
    status: "In Progress",
    role: "Personal flagship",
    contribution:
      "Designing and building the metering-to-payment pipeline as a Java service architecture.",
    problem:
      "Products that bill by usage need reliable metering, aggregation, and billing before money can be charged correctly.",
    architecture: [
      "Java 21 + Spring Boot services",
      "Kafka event processing for usage events",
      "Redis + PostgreSQL for state and aggregation",
      "Payment workflow integration",
    ],
    outcome: null,
    stack: [
      "Java",
      "Spring Boot",
      "Kafka",
      "Redis",
      "PostgreSQL",
    ],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: false,
    date: "2026-08",
  },
  {
    name: "LaunchForge",
    slug: "launchforge",
    summary:
      "Git → build → deploy → scale → observe. A delivery platform for shipping and running services, in progress.",
    category: "Infrastructure",
    status: "In Progress",
    role: "Personal flagship",
    contribution:
      "Building the deployment and observability platform end to end, from source to running, monitored services.",
    problem:
      "Moving from a repo to a deployed, observable service involves many moving parts that are tedious to wire up consistently by hand.",
    architecture: [
      "Docker + Kubernetes for runtime",
      "Terraform for infrastructure",
      "Traefik for routing",
      "Prometheus + Grafana for metrics",
      "OpenTelemetry for traces",
      "AWS as the cloud layer",
    ],
    outcome: null,
    stack: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Traefik",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "AWS",
    ],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: false,
    date: "2026-08",
  },
  {
    name: "Advocate marketplace",
    slug: "advocatehub",
    summary:
      "A two-sided marketplace connecting businesses and advocates, with onboarding, listings, matching, real-time updates, and payments.",
    category: "Web Apps",
    status: "Completed",
    role: "Dakshit Dolphin Designer — Full Stack Engineer",
    contribution:
      "Built the Django/PostgreSQL marketplace including onboarding, listings, matching, and optimized data access, plus real-time updates and payment/messaging flows.",
    problem:
      "Businesses and advocates needed a shared place to discover each other, communicate in real time, and transact.",
    architecture: [
      "Django + PostgreSQL with optimized data access",
      "Two-sided onboarding, listings, and matching",
      "Real-time updates via Django Channels / WebSockets",
      "Razorpay + Twilio webhook-driven payment and messaging",
    ],
    outcome: null,
    stack: [
      "Django",
      "PostgreSQL",
      "Django Channels",
      "WebSockets",
      "Razorpay",
      "Twilio",
    ],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: false,
    date: "2025-06",
  },
  {
    name: "Post Everywhere",
    slug: "post-everywhere",
    summary:
      "A social publishing pipeline that uploads media and schedules posts across platforms through the Buffer API.",
    category: "AI & Automation",
    status: "In Progress",
    role: "Personal project",
    contribution:
      "Built the FastAPI service and Buffer GraphQL integration: channel discovery, asset handling, and automatic queue posting.",
    problem:
      "Posting the same content to multiple social platforms by hand is repetitive and error-prone.",
    architecture: [
      "Python FastAPI + uvicorn service",
      "Buffer API via GraphQL",
      "Channel discovery through organizations → channels (no hardcoded IDs)",
      "Image/video asset handling with automatic queue posting",
      "Secrets kept server-side in `.env`",
    ],
    outcome: null,
    stack: ["Python", "FastAPI", "Buffer API", "GraphQL"],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: false,
    date: "2026-09",
  },
  {
    name: "Faceless V1",
    slug: "faceless-v1",
    summary:
      "An automated faceless-video generator: topic → LLM script → speech → stock B-roll → subtitles → assembled video.",
    category: "AI & Automation",
    status: "Experiment",
    role: "Personal experiment",
    contribution:
      "Wired the full pipeline together from script generation to final video assembly.",
    problem:
      "Producing narrated, edited video is normally a multi-tool manual process.",
    architecture: [
      "Ollama for LLM script generation",
      "Kokoro TTS for speech",
      "Pexels for stock B-roll",
      "Whisper for subtitles",
      "FFmpeg for final assembly",
    ],
    outcome: null,
    stack: ["Python", "Ollama", "Whisper", "FFmpeg", "TTS"],
    visual: null,
    repoUrl: null,
    demoUrl: null,
    approvedForPublic: true,
    confidential: false,
    featured: false,
    date: "2026-06",
  },
];

export const categories: ProjectCategory[] = [
  "Business Websites",
  "Web Apps",
  "Backend & APIs",
  "AI & Automation",
  "Infrastructure",
];

export const statuses: ProjectStatus[] = [
  "Live",
  "Delivered",
  "Completed",
  "In Progress",
  "Experiment",
];
