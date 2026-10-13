import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const focus = [
  { name: "MeterPay", detail: "Java 21 · Spring Boot · Kafka" },
  { name: "LaunchForge", detail: "Kubernetes · Terraform · OpenTelemetry" },
];

export function Now() {
  return (
    <section id="now" className="scroll-mt-24 border-b border-line py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label text-text-mute">
                <span className="text-accent">04</span>
                <span className="mx-2 text-line-strong">/</span>Now
              </p>
              <p className="measure mt-6 text-[clamp(1.15rem,2vw,1.6rem)] leading-relaxed text-text">
                I&apos;m {site.name} — a software engineer with 2+ years across
                frontend, full-stack, backend, and AI. I take products from idea
                to running software, and I care about the boring parts that make
                things reliable.
              </p>
              <p className="measure mt-6 leading-relaxed text-text-dim">
                Right now I&apos;m deep in backend and infrastructure work, and
                open to freelance projects and full-time engineering roles where
                I can own real systems.
              </p>
              <Link
                href="/about"
                className="link-underline mt-6 inline-block text-sm text-text"
              >
                More about me →
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <p className="label text-text-mute">Currently building</p>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {focus.map((f) => (
                  <li key={f.name} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-text">{f.name}</span>
                    <span className="label text-right text-text-mute">{f.detail}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
