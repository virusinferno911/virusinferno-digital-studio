// Central place for links and content data used across the site.
// Edit here to update copy or links everywhere they appear.

export const WHATSAPP_NUMBER = '2348169498376';

// Required exact link for the floating button / primary "Message Us on WhatsApp" CTAs
export const WHATSAPP_ENQUIRY_LINK =
  'https://wa.me/2348169498376?text=Hello%20Virusinferno%20Digital%20Studio,%20i%20will%20like%20to%20make%20an%20enquiry.';

export const WHATSAPP_TRAINING_LINK =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Virusinferno Digital Studio, I would like to book a spot in the Virtual Tech Training.'
  )}`;

export const WHATSAPP_QUOTE_LINK =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Virusinferno Digital Studio, I would like to request a quote for a project.'
  )}`;

export const WEBSITE_URL = 'https://virusinferno.xyz';
export const X_HANDLE = '@softkey911';
export const X_URL = 'https://x.com/softkey911';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Our Services' },
  { id: 'training', label: 'Available Training' },
  { id: 'contact', label: 'Contact Us' },
];

// icon field references a lucide-react component name, resolved in Services.jsx
export const SERVICES = [
  {
    icon: 'Gauge',
    title: 'SEO & Speed Optimization',
    desc: 'Technical SEO and performance tuning that gets you found and gets you loading in record time.',
  },
  {
    icon: 'Fingerprint',
    title: 'Digital Identity Consultation',
    desc: 'Brand and digital presence strategy that positions you as the authority in your space.',
  },
  {
    icon: 'LayoutTemplate',
    title: 'Premium Landing Pages (Static & Dynamic)',
    desc: 'Conversion-focused landing pages, from lightweight static builds to fully dynamic experiences.',
  },
  {
    icon: 'Code2',
    title: 'Next-Gen Web Development',
    desc: 'Modern, scalable web applications engineered with the latest frameworks and best practices.',
  },
  {
    icon: 'MessageSquare',
    title: 'WhatsApp Chatbot (Human-in-Loop)',
    desc: 'Automated WhatsApp flows with seamless human handoff for the conversations that matter most.',
  },
  {
    icon: 'Mic',
    title: 'AI Voice & Chat Agent',
    desc: 'Intelligent voice and chat agents that handle support and sales around the clock.',
  },
  {
    icon: 'Bot',
    title: 'AI Personal Assistant Agent',
    desc: 'Custom AI assistants that manage schedules, tasks, and workflows for your business.',
  },
];

export const TRAINING_FEATURES = [
  { icon: 'Video', label: 'Live Virtual Sessions' },
  { icon: 'Users', label: 'Hands-On Mentorship' },
  { icon: 'Globe', label: 'Accessible Worldwide' },
  { icon: 'Clock', label: 'Flexible Scheduling' },
];
