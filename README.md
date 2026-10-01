# Umair Tahir · Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Change the content

Everything shown on the site (name, links, experience, projects, skills) lives in one file:
`src/data/site.ts`. Edit that file; no component needs to change.

- Résumé: replace `public/Umair-Tahir-Resume.pdf` (keep the same file name).
- Photo: replace `public/umair-tahir.png`.
- Project screenshots: put the image in `public/projects/`, import it at the top of
  `src/data/site.ts` and set it as the project's `image`.

## Deploy

The easiest host is Vercel: import the GitHub repository and deploy with the default settings.

After the first deploy, set the environment variable `NEXT_PUBLIC_SITE_URL` to the real address
(for example `https://umairtahir.dev`) and redeploy, so the sitemap and link previews use it.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
