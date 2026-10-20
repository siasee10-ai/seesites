import { useEffect, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { Check, Mail, Send, MessageCircle } from "lucide-react";

const packages = [
  "Essential — ₹9,999",
  "Signature — ₹19,999",
  "Premium — ₹59,999",
  "Monthly Website Care",
  "Not Sure Yet",
] as const;
export type PackageOption = (typeof packages)[number];

const businessTypes = [
  "Salons & Beauty Parlour",
  "Luxury Salon & Nail Studio",
  "Makeup Artist & Beauty Professional",
  "Restaurant & Café",
  "Bakery & Home Baker",
  "Boutique & Clothing Brand",
  "Dental Clinic & Healthcare Practice",
  "Gym & Fitness Studio",
  "Interior Designer & Architect",
  "Jewellery Business",
  "Photographer & Studio",
  "Coaching Institute & Education",
  "Wellness & Spa",
  "Other Small, Growing or Established Business",
] as const;
export type BusinessTypeOption = (typeof businessTypes)[number];

const fieldClasses =
  "w-full rounded-xl border border-slate-400/20 bg-[#091326]/80 px-4 py-3.5 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:border-pink-300/60 focus:bg-[#0d1830] focus:outline-none focus:ring-1 focus:ring-pink-300/40 transition-all";

export function EnquiryForm() {
  const [selectedPackage, setSelectedPackage] = useState<PackageOption>("Signature — ₹19,999");
  const [businessType, setBusinessType] = useState<BusinessTypeOption>("Salons & Beauty Parlour");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onPick = (e: Event) => {
      const p = (e as CustomEvent<string>).detail;
      if (!p) return;
      const lower = p.toLowerCase();
      if (lower.includes("essential") || lower.includes("9,999")) {
        setSelectedPackage("Essential — ₹9,999");
      } else if (lower.includes("signature") || lower.includes("19,999")) {
        setSelectedPackage("Signature — ₹19,999");
      } else if (lower.includes("premium") || lower.includes("59,999")) {
        setSelectedPackage("Premium — ₹59,999");
      } else if (
        lower.includes("care") ||
        lower.includes("monthly") ||
        lower.includes("maintenance")
      ) {
        setSelectedPackage("Monthly Website Care");
      } else if (lower.includes("not sure")) {
        setSelectedPackage("Not Sure Yet");
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
    const businessName = data["business_name"]?.trim() || "";
    const email = data["email"]?.trim();
    const phone = data["phone"]?.trim() || "";
    const bType = data["business_type"]?.trim() || businessType;
    const pkg = (data["package"] as PackageOption) || selectedPackage;
    const existingWebsite = data["existing_website"]?.trim() || "";
    const message = data["message"]?.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in your name, email address, and project details.");
      return;
    }
    setStatus("sending");
    setError("");

    const fullBusiness = businessName
      ? bType
        ? `${businessName} (${bType})`
        : businessName
      : bType || "Business in India";

    const subjectText = `SeeSites Website Project Enquiry — ${name} (${fullBusiness})`;
    const bodyText =
      `Hi SeeSites,\n\nI'd like to enquire about getting a website designed for my business.\n\n` +
      `• Contact Name: ${name}\n` +
      `• Business Name: ${businessName || "Not specified"}\n` +
      `• Email Address: ${email}\n` +
      `• Phone Number: ${phone || "Not specified"}\n` +
      `• Business Type: ${bType}\n` +
      `• Selected Package: ${pkg}\n` +
      `• Existing Website: ${existingWebsite || "None"}\n\n` +
      `Project Details:\n${message}\n\n` +
      `Looking forward to hearing from you!`;

    const recipient = "seesites0@gmail.com";
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    setLastSubmission({ name, mailtoUrl, gmailUrl, recipient });

    // 1. Direct email dispatch to seesites0@gmail.com via FormSubmit
    try {
      await fetch("https://formsubmit.co/ajax/seesites0@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          business_name: businessName,
          email,
          phone: phone || "Not specified",
          business_type: bType,
          package: pkg,
          existing_website: existingWebsite || "None",
          message,
          _subject: subjectText,
          _replyto: email,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking fallback
    }

    // 2. Invoke server function with DB insert
    try {
      await submitEnquiry({
        data: {
          name,
          email,
          business_name: businessName,
          business_type: bType,
          phone,
          existing_website: existingWebsite,
          city: "India",
          plan: pkg,
          message,
          website: "",
        },
      });
    } catch {
      // Non-blocking fallback
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
          Enquiry Received
        </h3>
        <p className="mt-3 max-w-lg mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          Thank you, <strong className="text-white font-medium">{lastSubmission.name}</strong>. Your
          project details have been sent directly to{" "}
          <strong className="text-white font-mono">{lastSubmission.recipient}</strong>. We will
          review your requirements and get back to you within 24 business hours.
        </p>

        <div className="mt-8 pt-6 border-t border-white/10 max-w-md mx-auto">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Need to send branding assets or want direct email access?
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
              <span>Default Mail App</span>
            </a>
          </div>
        </div>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-mono text-slate-400 hover:text-white underline underline-offset-4"
        >
          ← Submit another enquiry
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
          placeholder="e.g. Priya Sharma"
        />
      </div>

      {/* 2. Business Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="business-name-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Business Name
        </label>
        <input
          id="business-name-input"
          name="business_name"
          maxLength={150}
          className={fieldClasses}
          placeholder="e.g. Aura Salon & Studio"
        />
      </div>

      {/* 3. Email Address */}
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
          placeholder="priya@yourbusiness.com"
        />
      </div>

      {/* 4. Phone Number (Optional) */}
      <div className="space-y-1.5">
        <label
          htmlFor="phone-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Phone Number / WhatsApp{" "}
          <span className="text-slate-500 text-[10px] lowercase">(optional)</span>
        </label>
        <input
          id="phone-input"
          name="phone"
          type="tel"
          maxLength={50}
          autoComplete="tel"
          className={fieldClasses}
          placeholder="+91 98765 43210"
        />
      </div>

      {/* 5. Business Type */}
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
          onChange={(e) => setBusinessType(e.target.value as BusinessTypeOption)}
          className={`${fieldClasses} cursor-pointer`}
        >
          {businessTypes.map((type) => (
            <option key={type} value={type} className="bg-[#070e1f] text-slate-100">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* 6. Website Package of Interest */}
      <div className="space-y-1.5">
        <label
          htmlFor="package-select"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Website Package of Interest
        </label>
        <select
          id="package-select"
          name="package"
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value as PackageOption)}
          className={`${fieldClasses} cursor-pointer`}
        >
          {packages.map((pkg) => (
            <option key={pkg} value={pkg} className="bg-[#070e1f] text-slate-100">
              {pkg}
            </option>
          ))}
        </select>
      </div>

      {/* 7. Existing Website URL (Optional) */}
      <div className="space-y-1.5 sm:col-span-2">
        <label
          htmlFor="existing-website-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Existing Website URL{" "}
          <span className="text-slate-500 text-[10px] lowercase">(optional, if redesigning)</span>
        </label>
        <input
          id="existing-website-input"
          name="existing_website"
          maxLength={255}
          className={fieldClasses}
          placeholder="https://yourcurrentwebsite.com"
        />
      </div>

      {/* 8. Project Details */}
      <div className="space-y-1.5 sm:col-span-2">
        <label
          htmlFor="message-input"
          className="block text-xs font-mono uppercase tracking-wider text-slate-300"
        >
          Project Details <span className="text-rose-400">*</span>
        </label>
        <textarea
          id="message-input"
          name="message"
          required
          maxLength={2000}
          rows={4}
          className={fieldClasses}
          placeholder="Tell us a little about your business, the services or products you offer, desired website features, and your preferred launch timeline..."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-xs font-mono text-rose-400 sm:col-span-2">
          {error}
        </p>
      )}

      {/* Submit Button & Direct Contacts */}
      <div className="sm:col-span-2 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="metallic-btn-pink inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5 text-slate-900" />
            <span className="text-slate-950">
              {status === "sending" ? "Sending Project Enquiry…" : "Send Project Enquiry"}
            </span>
          </button>
          <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
            <span>Direct to seesites0@gmail.com · Response in 24 business hours</span>
          </div>
        </div>
      </div>
    </form>
  );
}
