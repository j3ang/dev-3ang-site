import { Container } from '@components/container';

export default function Hero() {
	return (
		<Container className="relative overflow-hidden px-2 py-10 md:px-4 2xl:px-24">
			<h1 className="select-none text-6xl font-black lg:text-7xl 2xl:text-8xl">
				<div className="opacity-60 lg:text-6xl 2xl:mt-24 2xl:text-7xl">Hi, my name is</div>
				<span className="text-orange-400">Junfeng Wang</span>, <br />
				though I prefer <span className="text-orange-400">Alex</span>.
				<br />
				<div className="md:mt-18 mt-10 text-5xl opacity-60 lg:text-6xl 2xl:mt-24 2xl:text-7xl">
					Navigating the digital realm as a
				</div>
				<span className="text-orange-400">Web Developer</span>.
			</h1>
		</Container>
	);
}
