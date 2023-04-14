import { FC } from 'react';
import classes from './SeasonStandings.module.css';

type SeasonStandingsProps = {
	standingsData: {
		Driver: {
			code: string;
			givenName: string;
			familyName: string;
		};
		position: string;
		points: string;
		wins: string;
	}[];
};

const SeasonStandings: FC<SeasonStandingsProps> = ({ standingsData }) => {
	return (
		<div className={classes.wrapper}>
			<h2>Season Standings 🏆</h2>
			<ul className={classes.list}>
				{standingsData.map((driver) => {
					return (
						<li key={driver.Driver.code} className={classes.detail}>
							<span>{driver.position}.</span>
							<span>
								{driver.Driver.givenName} {driver.Driver.familyName}
							</span>
							<span>{driver.points}</span>
							<span>({driver.wins})</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SeasonStandings;
