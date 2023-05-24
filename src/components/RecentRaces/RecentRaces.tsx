import { FC } from 'react';
import '../../index.css';
import RaceCard from './RaceCard';
import { seasonDataType } from '../../types/ergastAPI';

type RecentRacesProps = {
	seasonData: seasonDataType['MRData']['RaceTable'];
};

const RecentRaces: FC<RecentRacesProps> = ({ seasonData }) => {
	const lastRace = seasonData.Races.filter(
		(activeRace) => new Date(activeRace.date) < new Date()
	).reverse()[0];

	const nextRace = seasonData.Races.filter(
		(activeRace) => new Date(activeRace.date) > new Date()
	)[0];

	return (
		<div className="container mx-auto md:hidden sm:block">
			{lastRace && <RaceCard raceDetail={lastRace} isFinished={true} />}
			{nextRace && <RaceCard raceDetail={nextRace} isFinished={false} />}
		</div>
	);
};

export default RecentRaces;
