import { useEffect } from "react";
import {
  X,
  Check,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Layers,
  CreditCard,
  Sparkles,
  ChevronRight,
  Clock,
  Key,
} from "lucide-react";

export type ModalType = "pricing" | "services" | "process" | "faq" | "terms" | "privacy" | null;

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
}

export function InfoModal({ type, onClose, onSelectPlan }: InfoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (type) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#060e22] p-5 sm:p-10 text-slate-100 shadow-2xl custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 z-20 rounded-full border border-white/20 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ===================== PRICING & CARE PLANS MODAL ===================== */}
        {type === "pricing" && (
          <div className="space-y-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Transparent Pricing · No Unnecessary Complexity
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Website Packages &amp; Pricing
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Clear package starting prices in Indian Rupees (₹). Scope, delivery timeline, and
                agreed inclusions confirmed before work begins.
              </p>
            </div>

            {/* 3 Main Packages Grid */}
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {/* Package 1: Essential */}
              <div className="rounded-2xl border border-white/15 bg-[#08122d]/70 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      SMALL BUSINESSES
                    </span>
                  </div>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    ESSENTIAL
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">₹9,999</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% kickoff (₹5,000) · 50% launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    A clean, professional online presence for businesses ready to establish
                    themselves online.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
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
                      <span>Services or product showcase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Contact form &amp; WhatsApp link</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Google Maps integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Basic on-page SEO &amp; speed check</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Launch assistance &amp; handover</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Essential — ₹9,999");
                  }}
                  className="mt-6 w-full rounded-full border border-white/20 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Choose Essential →
                </button>
              </div>

              {/* Package 2: Signature (Featured) */}
              <div className="rounded-2xl border border-white/35 bg-[#0a183d]/90 p-6 flex flex-col justify-between shadow-xl relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-slate-950 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-0.5">
                  RECOMMENDED
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    GROWING BUSINESSES
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    SIGNATURE
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">₹19,999</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% kickoff (₹10,000) · 50% launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    A more distinctive digital experience for businesses ready to strengthen their
                    brand and customer journey.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Up to 5 pages or agreed scope</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>More extensive custom design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Enhanced layouts &amp; visual storytelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Interactive services/product catalog</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Enquiry &amp; WhatsApp integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Appointment/booking integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>On-page SEO across included pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Launch assistance &amp; handover</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Signature — ₹19,999");
                  }}
                  className="mt-6 w-full rounded-full bg-white py-2.5 text-xs font-bold tracking-wider uppercase text-slate-950 shadow-md hover:bg-slate-200 transition-colors"
                >
                  Choose Signature →
                </button>
              </div>

              {/* Package 3: Premium */}
              <div className="rounded-2xl border border-white/15 bg-[#08122d]/70 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    ESTABLISHED &amp; PREMIUM
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    PREMIUM
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">₹59,999</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50% kickoff (₹30,000) · 50% launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light leading-relaxed">
                    A bespoke website experience for businesses that need more sophisticated design,
                    functionality, and flexibility.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Custom project scope &amp; pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Bespoke visual direction &amp; branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Advanced page layouts &amp; custom motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Rich brand storytelling &amp; art direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Advanced booking or enquiry integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Content management options where fit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>SEO &amp; performance optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Documented project handover</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Premium — ₹59,999");
                  }}
                  className="mt-6 w-full rounded-full border border-white/20 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Discuss a Premium Project →
                </button>
              </div>
            </div>

            {/* Optional Monthly Care Plans */}
            <div className="border-t border-white/10 pt-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Your Website, Taken Care Of · Optional Ongoing Support
              </span>
              <p className="text-xs text-slate-300 font-light mb-6">
                Launching your website is only the beginning. Choose an optional care plan for
                ongoing maintenance, small edits, and technical checks.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/15 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      ESSENTIAL SUPPORT
                    </span>
                    <h4 className="font-editorial text-xl font-light text-white uppercase mt-0.5">
                      BASIC CARE
                    </h4>
                    <p className="mt-2 font-editorial text-3xl text-white">
                      ₹1,999 <span className="text-xs font-mono text-slate-400">/ month</span>
                    </p>
                    <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                      For businesses that need essential website maintenance and peace of mind.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs font-mono text-slate-300">
                      <li>• Up to 2 small update requests / month</li>
                      <li>• Up to 30 mins minor changes (unused time doesn't carry forward)</li>
                      <li>• Minor text and image updates</li>
                      <li>• Broken-link &amp; basic troubleshooting checks</li>
                      <li>• Handled during normal business hours</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan("Monthly Website Care");
                    }}
                    className="mt-5 text-xs font-mono text-white underline underline-offset-4 text-left"
                  >
                    Choose Basic Care →
                  </button>
                </div>

                <div className="rounded-xl border border-white/25 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      HANDS-ON SUPPORT
                    </span>
                    <h4 className="font-editorial text-xl font-light text-white uppercase mt-0.5">
                      PREMIUM CARE
                    </h4>
                    <p className="mt-2 font-editorial text-3xl text-white">
                      ₹3,999 <span className="text-xs font-mono text-slate-400">/ month</span>
                    </p>
                    <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                      For businesses that want more frequent updates, visual support, and priority
                      review.
                    </p>
                    <ul className="mt-3 space-y-1.5 text-xs font-mono text-slate-300">
                      <li>• Everything in Basic Care</li>
                      <li>• Up to 5 small update requests / month</li>
                      <li>• Up to 90 mins minor visual &amp; content updates</li>
                      <li>• Priority support during business hours</li>
                      <li>• Form-functionality &amp; SEO health reviews</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan("Monthly Website Care");
                    }}
                    className="mt-5 text-xs font-mono text-white underline underline-offset-4 text-left"
                  >
                    Choose Premium Care →
                  </button>
                </div>
              </div>

              {/* Pricing Rules & Disclaimers */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#030714] p-4 text-[11px] font-mono text-slate-400 space-y-1.5">
                <p>
                  <strong>Important Note:</strong> Care plans cover maintenance and minor updates as
                  described above. They do not include major redesigns, new page expansions beyond
                  allowance, full e-commerce operations, or third-party advertising.
                </p>
                <p>
                  Hosting, domain registration/renewals, paid third-party tools, and external
                  booking subscriptions are charged separately unless expressly stated in your
                  proposal. Final pricing always depends on agreed project scope.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== SERVICES MODAL ===================== */}
        {type === "services" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Tailored Digital Experiences
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Websites Built Around Your Business
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Whether you’re starting small, growing your customer base, or building a premium
                brand, SeeSites creates websites tailored to your goals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  letter: "A",
                  title: "Business Websites",
                  desc: "Professional websites for local businesses, service providers, and independent professionals looking to establish authority and trust.",
                },
                {
                  letter: "B",
                  title: "Salon & Beauty Websites",
                  desc: "Elegant websites featuring treatment menus, transparent price lists, gallery lookbooks, stylist introductions, and appointment enquiries.",
                },
                {
                  letter: "C",
                  title: "Restaurant & Café Websites",
                  desc: "Websites featuring digital menus, food photography, operating hours, locations, and direct reservation or enquiry flows.",
                },
                {
                  letter: "D",
                  title: "Boutique & Brand Websites",
                  desc: "Beautiful digital storefronts for fashion labels, couture ateliers, jewellery businesses, and independent design studios.",
                },
                {
                  letter: "E",
                  title: "Healthcare & Professional Websites",
                  desc: "Clean, high-credibility websites for dental clinics, wellness centers, consultants, and specialised professional practices.",
                },
                {
                  letter: "F",
                  title: "Custom Website Solutions",
                  desc: "Tailored designs, specialized calculators, booking forms, or multi-page experiences built strictly around your operational needs.",
                },
              ].map((svc) => (
                <div key={svc.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {svc.letter} // Service
                  </span>
                  <h3 className="mt-1 font-editorial text-lg font-light text-white uppercase">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-[#030714] p-4 text-xs font-mono text-slate-400 flex items-center justify-between gap-4">
              <p>
                In a different industry? We design custom websites for all types of ambitious
                businesses across India.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan("Not Sure Yet");
                }}
                className="metallic-btn-primary shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Inquire Now →
              </button>
            </div>
          </div>
        )}

        {/* ===================== PROCESS & PAYMENT TERMS MODAL ===================== */}
        {type === "process" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase">
                Clear Steps · Zero Guesswork
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                How It Works &amp; Payment Terms
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Simple, transparent collaboration from concept discussion to final handover.
              </p>
            </div>

            {/* 4 Steps */}
            <div className="space-y-3">
              {[
                {
                  step: "Step 1",
                  name: "DISCUSS",
                  desc: "We understand your business, target audience, brand goals, and specific website requirements. We confirm the exact deliverables in a clear proposal.",
                },
                {
                  step: "Step 2",
                  name: "DESIGN",
                  desc: "We create a tailored website concept and refine the agreed direction with your feedback, ensuring typography, palette, and layouts match your vision.",
                },
                {
                  step: "Step 3",
                  name: "BUILD",
                  desc: "We develop the approved design with clean, responsive code and test the website across modern smartphones, tablets, and desktop displays.",
                },
                {
                  step: "Step 4",
                  name: "LAUNCH",
                  desc: "We help publish the website, provide the agreed administrative handover, ensure domain connection, and discuss optional ongoing care.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 flex items-start gap-4"
                >
                  <span className="font-editorial text-2xl font-light text-slate-400 shrink-0">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-editorial text-base sm:text-lg font-light text-white uppercase">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment & Ownership Terms */}
            <div className="rounded-2xl border border-white/15 bg-[#030714] p-5 sm:p-6 space-y-4">
              <h4 className="font-editorial text-xl font-light text-white uppercase">
                Simple, Transparent Project Terms
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>50% Advance Payment:</strong> Required to schedule and begin your
                    project.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>50% Final Payment:</strong> Payable prior to final launch or handover,
                    as agreed in the written proposal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Scope Confirmation:</strong> Project deliverables and revisions
                    confirmed before work begins; out-of-scope requests quoted separately.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Client Access &amp; Handover:</strong> You receive administrative
                    access, your website assets, and agreed documentation with zero proprietary
                    lock-in.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Timelines:</strong> Standard projects take 7–21 business days, depending
                    on scope, client feedback, and prompt supply of content.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan("Signature — ₹19,999");
                }}
                className="metallic-btn-primary rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Start Your Project →
              </button>
            </div>
          </div>
        )}

        {/* ===================== FAQ MODAL ===================== */}
        {type === "faq" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Common Questions &amp; Direct Answers
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Everything you need to know about working with SeeSites.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "1. How much does a website cost?",
                  a: "Our website packages start at ₹9,999 for the Essential package, ₹19,999 for the Signature package, and ₹59,999 for the Premium package. Final pricing always depends on your agreed project scope, number of pages, and specific custom requirements.",
                },
                {
                  q: "2. How long does it take to build a website?",
                  a: "Most standard projects take between 7 to 21 business days. Delivery timelines depend on project complexity, the speed of client feedback, and how quickly brand assets, text, and images are provided.",
                },
                {
                  q: "3. Will my website work on mobile phones?",
                  a: "Yes. Every website we build uses a mobile-first responsive architecture. We carefully test layouts across popular smartphones, tablets, and desktop resolutions to ensure seamless usability and fast loading everywhere.",
                },
                {
                  q: "4. Can I update my website myself?",
                  a: "This depends on your platform and setup. We provide appropriate administrative access and can implement user-friendly content editing options. We also provide clear documentation during handover so you know how to make minor updates.",
                },
                {
                  q: "5. Will my website appear on Google?",
                  a: "Every website includes foundational on-page SEO setup (proper title tags, meta descriptions, semantic headings, and search engine sitemap preparation). However, no responsible designer can guarantee specific #1 Google rankings or instant lead volumes, as rankings depend on ongoing search algorithms and competition.",
                },
                {
                  q: "6. Do I need to pay for hosting and a domain?",
                  a: "Yes. Domain registration and hosting are standard ongoing costs of running any website on the internet. We help you choose the most reliable, cost-effective domain registrar and hosting provider, ensuring you own and control your domain.",
                },
                {
                  q: "7. What happens after my website launches?",
                  a: "Once launched, you own your website and can run it independently. If you want continued support with minor text updates, new images, or periodic checks, you can choose our optional Basic Care (₹1,999/mo) or Premium Care (₹3,999/mo) plan.",
                },
                {
                  q: "8. Can you build a website for my type of business?",
                  a: "Yes. While we highlight examples for salons, restaurants, boutiques, clinics, and interior design studios, SeeSites works with diverse businesses across India. We welcome custom inquiries for any growing or established brand.",
                },
                {
                  q: "9. Will I have access to my website?",
                  a: "Absolutely. We believe business owners should maintain control. You receive agreed administrative access, website content and assets, and clear handover documentation, subject to chosen platform terms.",
                },
                {
                  q: "10. Can I request changes after launch?",
                  a: "Yes. Minor updates like fixing a phone number or updating a product price are covered if you are on an active care plan. Larger changes, such as adding new sections or new pages, can be quoted as a separate project.",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-editorial text-base sm:text-lg font-light text-white tracking-wide">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan("Signature — ₹19,999");
                }}
                className="metallic-btn-primary rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Discuss Your Website →
              </button>
            </div>
          </div>
        )}

        {/* ===================== TERMS MODAL ===================== */}
        {type === "terms" && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Legal &amp; Project Terms
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-light uppercase text-white tracking-[0.03em]">
                Terms of Service
              </h2>
            </div>
            <p>
              These Terms of Service govern website design and development services provided by
              SeeSites to clients across India and internationally.
            </p>
            <div className="space-y-4 font-mono text-xs text-slate-300">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">
                  1. Project Proposals &amp; Scope
                </h4>
                <p>
                  All work begins following written agreement on project scope, price, and
                  deliverables. Any requests beyond agreed specifications will be quoted separately.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">
                  2. Payments &amp; Milestones
                </h4>
                <p>
                  Standard projects require a 50% non-refundable advance payment to secure
                  scheduling. The final 50% balance is due prior to final public deployment and
                  asset handover.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">
                  3. Client Content &amp; Approvals
                </h4>
                <p>
                  Clients are responsible for providing brand assets, text, photography, and
                  accurate business information. Timelines are subject to prompt client reviews and
                  feedback.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">
                  4. Hosting &amp; External Services
                </h4>
                <p>
                  Third-party fees (domains, cloud hosting, paid software subscriptions) are the
                  client’s responsibility unless specifically bundled into the written contract.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================== PRIVACY MODAL ===================== */}
        {type === "privacy" && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Client Confidentiality
              </span>
              <h2 className="mt-1 font-editorial text-3xl font-light uppercase text-white tracking-[0.03em]">
                Privacy Policy
              </h2>
            </div>
            <p>
              SeeSites is committed to safeguarding your privacy and respecting the confidentiality
              of your business ideas, contact information, and assets.
            </p>
            <div className="space-y-4 font-mono text-xs text-slate-300">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">Information Collected</h4>
                <p>
                  We only collect information voluntarily submitted via our project enquiry forms
                  (such as your name, business name, email address, phone number, and project
                  notes).
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">Use of Information</h4>
                <p>
                  We use your contact details solely to evaluate your project, respond to your
                  inquiry, and deliver our design and development services. We never sell, rent, or
                  trade your data.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <h4 className="text-white font-bold mb-1 uppercase">Security</h4>
                <p>
                  All inquiries are processed securely and stored behind protected database
                  credentials with row-level security. For any privacy queries, contact
                  seesites0@gmail.com.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
