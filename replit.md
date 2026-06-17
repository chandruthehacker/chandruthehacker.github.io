# Cybersecurity Portfolio — Chandraprakash

A clean, recruiter-focused cybersecurity portfolio. Modern redesign with floating pill navbar, gradient blob background, scroll-reveal animations, dark/light theme, and a filter-able project grid.

## Tech Stack

- **Frontend**: React 18 + TypeScript (TSX)
- **Build System**: Vite
- **Styling**: Inline styles + CSS-in-JS (injected via `<style>` tag in Portfolio.tsx)
- **Animations**: CSS keyframes + IntersectionObserver scroll reveals
- **Entry**: `src/main.tsx` → `src/App.tsx` → `src/Portfolio.tsx`

## Project Structure

```
src/
  data/
    constants.jsx     ← ALL editable content: bio, roles, skills, projects, certs, socials
  Portfolio.tsx       ← Main portfolio component (imports from constants)
  App.tsx             ← Simple wrapper that renders <Portfolio />
  main.tsx            ← React DOM entry point
  index.css           ← Base reset styles only

public/
  images/             ← All portfolio images (profile, projects, certs, education)
  favicon.png / ico   ← Favicons

_old/                 ← Previous portfolio code (archived, not used)
artifacts/            ← Mockup sandbox (design prototyping, not used in production)
```

## How to Edit Content

**All portfolio content lives in one file:** `src/data/constants.jsx`

| Export         | What it controls                          |
|----------------|-------------------------------------------|
| `ROLES`        | Typewriter cycling roles in hero          |
| `NAV_ITEMS`    | Navbar links                              |
| `RESUME_URL`   | Resume button link                        |
| `HERO_STATS`   | Stats bar (Top 1%, 149+ rooms, etc.)      |
| `BIO`          | Name, college, email, profile image path  |
| `ABOUT_HIGHLIGHTS` | 3 highlight cards in About section    |
| `SKILLS`       | Skill categories with items and colors    |
| `EDUCATION`    | Degree, college, CGPA, coursework         |
| `EXPERIENCE`   | TryHackMe stats, bullet points, tags      |
| `PROJECTS`     | Project cards with images, tags, metrics  |
| `CERTS`        | Certificate cards with issuer/link        |
| `SOCIALS`      | Contact section social links              |

## Running the App

Workflow: **Start application**
```
npm run dev
```
Runs on port 5000 at `http://0.0.0.0:5000`

## Building for Production

```
npm run build
```
Output goes to `build/` directory.

## Deployment

Static site — build command `npm run build`, public directory `build`.

## User Preferences

- Constants always in a separate file (`src/data/constants.jsx`) — never embedded in component code
- Clean folder structure: no unused files in `src/`
- All images served from `public/images/`
