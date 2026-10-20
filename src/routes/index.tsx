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

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Our website packages start at ₹9,999 for the Essential package, ₹19,999 for the Signature package, and ₹59,999 for the bespoke Premium package. Final pricing always depends on your agreed project scope, number of pages, and specific custom requirements.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Standard website projects typically take between 7 to 21 business days. Timelines depend on project complexity, the speed of client feedback, and how promptly brand assets, text, and images are provided.",
  },
  {
    q: "Will my website work on mobile phones?",
    a: "Yes. Every website we design uses a mobile-first responsive architecture. We test every layout across popular smartphones, tablets, and desktop displays to ensure fluid speed, crisp readability, and effortless navigation.",
  },
  {
    q: "Can I update my website myself?",
    a: "This depends on the chosen platform and setup. We provide appropriate administrative access and can implement user-friendly content editing options. We also provide clear documentation during handover so you know how to make minor updates.",
  },
  {
    q: "Will my website appear on Google?",
    a: "Every website includes foundational on-page SEO setup (clean semantic headings, metadata, fast loading times, and search engine sitemap preparation). While a properly built website supports search visibility, no responsible studio can guarantee specific #1 rankings or lead volumes, as search algorithms depend on ongoing competition.",
  },
  {
    q: "Do I need to pay for hosting and a domain?",
    a: "Yes. Domain registration and web hosting are standard external costs of running any live website. We guide you through choosing the most reliable and affordable provider, ensuring you maintain 100% ownership and control over your domain.",
  },
  {
    q: "What happens after my website launches?",
    a: "Once launched, you own your website and can operate it independently. For business owners who prefer ongoing support with text updates, price changes, and monthly technical health checks, we offer optional Basic Care (₹1,999/mo) and Premium Care (₹3,999/mo) plans.",
  },
  {
    q: "Can you build a website for my type of business?",
    a: "Yes. While we highlight examples for salons, restaurants, boutiques, clinics, and interior designers, SeeSites creates websites for diverse businesses across India. We welcome custom inquiries for any ambitious business.",
  },
  {
    q: "Will I have access to my website?",
    a: "Absolutely. We believe business owners should always retain control. You receive agreed administrative access, website content, assets, and clear handover documentation, subject to chosen platform terms.",
  },
  {
    q: "Can I request changes after launch?",
    a: "Yes. Minor updates like updating a phone number or adding a new menu item are covered under our optional monthly care plans. Larger changes or new page expansions beyond the initial allowance are quoted separately as needed.",
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
            <span className="font-editorial text-lg sm:text-xl font-light tracking-[0.1em] text-white group-hover:opacity-80 transition-opacity">
              SEESITES
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-slate-400 border-l border-white/15 pl-2">
              Studio India
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-widest text-[#cbd5e1] uppercase"
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
              Packages
            </button>
            <button
              onClick={() => scrollTo("care-plans")}
              className="hover:text-white transition-colors"
            >
              Care Plans
            </button>
            <button
              onClick={() => scrollTo("why-us")}
              className="hover:text-white transition-colors"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="hover:text-white transition-colors"
            >
              Process
            </button>
            <button onClick={() => scrollTo("faq")} className="hover:text-white transition-colors">
              FAQ
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-primary rounded-full px-5 py-2 text-[11px] font-bold tracking-wider text-slate-950 uppercase"
            >
              Get Your Website
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              onClick={() => scrollTo("contact")}
              className="metallic-btn-primary rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wider text-slate-950 uppercase"
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
            className="lg:hidden mt-3 border-t border-white/10 pt-4 pb-3 flex flex-col gap-2.5 font-mono text-xs uppercase tracking-widest text-slate-300"
          >
            <button
              onClick={() => scrollTo("services")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Services Built for Your Business
            </button>
            <button
              onClick={() => scrollTo("work")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Explore Our Work (5 Concepts)
            </button>
            <button
              onClick={() => scrollTo("pricing")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Packages &amp; Pricing (From ₹9,999)
            </button>
            <button
              onClick={() => scrollTo("care-plans")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Monthly Care Plans (From ₹1,999/mo)
            </button>
            <button
              onClick={() => scrollTo("why-us")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Why Choose SeeSites
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              How It Works (4 Steps)
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-left py-2 px-1 hover:text-white transition-colors border-b border-white/5"
            >
              Common Questions (FAQ)
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-left py-2.5 px-1 text-white font-bold"
            >
              Get Your Website →
            </button>
          </nav>
        )}
      </header>

      {/* Main Content Stream */}
      <main className="relative z-10 w-full pt-16">
        {/* ===================== 1. HERO SECTION ===================== */}
        <section
          id="hero"
          className="min-h-[88vh] flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-20 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-6xl w-full">
            {/* Wordmark Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-slate-300 mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>SeeSites · Custom Website Design &amp; Development Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase text-white leading-[1.12] tracking-[0.025em] max-w-5xl">
              Your Business Deserves More Than Just Social Media.
            </h1>

            {/* Supporting Headline */}
            <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-[#cbd5e1] font-light leading-relaxed">
              Custom websites designed to help your business stand out, showcase what you offer, and
              make it easier for customers to find and contact you.
            </p>

            {/* Sub-line */}
            <p className="mt-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-400">
              Custom websites for ambitious businesses across India.
            </p>

            {/* Two Action CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5">
              <button
                onClick={() => scrollTo("contact")}
                className="metallic-btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.16em] uppercase text-slate-950 shadow-xl hover:scale-105 transition-all"
              >
                <span>Get Your Website</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => scrollTo("work")}
                className="metallic-btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-mono tracking-wider uppercase text-white hover:bg-white/10 transition-all"
              >
                <span>Explore Our Work</span>
                <span>↓</span>
              </button>
            </div>

            {/* Hero Visual Mockup Grid Showcase */}
            <div className="mt-14 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "Salons & Beauty",
                    sub: "AURA Studio · Mumbai",
                    img: auraImg,
                    id: "aura" as ProjectId,
                  },
                  {
                    name: "Fashion Boutiques",
                    sub: "VAANI Atelier · Delhi",
                    img: vaaniImg,
                    id: "vaani" as ProjectId,
                  },
                  {
                    name: "Clinics & Healthcare",
                    sub: "AESTHETICA · Bengaluru",
                    img: aestheticaImg,
                    id: "aesthetica" as ProjectId,
                  },
                  {
                    name: "Restaurants & Cafés",
                    sub: "THE ARTISAN · Mumbai",
                    img: artisanImg,
                    id: "artisan" as ProjectId,
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setActiveDemo(item.id)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#060e22] aspect-[4/3] transition-all hover:border-white/40"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030714] via-[#030714]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-semibold text-white tracking-wide">
                          {item.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-300">{item.sub}</p>
                      </div>
                      <span className="rounded-full bg-white/10 p-1 text-slate-300 group-hover:text-white transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust & Legitimacy Highlights */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-300">
              <div className="border-l border-white/15 pl-3">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                  Starting Rates
                </span>
                <span className="text-white font-medium">From ₹9,999 (Flat Rate)</span>
              </div>
              <div className="border-l border-white/15 pl-3">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                  Payment Safety
                </span>
                <span className="text-emerald-400 font-medium">50/50 Milestones</span>
              </div>
              <div className="border-l border-white/15 pl-3">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                  Client Control
                </span>
                <span className="text-white font-medium">100% Asset Handover</span>
              </div>
              <div className="border-l border-white/15 pl-3">
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">
                  Market Coverage
                </span>
                <span className="text-white font-medium">All Cities in India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 2. SERVICES SECTION ===================== */}
        <section
          id="services"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/60"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Purpose-Built Digital Presence
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Websites Built Around Your Business
              </h2>
              <p className="mt-3 max-w-2xl text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Whether you’re starting small, growing your customer base, or building a premium
                brand, SeeSites creates websites tailored to your goals.
              </p>
            </div>

            {/* 6 Core Service Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  letter: "A",
                  title: "Business Websites",
                  desc: "Professional websites for local businesses, service providers, and independent professionals looking to establish authority and trust.",
                  highlight: "Services Showcase · Lead Enquiries · Google Maps",
                  icon: Briefcase,
                },
                {
                  letter: "B",
                  title: "Salon & Beauty Websites",
                  desc: "Elegant websites featuring services, price lists, galleries, stylist information, and appointment enquiries.",
                  highlight: "Treatment Menus · Stylist Profiles · WhatsApp Booking",
                  icon: Scissors,
                },
                {
                  letter: "C",
                  title: "Restaurant & Café Websites",
                  desc: "Websites featuring menus, photographs, opening hours, locations, and enquiry or reservation options.",
                  highlight: "Digital Menus · Food Photography · Table Reservations",
                  icon: Utensils,
                },
                {
                  letter: "D",
                  title: "Boutique & Brand Websites",
                  desc: "Beautiful digital storefronts for fashion brands, boutiques, and independent businesses ready to tell their craft story.",
                  highlight: "Collection Lookbooks · Atelier Craft · Direct Enquiries",
                  icon: ShoppingBag,
                },
                {
                  letter: "E",
                  title: "Healthcare & Professional Websites",
                  desc: "Clean, credible websites for clinics, dental practices, consultants, and professional service providers.",
                  highlight: "Doctor Credentials · Treatment Guides · Patient Booking",
                  icon: Stethoscope,
                },
                {
                  letter: "F",
                  title: "Custom Website Solutions",
                  desc: "Tailored designs and functionality based on the business’s requirements, from bespoke portals to advanced enquiry workflows.",
                  highlight: "Custom Scope · Bespoke Visuals · Scalable Code",
                  icon: SlidersHorizontal,
                },
              ].map((svc) => {
                const IconComponent = svc.icon;
                return (
                  <div
                    key={svc.title}
                    className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between hover:border-white/30 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          Category {svc.letter}
                        </span>
                        <div className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="font-editorial text-xl sm:text-2xl font-light uppercase text-white tracking-wide">
                        {svc.title}
                      </h3>
                      <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <p className="text-[11px] font-mono text-emerald-400">{svc.highlight}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Industry Inclusivity Banner */}
            <div className="mt-10 rounded-2xl border border-white/15 bg-[#030714] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Serving all ambitious businesses across India
                </p>
                <p className="text-xs text-slate-400 font-light">
                  Gyms, interior designers, jewellery businesses, photographers, coaching
                  institutes, and more — custom projects are always welcome.
                </p>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="metallic-btn-primary shrink-0 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Discuss Your Industry →
              </button>
            </div>
          </div>
        </section>

        {/* ===================== 3. PORTFOLIO AND PROJECT SHOWCASE ===================== */}
        <section
          id="work"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#01040d]"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                  Design Demonstrations
                </span>
                <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                  Designed for Businesses With Something to Say
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Explore website concepts demonstrating how thoughtful design can help different
                types of businesses present themselves online.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
                    selectedFilter === cat
                      ? "bg-white text-slate-950 font-bold shadow-md"
                      : "border border-white/15 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white"
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
                        <span className="rounded-full bg-[#030714]/90 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300 backdrop-blur-md">
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

                  {/* Launch Working Concept Demo Button */}
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
              created by SeeSites to demonstrate capabilities across industries.
            </p>
          </div>
        </section>

        {/* ===================== 4. WEBSITE PACKAGES AND PRICING ===================== */}
        <section
          id="pricing"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/80"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Accessible Starting Prices in INR
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Website Packages and Pricing
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Clear deliverables, transparent starting rates, and zero hidden costs. Choose the
                scope that matches your business stage.
              </p>
            </div>

            {/* 3 Pricing Cards */}
            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              {/* Package 1: Essential */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/80 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Small Businesses
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Essential Website
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
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

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 3 pages or agreed scope</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Customised visual design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile-responsive layout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Essential business information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Services or product showcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Contact form &amp; WhatsApp integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Google Maps integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic on-page SEO setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic performance &amp; usability checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Launch assistance &amp; handover</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => selectPlanAndScroll("Essential — ₹9,999")}
                    className="metallic-btn-ghost w-full rounded-full py-3 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Choose Essential →
                  </button>
                </div>
              </div>

              {/* Package 2: Signature (Featured & Highlighted) */}
              <div className="rounded-2xl border border-white/40 bg-[#091738]/95 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-0.5 shadow-md">
                  RECOMMENDED FOR GROWING BUSINESSES
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Growing Businesses
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Signature Website
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-editorial text-4xl sm:text-5xl font-light text-white">
                      ₹19,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ starting price</span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% advance (₹10,000) · 50% on final launch
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    “A more distinctive digital experience for businesses ready to strengthen their
                    brand and customer journey.”
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 5 pages or agreed scope</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>More extensive custom visual design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Enhanced layouts &amp; visual storytelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile-responsive design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Services, products, or portfolio sections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Contact and enquiry forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>WhatsApp contact integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Appointment or booking integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>On-page SEO across included pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Performance &amp; usability checks + launch</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => selectPlanAndScroll("Signature — ₹19,999")}
                    className="metallic-btn-primary w-full rounded-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Choose Signature →
                  </button>
                </div>
              </div>

              {/* Package 3: Premium */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/80 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Established &amp; Premium Brands
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Premium Website
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
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

                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Custom project scope &amp; page architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Bespoke visual direction &amp; branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Advanced page layouts &amp; custom animations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Rich brand storytelling &amp; art direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Expanded service or product presentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Advanced enquiry or booking integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Content management options where appropriate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>SEO and performance planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Testing and launch support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Documented project handover</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => selectPlanAndScroll("Premium — ₹59,999")}
                    className="metallic-btn-ghost w-full rounded-full py-3 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Discuss a Premium Project →
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Transparency & Rules Note */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#060e22]/50 p-5 text-xs font-mono text-slate-400 space-y-2">
              <p>
                <strong className="text-white">Scope &amp; Proposal Note:</strong> Final pricing
                depends on your agreed project scope. The exact number of pages, custom features,
                and deliverables are clearly documented in your written proposal before kickoff.
              </p>
              <p>
                Advanced integrations, full e-commerce operations, paid third-party tools, premium
                plugins, domain registration, and hosting may incur separate costs. No guaranteed
                search rankings or sales figures are promised.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== 5. MONTHLY WEBSITE CARE PLANS ===================== */}
        <section
          id="care-plans"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#010309]"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Optional Ongoing Support
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Your Website, Taken Care Of
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Launching your website is only the beginning. Choose a care plan for ongoing
                support, maintenance, and updates.
              </p>
            </div>

            {/* 2 Care Plans Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Plan 1: Basic Care */}
              <div className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Businesses That Need Essential Website Support
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Basic Care
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-editorial text-3xl sm:text-4xl font-light text-white">
                      ₹1,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ month</span>
                  </div>

                  <p className="mt-4 text-xs font-mono uppercase text-emerald-400 tracking-wider">
                    Included Inclusions:
                  </p>
                  <ul className="mt-2 space-y-2 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic website health checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Software or platform updates where applicable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Minor text and image updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Small content corrections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Broken-link checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic technical troubleshooting &amp; email support</span>
                    </li>
                  </ul>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs font-mono text-slate-400">
                    <p className="text-slate-300 font-semibold mb-1">Monthly Update Scope:</p>
                    <p>• Up to 2 small update requests per month</p>
                    <p>
                      • Up to 30 minutes of minor content changes per month (unused time not carried
                      forward)
                    </p>
                    <p>• Requests handled during normal business hours</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => selectPlanAndScroll("Monthly Website Care")}
                    className="metallic-btn-ghost w-full rounded-full py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                  >
                    Choose Basic Care →
                  </button>
                </div>
              </div>

              {/* Plan 2: Premium Care */}
              <div className="rounded-2xl border border-white/25 bg-[#091738]/80 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    For Businesses That Want More Hands-On Support
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light text-white uppercase">
                    Premium Care
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-editorial text-3xl sm:text-4xl font-light text-white">
                      ₹3,999
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ month</span>
                  </div>

                  <p className="mt-4 text-xs font-mono uppercase text-emerald-400 tracking-wider">
                    Included Inclusions:
                  </p>
                  <ul className="mt-2 space-y-2 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Everything in Basic Care included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>More frequent website checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Priority support during business hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>More frequent minor content and image updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic monthly performance &amp; SEO health review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Broken-link and form-functionality checks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Monthly maintenance summary + visual adjustments</span>
                    </li>
                  </ul>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3.5 text-xs font-mono text-slate-400">
                    <p className="text-slate-300 font-semibold mb-1">Monthly Update Scope:</p>
                    <p>• Up to 5 small update requests per month</p>
                    <p>
                      • Up to 90 minutes of minor content and visual changes (unused time not
                      carried forward)
                    </p>
                    <p>• Priority response during stated business hours</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => selectPlanAndScroll("Monthly Website Care")}
                    className="metallic-btn-primary w-full rounded-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md"
                  >
                    Choose Premium Care →
                  </button>
                </div>
              </div>
            </div>

            {/* Clear Care Plan Policy Note */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#060e22]/50 p-5 text-xs font-mono text-slate-400 space-y-2">
              <p>
                <strong className="text-white">Maintenance Policy Note:</strong> Care plans cover
                the maintenance services described above. They are optional ongoing services
                available after launch. They do not include major redesigns, new pages beyond
                allowance, full e-commerce operations, extensive advertising campaigns, paid plugin
                subscriptions, or 24/7 emergency response.
              </p>
              <p>
                Hosting, domain renewals, paid software, and third-party subscriptions are charged
                separately unless specifically included in your proposal.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="text-slate-300">
                  Need something different? Ask us about a custom maintenance arrangement.
                </span>
                <button
                  onClick={() => selectPlanAndScroll("Monthly Website Care")}
                  className="text-white font-mono underline underline-offset-4 hover:text-slate-300"
                >
                  Choose Your Care Plan →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 6. WHY CHOOSE SEESITES? ===================== */}
        <section
          id="why-us"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/70"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Studio Standards
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Good Design. Clear Communication. No Unnecessary Complexity.
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                We believe Indian business owners deserve high-quality web design without jargon,
                hidden fees, or frustrating agency delays.
              </p>
            </div>

            {/* 7 Pillars Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "CUSTOM-DESIGNED EXPERIENCES",
                  desc: "Websites shaped specifically around your business’s brand, audience, and commercial goals — never generic cookie-cutter templates.",
                },
                {
                  title: "MOBILE-FIRST APPROACH",
                  desc: "Layouts designed and tested to work fluidly across modern phones, tablets, and desktops, ensuring fast tap navigation.",
                },
                {
                  title: "BUILT AROUND YOUR CUSTOMERS",
                  desc: "Clear service information, transparent pricing menus, and intuitive contact options that help visitors take the next step.",
                },
                {
                  title: "TRANSPARENT PRICING",
                  desc: "Clear package starting prices with agreed project deliverables documented in your proposal prior to kickoff.",
                },
                {
                  title: "DIRECT COMMUNICATION",
                  desc: "Clients work directly with the person designing and developing their website, eliminating miscommunications.",
                },
                {
                  title: "CLIENT ACCESS AND CONTROL",
                  desc: "Clients receive the agreed administrative access and ownership rights for their website and applicable assets, subject to chosen platform terms.",
                },
                {
                  title: "ONGOING SUPPORT",
                  desc: "Optional monthly maintenance plans for businesses that want reliable technical assistance and routine updates after launch.",
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 sm:p-7 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Pillar 0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-editorial text-xl font-light uppercase text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 7. HOW IT WORKS & PAYMENT TERMS ===================== */}
        <section
          id="how-it-works"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#01040d]"
        >
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-12">
              <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase">
                A Smooth 4-Step Journey
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                How It Works
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                From your initial idea to public launch, our process is structured, transparent, and
                collaborative.
              </p>
            </div>

            {/* 4 Process Steps */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  name: "DISCUSS",
                  desc: "We understand your business, audience, goals, and website requirements. We agree upon scope and deliverables.",
                },
                {
                  step: "02",
                  name: "DESIGN",
                  desc: "We create a website concept and refine the agreed direction with your feedback on typography, colors, and layout.",
                },
                {
                  step: "03",
                  name: "BUILD",
                  desc: "We develop the approved design into responsive code and thoroughly test the website across supported mobile and desktop devices.",
                },
                {
                  step: "04",
                  name: "LAUNCH",
                  desc: "We help publish the website, provide the agreed administrative handover, and discuss optional ongoing care.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-white/15 bg-[#060e22]/70 p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-editorial text-3xl sm:text-4xl font-light text-slate-500">
                      {s.step}
                    </span>
                    <h3 className="mt-3 font-editorial text-xl font-light text-white uppercase tracking-wider">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs font-mono text-slate-400">
              *Note: Project delivery timelines typically range between 7 to 21 business days,
              depending on project scope, prompt client feedback, and the timely supply of content
              and assets.
            </p>

            {/* Payment Terms & Ownership Breakdown */}
            <div className="mt-14 rounded-2xl border border-white/15 bg-[#060e22]/90 p-6 sm:p-10 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                Transparent Collaboration
              </span>
              <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-light uppercase text-white tracking-wide">
                Simple, Transparent Project Terms
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs font-mono text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">50% Advance Payment</span>
                    <span>To schedule and begin project production and concept design.</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">50% Launch Payment</span>
                    <span>
                      Payable before final launch or handover, as agreed in the written proposal.
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">
                      Defined Project Deliverables
                    </span>
                    <span>
                      Project scope, timeline, and included revisions are confirmed before work
                      begins.
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block">
                      Client Access &amp; Handover
                    </span>
                    <span>
                      Appropriate administrative access, content assets, and handover documentation
                      provided.
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] font-mono text-slate-400">
                Domain registration, hosting, and third-party tool costs are disclosed prior to
                purchase. Optional monthly care plans are available after launch.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== 8. FAQ SECTION ===================== */}
        <section
          id="faq"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#02050f]/80"
        >
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-6 mb-10 text-center sm:text-left">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Questions &amp; Answers
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light">
                Direct answers to common questions about working with SeeSites.
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
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
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== 9. CONTACT / ENQUIRY SECTION ===================== */}
        <section
          id="contact"
          className="px-5 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 border-t border-white/10 bg-[#010309]"
        >
          <div className="mx-auto max-w-4xl">
            <div className="border-b border-white/10 pb-6 mb-10 text-center sm:text-left">
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Start Your Project
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase text-white tracking-[0.03em]">
                Let’s Build Something Your Business Can Be Proud Of
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light">
                Tell us a little about your business and what you need. We’ll help you explore the
                right website package.
              </p>
              <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-slate-400">
                <Mail className="h-3.5 w-3.5" />
                <span>Studio email:</span>
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="text-white underline underline-offset-4 hover:text-slate-300"
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
        <footer className="border-t border-white/10 bg-[#010206] px-5 py-12 sm:px-8 sm:py-16 md:px-12">
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
                    className="text-xs font-mono text-slate-300 hover:text-white underline underline-offset-4"
                  >
                    {OFFICIAL_EMAIL}
                  </a>
                </div>
              </div>

              {/* Col 2: Services */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 font-semibold">
                  Services
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Business Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Salon &amp; Beauty Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Restaurant &amp; Café Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Boutique &amp; Brand Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Healthcare &amp; Clinic Websites
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("services")}
                      className="hover:text-white text-left"
                    >
                      Custom Website Solutions
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: Packages & Care */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 font-semibold">
                  Packages &amp; Care
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-left"
                    >
                      Essential — ₹9,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-left"
                    >
                      Signature — ₹19,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("pricing")}
                      className="hover:text-white text-left"
                    >
                      Premium — ₹59,999
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("care-plans")}
                      className="hover:text-white text-left"
                    >
                      Basic Care — ₹1,999/mo
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("care-plans")}
                      className="hover:text-white text-left"
                    >
                      Premium Care — ₹3,999/mo
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 4: Quick Navigation & Legal */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-3 font-semibold">
                  Studio &amp; Legal
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-400">
                  <li>
                    <button onClick={() => scrollTo("work")} className="hover:text-white text-left">
                      Portfolio Showcase
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollTo("how-it-works")}
                      className="hover:text-white text-left"
                    >
                      4-Step Process
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollTo("faq")} className="hover:text-white text-left">
                      FAQ &amp; Facts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveInfoModal("terms")}
                      className="hover:text-white text-left"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveInfoModal("privacy")}
                      className="hover:text-white text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
              <span>
                © {new Date().getFullYear()} SeeSites. All rights reserved. Custom Website Design
                &amp; Development Studio India.
              </span>
              <span>All portfolio concept projects clearly labeled as sample designs.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
