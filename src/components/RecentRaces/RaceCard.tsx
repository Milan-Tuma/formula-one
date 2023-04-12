import { FC } from 'react';
import { localizeDate } from '../../helpers/localizeDate';

type RaceCardProps = {
	raceDetail: {
		raceName: string;
		Circuit: {
			url: string;
			circuitName: string;
		};
		date: string;
	};
	isFinished: boolean;
};

const RaceCard: FC<RaceCardProps> = ({ raceDetail, isFinished }) => {
	const { raceName, Circuit, date } = raceDetail;

	return (
		<div
			className={`my-4 shadow-md rounded-md border-solid border-2 relative max-w-[300px] mx-auto`}
		>
			<div className="px-3 bg-neutral-200 font-bold">
				{isFinished ? 'Last race' : 'Next race'}
			</div>
			<div className="px-3">
				<h3 className="uppercase">{raceName}</h3>
				<a
					href={Circuit.url}
					target="_blank"
					rel="noreferrer"
					className="text-gray-600 text-sm"
				>
					{Circuit.circuitName}
					<i className="fa-solid fa-arrow-up-right-from-square ml-1" />
				</a>
				<div className="text-gray-600 text-sm">{localizeDate(date)}</div>
			</div>
		</div>
	);
};

export default RaceCard;
