# Virusinferno Digital Studio — Website

A React + Tailwind CSS single-page site built for Virusinferno Digital Studio: an app-like splash
screen, a sticky nav with four sections (Home, Our Services, Available Training, Contact Us),
and a floating WhatsApp button on every page.

## Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`. Deploy `dist/` to any static host — Vercel, Netlify,
Cloudflare Pages, or straight to `virusinferno.xyz` via your usual hosting/S3 + CloudFront setup.

```bash
npm run preview   # sanity-check the production build locally
```

## Where things live

```
src/
  assets/logo.png        Your logo (already wired into the splash, nav, and footer)
  siteConfig.js           All links & copy: WhatsApp links, nav items, services, training features
  hooks/useTypewriter.js  Powers the splash screen's boot-sequence text
  components/
    ui.jsx                Eyebrow, buttons, status chip, background decorations
    Logo.jsx
    Navbar.jsx
    Footer.jsx
    FloatingWhatsApp.jsx
    SplashScreen.jsx
  pages/
    Home.jsx               <- portrait placeholder lives here, search for "REPLACE WITH"
    Services.jsx
    Training.jsx
    Contact.jsx
  App.jsx                  Splash + page-switching logic lives here
tailwind.config.js         Brand colors, fonts, and the flame gradient are defined here
```

## Swap in your portrait

Open `src/pages/Home.jsx` and search for the comment `REPLACE WITH OLUWASHEYI'S PORTRAIT HERE`.
Drop your photo in `src/assets/` (e.g. `portrait.jpg`), import it at the top of the file:

```js
import portrait from '../assets/portrait.jpg';
```

and swap the placeholder `<div>` block for an `<img src={portrait} className="w-full h-full object-cover rounded-3xl" alt="Oluwasheyi Ojelade" />`.

## Updating your logo

Drop a new file into `src/assets/logo.png` (same filename) and it updates everywhere automatically
— splash screen, nav bar, and footer all import from that one file via `src/components/Logo.jsx`.

## Editing links, WhatsApp messages, or services

Everything content-related — the WhatsApp links (including the exact required enquiry link), the
services list, training features, website URL, and X handle — is centralized in `src/siteConfig.js`
so you never have to hunt across files to update copy.

## Brand colors (tailwind.config.js)

| Token          | Hex       | Use                              |
|----------------|-----------|-----------------------------------|
| `void`         | `#060B18` | Page background (deep matte navy) |
| `panel`        | `#0B1220` | Alternating section background    |
| `card`         | `#111A2E` | Card surfaces                     |
| `line`         | `#1E2A47` | Hairline borders                  |
| `ember-red`    | `#E8291C` | Flame gradient start               |
| `ember-orange` | `#FF6A00` | Flame gradient middle / accent     |
| `ember-gold`   | `#FFB020` | Flame gradient end                 |
| `steel`        | `#8D97AE` | Secondary text                     |
| `whatsapp`     | `#25D366` | WhatsApp button                    |
