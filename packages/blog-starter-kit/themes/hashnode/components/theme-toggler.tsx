import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import CommonHeaderIconBtn from './common-header-icon-btn';
import MoonSVG from './icons/svgs/moonSVG';
import SunSVG from './icons/svgs/sunSVG';

export default function ThemeToggler() {
	const { resolvedTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [currentTheme, setCurrentTheme] = useState(theme || 'dark');

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<CommonHeaderIconBtn
				handleClick={() => {
					const newTheme = theme == 'dark' ? 'light' : 'dark';
					setTheme(newTheme);
					setCurrentTheme(newTheme);
				}}
				variant="theme"
			>
				{currentTheme === 'dark' ? <SunSVG /> : <MoonSVG />}
			</CommonHeaderIconBtn>
		</div>
	);
}
