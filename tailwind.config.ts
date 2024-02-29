import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        "gt-walsheim-thin": ["GT Walsheim Pro Thin", "sans-serif"],
        "gt-walsheim-light": ["GT Walsheim Pro Light", "sans-serif"],
        "gt-walsheim-regular": ["GT Walsheim Pro Regular", "sans-serif"],
        "gt-walsheim-bold": ["GT Walsheim Pro Bold", "sans"],
        "gt-super-ds-trial": ["GT Super DS Trial", "sans"],
        "gt-super-ds-trial-light": ["GT Super DS Trial Light", "sans"],
        "gt-super-ds-trial-medium-italic": [
          "GT Super DS Trial Medium Italic",
          "sans",
        ],
        "gt-super-ds-trial-regular-italic": [
          "GT Super DS Trial Regular Italic",
          "sans",
        ],
      },
      colors: {
        // primary: "#00222D",
        // secondary: "#B0DA00",
        // primary: "#8a2be2",
        // secondary: "#008080",

        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        bGcolor: "var(--color-bg)",
        "textColor-dark": "var(--color-text-dark)",
        "textColor-light": "var(--color-text-light)",
        brand: {
          snow: "#AEB9BC",
          gray: {
            "100": "#f5eeed",
            "200": "#F6F8F8",
            "300": "#d9d9d9",
            "500": "#99A7AB",
            "600": "#667a81",
            "700": "#808080",
            "800": "#004257",
          },
          green: {
            "100": "#DFF099",
            "200": "#b1da00",
            "300": "#BDEB00",
          },
        },
      },
      boxShadow: {
        "card-active":
          "inset 0px 1.5px 24px 0px #29432A, inset 0px -1.5px 24px 0px #29432A",
        "card-inactive":
          "inset 0px 1.5px 24px 0px #4C4C4C, inset 0px -1.5px 24px 0px #4C4C4C",
        icon: "inset 0px 1px 8px 0px #FFFFFF, inset 0px -1px 8px 0px #FFFFFF",
      },
      lineHeight: {
        "extra-loose": "2.5",
        "12": "3rem",
        "14": "4rem",
        "16": "4.5rem",
      },
      screens: {
        xs: "400px",
        tab: "1000px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "success-card": "url('/assets/svg/success-card-dot.svg')",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};
export default config;
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
