# Siddharth Yadav — Portfolio

## Run
bun install · bun run dev · bun run build · bunx vitest run

## Edit content (src/data/)
- profile.ts — name, bio, email (`emailIsPlaceholder`), socials, `resumeUrl`, `contactFormEndpoint`
- projects.ts — projects + optional caseStudy; remove the `placeholder` sample when you add real ones
- skills.ts — levels: Learning | Comfortable | Proficient
- learning.ts — timeline entries
- experiments.ts — experiment list (components registered in src/routes/experiments.tsx)
- navigation.ts — header/footer links (each link needs a page in src/routes/)

## Resume
Add public/documents/resume.pdf and set `resumeUrl`. The download link appears automatically.

## Contact form
No delivery service is configured, so the form validates and offers to open your email app. To enable delivery, create a free Formspree form and put its public endpoint URL in `contactFormEndpoint`. Free tiers have monthly limits.

## GitHub
The GitHub page uses GitHub's public API (60 requests/hour per visitor IP, no key). If it fails, the page shows a retry message and the profile link still works.

## Theme
Colours live in src/styles.css (`:root` = light, `.dark` = dark). The toggle persists in localStorage.

## SEO
Set SITE_URL in src/lib/seo.ts once you have a domain.
