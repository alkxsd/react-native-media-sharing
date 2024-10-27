import { AppColors } from './constants/AppColors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: AppColors.primary.DEFAULT, // Very dark navy blue
          100: AppColors.primary[100],
          200: AppColors.primary[200],
        },
        secondary: {
          DEFAULT: AppColors.secondary.DEFAULT, // Vivid blue - aligns with the logo's prominent color
          100: AppColors.secondary[100],
          200: AppColors.secondary[200],
        },
        black: {
          DEFAULT: AppColors.black.DEFAULT, // Golden yellow - adds a pop of warmth and energy
          100: AppColors.black[100],
          200: AppColors.black[200],
          300: AppColors.black[300]
        },
        accent: { // New!
          DEFAULT: AppColors.secondary.DEFAULT, // Golden yellow - adds a pop of warmth and energy
          100: AppColors.secondary[100],
          200: AppColors.secondary[200],
        },
        gray: {
          100: AppColors.gray[100], // Light gray - a neutral background option
          200: AppColors.gray[200], // Medium gray - for subtle separation
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};