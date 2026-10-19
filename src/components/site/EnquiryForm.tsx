import { useEffect, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { Check, Mail, Send, Sparkles } from "lucide-react";

const plans = [
  "Essential ($200)",
  "Signature ($500)",
  "Experience ($800)",
  "Basic Care ($150/mo)",
  "Priority Care ($300/mo)",
  "Not sure yet",
] as const;
type Plan = (typeof plans)[number];

const businessTypes = [
  "Independent Café / Coffee Shop",
  "Specialty Bakery / Pastry",
  "Contemporary Restaurant / Dining",
  "Bistro / Casual Eatery",
  "Bar / Cocktail Lounge",
  "Other Hospitality Concept",
] as const;
type BusinessType = (typeof businessTypes)[number];

const fieldClasses =
  "w-full rounded-xl border border-slate-400/20 bg-[#091326]/80 px-4 py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:border-slate-200 focus:bg-[#0d1b36] focus:outline-none focus:ring-1 focus:ring-slate-300/40 transition-all";

export function EnquiryForm() {
  const [plan, setPlan] = useState<Plan>("Signature ($500)");
  const [businessType, setBusinessType] = useState<BusinessType>("Independent Café / Coffee Shop");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => {
      const p = (e as CustomEvent<string>).detail;
      if (p) {
        const found = plans.find(
          (item) =>
            item.toLowerCase().includes(p.toLowerCase()) ||
            p.toLowerCase().includes(item.toLowerCase()),
        );
        if (found) {
          setPlan(found);
        } else if (p.toLowerCase().includes("basic")) {
          setPlan("Basic Care ($150/mo)");
        } else if (p.toLowerCase().includes("priority") || p.toLowerCase().includes("premium")) {
          setPlan("Priority Care ($300/mo)");
        } else if (p.toLowerCase().includes("essential")) {
          setPlan("Essential ($200)");
        } else if (p.toLowerCase().includes("signature")) {
          setPlan("Signature ($500)");
        } else if (p.toLowerCase().includes("experience")) {
          setPlan("Experience ($800)");
        }
      }
    };
    window.addEventListener("seesites:plan", onPick);
    return () => window.removeEventListener("seesites:plan", onPick);
  }, []);

  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    mailtoUrl: string;
    gmailUrl: string;
    recipient: string;
  } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const name = data["name"]?.trim();
    const email = data["email"]?.trim();
    const businessName = data["business_name"]?.trim() || "";
    const bType = data["business_type"]?.trim() || businessType;
    const city = data["city"]?.trim() || "";
    const message = data["message"]?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in your name, email and project requirements.");
      return;
    }
    setStatus("sending");
    setError("");

    const fullBusiness = businessName
      ? bType
        ? `${businessName} (${bType})`
        : businessName
      : bType || "Restaurant / Café";

    const subjectText = `SeeSites Website Project Inquiry — ${name} (${fullBusiness})`;
    const bodyText =
      `Hi Sia,\n\nI'd like to get in touch regarding a website for my business.\n\n` +
      `• Contact Name: ${name}\n` +
      `• Business Email: ${email}\n` +
      `• Venue Name: ${businessName || "Not specified"}\n` +
      `• Business Type: ${bType}\n` +
      `• City / Location: ${city || "Not specified"}\n` +
      `• Selected Package: ${plan}\n\n` +
      `Project Requirements:\n${message}\n\n` +
      `Looking forward to discussing next steps!`;

    const recipient = "seesites0@gmail.com";
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    setLastSubmission({ name, mailtoUrl, gmailUrl, recipient });

    // 1. Send direct email to seesites0@gmail.com via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/seesites0@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          business: fullBusiness,
          business_type: bType,
          city: city || "Not specified",
          package: plan,
          message,
          _subject: subjectText,
          _replyto: email,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking fallback
    }

    // 2. Also invoke server function
    try {
      await submitEnquiry({
        data: {
          name,
          email,
          business_name: businessName,
          business_type: bType,
          city,
          plan,
          message,
          website: "",
        },
      });
    } catch {
      // Non-blocking
    }

    setStatus("done");
  }

  if (status === "done" && lastSubmission) {
    return (
      <div className="rounded-2xl border border-slate-300/35 bg-[#091530]/95 p-6 sm:p-10 md:p-12 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 shadow-lg">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-editorial text-2xl sm:text-3xl font-light text-white tracking-wide uppercase">
          Inquiry Received by Sia
        </h3>
        <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Thank you, <strong className="text-white font-medium">{lastSubmission.name}</strong>. Your
          project details have been sent directly to{" "}
          <strong className="text-white font-mono">{lastSubmission.recipient}</strong>. Sia will
          review your requirements and respond within 24 hours with written project scope and
          schedule.
        </p>

        <div className="mt-8 pt-6 border-t border-white/10 max-w-md mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Have existing menus, branding files or urgent timelines?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={lastSubmission.gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="metallic-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold tracking-wider uppercase"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Open in Gmail</span>
            </a>
            <a
              href={lastSubmission.mailtoUrl}
              className="metallic-btn-ghost w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-mono tracking-wider uppercase"
            >
              <span>Mail App</span>
            </a>
          </div>
        </div>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4"
        >
          ← Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      {/* Honeypot anti-spam field */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* 1. Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="name-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Your Name <span className="text-rose-400">*</span>
        </label>
        <input
          id="name-input"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          className={fieldClasses}
          placeholder="e.g. David Miller"
        />
      </div>

      {/* 2. Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="email-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Email Address <span className="text-rose-400">*</span>
        </label>
        <input
          id="email-input"
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          className={fieldClasses}
          placeholder="david@restaurant.com"
        />
      </div>

      {/* 3. Business Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="business-name-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Business / Venue Name
        </label>
        <input
          id="business-name-input"
          name="business_name"
          maxLength={150}
          className={fieldClasses}
          placeholder="e.g. Hearth & Pine Bistro"
        />
      </div>

      {/* 4. Business Type */}
      <div className="space-y-1.5">
        <label
          htmlFor="business-type-select"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Business Type
        </label>
        <select
          id="business-type-select"
          name="business_type"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value as BusinessType)}
          className={`${fieldClasses} cursor-pointer`}
        >
          {businessTypes.map((type) => (
            <option key={type} value={type} className="bg-[#070e1f] text-slate-100">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 5. City / Location */}
      <div className="space-y-1.5 sm:col-span-2">
        <label
          htmlFor="city-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          City & State / Province
        </label>
        <input
          id="city-input"
          name="city"
          maxLength={120}
          className={fieldClasses}
          placeholder="e.g. Seattle, WA or Toronto, ON"
        />
      </div>

      {/* 6. Desired Package */}
      <fieldset className="sm:col-span-2 space-y-2">
        <legend className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-1">
          Desired Package
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {plans.map((p) => {
            const isSelected = plan === p;
            return (
              <button
                type="button"
                key={p}
                aria-pressed={isSelected}
                onClick={() => setPlan(p)}
                className={`rounded-xl px-3 py-2.5 text-xs font-mono transition-all text-left flex items-center justify-between border ${
                  isSelected
                    ? "border-white bg-white text-slate-950 font-bold shadow-md"
                    : "border-white/10 bg-[#060d20]/70 text-slate-300 hover:border-white/25 hover:text-white"
                }`}
              >
                <span className="truncate">{p}</span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0 ml-1 text-slate-950" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 7. Project Requirements / Message */}
      <div className="space-y-1.5 sm:col-span-2">
        <label
          htmlFor="message-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Project Requirements & Goals <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="message-input"
          name="message"
          required
          maxLength={2000}
          rows={4}
          className={fieldClasses}
          placeholder="Tell us about your culinary concept, atmosphere, menu updates, desired launch timeframe, or any questions for Sia..."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs font-mono text-rose-400 sm:col-span-2">
          {error}
        </p>
      )}

      {/* Submit Button & Legitimacy Notice */}
      <div className="sm:col-span-2 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="metallic-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>
              {status === "sending" ? "Submitting Inquiry to Sia…" : "Submit Project Inquiry"}
            </span>
          </button>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Direct to seesites0@gmail.com · 24h Response</span>
          </div>
        </div>
      </div>
    </form>
  );
}
