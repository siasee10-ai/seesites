import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { ArchitecturalSpiralCanvas } from "@/components/site/ArchitecturalSpiralCanvas";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { ArrowUpRight, Check, ShieldCheck, Star } from "lucide-react";
import lunaImg from "@/assets/project-luna.jpg";
import noirImg from "@/assets/project-noir-cafe.jpg";
import mesaImg from "@/assets/project-mesa.jpg";

const TITLE = "SEESITES® — Custom Websites for Restaurants & Cafés";
const DESC =
  "SEESITES creates custom websites exclusively for restaurants and cafés. Your restaurant deserves a digital home as distinctive as the experience you create.";

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

const projects = [
  {
    title: "LUNA",
    type: "Contemporary Restaurant — New York",
    desc: "Intimate chiaroscuro lighting, custom dining typography, and seamless reservation integration.",
    image: lunaImg,
    tag: "Concept Project",
  },
  {
    title: "NOIR",
    type: "Specialty Café — Toronto",
    desc: "Brushed silver espresso architecture, daily batch digital menus, and pour-over storytelling.",
    image: noirImg,
    tag: "Concept Project",
  },
  {
    title: "MESA",
    type: "Modern Dining — Vancouver",
    desc: "Monolithic twilight Pacific views, multi-course tasting presentations, and mobile table bookings.",
    image: mesaImg,
    tag: "Concept Project",
  },
];

const servicesList = [
  {
    title: "CUSTOM WEB DESIGN",
    badge: "Bespoke Direction",
    desc: "Custom visual identity and digital atmosphere crafted exclusively for your restaurant, café, or dining space. No generic templates.",
  },
  {
    title: "HIGH-PERFORMANCE WEB DEVELOPMENT",
    badge: "Speed & Polish",
    desc: "Lightning-fast, mobile-first websites with fluid interactions, kinetic typography, and flawless responsiveness across all devices.",
  },
  {
    title: "DOMAIN & CLOUD SETUP",
    badge: "Full Setup",
    desc: "Complete guidance acquiring and linking your custom domain, SSL certificates, DNS configurations, and fast global hosting.",
  },
  {
    title: "DEDICATED CLIENT ADMIN PANEL",
    badge: "Standard With Every Website",
    highlight: true,
    desc: "Every website comes standard with a private, easy-to-use Client Admin Panel. Easily update menu items, prices, daily specials, operating hours, and photography in real-time — without touching code or waiting on a developer.",
  },
  {
    title: "RESERVATION & CONTACT INTEGRATIONS",
    badge: "Direct Bookings",
    desc: "Seamless integrations with OpenTable, Resy, SevenRooms, direct phone/SMS, and Google Maps to maximize table reservations.",
  },
  {
    title: "ONGOING MAINTENANCE & TECHNICAL CARE",
    badge: "Peace Of Mind",
    desc: "Comprehensive ongoing support covering seasonal menu updates, price changes, photography swaps, technical upkeep, and priority support.",
  },
];

const maintenanceDetails = [
  {
    title: "Menu & Pricing Updates",
    desc: "New seasonal dishes, tasting menus, daily specials, wine lists, or price updates updated promptly upon request.",
  },
  {
    title: "Photography & Media Refreshes",
    desc: "Swap dish photos, holiday drink specials, atmosphere photography, and chef announcements whenever needed.",
  },
  {
    title: "Holiday Hours & Announcements",
    desc: "Special opening hours, holiday closures, patio season updates, and private event announcements posted on schedule.",
  },
  {
    title: "Technical, Speed & Security Care",
    desc: "Continuous uptime monitoring, mobile browser compatibility checks, SSL management, and performance optimization.",
  },
];

const pricingPlans = [
  {
    name: "ESSENTIAL",
    planValue: "Essential ($200)",
    price: "$200",
    desc: "A clean, modern digital presence for cafés & intimate dining rooms that need a distinctive, reliable website.",
    paymentTerms: "50-50 Rule: $100 kickoff · $100 launch",
    features: [
      "50-50 Payment Rule (50% kickoff / 50% before launch)",
      "Mobile-optimized digital menu",
      "Hours, location & contact integrations",
      "Domain setup & SSL assistance",
      "Fast & responsive mobile-first engineering",
      "Client Admin Panel included",
      "14-day post-launch support",
    ],
  },
  {
    name: "SIGNATURE",
    planValue: "Signature ($500)",
    price: "$500",
    featured: true,
    desc: "A bespoke, immersive website with richer visual atmosphere, interactive menu presentation, and table bookings.",
    paymentTerms: "50-50 Rule: $250 kickoff · $250 launch",
    features: [
      "50-50 Payment Rule (50% kickoff / 50% before launch)",
      "Bespoke visual atmosphere tailored to your cuisine",
      "Interactive digital menu presentation",
      "Reservation flow integration (Resy / OpenTable / Direct)",
      "Polished micro-animations & kinetic typography",
      "Full Client Admin Panel with menu editor",
      "Direct 1-on-1 collaboration with Sia",
      "1 Month of Included Maintenance & Updates",
    ],
  },
  {
    name: "EXPERIENCE",
    planValue: "Experience ($800)",
    price: "$800",
    desc: "A flagship digital identity with advanced motion, atmospheric photography staging, and multi-course tasting layouts.",
    paymentTerms: "50-50 Rule: $400 kickoff · $400 launch",
    features: [
      "50-50 Payment Rule (50% kickoff / 50% before launch)",
      "Flagship digital identity for elevated dining",
      "Atmospheric photography staging & ambient motion",
      "Multi-course tasting layouts & private dining brochures",
      "Advanced kinetic choreography",
      "Dedicated Admin Panel with advanced modules",
      "Priority launch readiness & SEO indexing",
      "3 Months of Included Maintenance & Priority Care",
    ],
  },
];

const maintenancePlans = [
  {
    name: "BASIC CARE",
    planValue: "Basic Care ($150/mo)",
    price: "$150",
    period: "/ month",
    badge: "ESSENTIAL CARE",
    desc: "Complete hosting, continuous technical maintenance, and ongoing minor updates for restaurants with regular menu or hour changes.",
    features: [
      "High-speed cloud hosting & SSL certificate included",
      "Proactive technical maintenance & uptime monitoring",
      "Minor updates: menu items, specials & seasonal pricing",
      "Photography & atmosphere media swaps",
      "Operating hours & holiday notice updates",
      "Turnaround fulfilled within 24–48 business hours",
    ],
  },
  {
    name: "PREMIUM CARE",
    planValue: "Premium Care ($300/mo)",
    price: "$300",
    period: "/ month",
    featured: true,
    badge: "PRIORITY CARE + SEO",
    desc: "Comprehensive care for busy dining spots requiring priority turnaround, basic SEO visibility, and dedicated technical attention.",
    features: [
      "Includes everything in Basic Care (Hosting & Maintenance)",
      "Ongoing minor menu, price, and media updates",
      "Basic SEO optimization & local search ranking upkeep",
      "Priority Support (expedited same-day turnaround)",
      "Google Business profile & reservation link verification",
      "Monthly performance, mobile speed & health audits",
      "Direct priority communication line with Sia",
    ],
  },
];

const reviews = [
  {
    quote:
      "Our weekend foot traffic jumped after our new mobile menu went live. Customers constantly mention how effortless it is to browse our daily pastries on their phones.",
    author: "Elena R.",
    business: "Artisan Bakery & Café — Seattle [PLACEHOLDER]",
  },
  {
    quote:
      "The dark, candlelit atmosphere of our dining room was captured so faithfully. We noticed a substantial increase in direct reservation clicks in month one.",
    author: "Marcus V.",
    business: "Fine Dining Restaurant — Vancouver [PLACEHOLDER]",
  },
  {
    quote:
      "Working directly with Sia gave us complete peace of mind. Transparent pricing, fast turnaround, and zero tech headaches.",
    author: "David M.",
    business: "Bistro & Wine Bar — Chicago [PLACEHOLDER]",
  },
];

function SeeSitesExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preloader sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const selectPlanAndScroll = (planName: string) => {
    window.dispatchEvent(new CustomEvent("seesites:plan", { detail: planName }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#030714] text-[#f8fafc] font-sans selection:bg-[#cbd5e1] selection:text-[#030714]">
      {/* 1. Subtle Cinematic Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* 2. Loading Overlay */}
      {!loaded && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#030714] p-8 md:p-14 text-[#f8fafc] transition-opacity duration-700"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#94a3b8] uppercase">
            SEESITES®
          </div>
          <div className="max-w-md">
            <p className="font-editorial text-2xl md:text-3xl font-light uppercase tracking-[0.04em] text-white leading-snug">
              CUSTOM WEBSITES FOR RESTAURANTS &amp; CAFÉS
            </p>
            <div className="mt-6 h-[1.5px] w-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#f8fafc] animate-pulse w-2/3" />
            </div>
          </div>
          <div className="text-[11px] font-mono tracking-widest text-[#94a3b8]">
            METALLIC SILVER × MIDNIGHT NAVY
          </div>
        </aside>
      )}

      {/* 3. Three.js Monumental Metallic Silver Architectural Spiral Canvas */}
      <ArchitecturalSpiralCanvas scrollProgress={scrollProgress} />

      {/* 4. Ultra-Minimal Fixed Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 mix-blend-difference pointer-events-none">
        <a
          href="#hero"
          className="pointer-events-auto font-display text-sm md:text-base font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
        >
          SEESITES®
        </a>

        <nav
          aria-label="Main"
          className="pointer-events-auto flex items-center gap-5 md:gap-8 text-[11px] font-mono tracking-[0.2em] text-[#cbd5e1] uppercase"
        >
          <button onClick={() => scrollTo("work")} className="hover:text-white transition-colors">
            WORK
          </button>
          <button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">
            SERVICES
          </button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-white transition-colors">
            PRICING
          </button>
          <button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">
            ABOUT
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-white transition-colors">
            CONTACT
          </button>
        </nav>
      </header>

      {/* 5. Editorial Content Stream Layered Over Spiral Canvas */}
      <main className="relative z-10 w-full">
        {/* ===================== HERO SECTION ===================== */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 md:px-12 md:pt-40 md:pb-16"
        >
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#94a3b8] uppercase">
            SEESITES®
          </div>

          <div className="my-auto py-12 md:py-20 max-w-4xl">
            <h1 className="font-editorial text-[clamp(1.9rem,4.2vw,3.6rem)] font-light uppercase tracking-[0.04em] text-white leading-[1.22]">
              CUSTOM WEBSITES
              <br />
              <span className="text-[#cbd5e1] italic font-light">FOR RESTAURANTS</span>
              <br />
              <span className="text-white font-light">&amp; CAFÉS.</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm md:text-base text-[#cbd5e1]/90 leading-relaxed font-light">
              “Your restaurant deserves a digital home as distinctive as the experience you create.”
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-8">
              <button
                onClick={() => scrollTo("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#f8fafc] px-7 py-3 text-xs font-medium tracking-[0.2em] uppercase text-[#030714] hover:bg-[#e2e8f0] transition-all hover:scale-105"
              >
                <span>START A PROJECT</span>
                <span>→</span>
              </button>

              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="text-xs font-mono tracking-wider text-[#cbd5e1] hover:text-white transition-colors underline underline-offset-4"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>

          <div className="text-[10px] md:text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase flex justify-between">
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <span>METALLIC SILVER × MIDNIGHT NAVY</span>
          </div>
        </section>

        {/* ===================== CORE BRAND MESSAGE ===================== */}
        <section className="px-6 py-24 md:px-12 md:py-36 border-t border-white/10">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase mb-6">
              CORE PRINCIPLE
            </p>

            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase text-white leading-[1.22] tracking-[0.04em]">
              NO TEMPLATES.
              <br />
              <span className="text-[#cbd5e1] italic font-light">NO GENERIC DESIGNS.</span>
              <br />
              <span className="text-white font-light">JUST YOUR BRAND.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-sm md:text-lg text-[#cbd5e1]/90 leading-relaxed font-light">
              SEESITES creates custom websites specifically for restaurants and cafés, designed around
              their identity, atmosphere, menu and customer experience.
            </p>
          </div>
        </section>

        {/* ===================== WHY A WEBSITE ===================== */}
        <section className="px-6 py-24 md:px-12 md:py-36 border-t border-white/10">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase mb-6">
              DIGITAL INDEPENDENCE
            </p>

            <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light uppercase text-white leading-[1.24] tracking-[0.04em]">
              YOUR INSTAGRAM IS A CHANNEL.
              <br />
              <span className="text-[#cbd5e1] italic font-light">YOUR WEBSITE IS YOUR DIGITAL HOME.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm md:text-base text-[#cbd5e1]/85 font-light leading-relaxed">
              Give customers one place to discover your menu, atmosphere, location, contact
              information and brand.
            </p>

            <div className="mt-12 border-l border-white/20 pl-6">
              <p className="font-editorial text-base sm:text-lg md:text-xl font-light uppercase tracking-[0.04em] text-white leading-[1.35]">
                ONE CUSTOM WEBSITE.
                <br />
                BUILT AROUND YOUR BRAND.
                <br />
                DESIGNED TO LAST.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== UNIFIED SERVICES & PRICING ===================== */}
        <section id="services" className="relative px-6 py-28 md:px-12 md:py-40 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="border-b border-white/10 pb-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                    CAPABILITIES &amp; INVESTMENT
                  </p>
                  <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.04em] text-white">
                    SERVICES &amp; PRICING
                  </h2>
                </div>
                <p className="max-w-md text-xs md:text-sm font-mono text-[#cbd5e1] uppercase tracking-wider leading-relaxed">
                  “Every website is bespoke to your restaurant's brand — complete with our Client Admin Panel and ongoing maintenance.”
                </p>
              </div>
            </div>

            {/* Part 1: Core Services Grid */}
            <div className="mb-24">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#94a3b8] uppercase">
                  [01] WHAT WE DELIVER
                </span>
                <span className="text-xs font-mono text-[#cbd5e1]/70">
                  Full-Service Hospitality Web Studio
                </span>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {servicesList.map((svc) => (
                  <div
                    key={svc.title}
                    className={`flex flex-col justify-between rounded-xl border p-8 backdrop-blur-md transition-all ${
                      svc.highlight
                        ? "border-white/35 bg-[#091535]/85 shadow-2xl relative overflow-hidden"
                        : "border-white/10 bg-[#060e22]/50 hover:border-white/20"
                    }`}
                  >
                    {svc.highlight && (
                      <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <span className="inline-block bg-white text-[#030714] text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg">
                          KEY INCLUSION
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8] border border-white/10 px-2 py-0.5 rounded-full">
                          {svc.badge}
                        </span>
                      </div>
                      <h3 className="font-editorial text-lg sm:text-xl font-light uppercase tracking-[0.035em] text-white">
                        {svc.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#cbd5e1]/85 font-light leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Maintenance Details Breakdown */}
            <div className="mb-24 rounded-2xl border border-white/15 bg-[#060e22]/80 p-8 md:p-14 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 mb-10">
                <div>
                  <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                    [02] ONGOING SUPPORT
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.035em] text-white">
                    MAINTENANCE DETAILS
                  </h3>
                </div>
                <p className="max-w-md text-xs md:text-sm text-[#cbd5e1] font-light leading-relaxed">
                  We don't disappear after launch. Our maintenance packages keep your menu, photography, and site operations current without technical headaches.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {maintenanceDetails.map((item, idx) => (
                  <div key={item.title} className="border-t border-white/10 pt-5">
                    <span className="text-[10px] font-mono text-[#94a3b8]">0{idx + 1} //</span>
                    <h4 className="mt-2 text-sm md:text-base font-semibold text-white tracking-wide">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs md:text-sm text-[#cbd5e1]/80 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs font-mono text-[#94a3b8]">
                  Turnaround: Requests fulfilled directly by Sia within 24–48 business hours (or same-day on Premium Care).
                </span>
                <button
                  onClick={() => scrollTo("maintenance-plans")}
                  className="text-xs font-mono uppercase tracking-widest text-white hover:text-[#cbd5e1] underline underline-offset-4"
                >
                  VIEW MAINTENANCE PLANS ($150 / $300) →
                </button>
              </div>
            </div>

            {/* Part 3: Pricing Anchor & Grid */}
            <div id="pricing" className="scroll-mt-24">
              <div className="border-b border-white/10 pb-6 mb-12">
                <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                  [03] TRANSPARENT PACKAGES
                </p>
                <h3 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.04em] text-white">
                  WEBSITE PACKAGES
                </h3>
                <p className="mt-3 text-xs md:text-sm font-mono text-[#cbd5e1] tracking-wider uppercase">
                  No recurring agency retainers required · Client Admin Panel standard with every package
                </p>

                {/* 50-50 Payment Rule Highlight Badge */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white tracking-wider">50-50 PAYMENT RULE:</span>
                    <span>50% in advance to kick off · 50% final paid before final site launch</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-3">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex flex-col justify-between rounded-xl border p-8 md:p-10 backdrop-blur-md transition-all ${
                      plan.featured
                        ? "border-white/30 bg-[#08122d]/70 shadow-2xl relative"
                        : "border-white/10 bg-[#060e22]/50 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-editorial text-xl sm:text-2xl font-light uppercase tracking-[0.04em] text-white">
                          {plan.name}
                        </h4>
                        {plan.featured && (
                          <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase text-[#f8fafc]">
                            SIGNATURE / POPULAR
                          </span>
                        )}
                      </div>

                      <p className="mt-6 font-editorial text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.02em]">
                        {plan.price}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono text-[#cbd5e1]">
                        <span className="text-emerald-400 font-semibold">50-50:</span>
                        <span>{plan.paymentTerms}</span>
                      </div>

                      <p className="mt-6 text-sm text-[#cbd5e1]/85 font-light leading-relaxed">
                        {plan.desc}
                      </p>

                      <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-[#cbd5e1] font-mono">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <Check className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/10">
                      <button
                        onClick={() => selectPlanAndScroll(plan.planValue)}
                        className={`w-full rounded-full py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all ${
                          plan.featured
                            ? "bg-[#f8fafc] text-[#030714] hover:bg-[#e2e8f0] shadow-lg"
                            : "border border-white/20 text-white hover:border-white/40 hover:bg-white/5"
                        }`}
                      >
                        CHOOSE {plan.name} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 50-50 Payment Rule Detailed Breakdown Banner */}
              <div className="mt-12 rounded-2xl border border-white/15 bg-gradient-to-r from-[#060e22]/90 via-[#0a1838]/80 to-[#060e22]/90 p-8 md:p-10 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#94a3b8] border border-white/15 px-2.5 py-0.5 rounded-full">
                        PAYMENT STRUCTURE
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                        Transparent &amp; Milestone-Based
                      </span>
                    </div>
                    <h4 className="font-editorial text-2xl sm:text-3xl font-light uppercase tracking-[0.035em] text-white">
                      THE 50 / 50 PAYMENT RULE
                    </h4>
                    <p className="text-xs sm:text-sm text-[#cbd5e1]/85 font-light leading-relaxed">
                      Every project follows our simple, risk-free 50-50 rule: <strong className="text-white font-medium">50% in advance</strong> to reserve your production slot and kick off bespoke design and engineering, and the remaining <strong className="text-white font-medium">50% final payment</strong> is paid only after your complete review and approval before the final site launches live.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 shrink-0 font-mono">
                    <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/5 p-5 text-center">
                      <span className="block font-editorial text-3xl font-light text-white">50%</span>
                      <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        In Advance
                      </span>
                      <span className="mt-1 block text-[10px] text-[#94a3b8] font-light">
                        To kick off the project
                      </span>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/5 p-5 text-center">
                      <span className="block font-editorial text-3xl font-light text-white">50%</span>
                      <span className="mt-1 block text-[11px] font-bold uppercase tracking-wider text-white">
                        Final Balance
                      </span>
                      <span className="mt-1 block text-[10px] text-[#94a3b8] font-light">
                        Paid before final site launch
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 4: Monthly Maintenance Plans */}
              <div id="maintenance-plans" className="mt-16 scroll-mt-24">
                <div className="border-b border-white/10 pb-6 mb-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                        [04] ONGOING DIGITAL CARE
                      </p>
                      <h3 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.04em] text-white">
                        MONTHLY MAINTENANCE PLANS
                      </h3>
                    </div>
                    <p className="max-w-md text-xs md:text-sm text-[#cbd5e1] font-light leading-relaxed">
                      Reliable hosting, technical maintenance, and ongoing updates so your staff can focus on hospitality, not web code.
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {maintenancePlans.map((mPlan) => (
                    <div
                      key={mPlan.name}
                      className={`flex flex-col justify-between rounded-xl border p-8 md:p-10 backdrop-blur-md transition-all ${
                        mPlan.featured
                          ? "border-white/35 bg-[#091535]/85 shadow-2xl relative"
                          : "border-white/10 bg-[#060e22]/60 hover:border-white/20"
                      }`}
                    >
                      {mPlan.featured && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                          <span className="inline-block bg-white text-[#030714] text-[9px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg">
                            PRIORITY CARE
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8] border border-white/10 px-2 py-0.5 rounded-full">
                            {mPlan.badge}
                          </span>
                        </div>

                        <h4 className="mt-4 font-editorial text-2xl sm:text-3xl font-light uppercase tracking-[0.04em] text-white">
                          {mPlan.name}
                        </h4>

                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="font-editorial text-4xl sm:text-5xl font-light text-white tracking-[0.02em]">
                            {mPlan.price}
                          </span>
                          <span className="text-sm font-mono text-[#94a3b8]">
                            {mPlan.period}
                          </span>
                        </div>

                        <p className="mt-4 text-sm text-[#cbd5e1]/85 font-light leading-relaxed">
                          {mPlan.desc}
                        </p>

                        <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-xs text-[#cbd5e1] font-mono">
                          {mPlan.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <Check className="h-3.5 w-3.5 text-white shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <button
                          onClick={() => selectPlanAndScroll(mPlan.planValue)}
                          className={`w-full rounded-full py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all ${
                            mPlan.featured
                              ? "bg-white text-[#030714] hover:bg-[#cbd5e1] shadow-lg"
                              : "border border-white/25 text-white hover:bg-white hover:text-[#030714]"
                          }`}
                        >
                          CHOOSE {mPlan.name} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SELECTED WORK ===================== */}
        <section id="work" className="px-6 py-28 md:px-12 md:py-40 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="border-b border-white/10 pb-6 mb-20">
              <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                PORTFOLIO
              </p>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.04em] text-white">
                SELECTED WORK
              </h2>
            </div>

            <div className="space-y-32 md:space-y-48">
              {projects.map((proj) => (
                <article key={proj.title} className="group">
                  <div className="overflow-hidden rounded-xl border border-white/15 bg-[#060e22] shadow-2xl">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={proj.image}
                        alt={`${proj.title} — ${proj.type}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-[#030714]/80 border border-white/20 px-3 py-1 text-[11px] font-mono text-[#cbd5e1] backdrop-blur-md">
                          {proj.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h3 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.04em] text-white">
                        {proj.title}
                      </h3>
                      <p className="mt-1 text-sm font-mono text-[#94a3b8] uppercase">
                        {proj.type}
                      </p>
                    </div>

                    <p className="max-w-md text-sm text-[#cbd5e1]/85 font-light leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section id="about" className="px-6 py-24 md:px-12 md:py-36 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase mb-6">
              STUDIO
            </p>

            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase text-white leading-[1.22] tracking-[0.035em]">
              BUILT FOR RESTAURANTS.
              <br />
              <span className="text-[#cbd5e1] italic font-light">DESIGNED TO BE REMEMBERED.</span>
            </h2>

            <p className="mt-8 max-w-xl text-base md:text-xl text-[#cbd5e1]/90 font-light leading-relaxed">
              “SEESITES creates custom digital experiences exclusively for restaurants and cafés.”
            </p>
          </div>
        </section>



        {/* ===================== REVIEWS / CLIENT NOTES ===================== */}
        <section className="px-6 py-24 md:px-12 md:py-36 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="border-b border-white/10 pb-6 mb-16">
              <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                REPUTATION
              </p>
              <h2 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.04em] text-white">
                CLIENT NOTES
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-[#060e22]/40 p-6 md:p-8 backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-[#f8fafc] mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="h-3.5 w-3.5 fill-white text-white" />
                      ))}
                    </div>
                    <blockquote className="text-xs md:text-sm text-[#cbd5e1] font-light leading-relaxed italic">
                      “{r.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-xs font-bold text-white font-mono">{r.author}</p>
                    <p className="text-[11px] text-[#94a3b8] font-mono mt-0.5">{r.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CONTACT (DIRECTLY VISIBLE) ===================== */}
        <section id="contact" className="px-6 py-28 md:px-12 md:py-40 border-t border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="border-b border-white/10 pb-6 mb-16">
              <p className="text-[11px] font-mono tracking-[0.3em] text-[#94a3b8] uppercase">
                INITIATE PROJECT
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light uppercase text-white leading-[1.2] tracking-[0.035em]">
                LET'S BUILD YOUR DIGITAL HOME.
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="font-mono text-lg md:text-2xl font-bold text-white hover:text-[#cbd5e1] transition-colors underline underline-offset-8"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>

            {/* Direct functional enquiry form */}
            <div className="rounded-xl border border-white/15 bg-[#060e22]/70 p-6 md:p-12 backdrop-blur-xl">
              <EnquiryForm />
            </div>
          </div>
        </section>

        {/* ===================== FINAL SECTION ===================== */}
        <section className="min-h-screen flex flex-col justify-between px-6 pt-32 pb-16 md:px-12 md:pt-48 md:pb-20 border-t border-white/10 bg-[#010309]/90">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#94a3b8] uppercase">
            SEESITES®
          </div>

          <div className="my-auto py-16 max-w-5xl">
            <p className="font-editorial text-[clamp(1.9rem,4.2vw,3.8rem)] font-light uppercase text-white leading-[1.2] tracking-[0.035em]">
              YOUR RESTAURANT
              <br />
              <span className="text-[#cbd5e1] italic font-light">DESERVES A WEBSITE</span>
              <br />
              <span className="font-light text-white">WORTH REMEMBERING.</span>
            </p>

            <div className="mt-12 border-t border-white/15 pt-8">
              <p className="font-editorial text-xl md:text-2xl font-light uppercase tracking-[0.05em] text-white">
                SEESITES®
              </p>
              <p className="mt-2 text-xs md:text-sm font-mono tracking-wider text-[#cbd5e1] uppercase">
                CUSTOM WEBSITES FOR RESTAURANTS & CAFÉS.
              </p>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="mt-4 inline-block font-mono text-sm text-[#cbd5e1] hover:text-white transition-colors underline underline-offset-4"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] md:text-[11px] font-mono text-[#94a3b8]">
            <span>© 2026 SEESITES. ALL RIGHTS RESERVED. [PLACEHOLDER]</span>
            <span>DESIGNED & ENGINEERED FOR RESTAURANTS & CAFÉS</span>
          </div>
        </section>
      </main>
    </div>
  );
}
