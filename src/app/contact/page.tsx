import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hari Tiwari — freelance projects, engineering roles, or a quick technical question.",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    note: "Fastest for projects and enquiries.",
  },
  {
    label: "LinkedIn",
    value: `linkedin.com/in/${site.linkedinHandle}`,
    href: site.linkedin,
    external: true,
    note: "For roles and professional connection.",
  },
  {
    label: "GitHub",
    value: `github.com/${site.githubHandle}`,
    href: site.github,
    external: true,
    note: "Code and open projects.",
  },
  {
    label: "X (Twitter)",
    value: `x.com/${site.twitterHandle}`,
    href: site.twitter,
    external: true,
    note: "Short-form thoughts and updates.",
  },
  {
    label: "YouTube",
    value: site.youtubeHandle,
    href: site.youtube,
    external: true,
    note: "Long-form technical content.",
  },
  {
    label: "Instagram",
    value: `instagram.com/${site.instagramHandle}`,
    href: site.instagram,
    external: true,
    note: "Behind the scenes and visual work.",
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    external: false,
    note: "Usually reachable during IST hours.",
  },
];

const subjects = [
  "A website for my business",
  "A web app or product build",
  "Backend APIs & integrations",
  "AI & workflow automation",
  "A technical fix or review",
  "A full-time engineering role",
];

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="label text-text-mute">
              <span className="text-accent">Contact</span>
            </p>
            <h1 className="display mt-6 text-[clamp(2rem,5vw,3.5rem)] text-text">
              Let&apos;s talk.
            </h1>
            <p className="measure mt-6 text-[clamp(1.1rem,1.8vw,1.4rem)] leading-relaxed text-text-dim">
              Freelance project, a full-time role, or a quick technical question
              — email is the fastest way to reach me. I read everything.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-dim hover:text-text"
            >
              {site.email}
            </a>

            <div className="mt-12">
              <h2 className="label text-text-mute">Start with a subject</h2>
              <p className="mt-2 text-sm text-text-dim">
                Pick what fits — it pre-fills your email.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <li key={s}>
                    <a
                      href={`mailto:${site.email}?subject=${encodeURIComponent(s)}`}
                      className="inline-block rounded-full border border-line px-3.5 py-1.5 text-xs text-text-dim transition-colors hover:border-line-strong hover:text-text"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-sm border border-line bg-bg-raised">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between gap-4 border-b border-line px-6 py-5 transition-colors last:border-b-0 hover:bg-bg-sunken"
                >
                  <div>
                    <p className="label text-text-mute">{c.label}</p>
                    <p className="mt-1 text-text transition-colors group-hover:text-accent">
                      {c.value}
                    </p>
                    <p className="mt-0.5 text-xs text-text-dim">{c.note}</p>
                  </div>
                  <span
                    aria-hidden
                    className="text-text-mute transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    {c.external ? "↗" : "→"}
                  </span>
                </a>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 label text-text-mute">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {site.availability[1]} · {site.availability[0]}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
