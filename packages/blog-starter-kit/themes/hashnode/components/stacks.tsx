import { Container } from './container';
import SectionHeading from './section-heading';

export default function Stacks() {
	const tags = ['Next.js', 'Tailwind CSS', 'WordPress', 'AWS', 'MySQL'];

	return (
		<Container className="px-2 py-10 md:px-4 2xl:px-24">
			<SectionHeading title="Stacks" />
			<div className="flex flex-wrap gap-2">
				{tags.map((tag, i) => (
					<span
						key={i}
						className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
					>
						{tag}
					</span>
				))}
			</div>
		</Container>
	);
}
