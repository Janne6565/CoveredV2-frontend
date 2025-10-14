const config = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				"text-primary": "var(--color-text-primary)",
				"background-from": "var(--color-background-from)",
				"background-to": "var(--color-background-to)",
				foreground: "var(--color-foreground)",
				card: "var(--color-card)",
				"card-foreground": "var(--color-card-foreground)",
				popover: "var(--color-popover)",
				"popover-foreground": "var(--color-popover-foreground)",
				primary: "var(--color-primary)",
				"primary-foreground": "var(--color-primary-foreground)",
				secondary: "var(--color-secondary)",
				"secondary-foreground": "var(--color-secondary-foreground)",
				muted: "var(--color-muted)",
				"muted-foreground": "var(--color-muted-foreground)",
				accent: "var(--color-accent)",
				"accent-foreground": "var(--color-accent-foreground)",
				destructive: "var(--color-destructive)",
				border: "var(--color-border)",
				input: "var(--color-input)",
				ring: "var(--color-ring)",
				sidebar: "var(--color-sidebar)",
				"sidebar-foreground": "var(--color-sidebar-foreground)",
				"sidebar-primary": "var(--color-sidebar-primary)",
				"sidebar-primary-foreground": "var(--color-sidebar-primary-foreground)",
				"sidebar-accent": "var(--color-sidebar-accent)",
				"sidebar-accent-foreground": "var(--color-sidebar-accent-foreground)",
				"sidebar-border": "var(--color-sidebar-border)",
				"sidebar-ring": "var(--color-sidebar-ring)",
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				md: "var(--radius-md)",
				lg: "var(--radius-lg)",
				xl: "var(--radius-xl)",
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
				heading: ["Inter", "sans-serif"], // optional second font for headings
			},
			boxShadow: { steam: "0 0 15px rgba(0, 153, 255, 0.3)" },
			transitionTimingFunction: {
				"in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
			},
			keyframes: {
				fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
				pop: {
					"0%": { transform: "scale(0.95)" },
					"100%": { transform: "scale(1)" },
				},
				shine: {
					"0%": { "background-position": "100%" },
					"100%": { "background-position": "-100%" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.4s ease-in-out",
				pop: "pop 0.2s ease-out",
				shine: "shine 5s linear infinite",
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};

export default config;
