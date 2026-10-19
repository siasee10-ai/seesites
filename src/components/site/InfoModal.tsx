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
} from "lucide-react";

export type ModalType = "pricing" | "services" | "process" | "faq" | null;

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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#060e22] p-6 sm:p-10 text-slate-100 shadow-2xl custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 z-20 rounded-full border border-white/20 bg-white/5 p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ===================== PRICING & MAINTENANCE MODAL ===================== */}
        {type === "pricing" && (
          <div className="space-y-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Flat-Rate Packages · No Recurring Retainers
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Website Packages &amp; Pricing
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Clear deliverables with zero hidden fees. Built with 100% code ownership.
              </p>
            </div>

            {/* 3 Main Packages */}
            <div className="grid gap-6 md:grid-cols-3 items-stretch">
              {/* Essential */}
              <div className="rounded-2xl border border-white/15 bg-[#08122d]/70 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">FOUNDATION</span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    ESSENTIAL
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">$200</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50-50: $100 kickoff · $100 launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    For businesses needing a simple, professional online presence.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Custom single-page responsive design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Mobile-optimized digital menu &amp; pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Location, hours &amp; Google Maps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Domain setup &amp; SSL guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>14-day post-launch support</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Essential ($200)");
                  }}
                  className="mt-6 w-full rounded-full border border-white/20 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Select Essential →
                </button>
              </div>

              {/* Signature (Featured) */}
              <div className="rounded-2xl border border-white/35 bg-[#0a183d]/90 p-6 flex flex-col justify-between shadow-xl relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white text-slate-950 text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-0.5">
                  MOST POPULAR
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">
                    DISTINCTIVE
                  </span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    SIGNATURE
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">$500</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50-50: $250 kickoff · $250 launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    For businesses wanting a more distinctive, customised website.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Everything in Essential, plus:</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Bespoke atmosphere tailored to your cuisine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Interactive category-based digital menu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Reservation flow (Resy / OpenTable / direct)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>1 Month included maintenance &amp; updates</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Signature ($500)");
                  }}
                  className="mt-6 w-full rounded-full bg-white py-2.5 text-xs font-bold tracking-wider uppercase text-slate-950 shadow-md hover:bg-slate-200 transition-colors"
                >
                  Select Signature →
                </button>
              </div>

              {/* Experience */}
              <div className="rounded-2xl border border-white/15 bg-[#08122d]/70 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400">FLAGSHIP</span>
                  <h3 className="mt-1 font-editorial text-2xl font-light text-white uppercase">
                    EXPERIENCE
                  </h3>
                  <p className="mt-3 font-editorial text-4xl font-light text-white">$800</p>
                  <p className="mt-1 text-xs font-mono text-emerald-400">
                    50-50: $400 kickoff · $400 launch
                  </p>
                  <p className="mt-3 text-xs text-slate-300 font-light">
                    For businesses requiring a more extensive design or additional functionality.
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Everything in Signature, plus:</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Multi-course tasting menus &amp; private dining</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Ambient photography staging &amp; motion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Local SEO setup &amp; Google indexing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>3 Months included maintenance</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPlan("Experience ($800)");
                  }}
                  className="mt-6 w-full rounded-full border border-white/20 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
                >
                  Select Experience →
                </button>
              </div>
            </div>

            {/* Optional Maintenance Plans */}
            <div className="border-t border-white/10 pt-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block mb-4">
                Optional Monthly Maintenance Plans
              </span>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-xl font-light text-white uppercase">
                      BASIC CARE
                    </h4>
                    <p className="mt-1 font-editorial text-2xl text-white">
                      UP TO $150 <span className="text-xs font-mono text-slate-400">/ month</span>
                    </p>
                    <p className="mt-2 text-xs text-slate-300 font-light">
                      Hosting, SSL, routine menu updates, price edits, and operating hours notice
                      changes.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan("Basic Care ($150/mo)");
                    }}
                    className="mt-4 text-xs font-mono text-white underline underline-offset-4 text-left"
                  >
                    Select Basic Care →
                  </button>
                </div>

                <div className="rounded-xl border border-white/20 bg-white/5 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-editorial text-xl font-light text-white uppercase">
                      PRIORITY CARE
                    </h4>
                    <p className="mt-1 font-editorial text-2xl text-white">
                      UP TO $300 <span className="text-xs font-mono text-slate-400">/ month</span>
                    </p>
                    <p className="mt-2 text-xs text-slate-300 font-light">
                      Everything in Basic Care plus expedited same-day turnaround, Google Business
                      upkeep, and direct phone access.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectPlan("Priority Care ($300/mo)");
                    }}
                    className="mt-4 text-xs font-mono text-white underline underline-offset-4 text-left"
                  >
                    Select Priority Care →
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[10px] font-mono text-slate-500 italic">
                *Exact maintenance update frequency depends on the selected written agreement. No
                unlimited work promised.
              </p>
            </div>
          </div>
        )}

        {/* ===================== SERVICES MODAL ===================== */}
        {type === "services" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Specialized Hospitality Studio
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                All 7 Services
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Everything required to establish an effortless digital presence for your café,
                bakery, or dining room.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Custom Café Websites",
                  desc: "Tailored digital homes for independent cafés and coffee bars. Designed around your roast philosophy, space, and community vibe.",
                },
                {
                  title: "Restaurant Website Design",
                  desc: "Elevated, atmospheric layouts crafted to reflect your dining room, culinary direction, and seasonal dining experience.",
                },
                {
                  title: "Digital Menu Integration",
                  desc: "Clean, lightning-fast digital menus that guests can effortlessly browse on any mobile device without downloading clunky PDFs.",
                },
                {
                  title: "Mobile-Responsive Layouts",
                  desc: "Over 80% of dining patrons browse restaurants from their phones. We engineer every screen for fluid speed and effortless tap navigation.",
                },
                {
                  title: "Website Redesigns",
                  desc: "Transform outdated or slow websites into modern, conversion-focused assets that accurately match the quality of your food.",
                },
                {
                  title: "Domain Setup & Deployment",
                  desc: "End-to-end technical setup including custom domain connection, DNS configuration, and secure SSL certificates.",
                },
                {
                  title: "Website Maintenance",
                  desc: "Ongoing support for menu changes, seasonal price updates, holiday hours, and continuous technical health monitoring.",
                },
              ].map((svc, i) => (
                <div key={svc.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <span className="text-[10px] font-mono text-slate-400">0{i + 1} //</span>
                  <h3 className="mt-1 font-editorial text-lg font-light text-white uppercase">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan("Signature ($500)");
                }}
                className="metallic-btn-primary rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Inquire About A Project →
              </button>
            </div>
          </div>
        )}

        {/* ===================== PROCESS & 50/50 RULE MODAL ===================== */}
        {type === "process" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase">
                Zero Risk · Milestone Protection
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                What Happens After You Pay?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Projects generally begin with a 50% advance payment, with the remaining 50% due
                before launch, subject to the written project agreement.
              </p>
            </div>

            {/* 5-Step Process */}
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Discovery & Requirements",
                  desc: "We discuss your venue, cuisine, aesthetic vision, timeline, and menu. We confirm the scope and send a simple written project agreement.",
                },
                {
                  step: "02",
                  title: "Kickoff & 50% Advance",
                  desc: "To lock in your production slot and begin work, you submit a 50% advance deposit. You receive a simple onboarding checklist to send your menu, logo, and photos (or we provide curated high-res imagery).",
                },
                {
                  step: "03",
                  title: "Design & Development (7–14 Days)",
                  desc: "Sia personally designs and codes your website from scratch. We deploy to a private, password-protected staging URL so you can test it on your own smartphone and desktop.",
                },
                {
                  step: "04",
                  title: "Review & Revisions",
                  desc: "We walk through the prototype together and refine typography, menu items, images, and mobile spacing until you are 100% satisfied.",
                },
                {
                  step: "05",
                  title: "Final 50% Payment & Public Launch",
                  desc: "Only after your complete review and final sign-off is the remaining 50% balance paid. We link your domain, enable SSL, submit to Google, and hand over 100% ownership.",
                },
                {
                  step: "06",
                  title: "Optional Ongoing Maintenance",
                  desc: "Keep your site fresh with our Basic or Priority Care plans, or manage your site independently with zero locked-in contracts.",
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
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white">Ready to begin your project?</p>
                <p className="text-[11px] text-slate-300">
                  50% kickoff deposit · Private staging preview · Final 50% only on approval.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onSelectPlan("Signature ($500)");
                }}
                className="metallic-btn-primary shrink-0 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Start Project →
              </button>
            </div>
          </div>
        )}

        {/* ===================== TRUST & FAQ MODAL ===================== */}
        {type === "faq" && (
          <div className="space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                Legitimacy &amp; Client Questions
              </span>
              <h2 className="mt-1 font-editorial text-3xl sm:text-4xl font-light uppercase text-white tracking-[0.03em]">
                Common Questions &amp; Studio Facts
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Direct answers to the questions independent restaurant and café owners ask most.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is SeeSites a legitimate studio? Who will build my website?",
                  a: "SeeSites is a dedicated boutique web-design studio operated directly by Sia. Unlike large agencies that hand your project off to junior freelancers or overseas contractors, you work directly 1-on-1 with Sia from your first email to post-launch. Every project is backed by a clear written agreement and direct communication via seesites0@gmail.com.",
                },
                {
                  q: "Can I see working examples before committing?",
                  a: "Yes! In our Selected Work section, click 'Launch Concept Demo' on any of our concept projects (Luna, Noir, Mesa). You can interact with simulated live menus, mobile previews, table reservation flows, and operating hours to experience our design quality firsthand.",
                },
                {
                  q: "What happens after I make the initial 50% payment?",
                  a: "Your 50% deposit locks in your project kickoff date. Within 24 hours, you receive a clear 1-page onboarding guide where you can submit your menu, logo, and photos. Sia then designs and builds your custom website. Within 7–14 days, you receive a private live staging link to test and review on your own phone and laptop.",
                },
                {
                  q: "When is the remaining 50% payment due?",
                  a: "The final 50% payment is due ONLY after you have reviewed your website, tested all pages, requested any revisions, and given your final written launch approval. You never pay the final balance until you are completely satisfied with the result.",
                },
                {
                  q: "Who owns the website and code after launch?",
                  a: "You do. You own 100% of your website, code, design assets, and domain. There is zero proprietary lock-in. If you ever decide to host elsewhere or hire another developer in the future, you have full freedom and complete file access.",
                },
                {
                  q: "Do I have to sign up for monthly maintenance?",
                  a: "No. Maintenance is 100% optional. If you just want a website built and want to handle minor updates yourself, you can do that with no recurring fees. If you prefer us to handle seasonal menu updates, price changes, and technical checks, our Basic and Priority Care plans are available anytime.",
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
                  onSelectPlan("Signature ($500)");
                }}
                className="metallic-btn-primary rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Get In Touch With Sia →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
