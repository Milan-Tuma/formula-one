import { localizeDate } from '../../helpers/localizeDate';

const RaceCard = ({ raceDetail, title, color, icon }) => {
	const { raceName, Circuit, date } = raceDetail;

	return (
		<div
			className={`flex mx-10 my-2 shadow-md rounded-md border-${color}-200 border-solid border-2 bg-${color}-100 relative`}
		>
			<div
				className={`text-4xl px-3 my-auto -rotate-12 w-16 bg-gradient-to-r from-${color}-600 to-${color}-400 bg-clip-text text-transparent`}
			>
				<i className={icon} />
			</div>
			<div className="px-3">
				<p
					className={`uppercase absolute right-0 bottom-3 -rotate-45 text-2xl text-${color}-300 font-bold z-0`}
				>
					{title}
				</p>
				<h3 className={`text-${color}-600 font-bold uppercase`}>{raceName}</h3>
				<a
					href={Circuit.url}
					target="_blank"
					rel="noreferrer"
					className="text-gray-600 text-sm"
				>
					{Circuit.circuitName}{' '}
					<i className="fa-solid fa-arrow-up-right-from-square" />
				</a>
				<div className="text-gray-600 text-sm">{localizeDate(date)}</div>
			</div>
		</div>
	);
};

export default RaceCard;
