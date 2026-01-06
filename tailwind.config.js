import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [

        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: 'var(--background)',
                surface: 'var(--surface)',
                'surface-alt': 'var(--surface-alt)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    dark: 'var(--primary-dark)',
                    light: 'var(--primary-light)',
                },
                text: {
                    DEFAULT: 'var(--text)',
                    secondary: 'var(--text-secondary)',
                    tertiary: 'var(--text-tertiary)',
                },
                border: 'var(--border)',
                accent: 'var(--accent)',
            },
        },
    },


    plugins: [forms],
};
