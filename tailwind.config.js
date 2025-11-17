/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // FlashFusion Brand Colors
        primary: {
          DEFAULT: '#FF7B00',
          50: '#FFE8D6',
          100: '#FFD9BD',
          200: '#FFBC8A',
          300: '#FF9F57',
          400: '#FF8224',
          500: '#FF7B00',
          600: '#CC6200',
          700: '#994A00',
          800: '#663100',
          900: '#331900',
        },
        secondary: {
          DEFAULT: '#00B4D8',
          50: '#D6F4FC',
          100: '#ADEEFA',
          200: '#5ADDF5',
          300: '#07CCF0',
          400: '#00B4D8',
          500: '#0092B0',
          600: '#007188',
          700: '#005060',
          800: '#002F38',
          900: '#000E10',
        },
        accent: {
          DEFAULT: '#E91E63',
          50: '#FCE4EC',
          100: '#F8BBD0',
          200: '#F48FB1',
          300: '#F06292',
          400: '#EC407A',
          500: '#E91E63',
          600: '#D81B60',
          700: '#C2185B',
          800: '#AD1457',
          900: '#880E4F',
        },
        dark: {
          DEFAULT: '#0F172A',
          50: '#475569',
          100: '#334155',
          200: '#1E293B',
          300: '#0F172A',
        },
        surface: {
          DEFAULT: '#1E293B',
          light: '#334155',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
