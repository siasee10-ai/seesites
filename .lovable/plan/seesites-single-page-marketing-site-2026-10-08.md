# SeeSites — single-page marketing site

One long editorial homepage at `/`, built exactly to the brief. No made-up reviews, clients, stats or credentials.

## Look and feel
- Monochrome: off-white and soft white backgrounds, near-black text, charcoal sections, warm-gray neutrals, one quiet accent (muted terracotta/espresso tone, used sparingly).
- Typography: Geist-style premium sans (e.g. "Inter Tight" avoided — use "Manrope" for body and "Instrument Sans"/"General Sans"-like bold display for headings), huge H1 (72–110px desktop), scales down cleanly on mobile.
- Thin borders, sparse rounded corners, subtle shadows, calm fade/slide reveals on scroll, gentle image zoom on hover. Respects reduced-motion.

## Sections (top to bottom)
1. Sticky minimal nav (Services, Pricing, Work, Process, FAQ, Contact) + "Start Your Website" button; mobile menu.
2. Hero — "Your restaurant deserves to be seen." with both CTAs and a collage of restaurant website mockups (generated images).
3. Trust strip — "Clear pricing. Clear process. No unnecessary complexity." plus the trust points.
4. Services — custom websites, domain support, maintenance.
5. "Your website. Your atmosphere." — customization list + 3 contrasting style concepts.
6. Work — 5 cards (Modern Café, Fine Dining, Casual Restaurant, Bakery, Coffee Shop), each labeled "Concept Project".
7. Pricing — Starter $200, Creative $500 (highlighted as "Recommended"), Premium $800, with only the listed features.
8. Process — 4 numbered steps.
9. Payment — timeline: 50% Deposit → Design & Development → Review → 50% Final → Launch.
10. Maintenance — Care (up to $150/mo), Care+ (up to $300/mo), "Ask About Maintenance".
11. Testimonials — clearly marked placeholders ("Add real client testimonial here", [Client Name] — [Restaurant/Café]).
12. Founder — Sia, Website Developer, using the suggested copy; portrait placeholder.
13. FAQ — accordion with the 7 given questions.
14. Final CTA (dark, cinematic) + enquiry form + "Email Sia" (seesites0@gmail.com).
15. Footer — nav, email, © 2026 SeeSites. No social links.

## Enquiry form
"Start Your Website" and the "Choose [plan]" buttons scroll to a short form (name, email, restaurant/café name, city, chosen plan, message). Plan buttons preselect the plan.
- Every enquiry is saved in Lovable Cloud so none get lost; you can view them in Cloud → Database → enquiries.
- Email alerts to seesites0@gmail.com need a verified domain you own — can be added later.

## Images
Generated: hero mockup collage, 5 concept site previews, 3 atmosphere concepts. Food/restaurant imagery, no fake brand names.

## SEO and accessibility
Unique title/description/social tags targeting restaurant & café website design (USA/Canada), one H1, semantic sections, alt text, visible focus states, labeled form fields.

## Technical details
- Rewrite `src/routes/index.tsx`; section components under `src/components/site/`; tokens + fonts in `src/styles.css` / `__root.tsx` head.
- Enable Lovable Cloud; `enquiries` table with RLS (no public read), insert via a validated (zod) server function with basic rate limiting.
- IntersectionObserver-based reveal hook; no heavy animation library.
- Test one submission end to end, then delete that test row.
