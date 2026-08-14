# Your Portfolio Site

A static, no-build-step site (plain HTML/CSS/JS) with three sections:

- **Live Website Results** — cards for shipped sites, tagged with the skills used
- **Engineering Project Results** — cards that expand into an inline PDF viewer
- **Coding Projects** — pulled live from the GitHub API using your username

Plus About, Skills & Tech Stack, and Résumé sections.

## 1. Edit your content

Everything you need to change lives in **`js/config.js`** — open it and fill in:

- `name`, `role`, `bio`, `socials`
- `githubUsername` — this alone powers the whole Coding Projects section
- `skills` — grouped tags
- `liveProjects` — one entry per site, with `url`, `description`, and `skills`
- `engineeringProjects` — one entry per report, pointing at a PDF file
- `resumeFile` — path to your résumé PDF

You should not need to touch `index.html`, `css/style.css`, or `js/main.js` for
normal content updates.

## 2. Add your files

- Screenshots → `assets/images/` (optional — reference the path in a project's `image` field)
- Engineering reports → `assets/pdfs/` (reference the filename in `engineeringProjects[].file`)
- Résumé → `assets/resume/resume.pdf` (replace the placeholder file already there)

A placeholder PDF and résumé are included so the site works immediately —
swap them out whenever you're ready.

## 3. Preview locally (optional)

Any static server works, e.g.:

```bash
npx serve .
```

## 4. Deploy to Vercel

Since Vercel is already linked to your GitHub:

1. Push this folder to a GitHub repo.
2. In Vercel, import the repo (or it may auto-deploy if Vercel is watching your account).
3. Framework preset: **Other** — no build command or output directory needed, this is a plain static site.
4. Deploy. Done.

## Notes

- The Coding Projects section calls the public GitHub REST API
  (`api.github.com/users/<username>/repos`) directly from the browser — no
  server or API key needed. It excludes forks and shows your most recently
  updated repos by default; set `githubPinnedRepos` in `config.js` if you'd
  rather hand-pick which ones show up.
- Engineering PDFs are embedded with an `<iframe>`, so they open inline when a
  card is clicked, with a download link underneath.
