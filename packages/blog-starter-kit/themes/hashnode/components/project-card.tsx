import { FaArrowRight } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export default function ProjectCard({
	project,
	inView,
	index,
}: {
	project: any;
	inView: boolean;
	index: number;
}) {
	return (
		<div
			key={index}
			className={twMerge(
				'flex transform flex-col justify-between rounded-lg p-4 opacity-0  transition-opacity',
				'hover:p-4 hover:ring-2 hover:ring-orange-500',
				'dark:border-neutral-800 dark:bg-neutral-900',
			)}
			style={{
				animation: inView ? 'appear 1s cubic-bezier(0.1, 0, 0.175, 1) forwards' : 'none',
				animationDelay: inView ? `${index * 75}ms` : 'none',
			}}
		>
			<div className="flex flex-col">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<span className="text-xl font-bold text-gray-900 dark:text-neutral-100">
							{project.title}
						</span>
					</div>
				</div>
				{/* Project Date */}
				<span className="sfont-medium my-2 text-sm text-gray-900 dark:text-neutral-100">
					{project.startDate} - {project.endDate}
				</span>
				<p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">{project.description}</p>
			</div>

			{/* tags pills*/}
			<div className="my-4 flex flex-wrap items-center gap-2">
				{project.tags.map((tag: string, index: number) => (
					<span
						key={index}
						className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-900 dark:bg-neutral-800 dark:text-neutral-100"
					>
						{tag}
					</span>
				))}
			</div>

			<div className="my-2 ml-auto flex items-center justify-between">
				<div className="flex flex-row-reverse items-center gap-2 font-medium ">
					<a
						className="peer border-b-2 border-transparent text-sm  font-medium uppercase text-gray-900 hover:border-blue-500 hover:!text-blue-400 dark:text-neutral-100"
						href={`https://${project.link}`}
						target="_blank"
					>
						Visit Site
					</a>
					<span className="peer-hover:!text-orange-500">
						<FaArrowRight />
					</span>
				</div>
			</div>
		</div>
	);
}
