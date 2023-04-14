import { FC } from 'react';
import '../../index.css';

type RecentRacesProps = {
	lastRace: any;
	nextRace: any;
};

const RecentRaces: FC<RecentRacesProps> = ({ lastRace, nextRace }) => {
	const localizeDate = (date: string) => {
		const readableDate = new Date(date).toLocaleDateString('en-DE', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
		return readableDate;
	};

	return (
		<div className="container mx-auto md:hidden sm:block">
			<div className="flex mx-10 my-2 shadow-md rounded-md border-blue-200 border-solid border-2 bg-blue-100 relative">
				<div className="text-4xl px-3 my-auto -rotate-12 w-16 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
					<i className="fa-solid fa-flag-checkered" />
				</div>
				<div className="px-3">
					<p className="uppercase absolute right-0 bottom-3 -rotate-45 text-2xl text-blue-300 font-bold z-0">
						Last
					</p>
					<h3 className="text-blue-600 font-bold uppercase">
						{lastRace?.raceName}
					</h3>
					<a
						href={lastRace?.Circuit.url}
						target="_blank"
						rel="noreferrer"
						className="text-gray-600 text-sm"
					>
						{lastRace?.Circuit.circuitName}{' '}
						<i className="fa-solid fa-arrow-up-right-from-square" />
					</a>
					<div className="text-gray-600 text-sm">
						{localizeDate(lastRace?.date)}
					</div>
				</div>
			</div>
			<div className="flex mx-10 my-2 shadow-md rounded-md border-emerald-200 border-solid border-2 bg-green-100 relative">
				<div className="text-4xl px-3 my-auto w-16 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
					<i className="fa-solid fa-angles-right" />
				</div>
				<div className="px-3">
					<p className="uppercase absolute right-0 bottom-3 -rotate-45 text-2xl text-emerald-300 font-bold z-0">
						Next
					</p>
					<h3 className="text-green-600 font-bold uppercase">
						{nextRace?.raceName}
					</h3>
					<a
						href={nextRace?.Circuit.url}
						target="_blank"
						rel="noreferrer"
						className="text-gray-600 text-sm"
					>
						{nextRace?.Circuit.circuitName}{' '}
						<i className="fa-solid fa-arrow-up-right-from-square" />
					</a>
					<div className="text-gray-600 text-sm">
						{localizeDate(nextRace?.date)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentRaces;
