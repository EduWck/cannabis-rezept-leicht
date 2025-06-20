/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // Custom cannabis brand colors
        "cannabis-green": {
          DEFAULT: "#4CAF50",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20"
        },
        "dark-gray": {
          DEFAULT: "#1A1F2C",
          light: "#555555",
          medium: "#333333",
          dark: "#222222"
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)"
          }
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "blob": {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)"
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        },
        "enhanced-blob": {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          },
          "20%": {
            transform: "translate(35px, -60px) scale(1.15) rotate(72deg)"
          },
          "40%": {
            transform: "translate(-25px, 25px) scale(0.85) rotate(144deg)"
          },
          "60%": {
            transform: "translate(40px, -20px) scale(1.1) rotate(216deg)"
          },
          "80%": {
            transform: "translate(-15px, -35px) scale(0.9) rotate(288deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(360deg)"
          }
        },
        "enhanced-float": {
          "0%, 100%": { 
            transform: "translateY(0) rotate(0deg) scale(1)" 
          },
          "25%": { 
            transform: "translateY(-20px) rotate(8deg) scale(1.05)" 
          },
          "50%": { 
            transform: "translateY(-15px) rotate(0deg) scale(0.95)" 
          },
          "75%": { 
            transform: "translateY(-25px) rotate(-8deg) scale(1.02)" 
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "blob": "blob 25s infinite alternate",
        "enhanced-blob": "enhanced-blob 30s infinite alternate",
        "enhanced-float": "enhanced-float 10s ease-in-out infinite",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      scale: {
        '103': '1.03',
      },
      minHeight: {
        'screen-without-nav': 'calc(100vh - 4rem)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    'animation-delay-2000',
    'animation-delay-3000',
    'animation-delay-4000',
    'animation-delay-5000',
    'animation-delay-6000',
    'animation-delay-7000',
    'animation-delay-8000',
  ]
};
