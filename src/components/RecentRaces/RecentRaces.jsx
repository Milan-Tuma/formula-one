import '../../index.css';
import RaceCard from './RaceCard';

const RecentRaces = ({ lastRace, nextRace }) => {
	return (
		<div className="container mx-auto md:hidden sm:block">
			{lastRace && (
				<RaceCard
					raceDetail={lastRace}
					title="Last"
					icon="fa-solid fa-flag-checkered"
					color="blue"
				/>
			)}
			{nextRace && (
				<RaceCard
					raceDetail={nextRace}
					title="Next"
					icon="fa-solid fa-angles-right"
					color="green"
				/>
			)}
		</div>
	);
};

export default RecentRaces;
