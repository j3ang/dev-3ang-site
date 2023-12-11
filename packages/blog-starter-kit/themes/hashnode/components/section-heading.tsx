import { twMerge } from 'tailwind-merge';

export default function SectionHeading({
	title,
	subtitle = '',
	className = '',
}: {
	title: string;
	subtitle?: string;
	className?: string;
}): JSX.Element {
	const commonClases = 'text-neutral-900 dark:text-neutral-100';

	return (
		<div className="mb-8">
			<h1 className={twMerge(commonClases, 'text-3xl font-bold', className)}>{title}</h1>
			<h6
				className={twMerge(
					commonClases,
					'mt-2 text-slate-500 dark:text-slate-300 dark:opacity-70',
					className,
				)}
			>
				{subtitle}
			</h6>
		</div>
	);
}
