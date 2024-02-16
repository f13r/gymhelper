import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        pink: colors.pink,
        cyan: colors.cyan,
        zinc: colors.zinc,
        yellow: colors.yellow,
        blue: colors.blue,
        red: colors.red,
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
