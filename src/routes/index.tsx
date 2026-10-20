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
  ChevronDown,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Lock,
  Compass,
  ArrowRight,
  Scissors,
  Utensils,
  ShoppingBag,
  Stethoscope,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import auraImg from "@/assets/project-aura-salon.jpg";
import vaaniImg from "@/assets/project-vaani-boutique.jpg";
import aestheticaImg from "@/assets/project-aesthetica-clinic.jpg";
import artisanImg from "@/assets/project-noir-cafe.jpg";
import studioImg from "@/assets/project-studio-interior.jpg";

const TITLE = "SeeSites — Custom Website Design & Development Studio | India";
const DESC =
  "SeeSites designs and builds custom, high-converting websites for businesses across India — salons, restaurants, boutiques, clinics, and ambitious brands. Accessible starting prices at ₹9,999.";

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

// 5 Visually Distinct Concept Projects for Indian Market
const portfolioProjects = [
  {
    id: "aura" as ProjectId,
    title: "AURA",
    category: "Luxury Salon & Nail Studio",
    industryFilter: "Beauty & Salons",
    tag: "Concept Project",
    location: "Bandra West, Mumbai",
    description:
      "Sleek dark-mode aesthetic, treatment price lists, stylist profiles, and WhatsApp appointment booking flow.",
    image: auraImg,
  },
  {
    id: "vaani" as ProjectId,
    title: "VAANI",
    category: "Contemporary Indian Pret & Couture",
    industryFilter: "Fashion & Boutiques",
    tag: "Concept Project",
    location: "Mehrauli, New Delhi",
    description:
      "Editorial digital storefront for modern Indian fashion, showcasing heritage handlooms with contemporary silhouettes.",
    image: vaaniImg,
  },
  {
    id: "aesthetica" as ProjectId,
    title: "AESTHETICA",
    category: "Dental & Implant Clinic",
    industryFilter: "Healthcare",
    tag: "Concept Project",
    location: "Indiranagar, Bengaluru",
    description:
      "Clean, high-credibility healthcare website featuring treatment guides, doctor credentials, and convenient consultation enquiries.",
    image: aestheticaImg,
  },
  {
    id: "artisan" as ProjectId,
    title: "THE ARTISAN",
    category: "Specialty Roast & Kitchen",
    industryFilter: "Restaurants & Cafés",
    tag: "Concept Project",
    location: "Kala Ghoda, Mumbai",
    description:
      "Atmospheric culinary layout featuring interactive digital menus, roastery origins, and table reservation simulator.",
    image: artisanImg,
  },
  {
    id: "studio" as ProjectId,
    title: "STUDIO ELEMENT",
    category: "Architecture & Interior Design",
    industryFilter: "Business & Professional Services",
    tag: "Concept Project",
    location: "Jubilee Hills, Hyderabad",
    description:
      "Minimalist architectural portfolio, project case studies, material palette showcases, and consultation enquiry.",
    image: studioImg,
  },
];

const portfolioCategories = [
  "All Concepts",
  "Beauty & Salons",
  "Restaurants & Cafés",
  "Fashion & Boutiques",
  "Healthcare",
  "Business & Professional Services",
];

// 4 Essential Front-Facing FAQs (Full 10 available via modal button)
const frontFaqs = [
  {
    q: "How much does a website cost?",
    a: "Our website packages start at ₹9,999 for the Essential package, ₹19,999 for the Signature package, and ₹59,999 for the bespoke Premium package. Final pricing always depends on your agreed project scope, number of pages, and specific custom features.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Standard website projects typically take between 7 to 21 business days. Delivery timelines depend on project complexity, prompt client feedback, and the timely supply of content and assets.",
  },
  {
    q: "Will my website work on mobile phones?",
    a: "Yes. Every website we design is built mobile-first. We test layouts across popular smartphones, tablets, and desktop displays to ensure fluid speed, crisp readability, and effortless navigation.",
  },
  {
    q: "What happens after my website launches?",
    a: "You retain full ownership of your website and assets. If you prefer ongoing support for text edits, price updates, and technical checks, we offer optional Basic Care (₹1,999/mo) and Premium Care (₹3,999/mo) plans.",
  },
];

function SeeSitesExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDemo, setActiveDemo] = useState<ProjectId | null>(null);
  const [activeInfoModal, setActiveInfoModal] = useState<ModalType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Concepts");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  const filteredProjects =
    selectedFilter === "All Concepts"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.industryFilter === selectedFilter);

  return (
    <div className="relative min-h-screen bg-[#030714] text-[#f8fafc] font-sans selection:bg-[#fbcfe8] selection:text-[#030714] antialiased overflow-x-hidden">
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

      {/* Interactive Details Modals */}
      <InfoModal
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
        onSelectPlan={(plan) => selectPlanAndScroll(plan)}
      />

      {/* ===================== FIXED HEADER ===================== */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030714]/85 backdrop-blur-md px-5 py-3.5 sm:px-8 sm:py-4 md:px-12 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-editorial text-lg sm:text-xl font-light tracking-[0.1em] text-white group-hover:text-pink-200 transition-colors">
              SEESITES
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-pink-300/80 border-l border-white/15 pl-2">
              Studio India
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-widest text-[#cbd5e1] uppercase"
          >
            <button
              onClick={() => scrollTo("services")}
              className="hover:text-white transition-colors"
            >
              Services
            </button>
            <button onClick={() => scrollTo("work")} className="hover:text-white transition-colors">
              Work
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo("care-plans")}
              className="hover:text-white transition-colors"
            >
              Care Plans
            </button>
            <button
              onClick={() => scrollTo("process")}
              className="hover:text-white transition-colors"
            >
              Process
            </button>
            <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">
              FAQ
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-pink rounded-full px-5 py-2 text-[11px] font-bold tracking-wider text-slate-950 uppercase shadow-md hover:scale-105 transition-all"
            >
              Get Your Website
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-pink rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wider text-slate-950 uppercase shadow-md"
            >
              Enquire
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
            className="lg:hidden mt-3 border-t border-white/10 pt-4 pb-3 flex flex-col gap-2.5 font-mono text-xs uppercase tracking-widest text-slate-300 text-center"
          >
            <button
              onClick={() => scrollTo("services")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              Services Built for Your Business
            </button>
            <button
              onClick={() => scrollTo("work")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              Explore Our Work (5 Concepts)
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              Packages &amp; Pricing (From ₹9,999)
            </button>
            <button
              onClick={() => scrollTo("care-plans")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              Monthly Care Plans (From ₹1,999/mo)
            </button>
            <button
              onClick={() => scrollTo("process")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              How It Works &amp; 50/50 Payment Rule
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="py-2 px-1 hover:text-pink-200 transition-colors border-b border-white/5"
            >
              Common Questions (FAQ)
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="py-2.5 px-1 text-pink-200 font-bold"
            >
              Get Your Website →
            </button>
          </nav>
        )}
      </header>

      {/* Main Content Stream */}
      <main className="relative z-10 w-full pt-16">
        {/* ===================== 1. HERO SECTION (SPACIOUS & CENTERED) ===================== */}
        <section
          id="hero"
          className="min-h-[88vh] flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-24 md:px-12 md:py-32"
        >
          <div className="mx-auto max-w-5xl w-full text-center">
            {/* Wordmark Pill with Baby Pink Accents */}
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-pink-200 mb-8 shadow-[0_0_15px_rgba(244,114,182,0.15)]">
              <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
              <span>SeeSites · Custom Website Design Studio India</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase text-white leading-[1.14] tracking-[0.025em] max-w-4xl mx-auto">
              Your Business Deserves{" "}
              <span className="metallic-text-pink font-normal">More Than Just Social Media.</span>
            </h1>

            {/* Supporting Headline */}
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#cbd5e1] font-light leading-relaxed">
              Custom websites designed to help your business stand out, showcase what you offer, and
              make it easier for customers to find and contact you.
            </p>

            {/* Sub-line */}
            <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-wider text-pink-200/90">
              Custom websites for ambitious businesses across India.
            </p>

            {/* Two Action CTAs (Centered) */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5">
              <button
                onClick={() => scrollTo("contact")}
                className="metallic-btn-pink inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-slate-950 shadow-xl hover:scale-105 transition-all"
              >
                <span>Get Your Website</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-900" />
              </button>

              <button
                onClick={() => scrollTo("work")}
                className="metallic-btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-mono tracking-wider uppercase text-white hover:border-pink-300/40 hover:text-pink-100 transition-all"
              >
                <span>Explore Our Work</span>
                <span>↓</span>
              </button>
            </div>

            {/* Visual Previews Grid (Clean & Breathable) */}
            <div className="mt-16 pt-10 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
                {[
                  {
                    name: "Salons & Beauty",
                    sub: "AURA · Mumbai",
                    img: auraImg,
                    id: "aura" as ProjectId,
                  },
                  {
                    name: "Fashion Boutiques",
                    sub: "VAANI · New Delhi",
                    img: vaaniImg,
                    id: "vaani" as ProjectId,
                  },
                  {
                    name: "Dental & Clinics",
                    sub: "AESTHETICA · Bengaluru",
                    img: aestheticaImg,
                    id: "aesthetica" as ProjectId,
                  },
                  {
                    name: "Cafés & Dining",
                    sub: "THE ARTISAN · Mumbai",
                    img: artisanImg,
                    id: "artisan" as ProjectId,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setActiveDemo(item.id)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#060e22] aspect-[4/3] transition-all hover:border-pink-300/50 hover:shadow-[0_0_20px_rgba(244,114,182,0.15)]"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-[#030714]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-left">
                      <div>
                        <p className="text-xs font-semibold text-white tracking-wide group-hover:text-pink-200 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-300">{item.sub}</p>
                      </div>
                      <span className="rounded-full bg-white/10 p-1 text-slate-300 group-hover:text-pink-200 transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Highlights (Centered on Mobile) */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300 text-center sm:text-left">
              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] text-pink-300/80 uppercase tracking-wider">
                  Starting Rates
                </span>
                <span className="text-white font-medium">From ₹9,999 (Flat Rate)</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] text-pink-300/80 uppercase tracking-wider">
                  Payment Safety
                </span>
                <span className="text-emerald-400 font-medium">50/50 Milestones</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] text-pink-300/80 uppercase tracking-wider">
                  Client Control
                </span>
                <span className="text-white font-medium">100% Asset Handover</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-3 sm:pt-0 sm:pl-3">
                <span className="block text-[10px] text-pink-300/80 uppercase tracking-wider">
                  Market Coverage
                </span>
                <span className="text-white font-medium">All Businesses Across India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 2. SERVICES SECTION (CLEAN & UNCONGESTED) ===================== */}
        <section
          id="services"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#02050f]/60"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header (Centered on Mobile & Desktop) */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Purpose-Built Digital Presence
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Websites Built Around Your Business
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Whether you’re starting small, growing your customer base, or building a premium
                brand, SeeSites creates websites tailored to your goals.
              </p>
            </div>

            {/* 6 Minimalist Clean Service Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  letter: "A",
                  title: "Business Websites",
                  desc: "Professional websites for local businesses, service providers, and independent professionals.",
                  icon: Briefcase,
                },
                {
                  letter: "B",
                  title: "Salon & Beauty Websites",
                  desc: "Elegant websites featuring services, price lists, galleries, stylist information, and appointment enquiries.",
                  icon: Scissors,
                },
                {
                  letter: "C",
                  title: "Restaurant & Café Websites",
                  desc: "Websites featuring menus, photographs, opening hours, locations, and enquiry or reservation options.",
                  icon: Utensils,
                },
                {
                  letter: "D",
                  title: "Boutique & Brand Websites",
                  desc: "Beautiful digital storefronts for fashion brands, boutiques, and independent businesses.",
                  icon: ShoppingBag,
                },
                {
                  letter: "E",
                  title: "Healthcare & Professional Websites",
                  desc: "Clean, credible websites for clinics, consultants, and professional service providers.",
                  icon: Stethoscope,
                },
                {
                  letter: "F",
                  title: "Custom Website Solutions",
                  desc: "Tailored designs and functionality based on the business’s requirements.",
                  icon: SlidersHorizontal,
                },
              ].map((svc) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={svc.title}
                    className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between hover:border-pink-300/40 transition-all group text-center sm:text-left"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-pink-300/80 uppercase tracking-widest">
                          Category {svc.letter}
                        </span>
                        <div className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-pink-300 group-hover:border-pink-300/30 transition-colors">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="font-editorial text-xl font-light uppercase text-white tracking-wide">
                        {svc.title}
                      </h3>
                      <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <button
                        onClick={() => setActiveInfoModal("services")}
                        className="text-xs font-mono text-pink-300 hover:text-white underline underline-offset-4 inline-flex items-center gap-1"
                      >
                        <span>View Included Capabilities</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Inclusivity Card with Button to Open All Capabilities */}
            <div className="mt-12 rounded-2xl border border-white/15 bg-[#030714] p-6 sm:p-8 text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300">
                Serving All Industries Across India
              </span>
              <p className="text-sm font-light text-slate-200">
                Gyms, interior designers, jewellery businesses, photographers, coaching institutes,
                wellness spas, and other growing businesses are always welcome.
              </p>
              <button
                onClick={() => setActiveInfoModal("services")}
                className="metallic-btn-ghost rounded-full px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-pink-200 hover:text-white hover:border-pink-300/40 transition-all inline-flex items-center gap-2"
              >
                <span>Read Full Services &amp; Industry Scope</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 3. PORTFOLIO AND PROJECT SHOWCASE ===================== */}
        <section
          id="work"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#01040d]"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Design Demonstrations
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Designed for Businesses With Something to Say
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Explore website concepts demonstrating how thoughtful design can help different
                types of businesses present themselves online.
              </p>
            </div>

            {/* Filter Pills Centered */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
                    selectedFilter === cat
                      ? "bg-gradient-to-r from-pink-200 to-white text-slate-950 font-bold shadow-md shadow-pink-500/20"
                      : "border border-white/15 bg-white/5 text-slate-300 hover:border-pink-300/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project Showcase Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((proj, idx) => (
                <article
                  key={proj.title}
                  className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-5 backdrop-blur-xl flex flex-col justify-between hover:border-pink-300/40 transition-all group text-center sm:text-left"
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
                        <span className="rounded-full bg-[#030714]/90 border border-pink-300/30 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-pink-200 backdrop-blur-md">
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
                      <h3 className="mt-1.5 font-editorial text-2xl font-light uppercase text-white tracking-wide group-hover:text-pink-100 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-pink-300/80 uppercase">
                        {proj.category}
                      </p>
                      <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Launch Working Concept Demo Button */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setActiveDemo(proj.id)}
                      className="metallic-btn-pink w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md"
                    >
                      <Eye className="h-3.5 w-3.5 text-slate-900" />
                      <span>Launch Concept Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-900" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-center text-[11px] font-mono text-slate-500">
              Notice: All portfolio items labeled "Concept Project" are custom design samples
              created by SeeSites to demonstrate capabilities across industries.
            </p>
          </div>
        </section>

        {/* ===================== 4. WEBSITE PACKAGES AND PRICING (CLEAN & UNCONGESTED) ===================== */}
        <section
          id="pricing"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#02050f]/80"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Transparent Pricing in INR
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Website Packages and Pricing
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Clear deliverables, transparent starting rates, and zero hidden costs. Other details
                and full feature specs open on click.
              </p>
            </div>

            {/* 3 Streamlined Pricing Cards */}
            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {/* Package 1: Essential */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/80 p-6 sm:p-8 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Small Businesses
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Essential Website
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="font-editorial text-4xl sm:text-5xl font-light text-white">
                      ₹9,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ starting price</span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% advance (₹5,000) · 50% on final launch
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    “A clean, professional online presence for businesses ready to establish
                    themselves online.”
                  </p>

                  {/* Clean 4 Key Inclusions (Not congested) */}
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-mono text-slate-300 text-left">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 3 pages with customized layout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile-responsive &amp; fast performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Services or product showcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Contact form &amp; WhatsApp integration</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <button
                    onClick={() => selectPlanAndScroll("Essential — ₹9,999")}
                    className="metallic-btn-ghost w-full rounded-full py-3 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Choose Essential →
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="text-[11px] font-mono text-pink-300 hover:text-white underline underline-offset-4 text-center py-1"
                  >
                    View All 10 Inclusions &amp; Deliverables →
                  </button>
                </div>
              </div>

              {/* Package 2: Signature (Featured with subtle Baby Pink Highlight) */}
              <div className="rounded-2xl metallic-card-pink p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative text-center sm:text-left">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-200 to-white text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-0.5 shadow-md">
                  RECOMMENDED FOR GROWING BUSINESSES
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300">
                    For Growing Businesses
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Signature Website
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="font-editorial text-4xl sm:text-5xl font-light text-white">
                      ₹19,999
                    </span>
                    <span className="text-xs font-mono text-pink-200">/ starting price</span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% advance (₹10,000) · 50% on final launch
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    “A more distinctive digital experience for businesses ready to strengthen their
                    brand and customer journey.”
                  </p>

                  {/* Clean 4 Key Inclusions */}
                  <ul className="mt-6 space-y-2 border-t border-white/15 pt-5 text-xs font-mono text-slate-300 text-left">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-pink-300 shrink-0 mt-0.5" />
                      <span>Up to 5 pages with rich brand storytelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-pink-300 shrink-0 mt-0.5" />
                      <span>Appointment / booking or enquiry flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-pink-300 shrink-0 mt-0.5" />
                      <span>Services, products &amp; portfolio showcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-pink-300 shrink-0 mt-0.5" />
                      <span>On-page SEO across all included pages</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/15 flex flex-col gap-2.5">
                  <button
                    onClick={() => selectPlanAndScroll("Signature — ₹19,999")}
                    className="metallic-btn-pink w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Choose Signature →
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="text-[11px] font-mono text-pink-200 hover:text-white underline underline-offset-4 text-center py-1"
                  >
                    View All Inclusions &amp; Deliverables →
                  </button>
                </div>
              </div>

              {/* Package 3: Premium */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/80 p-6 sm:p-8 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Established &amp; Premium Brands
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Premium Website
                  </h3>
                  <div className="mt-4 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="font-editorial text-4xl sm:text-5xl font-light text-white">
                      ₹59,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ starting price</span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% advance (₹30,000) · 50% on final launch
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    “A bespoke website experience for businesses that need more sophisticated
                    design, functionality, and flexibility.”
                  </p>

                  {/* Clean 4 Key Inclusions */}
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-mono text-slate-300 text-left">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Bespoke visual direction &amp; custom animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Custom project scope &amp; page architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Advanced booking or CMS integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Documented handover &amp; performance plan</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <button
                    onClick={() => selectPlanAndScroll("Premium — ₹59,999")}
                    className="metallic-btn-ghost w-full rounded-full py-3 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Discuss a Premium Project →
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="text-[11px] font-mono text-pink-300 hover:text-white underline underline-offset-4 text-center py-1"
                  >
                    View All Inclusions &amp; Deliverables →
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Link for Full Pricing Rules & Scope */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveInfoModal("pricing")}
                className="metallic-btn-ghost rounded-full px-6 py-3 text-xs font-mono uppercase tracking-wider text-pink-200 hover:text-white inline-flex items-center gap-2"
              >
                <span>Compare Full Scope &amp; Deliverables Checklist</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 5. MONTHLY WEBSITE CARE PLANS (STREAMLINED) ===================== */}
        <section
          id="care-plans"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#010309]"
        >
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Optional Ongoing Support
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Your Website, Taken Care Of
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Launching your website is only the beginning. Choose an optional care plan for
                ongoing maintenance, minor updates, and peace of mind.
              </p>
            </div>

            {/* 2 Streamlined Care Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Plan 1: Basic Care */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-8 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Essential Support
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    Basic Care
                  </h3>
                  <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="font-editorial text-3xl sm:text-4xl font-light text-white">
                      ₹1,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ month</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    Up to 2 small update requests per month (up to 30 mins), minor text and image
                    edits, broken-link checks, and email support during business hours.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => selectPlanAndScroll("Monthly Website Care")}
                    className="metallic-btn-ghost w-full sm:w-auto rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10"
                  >
                    Choose Basic Care →
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="text-[11px] font-mono text-pink-300 hover:text-white underline underline-offset-4"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Plan 2: Premium Care */}
              <div className="rounded-2xl border border-pink-300/30 bg-[#091738]/85 p-6 sm:p-8 flex flex-col justify-between shadow-xl text-center sm:text-left">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300">
                    Hands-On Support
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    Premium Care
                  </h3>
                  <div className="mt-3 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="font-editorial text-3xl sm:text-4xl font-light text-white">
                      ₹3,999
                    </span>
                    <span className="text-xs font-mono text-pink-200">/ month</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    Everything in Basic Care, plus up to 5 small update requests per month (up to 90
                    mins), priority business-hour response, form checks, and monthly reviews.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => selectPlanAndScroll("Monthly Website Care")}
                    className="metallic-btn-pink w-full sm:w-auto rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md"
                  >
                    Choose Premium Care →
                  </button>
                  <button
                    onClick={() => setActiveInfoModal("pricing")}
                    className="text-[11px] font-mono text-pink-200 hover:text-white underline underline-offset-4"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Read Complete Maintenance Policies Button */}
            <div className="mt-10 text-center">
              <button
                onClick={() => setActiveInfoModal("pricing")}
                className="text-xs font-mono text-slate-400 hover:text-pink-200 underline underline-offset-4"
              >
                Read full care plan inclusions, limits &amp; custom arrangements →
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 6. PROCESS & 50/50 PAYMENT TERMS ===================== */}
        <section
          id="process"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#01040d]"
        >
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                A Clear 4-Step Journey
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                How It Works
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                From your initial idea to public launch, our process is structured, transparent, and
                collaborative.
              </p>
            </div>

            {/* 4 Process Steps (Centered on Mobile) */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  name: "DISCUSS",
                  desc: "We understand your business, audience, goals, and website requirements.",
                },
                {
                  step: "02",
                  name: "DESIGN",
                  desc: "We create a tailored website concept and refine the direction with your feedback.",
                },
                {
                  step: "03",
                  name: "BUILD",
                  desc: "We develop the approved design with responsive code and test across all devices.",
                },
                {
                  step: "04",
                  name: "LAUNCH",
                  desc: "We help publish the website, provide handover, and discuss optional ongoing care.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 flex flex-col justify-between text-center sm:text-left"
                >
                  <div>
                    <span className="font-editorial text-3xl font-light text-pink-300/80">
                      {s.step}
                    </span>
                    <h3 className="mt-2 font-editorial text-lg font-light text-white uppercase tracking-wider">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Terms Callout with Modal Button */}
            <div className="mt-12 rounded-2xl border border-white/15 bg-[#060e22]/90 p-6 sm:p-8 backdrop-blur-xl text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                Payment Safety &amp; Control
              </span>
              <h3 className="mt-2 font-editorial text-2xl font-light uppercase text-white tracking-wide">
                Simple, Transparent 50/50 Project Terms
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                50% advance to begin the project. The final 50% is payable only before final launch
                or handover, as agreed in the written proposal. You retain agreed administrative
                access and ownership of your website and assets.
              </p>
              <button
                onClick={() => setActiveInfoModal("process")}
                className="mt-6 metallic-btn-ghost rounded-full px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-pink-200 hover:text-white inline-flex items-center gap-1.5"
              >
                <span>View Full Ownership &amp; Payment Details</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 7. WHY CHOOSE SEESITES? (MINIMALIST) ===================== */}
        <section
          id="why-us"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#02050f]/70"
        >
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Studio Standards
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Good Design. Clear Communication. No Unnecessary Complexity.
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                We believe Indian business owners deserve high-quality web design without jargon,
                hidden fees, or frustrating delays.
              </p>
            </div>

            {/* 3 Core Summary Pillars (Not 7 cluttered cards) */}
            <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-pink-300 uppercase tracking-widest">
                    Pillar 01
                  </span>
                  <h3 className="mt-2 font-editorial text-xl font-light uppercase text-white">
                    Custom-Designed Experiences
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                    Websites shaped around your business’s brand, audience, and goals — never
                    generic cookie-cutter templates.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-pink-300/30 bg-[#091530]/80 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-pink-300 uppercase tracking-widest">
                    Pillar 02
                  </span>
                  <h3 className="mt-2 font-editorial text-xl font-light uppercase text-white">
                    Mobile-First &amp; Fast
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                    Fluid layouts engineered to look stunning and load quickly across all modern
                    smartphones and tablets.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-pink-300 uppercase tracking-widest">
                    Pillar 03
                  </span>
                  <h3 className="mt-2 font-editorial text-xl font-light uppercase text-white">
                    Direct 1-on-1 Communication
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                    You work directly with the person designing and building your website. No
                    middlemen, no confusion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 8. FAQ SECTION (4 IN FRONT, REST VIA BUTTON) ===================== */}
        <section
          id="faq"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#02050f]/80"
        >
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Questions &amp; Answers
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light">
                Direct answers to common questions about working with SeeSites.
              </p>
            </div>

            {/* Accordion List (Top 4 Questions) */}
            <div className="space-y-3">
              {frontFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/15 bg-[#060e22]/70 backdrop-blur-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-editorial text-lg sm:text-xl font-light text-white tracking-wide">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-pink-300" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/10 pt-4 text-left">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Button to Open All 10 FAQs in Modal */}
            <div className="mt-8 text-center">
              <button
                onClick={() => setActiveInfoModal("faq")}
                className="metallic-btn-ghost rounded-full px-6 py-3 text-xs font-mono uppercase tracking-wider text-pink-200 hover:text-white inline-flex items-center gap-2"
              >
                <span>Read All 10 Common Questions &amp; Facts</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 9. CONTACT / ENQUIRY SECTION ===================== */}
        <section
          id="contact"
          className="px-5 py-20 sm:px-8 sm:py-28 md:px-12 border-t border-white/10 bg-[#010309]"
        >
          <div className="mx-auto max-w-4xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-pink-300 uppercase">
                Start Your Project
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Let’s Build Something Your Business Can Be Proud Of
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light">
                Tell us a little about your business and what you need. We’ll help you explore the
                right website package.
              </p>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <Mail className="h-3.5 w-3.5 text-pink-300" />
                <span>Studio email:</span>
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="text-pink-200 underline underline-offset-4 hover:text-white"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>

            {/* Functional EnquiryForm */}
            <div className="rounded-2xl border border-white/15 bg-[#060e22]/90 p-5 sm:p-8 md:p-10 backdrop-blur-xl">
              <EnquiryForm />
            </div>
          </div>
        </section>

        {/* ===================== 10. FOOTER ===================== */}
        <footer className="border-t border-white/10 bg-[#010206] px-5 py-12 sm:px-8 sm:py-16 md:px-12 text-center sm:text-left">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-4 pb-10 border-b border-white/10">
              {/* Col 1: Wordmark & Statement */}
              <div className="md:col-span-1">
                <span className="font-editorial text-2xl font-light tracking-[0.1em] text-white">
                  SEESITES
                </span>
                <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed">
                  “Thoughtfully designed websites for businesses ready to make their mark.”
                </p>
                <div className="mt-4">
                  <a
                    href={`mailto:${OFFICIAL_EMAIL}`}
                    className="text-xs font-mono text-pink-200 hover:text-white underline underline-offset-4"
                  >
                    {OFFICIAL_EMAIL}
                  </a>
                </div>
              </div>

              {/* Col 2: Services */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-pink-300 mb-3 font-semibold">
                  Services
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Business Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Salon &amp; Beauty Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Restaurant &amp; Café Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Boutique &amp; Brand Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Healthcare &amp; Clinic Websites
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: Packages & Care */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-pink-300 mb-3 font-semibold">
                  Packages &amp; Care
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Essential — ₹9,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Signature — ₹19,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Premium — ₹59,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("care-plans")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Basic Care — ₹1,999/mo
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("care-plans")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Premium Care — ₹3,999/mo
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: Quick Navigation & Legal */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-pink-300 mb-3 font-semibold">
                  Studio &amp; Legal
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button
                      onClick={() => scrollTo("work")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Portfolio Showcase
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("process")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveInfoModal("faq")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      FAQ (All 10 Questions)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveInfoModal("terms")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveInfoModal("privacy")}
                      className="hover:text-white text-center sm:text-left w-full sm:w-auto"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500 text-center sm:text-left">
              <span>
                © {new Date().getFullYear()} SeeSites. All rights reserved. Custom Website Design
                Studio India.
              </span>
              <span>All portfolio concept projects clearly labeled as sample designs.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
