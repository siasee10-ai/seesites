<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md

- Site is a single scrolling homepage (`src/routes/index.tsx`) with anchor sections — the brief asked for one conversion-focused page.
- Enquiries are inserted via the `submitEnquiry` server function using the admin client; the `enquiries` table has RLS with no public policies so visitors can never read submissions.
- Never invent testimonials, clients, stats or credentials; keep placeholders marked `[PLACEHOLDER]` and portfolio items labeled "Concept Project".
