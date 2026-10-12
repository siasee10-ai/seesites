import { useEffect, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiry.functions";

const plans = [
  "Essential ($200)",
  "Signature ($500)",
  "Experience ($800)",
  "Basic Care ($150/mo)",
  "Premium Care ($300/mo)",
  "Not sure yet",
] as const;
type Plan = (typeof plans)[number];

const field =
  "w-full rounded-xl border border-slate-400/25 bg-[#091326]/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-slate-200 focus:bg-[#0d1b36] focus:outline-none focus:ring-1 focus:ring-slate-300/40 transition-all";

export function EnquiryForm() {
  const [plan, setPlan] = useState<Plan>("Not sure yet");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => {
      const p = (e as CustomEvent<string>).detail;
      if (p) {
        const found = plans.find(
          (item) => item.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(item.toLowerCase())
        );
        if (found) {
          setPlan(found);
        } else if (p.toLowerCase().includes("basic")) {
          setPlan("Basic Care ($150/mo)");
        } else if (p.toLowerCase().includes("premium")) {
          setPlan("Premium Care ($300/mo)");
        } else if (p.toLowerCase().includes("maintenance")) {
          setPlan("Basic Care ($150/mo)");
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
    const city = data["city"]?.trim() || "";
    const message = data["message"]?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in your name, email and a short message.");
      return;
    }
    setStatus("sending");
    setError("");

    const subjectText = `SeeSites Website Inquiry — ${name}${businessName ? ` (${businessName})` : ""}`;
    const bodyText =
      `Hi Sia,\n\nI'd like to get in touch regarding a website for my restaurant/café.\n\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Restaurant/Café: ${businessName || "Not specified"}\n` +
      `• City: ${city || "Not specified"}\n` +
      `• Package of Interest: ${plan}\n\n` +
      `Message Details:\n${message}\n\n` +
      `Looking forward to speaking with you!`;

    const recipient = "seesites0@gmail.com";
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    setLastSubmission({ name, mailtoUrl, gmailUrl, recipient });

    // 1. Send direct email to seesites0@gmail.com
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
          business: businessName || "Not specified",
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
      await submitEnquiry({ data: { ...data, plan } });
    } catch {
      // Non-blocking
    }

    setStatus("done");
  }

  if (status === "done" && lastSubmission) {
    return (
      <div className="rounded-2xl border border-slate-300/35 bg-[#0c1833]/95 p-8 md:p-12 text-center shadow-2xl backdrop-blur-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-slate-400/30 text-white shadow-lg">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-5 font-display text-2xl md:text-3xl font-bold text-white tracking-wide">
          Inquiry Sent to Sia!
        </p>
        <p className="mt-3 max-w-lg mx-auto text-sm md:text-base text-slate-300 leading-relaxed font-light">
          Thank you, <strong className="text-white">{lastSubmission.name}</strong>. Your inquiry has been sent directly to{" "}
          <strong className="text-white font-mono">{lastSubmission.recipient}</strong>. Sia will review your restaurant details and reply within 24 hours.
        </p>

        <div className="mt-8 pt-6 border-t border-white/10 max-w-md mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Need to attach menus, pitch decks or follow up immediately?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={lastSubmission.gmailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="metallic-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold"
            >
              Open in Gmail
            </a>
            <a
              href={lastSubmission.mailtoUrl}
              className="metallic-btn-ghost w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-medium"
            >
              Open Default Mail Client
            </a>
          </div>
        </div>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4"
        >
          ← Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="grid gap-2 text-sm text-slate-400">
        Your name *
        <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="e.g. Elena Rostova" />
      </label>
      <label className="grid gap-2 text-sm text-slate-400">
        Email *
        <input name="email" type="email" required maxLength={255} autoComplete="email" className={field} placeholder="elena@restaurant.com" />
      </label>
      <label className="grid gap-2 text-sm text-slate-400">
        Restaurant / café name
        <input name="business_name" maxLength={150} className={field} placeholder="e.g. Bistro Lumina" />
      </label>
      <label className="grid gap-2 text-sm text-slate-400">
        City
        <input name="city" maxLength={120} className={field} placeholder="e.g. Seattle, WA" />
      </label>
      <fieldset className="sm:col-span-2">
        <legend className="mb-2.5 text-sm text-slate-400">Which package interests you?</legend>
        <div className="flex flex-wrap gap-2">
          {plans.map((p) => {
            const isSelected = plan === p;
            return (
              <button
                type="button"
                key={p}
                aria-pressed={isSelected}
                onClick={() => setPlan(p)}
                className={`rounded-full px-4 py-2 text-xs md:text-sm transition-all font-mono ${
                  isSelected
                    ? "bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 font-semibold text-slate-950 shadow-md shadow-slate-950/60"
                    : "border border-slate-400/25 bg-[#091326]/60 text-slate-300 hover:border-slate-300 hover:text-white"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm text-slate-400 sm:col-span-2">
        Tell us about your business & goals *
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={4}
          className={field}
          placeholder="Tell us about your cuisine, vibe, current website, timeline or specific requirements..."
        />
      </label>
      {status === "error" && (
        <p role="alert" className="text-sm text-rose-400 sm:col-span-2 font-mono">
          {error}
        </p>
      )}
      <div className="sm:col-span-2 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="metallic-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wider uppercase transition-all disabled:opacity-50"
          >
            <span>{status === "sending" ? "Sending Inquiry to Sia…" : "Send Direct Inquiry to Sia"}</span>
            <span>→</span>
          </button>
          <span className="text-xs font-mono text-slate-400">
            Delivered directly to seesites0@gmail.com · Response within 24h
          </span>
        </div>
      </div>
    </form>
  );
}
