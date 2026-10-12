import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  business_name: z.string().trim().max(150).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  plan: z.string().trim().max(100).default("Not sure yet"),
  message: z.string().trim().min(1, "Tell us a little about your business").max(2000),
  website: z.string().max(0).optional().default(""), // honeypot
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { website: _hp, ...row } = data;

    // 1. Send email to seesites0@gmail.com
    try {
      const emailPayload = {
        name: row.name,
        email: row.email,
        business: row.business_name || "Not specified",
        city: row.city || "Not specified",
        package: row.plan || "Not specified",
        message: row.message,
        _subject: `New SeeSites Inquiry from ${row.name} (${row.business_name || "Restaurant"})`,
        _replyto: row.email,
        _template: "table",
      };

      await fetch("https://formsubmit.co/ajax/seesites0@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailPayload),
        signal: AbortSignal.timeout(6000),
      }).catch((err) => {
        console.warn("[enquiry] FormSubmit dispatch notice:", err?.message || err);
      });
    } catch (err: any) {
      console.warn("[enquiry] Automated email dispatch notice:", err?.message || err);
    }

    // 2. Insert into Supabase database (if configured)
    try {
      if (process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        // basic rate limit: max 5 enquiries per email per hour
        const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { count } = await supabaseAdmin
          .from("enquiries")
          .select("id", { count: "exact", head: true })
          .eq("email", data.email)
          .gte("created_at", since);
        if ((count ?? 0) >= 5) {
          return { ok: false as const, error: "You've already sent a few messages — Sia will be in touch soon." };
        }
        const { error } = await supabaseAdmin.from("enquiries").insert(row);
        if (error) {
          console.warn("enquiry db insert warning:", error.message);
        }
      }
    } catch (err: any) {
      console.warn("[enquiry] Database insert optional fallback:", err?.message || err);
    }

    return { ok: true as const };
  });
