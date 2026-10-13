export interface Service {
  index: string;
  title: string;
  forWho: string;
  problem: string;
  deliver: string;
  proof: string;
  proofSlug: string | null;
  cta: string;
}

export const services: Service[] = [
  {
    index: "01",
    title: "Business Websites & Digital Presence",
    forWho: "Founders and small businesses that need a credible online presence.",
    problem:
      "Without a professional site, businesses lose trust and enquiries to competitors who have one.",
    deliver:
      "A fast, modern, mobile-first website — services, proof, contact, and the plumbing to run it — shipped and live.",
    proof: "Digital Store — Herbal Beauty Parlour (live)",
    proofSlug: "herbal-parlour",
    cta: "Get a website",
  },
  {
    index: "02",
    title: "Web Applications & Product Builds",
    forWho:
      "Teams that need a real product, not a landing page — marketplaces, dashboards, internal tools.",
    problem:
      "Off-the-shelf tools rarely fit how a business actually works, and a prototype needs to become a maintainable product.",
    deliver:
      "A full-stack application with a considered data model, auth, and the interfaces people use every day.",
    proof: "Advocate marketplace — two-sided Django/PostgreSQL platform",
    proofSlug: "advocatehub",
    cta: "Build a product",
  },
  {
    index: "03",
    title: "Backend APIs & Integrations",
    forWho:
      "Products that need reliable APIs, third-party integrations, or real-time data.",
    problem:
      "Disconnected systems, fragile integrations, and real-time features that break under real connection lifecycles.",
    deliver:
      "Well-designed REST APIs, OAuth/webhook integrations, and WebSocket/real-time services that hold up.",
    proof: "Tweets (three backends) · Realtimechat (Redis + WebSockets)",
    proofSlug: "tweets-three-backends",
    cta: "Talk backend",
  },
  {
    index: "04",
    title: "AI & Workflow Automation",
    forWho:
      "Businesses that want AI in a real workflow, with a human still in control.",
    problem:
      "Manual, repetitive content and data work that AI could draft — but only if someone checks it before it ships.",
    deliver:
      "LLM-powered pipelines that research, generate, and prepare work for human review — not autonomous magic.",
    proof: "AI Content Automation Pipeline (Palcode.ai, delivered)",
    proofSlug: "ai-content-automation",
    cta: "Automate a workflow",
  },
  {
    index: "05",
    title: "Technical Fixes & Improvements",
    forWho:
      "Existing systems that are slow, fragile, or painful to change.",
    problem:
      "Performance issues, subtle bugs, and architecture debt that quietly cost time and reliability.",
    deliver:
      "Diagnosis and concrete fixes — offloading slow work, hardening auth, and cleaning up what's fragile.",
    proof: "≈40% lower API latency via workload offloading · realtime bug-hardening",
    proofSlug: null,
    cta: "Fix a problem",
  },
];
