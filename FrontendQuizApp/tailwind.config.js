/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      purple: '#a729f5',
      'dark-navy': '#313e51',
      navy: '#3b4d66',
      'grey-navy': '#626c7f',
      'light-grey': '#f4f6fa',
      'light-bluish': '#abc1e1',
      white: '#ffffff',
      green: '#26d782',
      red: '#ee5454',
      'old-lace': '#FFF1E9',
      'light-cyan': '#E0FDEF',
      'alice-blue': '#EBF0FF',
      magnolia: '#F6E7FF',
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      backgroundImage: {
        'desktop-light': 'url(/images/pattern-background-desktop-light.svg)',
        'desktop-dark': 'url(/images/pattern-background-desktop-dark.svg)',
        'tablet-light': 'url(/images/pattern-background-tablet-light.svg)',
        'tablet-dark': 'url(/images/pattern-background-tablet-dark.svg)',
        'mobile-light': 'url(/images/pattern-background-mobile-light.svg)',
        'mobile-dark': 'url(/images/pattern-background-mobile-dark.svg)',
      },
    },
  },
  plugins: [],
}
