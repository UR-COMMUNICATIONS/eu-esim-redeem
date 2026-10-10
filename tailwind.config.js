/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      flex: {
        full: "0 0 100%",
      },
      margin: {
        15: "3.75rem",
      },
      padding: {
        15: "3.75rem",
      },
      gap: {
        15: "3.75rem",
      },
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
      },
      screens: {
        xs: "380px",
      },
      colors: {
        disabled: {
          DEFAULT: "#D0D0D0",
        },
        white: {
          DEFAULT: "#ffffff",
          rgb: "rgba(255, 255, 255, 0.60)",
        },
        secondary: {
          100: "#FFFCC5",
          200: "#FFFA85",
          300: "#FFF146",
          400: "#FFE31B",
          650: "#FFC266",
          500: "#FFC400",
          600: "#E29800",
          700: "#BB6C02",
          800: "#985308",
          900: "#7C440B",
        },
        // EU Wifi primary palette. `main` remains as a compatibility alias for
        // legacy components, so every existing main-* utility now follows the
        // current blue theme without route-specific checks.
        main: {
          10: "#F8FAFD",
          20: "#F5F8FC",
          50: "#F2F6FC",
          60: "#EDF2FA",
          100: "#E3EBF7",
          200: "#C7D6EC",
          300: "#A7BCDD",
          400: "#6E8FC3",
          500: "#2C4A8F",
          600: "#223870",
          650: "#1F3468",
          700: "#1A2B57",
          750: "#18284F",
          800: "#142144",
          900: "#101A36",
          950: "#0A1124",
        },
        // EU Wifi's gold accent — the "wifi" in the logo, and the header's
        // account button. `goldGradient` below is the three-stop sweep these
        // two sit at either end of.
        gold: {
          400: "#EDBC7E",
          600: "#BB8E5B",
          DEFAULT: "#BB8E5B",
        },
        // Explicit EU Wifi brand utilities used by the rebranded screens.
        eu: {
          50: "#F2F6FC",
          100: "#E3EBF7",
          200: "#C7D6EC",
          500: "#2C4A8F",
          600: "#223870",
          700: "#1A2B57",
          DEFAULT: "#223870",
        },
        black: {
          100: "#E7E7E7",
          200: "#D1D1D1",
          500: "#25262B",
          600: "#888888",
          700: "#4F4F4F",
          800: "#161616",
          900: "#191919",
          DEFAULT: "#000000",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          250: "#ECECEC",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
          black: "#181A20",
          rgb: "rgba(207, 207, 207, 0.20)",
        },
        yellow: {
          400: "#F7D259",
        },
        status: {
          error: "#DE3737",
          success: "#56AD7E",
          warning: "#FF9F43",
          info: "#54A0FF",
          alert: "#FECA57",
        },
      },
      fontSize: {
        xxs: "0.665rem",
        "2xml": "1.75rem",
        "3xml": "1.875rem",
        "6xml": "4rem",
        "7xml": "5rem",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        gilroy: ["Gilroy", "sans-serif"],
        sansPro: ["Source Sans 3", "sans-serif"],
        meid: ["Miedinger W01 Bold", "sans-serif"],
      },
      boxShadow: {
        mid: "0px -8px 24px 0px rgba(0, 0, 0, 0.10)",
        "card-primary": "0px 15px 24px 0px rgba(0, 0, 0, 0.12)",
        "card-secondary": "0px 4px 12.1px 0px rgba(13, 13, 13, 0.06)",
      },
      backgroundImage: {
        login: "url('./assets/images/loginBg.png')",
        mainGradient:
          "linear-gradient(1deg, #D33739 0.75%, #D33739 30.9%, rgba(211, 55, 57, 0.00) 89.76%)",
        goldGradient:
          "linear-gradient(95.69deg, #BB8E5B -22.39%, #EDBC7E 59.42%, #BB8E5B 141.23%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  darkMode: ["class", "class"],
  plugins: [require("tailwindcss-animate")],
};
