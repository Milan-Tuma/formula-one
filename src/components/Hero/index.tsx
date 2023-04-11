import { FC } from 'react';

type HeroProps = {
	headline: string;
	year?: number;
};

const Hero: FC<HeroProps> = ({ headline, year }) => {
	return (
		<div className="w-full bg-red-600 py-2 px-4">
			<h1 className="text-white text-xl font-bold">{headline}</h1>
			{year && (
				<div className="text-neutral-200 mt-2">
					Race calendar for <span className="font-bold">{year}</span>
				</div>
			)}
		</div>
	);
};

export default Hero;
