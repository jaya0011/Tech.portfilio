# Jaya Arora — Developer Portfolio

Personal portfolio of **Jaya Arora**, Full-Stack Developer & Freelancer (Amritsar, India).

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Highlights

- Interactive 3D laptop + phone hero — a live "VS Code" that types out code and runs a deploy in its terminal
- Dark / light mode (defaults to dark, respects system preference)
- ⌘K / Ctrl+K command palette for keyboard navigation
- Scroll-stacking featured case studies + filterable project archive with cursor-following previews
- Static, SEO-optimised case-study page for every project (`/projects/[slug]`)
- Working contact form (Nodemailer + SMTP) with validation, honeypot spam protection and rate limiting
- SEO: metadata, Open Graph image, JSON-LD, sitemap, robots, web manifest
- Accessible: skip link, keyboard support, focus states, ARIA labels, `prefers-reduced-motion` support

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev                  # http://localhost:3000
```

| Script              | Purpose                               |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the dev server                  |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript check                      |
| `npm run format`    | Prettier (sorts Tailwind classes too) |

## Editing content

**All text, projects, skills, services and links live in one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts).
Add a project to the `projects` array and it automatically appears on the homepage, in the archive filters,
the command palette, the sitemap and gets its own case-study page.

## Contact form setup

The form posts to `/api/contact`, which sends email through SMTP. With Gmail:

1. Turn on 2-Step Verification for the Google account.
2. Create an App Password at <https://myaccount.google.com/apppasswords>.
3. Put the values in `.env.local` (locally) or your host's environment variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=jaya.arora.tech@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=jaya.arora.tech@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Until SMTP is configured, the form shows a friendly error with an "Email instead" fallback link.

## Deploying

Deploy to [Vercel](https://vercel.com/new) (recommended): import the repo, add the environment variables above, deploy.
Set `NEXT_PUBLIC_SITE_URL` to your final domain so canonical URLs, the sitemap and Open Graph tags are correct.

## Project structure

```
src/
  app/                  routes, layout, SEO files, API route
    api/contact/        contact form endpoint
    projects/[slug]/    case-study pages
  components/
    layout/             navbar, footer, command menu, background, scroll progress
    sections/           homepage sections (hero/, about, skills, services, work, process, contact)
    projects/           project preview mockups, featured card, archive, status badge
    ui/                 reusable primitives (button, reveal, split text, spotlight card, icons…)
  data/portfolio.ts     all site content
  lib/                  utilities + shared contact validation schema
```
