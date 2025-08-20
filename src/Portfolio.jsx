import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

function Button({
  asChild,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40";
  const styles =
    variant === "outline"
      ? "bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-600" // matches your current outline usage
      : "bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-600";
  if (asChild) {
    const { href = "#" } = props;
    return (
      <a href={href} className={`${base} ${styles} ${className}`} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-neutral-800 bg-neutral-900/40 ${className}`}
    >
      {children}
    </div>
  );
}
function CardContent({ className = "", children }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function Badge({ variant = "secondary", className = "", children }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-sm";
  const styles =
    variant === "outline"
      ? "border border-neutral-700 text-neutral-300"
      : "bg-neutral-900 text-neutral-100 border border-neutral-700";
  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

// ======= DATA (original iteration) ==========================================
const PROFILE = {
  name: "Kyle Whang",
  role: "Software Engineer",
  subtitle: "Full‑Stack • React • AWS",
  blurb:
    "I am a Full-Stack Engineer with an affinity for simplicity, modernity, and minimalism.",
  email: "kylewhang@gmail.com",
  links: {
    github: "https://github.com/shaisle",
    linkedin: "https://www.linkedin.com/in/kylewhang/",
    resume: "/KyleWhangResume 7-2025.pdf",
  },
};

const EXPERIENCE = [
  {
    org: "Freelance Web Developer",
    title: "Web Developer",
    time: "May 2025 – Present",
    place: "Remote",
    bullets: [
      "Built and customized responsive WordPress sites with a focus on UX, performance, and SEO.",
      "Migrated sites to WordPress, optimized for accessibility and mobile.",
      "Managed domains, DNS, and SSL (Cloudways) and collaborated with clients end‑to‑end.",
    ],
  },
  {
    org: "IDEMIA",
    title: "Software Engineer",
    time: "Mar 2022 – May 2024",
    place: "Irvine, CA",
    bullets: [
      "Designed a cloud‑native adjudication platform on AWS (EC2, Lambda, S3, RDS, Step Functions) processing 10k+ background checks weekly; 25% faster turnaround.",
      "Built RESTful services with Node.js/Express integrating internal microservices and 3rd‑party APIs (99.99% uptime).",
      "Migrated legacy Angular to React; reduced FE bugs by 35% and improved maintainability.",
      "Created reusable UI components (React, MUI, Zustand, Context), boosting user satisfaction by 40%.",
      "Infra as Code with AWS CDK/CloudFormation; automated GitLab CI/CD pipelines (75% faster releases).",
    ],
  },
];

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "Python",
  "C#/.NET",
  "SQL/NoSQL",
  "Zustand",
  "MUI",
  "AWS (S3, EC2, RDS, Lambda, CDK)",
  "GitLab CI/CD",
  "WordPress",
];

const PROJECTS = [
  {
    name: "Dockter",
    desc: "Low-overhead open source Docker log management tool built around: Real-time Log Aggregation, Efficient Storage and Search Capability.",
    tech: ["React", "TypeScript", "Vite", "Docker", "Electron", "TailwindCSS"],
    live: "#",
    repo: "https://github.com/oslabs-beta/Dockter",
  },
  {
    name: "Veinlady.net",
    desc: "Custom wordpress website for medical professionals.",
    tech: ["WordPress", "DNS", "Brevo"],
    live: "https://veinlady.net/",
    repo: "#",
  },
];

// ======= ANIMATIONS =========================================================
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

// ======= Particle Cursor (original subtle glow) =============================
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.className = "pointer-events-none fixed inset-0 z-[5]";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return () => {};

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener("resize", setSize);

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;
      const count = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          a: 1,
          r: 1 + Math.random() * 2.2,
          life: 60 + Math.floor(Math.random() * 30),
        });
      }
      if (particlesRef.current.length > 600)
        particlesRef.current.splice(0, particlesRef.current.length - 600);
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1;
        p.a = Math.max(0, p.life / 90);
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        const g = 230 + Math.floor(Math.random() * 25);
        const b = 255;
        ctx.fillStyle = `rgba(16, ${g}, ${b}, ${p.a * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      try {
        document.body.removeChild(canvas);
      } catch {
        /* empty */
      }
    };
  }, []);

  return null;
}

// ======= MAIN ===============================================================
export default function Portfolio() {
  // const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    // Dark theme + smooth scrolling
    document.documentElement.classList.add("dark");
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800 relative overflow-hidden">
      {/* Subtle animated background (original gradient) */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/20 via-transparent to-emerald-900/20"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Particle cursor layer */}
      <ParticleCanvas />

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 text-center"
      >
        <motion.div {...fadeUp} className="space-y-5">
          <p className="text-sm text-neutral-400">{PROFILE.role}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="text-lg text-neutral-300">{PROFILE.subtitle}</p>
          <p className="mx-auto max-w-2xl text-neutral-300">{PROFILE.blurb}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button asChild>
              <a href="#projects" className="text-white flex items-center ">
                View Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild>
              <a href={`mailto:${PROFILE.email}`} className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="hover:opacity-80"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="hover:opacity-80"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          <div className="flex justify-center items-center gap-2 text-sm text-neutral-400 pt-2">
            {/* <MapPin className="h-4 w-4" /> {PROFILE.location} */}
          </div>
        </motion.div>
      </section>

      {/* JOURNEY (resume bullets) */}
      <section
        id="journey"
        className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-6"
      >
        <motion.h2
          {...fadeUp}
          className="mb-8 text-2xl font-semibold text-center"
        >
          Journey
        </motion.h2>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 h-full w-px bg-neutral-800" />
          <div className="space-y-8">
            {EXPERIENCE.map((e) => (
              <motion.div key={e.org + e.time} {...fadeUp} className="relative">
                <div className="absolute -left-0.5 top-1 h-2 w-2 rounded-full bg-white" />
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">
                      {e.org} •{" "}
                      <span className="text-neutral-300">{e.title}</span>
                    </div>
                    <div className="text-sm text-neutral-400">
                      {e.place} • {e.time}
                    </div>
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-6"
      >
        <motion.h2
          {...fadeUp}
          className="mb-6 text-2xl font-semibold text-center"
        >
          Skills
        </motion.h2>
        <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-2">
          {SKILLS.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="rounded-full border-neutral-700 bg-neutral-900 text-neutral-100"
            >
              {s}
            </Badge>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS (original set) */}
      <section
        id="projects"
        className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-6"
      >
        <motion.h2
          {...fadeUp}
          className="mb-6 text-2xl font-semibold text-center"
        >
          Projects
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <motion.div key={p.name} {...fadeUp}>
              <Card className="h-full border-neutral-800 bg-neutral-900/40">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-emerald-400">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-300">{p.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      {p.live !== "#" && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Live"
                          className="hover:opacity-80"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {p.repo !== "#" && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          title="Repo"
                          className="hover:opacity-80"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="rounded-full border-neutral-700 text-neutral-300"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6"
      >
        {/* <motion.h2
          {...fadeUp}
          className="mb-6 text-2xl font-semibold text-center"
        >
          Contact
        </motion.h2>
        <motion.form
          {...fadeUp}
          action="https://formspree.io/f/your-id"
          method="POST"
          className="grid gap-3 md:mx-auto md:max-w-lg"
        >
          <input
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 outline-none placeholder:text-neutral-500"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 outline-none placeholder:text-neutral-500"
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <textarea
            className="min-h-[120px] rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2 outline-none placeholder:text-neutral-500"
            name="message"
            placeholder="Your message"
            required
          />
          <Button
            type="submit"
            className="justify-center bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-600"
          >
            Send
          </Button>
          <p className="text-xs text-neutral-500">
            This form uses Formspree. Replace the action URL with your own ID or
            ask me to wire a Vercel Function.
          </p>
        </motion.form>
        <p className="mt-12 text-center text-xs text-neutral-500">
          © {year} {PROFILE.name}. All rights reserved.
        </p> */}
      </section>

      {/* RESUME BUTTON (original) */}
      <section
        id="resume"
        className="relative z-10 mx-auto max-w-6xl px-4 pb-20 md:px-6"
      >
        {/* <div className="flex justify-center">
          <Button asChild>
            <a
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer noopener"
            >
              View Full Resume <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div> */}
      </section>
    </div>
  );
}
