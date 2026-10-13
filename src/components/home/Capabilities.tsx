"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const capabilities = [
  {
    n: "01",
    title: "Backend & APIs",
    lede: "Django and FastAPI services that stay fast and legible under load.",
    detail:
      "Typed endpoints, background jobs, and third-party integrations wired cleanly.",
    tags: ["Python", "Django", "FastAPI", "PostgreSQL"],
  },
  {
    n: "02",
    title: "Full-stack products",
    lede: "Next.js apps taken from blank repo to something real people use.",
    detail:
      "Server-rendered, accessible, and deployable — no ceremony, just shipped.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    n: "03",
    title: "AI workflows",
    lede: "LLM-backed features and automations wired into actual products.",
    detail:
      "Retrieval, agents, and content pipelines — practical, not demo-ware.",
    tags: ["OpenAI", "RAG", "Agents", "Automation"],
  },
  {
    n: "04",
    title: "Integrations",
    lede: "Payments, messaging, and the unglamorous glue that makes it work.",
    detail:
      "WhatsApp, Stripe, webhooks, and auth handled without the headaches.",
    tags: ["Stripe", "WhatsApp", "Webhooks", "OAuth"],
  },
];

export function Capabilities() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <p className="label text-text-mute">
              <span className="text-accent">01</span>
              <span className="mx-2 text-line-strong">/</span>Capabilities
            </p>
            <p className="label text-text-mute">Four things I do well</p>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {capabilities.map((c, i) => {
            const open = active === i;
            return (
              <Reveal key={c.n} delay={i * 60}>
                <div className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(open ? null : i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={open}
                    className="group relative block w-full overflow-hidden py-7 text-left"
                  >
                    {/* amber sweep on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 -z-10 w-full origin-left scale-x-0 bg-gradient-to-r from-accent/12 via-accent/4 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <div className="flex items-baseline gap-5 sm:gap-8">
                      <span className="label w-7 shrink-0 text-accent">
                        {c.n}
                      </span>
                      <div className="flex-1">
                        <h3 className="flex flex-wrap items-baseline gap-x-3 text-[clamp(1.9rem,6vw,4rem)]">
                          <span className="sans-display text-text">
                            {c.title}
                          </span>
                          <span
                            className={`serif italic text-text-mute transition-opacity duration-300 ${
                              open ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            {c.lede}
                          </span>
                        </h3>
                        <div
                          className="grid transition-[grid-template-rows] duration-400 ease-out"
                          style={{
                            gridTemplateRows: open ? "1fr" : "0fr",
                          }}
                        >
                          <div className="overflow-hidden">
                            <p className="measure mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-text-dim">
                              {c.detail}
                            </p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {c.tags.map((t) => (
                                <li
                                  key={t}
                                  className="label rounded-full border border-line px-2.5 py-1 text-text-mute"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
