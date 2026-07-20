/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#060B18', // deep matte navy — page background
        },
        panel: {
          DEFAULT: '#0B1220', // section background
        },
        card: {
          DEFAULT: '#111A2E', // card surfaces
          hover: '#16223C',
        },
        line: {
          DEFAULT: '#1E2A47', // hairline borders
        },
        ember: {
          red: '#E8291C',
          orange: '#FF6A00',
          gold: '#FFB020',
        },
        steel: {
          DEFAULT: '#8D97AE', // secondary text, blue-tinted gray
          dim: '#5C6684',
        },
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'flame-gradient': 'linear-gradient(135deg, #E8291C 0%, #FF6A00 55%, #FFB020 100%)',
        'flame-gradient-soft': 'linear-gradient(135deg, rgba(232,41,28,0.18), rgba(255,107,0,0.12))',
      },
      boxShadow: {
        ember: '0 20px 45px -15px rgba(232,41,28,0.45)',
      },
      keyframes: {
        'blink-cursor': {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
      },
      animation: {
        'blink-cursor': 'blink-cursor 0.9s step-end infinite',
      },
    },
  },
  plugins: [],
}
