import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                canvas: "var(--bg-canvas)",
                subtle: "var(--bg-subtle)",
                dark: "var(--bg-dark)",
                primary: "var(--accent-primary)",
                secondary: "var(--accent-secondary)",
                tech: "var(--accent-tech)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "border-subtle": "var(--border-subtle)",
            },
            fontFamily: {
                heading: ["var(--font-eczar)", "serif"],
                body: ["var(--font-yantramanav)", "sans-serif"],
                human: ["var(--font-gotu)", "sans-serif"],
            },
            boxShadow: {
                "float": "0 20px 40px rgba(0,0,0,0.04)",
            }
        },
    },
    plugins: [],
};
export default config;
