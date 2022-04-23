import classes from './SeasonStandings.module.css';

const SeasonStandings = ({ standingsData }) => {
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
