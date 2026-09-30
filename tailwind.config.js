/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          dark: "#2A2038",      // Dark Lavender Slate
          darker: "#1F172B",    // Deep Lavender Night
          sidebar: "#251C33",   // True Lavender Sidebar
          emerald: "#382A4A",   // Soft Lavender Header Accent
          leaf: "#9B72CF",      // True Vibrant Lavender
          leafHover: "#875BBF", // Rich Lavender Hover
          lightLeaf: "#ECE3F7", // Soft Pastel Lavender Tag
          cream: "#F4EDFA",     // Light Lavender Cream
          creamLight: "#FAF6FC",// Ultra Light Lavender Mist Card
          offwhite: "#FAF8FC",  // Soft Lavender Background
          charcoal: "#2A2238",  // Dark Lavender Charcoal Text
          slateText: "#6E6285", // Muted Lavender Text
          gold: "#D99B26",      // Warm Amber Accent
          goldHover: "#B8801A", // Warm Amber Hover
          amberLight: "#FEF7E6",// Soft Amber Tag
          card: "#FFFFFF",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(155, 114, 207, 0.1), 0 2px 6px -1px rgba(155, 114, 207, 0.05)',
        'card': '0 12px 32px -4px rgba(155, 114, 207, 0.15), 0 4px 12px -2px rgba(155, 114, 207, 0.08)',
        'glow': '0 0 25px rgba(155, 114, 207, 0.35)',
        'glow-purple': '0 10px 30px rgba(15B, 114, 207, 0.25)',
        'gold-glow': '0 0 20px rgba(217, 155, 38, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
