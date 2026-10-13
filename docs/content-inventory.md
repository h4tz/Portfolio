# Content Inventory — Hari Tiwari Portfolio

Everything the site can say, sorted by how much it can be trusted. **Primary source of truth: `docs/Hari_Anant_Tiwari_Resume_Immediate.pdf` (your own public resume) + verified repos on disk.** Nothing may be published as a claim unless it is in the Verified column. No fabricated metrics, clients, testimonials, or outcomes beyond what is written here.

---

## 1. Identity (verified — resume)

| Field | Value |
|---|---|
| Display name / brand | **Hari Tiwari** (full: Hari Anant Tiwari) |
| Title | Software Engineer — Backend · Full-Stack · AI Engineering |
| Positioning line (site) | "I build useful digital products, backend systems, integrations, and AI-powered workflows." |
| Email | hari.anant777@gmail.com |
| Phone | +91 8448557926 |
| GitHub | https://github.com/h4tz |
| LinkedIn | https://www.linkedin.com/in/h4tz/ |
| Location / mode | Noida / Delhi NCR · Remote · **Immediate Joiner** · Open to Full-Time Roles |
| Experience | 2+ years professional (frontend → full-stack → backend → AI) |
| Education | B.Tech, Computer Science — Jaypee Institute of Information Technology, Noida (2021–2025) |
| Voice | first person, direct, one-person business |

**Verified headline metric (use, don't inflate):** ~40% lower API latency through workload offloading (AWS Lambda) — from PyCray.

### Technical skills (verified — resume)
- **Languages & Frontend:** Python, TypeScript, JavaScript, SQL, React, Next.js, HTML/CSS
- **Backend & Integration:** Django, DRF, FastAPI, REST APIs, OAuth, JWT, Webhooks, Django Channels, WebSockets
- **Cloud & Data:** AWS Lambda, API Gateway, EventBridge, S3, RDS, CloudWatch, PostgreSQL, Redis, Celery, Docker, Git
- **AI & Automation:** LLM APIs, AI content workflows, PDF parsing, structured extraction, human-in-the-loop pipelines
- **Flagship stacks (in progress):** Java 21, Spring Boot, Kafka (MeterPay); Kubernetes, Terraform, Traefik, Prometheus/Grafana, OpenTelemetry (LaunchForge)

---

## 2. Experience (verified — resume, cleared for public use)

All four employers + dates + descriptions come from your public resume. Publish at this level of specificity.

| Role | Company | Dates | One-line proof (from resume) |
|---|---|---|---|
| **AI Engineer** | Palcode.ai | May 2026 – Jul 2026 | AI research→WordPress workflow; authenticated FastAPI integrations (DrChrono); Procore OAuth + PDF extraction pipelines |
| **Backend Developer** | PyCray | Oct 2025 – Mar 2026 | Django/DRF + JWT + PostgreSQL + Redis; **AWS Lambda offload → ~40% lower latency**; Docker + CloudWatch troubleshooting |
| **Full Stack Engineer** | Dakshit Dolphin Designer Pvt. Ltd. | Nov 2024 – Oct 2025 | Two-sided Django/PostgreSQL marketplace (businesses ↔ advocates); real-time via Django Channels/WebSockets; Razorpay/Twilio webhooks |
| **Frontend Developer (Intern → Full-time)** | CODTECH IT SOLUTIONS | Jan 2024 – Oct 2024 | React/TypeScript interfaces, REST integrations, responsive layouts, form/error handling |

Named third-party integrations on the resume (fair to reference): **DrChrono, Procore, Razorpay, Twilio**.

---

## 3. Projects

### 3a. Verified — safe to describe factually

**Digital Store — Herbal Beauty Parlour** ✅
- Slug `herbal-parlour` · Category **Business Websites** · Status **Live** · `featured` ✅
- Repo `github.com/h4tz/DigitalStore` (separate repo — read-only reference, never modify) · Demo https://digital-store-tan-six.vercel.app/s/herbal-parlour
- Stack (its ARCHITECTURE.md): Next.js 16, React 19, TypeScript, Tailwind v4, localStorage (MVP) → Supabase (future), Vercel, WhatsApp deep links.
- What: one digital home for Indian local businesses — services, prices, gallery, reviews, offers, hours, WhatsApp/call, enquiries. Multi-business routing `/s/[slug]`.
- Proof for Service 01 (Business Websites). No revenue/user claims.

**AI Content Automation Pipeline — Palcode.ai** ✅
- Slug `ai-content-automation` · Category **AI & Automation** · Status **Delivered** · `featured` ✅
- What (resume): document/topic → structured WordPress drafts, integrating AI research, structured generation, automated draft creation, and **human-in-the-loop review** before publishing.
- Maps to disk `automation/` work. Employer-delivered. Proof for Service 04 (AI & Workflow Automation).

**Tweets — one API contract, three backends** ✅
- Slug `tweets-three-backends` · Category **Backend & APIs** · Status **Completed** · `featured` ✅
- Repo `github.com/h4tz/Tweets`.
- Stack: Django 5 + DRF + SimpleJWT (original); TypeScript + Express + Prisma + SQLite; Java + Spring Boot 3 + JPA + SQLite.
- What: Twitter-style REST API (tweets, likes, threaded comments, follows, feed, JWT auth) implemented three times with identical routes/status codes/JSON shapes; `learnings.md` compares them.
- Strongest recruiter signal for backend/API depth. Bridges to the Java direction of MeterPay.

**Realtimechat — Django + FastAPI + Redis WebSocket** ✅
- Slug `realtimechat` · Category **Backend & APIs** · Status **In Progress**
- Repo `github.com/h4tz/Realtimechat`.
- Stack: Django, FastAPI, Redis Pub/Sub, WebSockets, JWT w/ refresh-token rotation, pytest.
- Verified detail (its tracker): per-connection Redis pubsub, user-keyed connections, graceful task cancellation, JTI refresh-token rotation (reuse → 401), first-message WS auth.
- Status honesty: Phase 1+2 done; backend tests 2/7; frontend tests not started. Publish as In Progress.

**MeterPay — Java Backend Flagship** ✅ (resume)
- Slug `meterpay` · Category **Backend & APIs** · Status **In Progress** · role: personal flagship
- What (resume): **Usage → Metering → Billing → Payment.**
- Target stack: Java 21, Spring Boot services, Kafka event processing, Redis, PostgreSQL, payment workflows.
- No repo found on disk — keep as named flagship per user instruction; describe only at resume level (no invented endpoints/metrics).

**LaunchForge — Infrastructure Flagship** ✅ (resume)
- Slug `launchforge` · Category **DevOps / Infrastructure** · Status **In Progress** · role: personal flagship
- What (resume): **Git → Build → Deploy → Scale → Observe.**
- Target stack: Docker, Kubernetes, Terraform, AWS, Traefik, Prometheus/Grafana, OpenTelemetry.
- No repo on disk — named flagship only, resume-level description.

**Dakshit Dolphin marketplace / AdvocateHub** ✅ (resume + disk)
- Slug `advocatehub` · Category **Web Apps** · Status **Completed** · role: Full Stack Engineer (employer)
- What (resume): two-sided Django/PostgreSQL marketplace for businesses ↔ advocates — onboarding, listings, matching, optimized data access; real-time (Django Channels/WebSockets); Razorpay/Twilio webhook payment + messaging.
- Disk copies exist (`/home/hatz/projects/DOLPHIN`, `/Advocate`, `/adv`). Publish at resume level only.

**Faceless V1 — automated faceless video generator** ✅ (disk)
- Slug `faceless-v1` · Category **AI & Automation** · Status **Experiment** (personal, local)
- Stack: Python, Ollama, Kokoro TTS, Pexels, Whisper, FFmpeg. No public repo. One-line mention max.

**Post Everywhere — social publishing pipeline** ✅ (disk)
- Slug `post-everywhere` · Category **AI & Automation** · Status **In Progress** (personal)
- Stack: Python FastAPI, Buffer API (GraphQL), vanilla JS, ngrok. Verified Buffer integration detail in its tracker. No public repo.

**LLM proxy** ✅ (disk) — thin, local only. Optional one-liner or omit.

### 3b. Publishing status per project

| Project | public | confidential | featured | outcome field |
|---|---|---|---|---|
| Herbal Parlour / Digital Store | ✅ | — | ✅ | null (no metric) |
| AI Content Automation (Palcode) | ✅ | — | ✅ | "Delivered" (qualitative) |
| Tweets 3-backends | ✅ | — | ✅ | null |
| Realtimechat | ✅ | — | — | null (In Progress) |
| MeterPay | ✅ | — | — | null (In Progress) |
| LaunchForge | ✅ | — | — | null (In Progress) |
| AdvocateHub / Dolphin marketplace | ✅ | — | — | null |
| Faceless V1 | ✅ | — | — | null (Experiment) |
| Post Everywhere | ✅ | — | — | null |
| LLM proxy | optional | — | — | null |

**Recommended homepage Selected Work (4):** Herbal Parlour (Live), AI Content Automation (Delivered), Tweets (Completed), Realtimechat (In Progress). MeterPay + LaunchForge surface in the **Now / current focus** callout and the archive as flagships-in-progress. Swap on request.

---

## 4. Services (proof mapped)

| # | Service | Proof |
|---|---|---|
| 01 | Business Websites & Digital Presence | Herbal Parlour / Digital Store (Live) |
| 02 | Web Applications & Product Builds | AdvocateHub marketplace, Digital Store |
| 03 | Backend APIs & Integrations | Tweets, Realtimechat, PyCray (OAuth/webhooks), Post Everywhere (Buffer) |
| 04 | AI & Workflow Automation | AI Content Automation (Palcode), Faceless V1, PDF extraction (Palcode) |
| 05 | Technical Fixes & Improvements | Realtimechat bug-fix phase; CloudWatch troubleshooting (PyCray); ~40% latency offload |

---

## 5. Digital Store offering (packaged product)

- Productized: fixed-scope websites for small businesses. Proof: Herbal Parlour (live demo).
- Pricing: **not confirmed — publish "pricing on request" / configurable. No number.**
- What's included: draft scope pending your confirmation (pages, CMS, hosting, WhatsApp, SEO). Placeholder until confirmed.

---

## 6. Resume asset

✅ **Provided:** `docs/Hari_Anant_Tiwari_Resume_Immediate.pdf` (1 page). Source for identity, experience, skills, education, flagship projects, and the ~40% metric. The `/about` Resume section links this PDF for download. Ensure it is copied to `public/` during Phase 3.

---

## 7. Remaining gaps (small)

| Gap | Status | Impact |
|---|---|---|
| Project screenshots | ❌ none | Cards use typographic placeholders until captured (Phase 4) |
| Digital Store "what's included" scope + price | ⚠️ unconfirmed | Ship placeholder "pricing on request" |
| Bio photo | ❌ none | Not needed (typographic hero) |
| Case-study long-form copy | ❌ to write | Written from verified facts in Phase 3; you review |

Everything else (identity, experience, employers, MeterPay/LaunchForge, metric, education, location) is now **verified**.

---

## 8. Publishing rules (enforce in every phase)

1. Only claims present here (from resume or verified repos) may ship.
2. `outcome` = null unless a real verified result exists (only the ~40% metric qualifies).
3. In Progress / Experiment labelled honestly; never implied production-ready.
4. Digital Store price: never invent a number.
5. No invented clients, testimonials, stats, or repo links.
6. Employer work stays at resume-level specificity unless you approve more.
