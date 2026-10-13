"use client";

import Link from "next/link";
import { useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <p className="label text-text-mute">
            <span className="text-accent">01</span>
            <span className="mx-2 text-line-strong">/</span>Capabilities
          </p>
          <p className="hidden text-sm text-text-mute md:block">
            What I can help with
          </p>
        </div>

        <div className="border-t border-line">
          {services.map((s, i) => {
            const isOpen = open === i;
            // active = open, hovered; siblings dim when another row is hovered
            const active = isOpen || hovered === i;
            const dimmed = hovered !== null && hovered !== i && !isOpen;
            const color = active
              ? "text-accent"
              : dimmed
                ? "text-text-mute"
                : "text-text";

            return (
              <div key={s.index} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.index}`}
                    className="flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                  >
                    <span
                      className={`label w-7 shrink-0 transition-colors duration-150 ${color}`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`display flex-1 text-[clamp(1.6rem,5.5vw,4.25rem)] transition-colors duration-150 ${color}`}
                    >
                      {s.title}
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-line text-text-dim transition-all duration-200 ${color} ${
                        isOpen ? "rotate-45 border-accent/50" : ""
                      }`}
                    >
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={`svc-${s.index}`}
                  hidden={!isOpen}
                  className="grid gap-8 pb-10 md:grid-cols-12 md:pl-[3.75rem]"
                >
                  <div className="md:col-span-7">
                    <Field label="Who it's for">{s.forWho}</Field>
                    <Field label="The problem">{s.problem}</Field>
                    <Field label="What I deliver">{s.deliver}</Field>
                  </div>
                  <div className="md:col-span-5">
                    <div className="rounded-sm border border-line bg-bg-raised p-5">
                      <p className="label mb-2 text-text-mute">Proof</p>
                      {s.proofSlug ? (
                        <Link
                          href={`/work/${s.proofSlug}`}
                          className="link-underline text-sm text-text"
                        >
                          {s.proof}
                        </Link>
                      ) : (
                        <p className="text-sm text-text-dim">{s.proof}</p>
                      )}
                    </div>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(
                        `Enquiry — ${s.title}`,
                      )}`}
                      className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
                    >
                      {s.cta}
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="label mb-1 text-text-mute">{label}</p>
      <p className="measure text-[0.95rem] leading-relaxed text-text-dim">
        {children}
      </p>
    </div>
  );
}
