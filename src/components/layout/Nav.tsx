"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-[88rem] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link
          href="/"
          className="text-[0.95rem] font-semibold tracking-tight text-text"
        >
          {site.name}
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="link-underline text-sm text-text-dim transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm text-text transition-colors hover:border-line-strong hover:bg-bg-raised"
            >
              Email
            </a>
          </li>
        </ul>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex items-center gap-2 text-sm text-text-dim md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 bg-bg md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between px-5 py-8 sm:px-8"
        >
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-3xl text-text">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-on-accent"
            >
              {site.email}
            </a>
            <div className="flex justify-between text-sm text-text-dim">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
