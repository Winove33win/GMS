import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
        theme: {
                container: {
                        center: true,
                        padding: '1.5rem',
                        screens: {
                                '2xl': '1200px'
                        }
                },
                extend: {
                        fontFamily: {
                                inter: ['Inter', 'sans-serif'],
                                display: ['Poppins', 'Inter', 'sans-serif'],
                        },
                        colors: {
                                brand: {
                                        dark: '#2C2C2C',
                                        green: '#2FB464',
                                        orange: '#F2A21A',
                                },
                                surface: {
                                        DEFAULT: '#FFFFFF',
                                        muted: '#F9FAFB',
                                },
                                ink: {
                                        DEFAULT: '#0F0F0F',
                                        muted: '#6B7280',
                                },
                                border: 'hsl(var(--border))',
                                input: 'hsl(var(--input))',
                                ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
                                card: {
                                        DEFAULT: 'hsl(var(--card))',
                                        foreground: 'hsl(var(--card-foreground))'
                                },
			},
                        borderRadius: {
                                '2xl': '1.25rem',
                                lg: 'var(--radius)',
                                md: 'calc(var(--radius) - 4px)',
                                sm: 'calc(var(--radius) - 8px)'
                        },
                        boxShadow: {
                                'card-soft': '0 8px 24px rgba(0,0,0,0.06)',
                        },
                        transitionDuration: {
                                default: '180ms',
                        },
                        transitionTimingFunction: {
                                soft: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'glow': {
					'0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite alternate',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards'
			}
		}
	},
       plugins: [animate, typography],
} satisfies Config;
