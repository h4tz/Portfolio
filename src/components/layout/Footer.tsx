import Link from "next/link";
import { site } from "@/content/site";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="site-footer border-t border-line bg-bg-sunken">
      <div className="mx-auto max-w-[88rem] px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight text-text">
              {site.name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-dim">
              Independent software engineer building digital products, backend
              systems, integrations, and AI-powered workflows.
            </p>
            <p className="mt-4 flex items-center gap-2 label text-text-mute">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Open to freelance &amp; engineering work
            </p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="Footer">
              <p className="label mb-3 text-text-mute">Site</p>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline text-sm text-text-dim hover:text-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="label mb-3 text-text-mute">Elsewhere</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-sm text-text-dim hover:text-text"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-text-dim hover:text-text"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-text-dim hover:text-text"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={site.resume}
                    className="link-underline text-sm text-text-dim hover:text-text"
                  >
                    Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.year} {site.fullName}
          </p>
          <p>{site.location} · Remote</p>
        </div>
      </div>
    </footer>
  );
}
