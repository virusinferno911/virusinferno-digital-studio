# Virusinferno Digital Studio - Website

A dynamic React + Tailwind CSS single-page application built for Virusinferno Digital Studio. It features a sleek glassmorphism design, an app-like splash screen, and a fully functional CMS (Admin Dashboard) for real-time content updates without needing a complex backend.

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

This outputs a static site to `dist/`. Deploy `dist/` to any static host — Vercel, Netlify, Cloudflare Pages, or straight to `virusinferno.xyz`. (A `vercel.json` file is included to handle React SPA routing).

## Where things live

```text
src/
  assets/                 Default images (logo.webp, devices-mockup.webp, Oluwasheyi.webp)
  siteConfig.js           Static links: WhatsApp URLs, social handles, and website URL
  hooks/useTypewriter.js  Powers the splash screen's boot-sequence typing animation
  components/
    Navbar.jsx            Top navigation with glassmorphism effects
    Footer.jsx            Contains the hidden Admin Dashboard lock icon
    FloatingWhatsApp.jsx  Global floating contact button
    SplashScreen.jsx      App-like intro screen with dynamic background support
  pages/
    Home.jsx              Hero section, dynamic portrait, and scrolling carousel
    Services.jsx          Dynamic grid of services managed via Admin
    Training.jsx          Virtual training details and features
    Contact.jsx           Contact channels and quote CTA
    Admin.jsx             Command Center for updating CMS data
  App.jsx                 Master wrapper, routing, and dynamic global background state
tailwind.config.js        Brand colors, fonts, and custom styling configurations
```

## Managing Website Content (Admin Dashboard)

You no longer need to edit code to update your site's core content! 
1. Scroll to the very bottom right of the **Footer**.
2. Click the faint, hidden **Lock Icon** next to the copyright text.
3. Log in using your secure admin credentials.
4. From the **Command Center**, you can:
   * **Manage Services:** Add, edit, or delete the services displayed on the Our Services page.
   * **Carousel Images:** Upload `.webp` images, titles, and descriptions for the scrolling showcase on the Home page.
   * **Site Media:** Instantly swap out the Global Background image (`fire-bg.webp`) or your Homepage Portrait.

## Brand Colors

The site utilizes a premium light glassmorphism aesthetic.

| Element | Colors (Hex) | Use |
| :--- | :--- | :--- |
| **Global Background** | `#FFF5F0` to `#FFE8E0` | Soft warm gradient behind the frosted glass. |
| **Primary Accents** | `#E8291C` to `#FF6A00` | Vibrant flame gradient used on buttons, icons, and text highlights. |
| **Glass Cards** | `rgba(255,255,255,0.45)` | Backdrop-filtered panels providing the frosted glass aesthetic. |
| **Dark Text** | `#111827` (Gray-900) | High-contrast text for ultimate readability on light backgrounds. |