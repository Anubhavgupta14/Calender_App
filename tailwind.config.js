/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"], // Keep class-based dark mode, or change to 'media' for automatic
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  // Custom color theme (you can change the values here to customize)
		  background: 'hsl(var(--background, 0, 0%, 98%))', // Default light background
		  foreground: 'hsl(var(--foreground, 0, 0%, 20%))', // Default foreground color (dark text)
		  
		  card: {
			DEFAULT: 'hsl(var(--card, 0, 0%, 100%))',
			foreground: 'hsl(var(--card-foreground, 0, 0%, 20%))',
		  },
		  
		  popover: {
			DEFAULT: 'hsl(var(--popover, 0, 0%, 100%))',
			foreground: 'hsl(var(--popover-foreground, 0, 0%, 40%))',
		  },
		  
		  primary: {
			DEFAULT: 'hsl(var(--primary, 35, 35%, 55%))', // Adjust primary to be a distinct color
			foreground: 'hsl(var(--primary-foreground, 100%, 100%))', // Light text on primary
		  },
		  
		  secondary: {
			DEFAULT: 'hsl(var(--secondary, 10, 30%, 40%))', // Custom secondary color
			foreground: 'hsl(var(--secondary-foreground, 255, 255%, 255%))',
		  },
		  
		  muted: {
			DEFAULT: 'hsl(var(--muted, 0, 0%, 90%))',
			foreground: 'hsl(var(--muted-foreground, 0, 0%, 20%))',
		  },
		  
		  accent: {
			DEFAULT: 'hsl(var(--accent, 210, 100%, 50%))', // Accent color (blue example)
			foreground: 'hsl(var(--accent-foreground, 255, 255%, 255%))',
		  },
		  
		  destructive: {
			DEFAULT: 'hsl(var(--destructive, 0, 70%, 60%))',
			foreground: 'hsl(var(--destructive-foreground, 255, 255%, 255%))',
		  },
		  
		  border: 'hsl(var(--border, 0, 0%, 90%))', // Border color
		  input: 'hsl(var(--input, 0, 0%, 100%))', // Input background
		  ring: 'hsl(var(--ring, 35, 35%, 55%))', // Ring color for focus
  
		  // Custom chart colors (you can change these too)
		  chart: {
			'1': 'hsl(var(--chart-1, 240, 100%, 60%))',
			'2': 'hsl(var(--chart-2, 120, 70%, 60%))',
			'3': 'hsl(var(--chart-3, 60, 100%, 60%))',
			'4': 'hsl(var(--chart-4, 30, 100%, 60%))',
			'5': 'hsl(var(--chart-5, 180, 80%, 60%))',
		  },
		},
  
		// Border radius for consistency across your design
		borderRadius: {
		  lg: 'var(--radius, 0.5rem)', // Default large radius
		  md: 'calc(var(--radius, 0.5rem) - 2px)', // Medium radius with slight adjustment
		  sm: 'calc(var(--radius, 0.5rem) - 4px)', // Small radius with adjustment
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"), // Add animation plugin (tailwind-animate)
	],
  };
  