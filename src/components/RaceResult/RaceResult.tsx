import { FC } from 'react';
import classes from './RaceResult.module.css';

type RaceResultProps = {
	raceData: any[];
};

const RaceResult: FC<RaceResultProps> = ({ raceData }) => {
	return (
		<div className={classes.wrapper}>
			<h2>Race Detail 🏁</h2>
			<ol className={classes.list}>
				{raceData.map((driver) => {
					return (
						<li key={driver.Driver.code} className={classes.detail}>
							<span>{driver.position}.</span>
							<span>{driver.Driver.code}</span>
							<span>{driver.Time ? driver.Time.time : driver.status}</span>
							<span>{driver.Constructor.name}</span>
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default RaceResult;
