import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Globe,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Palette,
  Server,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useRef, useState } from "react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContactForm } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    const id = href.replace("#", "");
    setActiveSection(id);
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-md"
      style={{ background: "oklch(0.18 0.05 255 / 0.92)" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="font-heading text-lg font-bold text-foreground tracking-tight"
          data-ocid="nav.link"
        >
          Rayan Dsouza{" "}
          <span className="text-primary font-normal opacity-70">{"//"}</span>{" "}
          <span className="text-primary">Dev</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNav(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                activeSection === link.href.replace("#", "")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="nav.link"
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Resume button */}
        <div className="hidden md:block">
          <Button
            size="sm"
            className="rounded-full bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-medium"
            data-ocid="nav.button"
          >
            Resume
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen((p) => !p)}
          data-ocid="nav.toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/40"
          >
            <nav className="flex flex-col px-6 py-4 gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="text-left px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <Button
                size="sm"
                className="mt-2 w-fit rounded-full bg-primary/10 border border-primary/40 text-primary"
                data-ocid="nav.button"
              >
                Resume
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-4rem)] flex items-center py-20 overflow-hidden"
      data-ocid="hero.section"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <Badge className="bg-primary/15 text-primary border-primary/30 font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                Available for Work
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground"
            >
              I Build{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.57 0.22 264), oklch(0.70 0.18 280))",
                }}
              >
                Beautiful
              </span>{" "}
              <br />
              Websites
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg max-w-md leading-relaxed"
            >
              Crafting stunning, high-performance web experiences with clean
              code and thoughtful design — from concept to deployment.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-glow"
                onClick={() => scrollTo("projects")}
                data-ocid="hero.primary_button"
              >
                View My Work
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border/60 text-foreground hover:bg-accent rounded-xl"
                onClick={() => scrollTo("contact")}
                data-ocid="hero.secondary_button"
              >
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6 pt-2 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-foreground font-bold text-base">50+</span>{" "}
                Projects
              </span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5">
                <span className="text-foreground font-bold text-base">2+</span>{" "}
                Years Exp.
              </span>
              <span className="w-px h-4 bg-border" />
              <span className="flex items-center gap-1.5">
                <span className="text-foreground font-bold text-base">
                  100%
                </span>{" "}
                Satisfaction
              </span>
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Radial glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.57 0.22 264) 0%, transparent 70%)",
              }}
            />
            <div className="relative w-full max-w-lg animate-float">
              {/* Floating code window */}
              <div
                className="absolute -top-6 -left-6 z-10 rounded-xl p-3 text-xs font-mono border border-primary/30 shadow-glow-sm"
                style={{ background: "oklch(0.22 0.055 255)" }}
              >
                <div className="flex gap-1.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <p className="text-primary">const dev = new Rayan();</p>
                <p className="text-muted-foreground">
                  dev.build(
                  <span className="text-green-400">&apos;amazing&apos;</span>);
                </p>
              </div>

              <img
                src="/assets/generated/hero-coding.dim_1200x700.jpg"
                alt="Developer at work"
                className="relative z-0 w-full rounded-2xl border border-border/40 shadow-card object-cover"
                style={{ maxHeight: "420px" }}
              />

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 z-10 flex items-center gap-2 rounded-xl px-4 py-2 border border-border/40 shadow-card"
                style={{ background: "oklch(0.22 0.055 255)" }}
              >
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Full-Stack Dev</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

const aboutItems = [
  { icon: <MapPin className="h-4 w-4" />, text: "Goa, India" },
  { icon: <Mail className="h-4 w-4" />, text: "dsouzarayan55@gmail.com" },
  { icon: <Globe className="h-4 w-4" />, text: "Available worldwide" },
  { icon: <Code2 className="h-4 w-4" />, text: "Open to freelance" },
];

function AboutSection() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: "oklch(0.17 0.048 255)" }}
      data-ocid="about.section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left image card */}
          <motion.div variants={fadeUp} className="relative">
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-25"
              style={{ background: "oklch(0.57 0.22 264)" }}
            />
            <img
              src="/assets/generated/workspace-flatlay.dim_800x500.jpg"
              alt="Developer workspace"
              className="relative w-full rounded-2xl border border-border/40 shadow-card object-cover"
              style={{ maxHeight: "380px" }}
            />
          </motion.div>

          {/* Right text */}
          <motion.div variants={staggerContainer} className="space-y-5">
            <motion.p
              variants={fadeUp}
              className="text-primary text-sm font-semibold uppercase tracking-widest"
            >
              About Me
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl font-bold text-foreground"
            >
              Rayan Dsouza
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed"
            >
              I&apos;m a passionate web developer with over 2 years of
              experience building custom websites and web applications. I
              specialize in creating fast, accessible, and visually stunning
              digital experiences that help businesses grow and connect with
              their audience.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground leading-relaxed"
            >
              From pixel-perfect landing pages to complex full-stack
              applications, I bring ideas to life with clean, maintainable code
              and a keen eye for design.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 gap-4 pt-2"
            >
              {aboutItems.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>
            <motion.button
              type="button"
              variants={fadeUp}
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
              data-ocid="about.link"
            >
              Read More <ChevronRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    id: "bloom-co",
    title: "Bloom & Co. Business Website",
    description:
      "A fully responsive corporate website for a boutique agency, featuring animated sections and a custom CMS.",
    image: "/assets/generated/website-mockup.dim_800x500.jpg",
    techs: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "shopwave",
    title: "ShopWave E-commerce Store",
    description:
      "Feature-rich online store with product filtering, cart, and Stripe checkout built on a modern stack.",
    image: "/assets/generated/coding-hands.dim_800x500.jpg",
    techs: ["React", "TypeScript", "Node.js", "Stripe"],
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio Template",
    description:
      "A sleek, dark-themed portfolio template for designers and developers with smooth page transitions.",
    image: "/assets/generated/website-mockup.dim_800x500.jpg",
    techs: ["React", "Tailwind", "Framer Motion"],
  },
  {
    id: "nexus-landing",
    title: "Nexus SaaS Landing Page",
    description:
      "High-converting landing page with waitlist integration, testimonials, and animated feature showcase.",
    image: "/assets/generated/coding-hands.dim_800x500.jpg",
    techs: ["HTML", "CSS", "JavaScript", "Figma"],
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-24" data-ocid="projects.section">
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-primary text-sm font-semibold uppercase tracking-widest text-center"
          >
            Projects
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-bold text-foreground text-center mt-2 mb-12"
          >
            Featured Work
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="group rounded-2xl border border-border/60 overflow-hidden hover:border-primary/50 hover:shadow-glow-sm transition-all duration-300"
                style={{ background: "oklch(0.22 0.055 255)" }}
                data-ocid={`projects.item.${idx + 1}`}
              >
                <div className="relative overflow-hidden h-40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-heading font-bold text-foreground text-sm leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.techs.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-primary/10 text-primary border-primary/20 text-xs py-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all"
                    data-ocid={`projects.link.${idx + 1}`}
                  >
                    View Project <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    key: "frontend",
    icon: <Layers className="h-5 w-5" />,
    title: "Front-end",
    desc: "React, Vue, Next.js, Tailwind CSS",
  },
  {
    key: "backend",
    icon: <Server className="h-5 w-5" />,
    title: "Back-end",
    desc: "Node.js, Express, REST & GraphQL APIs",
  },
  {
    key: "databases",
    icon: <Database className="h-5 w-5" />,
    title: "Databases",
    desc: "PostgreSQL, MongoDB, Redis",
  },
  {
    key: "design",
    icon: <Palette className="h-5 w-5" />,
    title: "Design",
    desc: "Figma, UI/UX, Design Systems",
  },
  {
    key: "performance",
    icon: <Zap className="h-5 w-5" />,
    title: "Performance",
    desc: "Core Web Vitals, SEO, Accessibility",
  },
  {
    key: "tools",
    icon: <GitBranch className="h-5 w-5" />,
    title: "Tools",
    desc: "Git, Docker, CI/CD, Vercel",
  },
];

const techBadges = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Figma",
  "Git",
  "Python",
  "Next.js",
];

function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24"
      style={{ background: "oklch(0.17 0.048 255)" }}
      data-ocid="skills.section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left — skill categories */}
          <div className="space-y-6">
            <motion.p
              variants={fadeUp}
              className="text-primary text-sm font-semibold uppercase tracking-widest"
            >
              Skills & Expertise
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl font-bold text-foreground"
            >
              What I Bring
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories.map((skill, idx) => (
                <motion.div
                  key={skill.key}
                  variants={fadeUp}
                  className="flex gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/40 transition-colors"
                  style={{ background: "oklch(0.22 0.055 255)" }}
                  data-ocid={`skills.item.${idx + 1}`}
                >
                  <div className="mt-0.5 text-primary shrink-0">
                    {skill.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {skill.title}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {skill.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
              {techBadges.map((tech) => (
                <Badge
                  key={tech}
                  className="bg-primary/10 text-primary border-primary/25 font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>
          </div>

          {/* Right — contact form */}
          <div id="contact" data-ocid="contact.section">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { mutate, isPending, isSuccess } = useSubmitContactForm();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        toast.success("Message sent! I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      },
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-6"
    >
      <motion.p
        variants={fadeUp}
        className="text-primary text-sm font-semibold uppercase tracking-widest"
      >
        Contact
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="font-heading text-4xl font-bold text-foreground"
      >
        Let&apos;s Work Together
      </motion.h2>
      <motion.p variants={fadeUp} className="text-muted-foreground text-sm">
        Have a project in mind? I&apos;d love to hear about it. Send me a
        message and let&apos;s create something great.
      </motion.p>

      <AnimatePresence>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center space-y-2"
            data-ocid="contact.success_state"
          >
            <div className="text-4xl">✅</div>
            <p className="font-heading font-bold text-foreground text-lg">
              Message Sent!
            </p>
            <p className="text-muted-foreground text-sm">
              Thank you for reaching out. I&apos;ll get back to you within 24
              hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="contact.modal"
          >
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="name"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="bg-card border-border/60 focus:border-primary"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="email"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="bg-card border-border/60 focus:border-primary"
                data-ocid="contact.input"
              />
            </div>
            <div className="space-y-1">
              <label
                className="text-sm font-medium text-muted-foreground"
                htmlFor="message"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-card border-border/60 focus:border-primary resize-none"
                data-ocid="contact.textarea"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-glow"
              data-ocid="contact.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const socialLinks = [
  { icon: <SiGithub size={18} />, label: "GitHub", href: "https://github.com" },
  {
    icon: <SiLinkedin size={18} />,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  { icon: <SiX size={18} />, label: "X/Twitter", href: "https://x.com" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border/40 py-12"
      style={{ background: "oklch(0.15 0.044 255)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-heading text-lg font-bold">
              Rayan Dsouza <span className="text-primary">{"// Dev"}</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building beautiful, high-performance websites and web applications
              for businesses and individuals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground text-sm uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href.replace("#", ""))}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="font-semibold text-foreground text-sm uppercase tracking-wider">
              Connect
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  data-ocid="nav.link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {year} Rayan Dsouza. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
}
