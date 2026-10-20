import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(50).optional().default(""),
  business_name: z.string().trim().max(150).optional().default(""),
  business_type: z.string().trim().max(100).optional().default(""),
  existing_website: z.string().trim().max(255).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  plan: z.string().trim().max(100).default("Not sure yet"),
  message: z.string().trim().min(1, "Tell us a little about your business").max(2000),
  website: z.string().max(0).optional().default(""), // honeypot
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { website: _hp, business_type, phone, existing_website, ...row } = data;

    const fullBusiness = row.business_name
      ? business_type
        ? `${row.business_name} (${business_type})`
        : row.business_name
      : business_type || "Not specified";

    // 1. Send email to seesites0@gmail.com
    try {
      const emailPayload = {
        name: row.name,
        email: row.email,
        phone: phone || "Not specified",
        business: fullBusiness,
        business_type: business_type || "Not specified",
        existing_website: existing_website || "None",
        city: row.city || "Not specified",
        package: row.plan || "Not specified",
        message: row.message,
        _subject: `New SeeSites Project Inquiry from ${row.name} (${fullBusiness})`,
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
        console.warn(
          "[enquiry] FormSubmit dispatch notice:",
          err instanceof Error ? err.message : String(err),
        );
      });
    } catch (err: unknown) {
      console.warn(
        "[enquiry] Automated email dispatch notice:",
        err instanceof Error ? err.message : String(err),
      );
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
          return {
            ok: false as const,
            error: "You've already sent a few messages — Sia will be in touch soon.",
          };
        }

        // Store extra details nicely inside message for backward compatibility with schema
        const extraDetails = [
          phone ? `Phone: ${phone}` : "",
          existing_website ? `Existing Site: ${existing_website}` : "",
        ]
          .filter(Boolean)
          .join(" | ");

        const combinedMessage = extraDetails ? `[${extraDetails}]\n\n${row.message}` : row.message;

        const { error } = await supabaseAdmin.from("enquiries").insert({
          name: row.name,
          email: row.email,
          business_name: fullBusiness,
          city: row.city,
          plan: row.plan,
          message: combinedMessage,
        });
        if (error) {
          console.warn("enquiry db insert warning:", error.message);
        }
      }
    } catch (err: unknown) {
      console.warn(
        "[enquiry] Database insert optional fallback:",
        err instanceof Error ? err.message : String(err),
      );
    }

    return { ok: true as const };
  });
