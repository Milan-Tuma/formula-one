import RaceDetail from '../RaceDetail/RaceDetail';

import classes from './RaceCalendar.module.css';

const RaceCalendar = ({ racesData, setRaceData }) => {
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
