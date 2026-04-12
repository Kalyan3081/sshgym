/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                accent: "#e8800a",
                "accent-light": "#f5a623",
                "accent-dark": "#c7650a",
                gym: {
                    bg: "#0a0d11",
                    bg2: "#0f1318",
                    surface: "#141a22",
                    surface2: "#1a2230",
                    border: "#1f2d3d",
                    text: "#dce8f0",
                    muted: "#5e7a94",
                },
            },
            fontFamily: {
                bebas: ["'Bebas Neue'", "sans-serif"], // keep if used
                barlow: ["'Barlow Condensed'", "sans-serif"], // keep if used

                dm: ["var(--font-dm)"],        // from next/font
                syne: ["var(--font-syne)"],    // from next/font
            },
            fontSize: {
                "hero": "clamp(68px, 15vw, 160px)",
            },
            animation: {
                "fade-up": "fadeUp 0.7s ease both",
                "pulse-dot": "pulseDot 2s infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseDot: {
                    "0%, 100%": { opacity: "1", transform: "scale(1)" },
                    "50%": { opacity: "0.5", transform: "scale(0.8)" },
                },
            },
        },
    },
    plugins: [],
};