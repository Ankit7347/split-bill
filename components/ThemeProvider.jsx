'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

// Type removed for JS conversion

const icons = {
	light: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-6 h-6 md:w-6 md:h-6 text-yellow-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="yellow" />
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 1v2m0 18v2m11-11h-2M3 12H1m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414"
			/>
		</svg>
	),
	dark: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-6 h-6 md:w-6 md:h-6 text-gray-200 drop-shadow-[0_0_1px_rgba(0,0,0,0.7)]"
			fill="currentColor"
			viewBox="0 0 24 24"
			stroke="none"
		>
			<path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 17a7 7 0 009-4.21z" />
		</svg>
	),
	system: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-6 h-6 md:w-6 md:h-6 text-blue-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
		>
			<rect x="3" y="4" width="18" height="14" rx="2" ry="2" />
			<path d="M8 20h8M12 16v4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
};


export default function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('system');
	const [isSpinning, setIsSpinning] = useState(false);

	// Load saved theme & apply before paint to prevent flash
	useLayoutEffect(() => {
		const saved = localStorage.getItem('theme');
		const themeToApply = saved || 'system';
		setTheme(themeToApply);
		applyTheme(themeToApply);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			if (themeToApply === 'system') applyTheme('system');
		};
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Apply the theme by toggling 'dark' class on <html>
	const applyTheme = (t) => {
		if (t === 'system') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			document.documentElement.classList.toggle('dark', prefersDark);
		} else {
			document.documentElement.classList.toggle('dark', t === 'dark');
		}
	};

	// Cycle theme & save
	const setNewTheme = (newTheme) => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	};

	// Cycle theme order
	const themeOrder = ['light', 'dark', 'system'];
	const handleToggle = () => {
		setIsSpinning(true);
		setTimeout(() => {
			const currentIdx = themeOrder.indexOf(theme);
			const nextTheme = themeOrder[(currentIdx + 1) % themeOrder.length];
			setNewTheme(nextTheme);
			setIsSpinning(false);
		}, 400); // spin duration
	};


	return (
		<>
			<div
				className="fixed bottom-4 right-4 z-50 flex flex-col items-center space-y-2"
				style={{ width: 56 }} // 12 * 4.5 (to fit 48px button + spacing)
			>
				{/* Main theme button */}
				<button
					onClick={handleToggle}
					aria-label="Switch theme"
					title={`Current theme: ${theme}`}
					className={`w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg flex items-center justify-center transform transition-transform duration-400 ${isSpinning ? 'animate-spin' : ''}`}
					style={{ animationTimingFunction: 'ease-in-out' }}
				>
					{icons[theme]}
				</button>
			</div>

			{children}
		</>
	);
}
