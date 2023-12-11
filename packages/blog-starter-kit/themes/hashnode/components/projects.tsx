import { useInView } from 'react-intersection-observer';
import { Container } from './container';
import ProjectCard from './project-card';
import SectionHeading from './section-heading';

export default function Projects() {
	const [ref, inView] = useInView({
		threshold: 0.1,
		triggerOnce: true,
		rootMargin: '-100px 0px',
	});

	return (
		<Container className="px-2 py-10 md:px-4 2xl:px-24">
			<SectionHeading title="Projects" />

			<div
				ref={ref}
				className="mt-4 grid grid-cols-1 gap-8 border-l-4 border-orange-100 pl-4 md:grid-cols-2 2xl:grid-cols-3"
			>
				{[
					{
						title: 'ELE Group',
						description:
							'Access exclusive members-only events and resources, shaping leadership excellence.',
						link: 'learningexecutive.com',
						startDate: 'Dec, 2018',
						endDate: 'Present',
						tags: ['Next.js', 'WordPress', 'GraphQL', 'AWS'],
						status: 'Live',
					},
				].map((project, index) => (
					<ProjectCard key={index} index={index} project={project} inView={inView} />
				))}
			</div>
		</Container>
	);
}
