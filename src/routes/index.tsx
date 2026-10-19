import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ArchitecturalSpiralCanvas } from "@/components/site/ArchitecturalSpiralCanvas";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ConceptDemoModal, type ProjectId } from "@/components/site/ConceptDemoModal";
import { InfoModal, type ModalType } from "@/components/site/InfoModal";
import {
  ArrowUpRight,
  Check,
  ShieldCheck,
  Eye,
  Menu,
  X,
  CreditCard,
  Layers,
  HelpCircle,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import lunaImg from "@/assets/project-luna.jpg";
import noirImg from "@/assets/project-noir-cafe.jpg";
import mesaImg from "@/assets/project-mesa.jpg";

const TITLE = "SeeSites — Premium Website Design Studio for Cafés & Restaurants";
const DESC =
  "SeeSites builds custom, high-converting websites exclusively for independent cafés, coffee shops, bakeries, and restaurants in the US and Canada. Operated by Sia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SeeSitesExperience,
});

const OFFICIAL_EMAIL = "seesites0@gmail.com";

// 3 Visually Distinct Concept Projects
const portfolioProjects = [
  {
    id: "luna" as ProjectId,
    title: "LUNA",
    category: "Contemporary Restaurant",
    tag: "Concept Project",
    location: "Soho, New York",
    description:
      "Elegant editorial design, sophisticated typography, premium dining imagery, and refined digital menu presentation.",
    image: lunaImg,
  },
  {
    id: "noir" as ProjectId,
    title: "NOIR",
    category: "Specialty Coffee Shop",
    tag: "Concept Project",
    location: "Queen West, Toronto",
    description:
      "Minimal coffee-shop aesthetic, beautiful product photography, clean menu layouts, and modern typography.",
    image: noirImg,
  },
  {
    id: "mesa" as ProjectId,
    title: "MESA",
    category: "Modern Restaurant",
    tag: "Concept Project",
    location: "Gastown, Vancouver",
    description:
      "Contemporary hospitality design, warm imagery, refined layouts, and intuitive mobile navigation.",
    image: mesaImg,
  },
];

function SeeSitesExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDemo, setActiveDemo] = useState<ProjectId | null>(null);
  const [activeInfoModal, setActiveInfoModal] = useState<ModalType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
        setScrollProgress(progress);
      }
    };

    lenis.on("scroll", handleScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectPlanAndScroll = (planName: string) => {
    window.dispatchEvent(new CustomEvent("seesites:plan", { detail: planName }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#030714] text-[#f8fafc] font-sans selection:bg-[#cbd5e1] selection:text-[#030714] antialiased overflow-x-hidden">
      {/* Subtle Cinematic Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Background Architectural Canvas */}
      <div className="opacity-40 sm:opacity-50">
        <ArchitecturalSpiralCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Interactive Concept Demo Modal */}
      <ConceptDemoModal
        projectId={activeDemo}
        onClose={() => setActiveDemo(null)}
        onSelectProject={(plan) => selectPlanAndScroll(plan)}
      />

      {/* Interactive Details Modals (Opened on button click) */}
      <InfoModal
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        onSelectPlan={(plan) => selectPlanAndScroll(plan)}
      />

      {/* ===================== FIXED HEADER ===================== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030714]/85 backdrop-blur-md px-5 py-4 sm:px-8 sm:py-5 md:px-12 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="font-editorial text-lg sm:text-xl font-light tracking-[0.1em] text-white hover:opacity-80 transition-opacity"
          >
            SEESITES
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-xs font-mono tracking-widest text-[#cbd5e1] uppercase"
          >
            <button onClick={() => scrollTo("work")} className="hover:text-white transition-colors">
              Work
            </button>
            <button
              onClick={() => setActiveInfoModal("pricing")}
              className="hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveInfoModal("services")}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => setActiveInfoModal("process")}
              className="hover:text-white transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => setActiveInfoModal("faq")}
              className="hover:text-white transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-primary rounded-full px-5 py-2 text-[11px] font-bold tracking-wider text-slate-950 uppercase"
            >
              Start Project
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-primary rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wider text-slate-950 uppercase"
            >
              Start Project
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-lg border border-white/15 p-2 text-slate-200 hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="md:hidden mt-3 border-t border-white/10 pt-4 pb-3 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-slate-300"
          >
            <button
              onClick={() => scrollTo("work")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Explore Our Work
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveInfoModal("pricing");
              }}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Pricing Packages ($200 / $500 / $800)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveInfoModal("services");
              }}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Services &amp; Capabilities
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveInfoModal("process");
              }}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              The 50/50 Payment Rule
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveInfoModal("faq");
              }}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Trust &amp; Questions (FAQ)
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-left py-2 px-1 text-white font-bold"
            >
              Start a Project →
            </button>
          </nav>
        )}
      </header>

      {/* Main Content Stream */}
      <main className="relative z-10 w-full pt-16">
        {/* ===================== 1. HERO SECTION ===================== */}
        <section
          id="hero"
          className="min-h-[82vh] flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-20 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-5xl w-full">
            {/* Wordmark Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-mono tracking-[0.2em] uppercase text-slate-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>SeeSites · Boutique Web Studio for Hospitality</span>
            </div>

            {/* Main Headline (Exact requirement) */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase text-white leading-[1.15] tracking-[0.03em] max-w-4xl">
              Websites That Make Your Business Worth Seeing.
            </h1>

            {/* Supporting Text (Exact requirement) */}
            <p className="mt-5 max-w-xl text-base sm:text-lg md:text-xl text-[#cbd5e1] font-light leading-relaxed">
              Custom digital experiences for independent cafés and restaurants.
            </p>

            {/* Two Prominent Action Buttons (Exact requirement) */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
              <button
                onClick={() => scrollTo("work")}
                className="metallic-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-slate-950 shadow-xl hover:scale-105 transition-all"
              >
                <span>Explore Our Work</span>
                <span>↓</span>
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="metallic-btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-mono tracking-wider uppercase text-white hover:bg-white/10 transition-all"
              >
                <span>Start a Project</span>
                <span>→</span>
              </button>
            </div>

            {/* Trust & Legitimacy Highlights (Immediate clarity for first-time visitors) */}
            <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Studio Director</span>
                <span className="text-white font-medium">Operated by Sia</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Geographic Focus</span>
                <span className="text-white font-medium">USA &amp; Canada</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Payment Safety</span>
                <span className="text-emerald-400 font-medium">50/50 Milestones</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase">Code Ownership</span>
                <span className="text-white font-medium">100% You Own It</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 2. SELECTED WORK (3 VISUALLY DISTINCT PROJECTS) ===================== */}
        <section
          id="work"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/60"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-10">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                  Design Demonstrations
                </span>
                <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                  Selected Work
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Click any project to test the working concept website, digital menus, and table
                reservation simulator.
              </p>
            </div>

            {/* 3 Projects Grid (Spacious, Clean & Breathable) */}
            <div className="grid gap-8 lg:grid-cols-3">
              {portfolioProjects.map((proj, idx) => (
                <article
                  key={proj.title}
                  className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all group"
                >
                  <div>
                    {/* Visual Preview */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#030713]">
                      <img
                        src={proj.image}
                        alt={`${proj.title} — ${proj.category}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-[#030714]/85 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                          {proj.tag}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        <span>0{idx + 1} //</span>
                        <span>{proj.location}</span>
                      </div>
                      <h3 className="mt-1.5 font-editorial text-2xl font-light uppercase text-white tracking-wide">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400 uppercase">{proj.category}</p>
                      <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Working Demo Button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setActiveDemo(proj.id)}
                      className="metallic-btn-primary w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Launch Concept Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-[11px] font-mono text-slate-500">
              Notice: All portfolio items labeled "Concept Project" are custom design samples
              created by SeeSites to demonstrate capabilities.
            </p>
          </div>
        </section>

        {/* ===================== 3. THE REQUIRED DETAILS (OPEN ON BUTTON CLICK) ===================== */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="border-b border-white/10 pb-5 mb-10">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Studio Transparency
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Everything You Need to Know
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 font-light">
                Direct answers to the questions clients ask most before starting a project. Click
                any card to view full details.
              </p>
            </div>

            {/* 3 Interactive Topic Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Card A: Packages & Services */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 mb-4">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    Pricing &amp; Scope
                  </span>
                  <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-light uppercase text-white">
                    Packages &amp; Capabilities
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                    Transparent flat-rate packages ($200 Essential, $500 Signature, $800
                    Experience), optional monthly care, and our 7 core restaurant services.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="metallic-btn-primary w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
                  >
                    <span>View Pricing &amp; Packages</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("services")}
                    className="w-full text-center py-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white"
                  >
                    View All 7 Services →
                  </button>
                </div>
              </div>

              {/* Card B: What Happens After You Pay (50/50 Rule) */}
              <div className="rounded-2xl border border-emerald-400/25 bg-[#091833]/80 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between shadow-lg">
                <div>
                  <div className="h-10 w-10 rounded-full border border-emerald-400/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-emerald-300">
                    Payment Safety
                  </span>
                  <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-light uppercase text-white">
                    What Happens After You Pay?
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                    Our 50/50 rule protects your business: 50% deposit kicks off production, you
                    test your site on a private staging link, and{" "}
                    <strong className="text-white">
                      the final 50% is paid only upon your final approval
                    </strong>
                    .
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveInfoModal("process")}
                    className="metallic-btn-primary w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
                  >
                    <span>See Step-by-Step Process</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Card C: Legitimacy & FAQ */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 mb-4">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    Trust &amp; Ownership
                  </span>
                  <h3 className="mt-1 font-editorial text-xl sm:text-2xl font-light uppercase text-white">
                    Is This Developer Legitimate?
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                    Operated by Sia. Direct 1-on-1 collaboration with no middlemen. You receive
                    written project scope, and own 100% of your code, files, and domain upon launch.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveInfoModal("faq")}
                    className="metallic-btn-primary w-full inline-flex items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
                  >
                    <span>Read Common Questions</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 4. CONTACT / START A PROJECT ===================== */}
        <section
          id="contact"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/80"
        >
          <div className="mx-auto max-w-4xl">
            <div className="border-b border-white/10 pb-6 mb-10 text-center sm:text-left">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Initiate Project
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Let's Build Your Digital Home
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light">
                Fill out the project details below. Sia will review your concept and respond within
                24 business hours.
              </p>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-slate-400">
                <Mail className="h-3.5 w-3.5" />
                <span>Or email directly:</span>
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="text-white underline underline-offset-4 hover:text-slate-300"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>

            {/* Direct functional EnquiryForm */}
            <div className="rounded-2xl border border-white/15 bg-[#060e22]/90 p-5 sm:p-8 md:p-10 backdrop-blur-xl">
              <EnquiryForm />
            </div>
          </div>
        </section>

        {/* ===================== 5. FOOTER ===================== */}
        <footer className="border-t border-white/10 bg-[#010309] px-5 py-10 sm:px-8 sm:py-14 md:px-12">
          <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-editorial text-2xl font-light tracking-[0.1em] text-white">
                SEESITES
              </span>
              <p className="mt-1 text-xs text-slate-400 font-mono">
                Boutique Website Studio for Independent Cafés &amp; Restaurants.
              </p>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="mt-1.5 inline-block text-xs font-mono text-slate-300 hover:text-white underline underline-offset-4"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 text-xs font-mono uppercase tracking-widest text-slate-400">
              <button
                onClick={() => scrollTo("work")}
                className="hover:text-white transition-colors"
              >
                Work
              </button>
              <button
                onClick={() => setActiveInfoModal("pricing")}
                className="hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => setActiveInfoModal("services")}
                className="hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => setActiveInfoModal("process")}
                className="hover:text-white transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => setActiveInfoModal("faq")}
                className="hover:text-white transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-6xl mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
            <span>
              © {new Date().getFullYear()} SeeSites. All rights reserved. Operated by Sia.
            </span>
            <span>All portfolio concept projects clearly labeled as sample designs.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
