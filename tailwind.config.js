/** @type {import('tailwindcss').Config} */
import { default as typographyPlugin } from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#646cff",
        black: "#1a1a1a"
      },
      typography: ({ theme }) => ({
        css: {
          '--tw-prose-body': "#fff",
          '--tw-prose-headings': theme('colors.white'),
          '--tw-prose-lead': theme('colors.white'),
          '--tw-prose-links': theme('colors.white'),
          '--tw-prose-bold': theme('colors.slate[300]'),
          '--tw-prose-counters': theme('colors.red[400]'),
          '--tw-prose-bullets': theme('colors.pink[400]'),
          '--tw-prose-hr': theme('colors.slate[300]'),
          '--tw-prose-quotes': theme('colors.pink[900]'),
          '--tw-prose-quote-borders': theme('colors.pink[300]'),
          '--tw-prose-captions': theme('colors.pink[700]'),
          '--tw-prose-code': theme('colors.pink[900]'),
          '--tw-prose-pre-code': theme('colors.pink[100]'),
          '--tw-prose-pre-bg': theme('colors.pink[900]'),
          '--tw-prose-th-borders': theme('colors.pink[300]'),
          '--tw-prose-td-borders': theme('colors.pink[200]'),

        },
      }),
    },
  },
  plugins: [typographyPlugin],
}

