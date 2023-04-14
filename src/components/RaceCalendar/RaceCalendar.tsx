import { FC } from 'react';
import RaceDetail from '../RaceDetail/RaceDetail';
import classes from './RaceCalendar.module.css';

type RaceCalendarProps = {
	racesData: {
		season: string;
		Races: any[];
	};
	setRaceData: React.Dispatch<any>;
};

const RaceCalendar: FC<RaceCalendarProps> = ({ racesData, setRaceData }) => {
	const { season, Races } = racesData;

	return (
		<div>
			<h2>Race Calendar - {season} 🗓️</h2>
			<ul className={classes.calendar}>
				{Races.map((race, index) => {
					return (
						<RaceDetail
							key={index}
							raceData={race}
							setRaceData={setRaceData}
							index={index + 1}
						/>
					);
				})}
			</ul>
		</div>
	);
};

export default RaceCalendar;
