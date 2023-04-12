import { FC } from 'react';
import '../../index.css';
import RaceCard from './RaceCard';

type RecentRacesProps = {
	lastRace: any;
	nextRace: any;
};

const RecentRaces: FC<RecentRacesProps> = ({ lastRace, nextRace }) => {
	return (
		<div className="container mx-auto md:hidden sm:block">
			{lastRace && <RaceCard raceDetail={lastRace} isFinished={true} />}
			{nextRace && <RaceCard raceDetail={nextRace} isFinished={false} />}
		</div>
	);
};

export default RecentRaces;
