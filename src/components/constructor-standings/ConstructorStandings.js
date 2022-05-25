import classes from './ConstructorStandings.module.css';

const ConstructorStandings = ({ constructorsData }) => {
	return (
		<div className={classes.wrapper}>
			<h2>Constructors Standings 🛠️</h2>
			<ul className={classes.list}>
				{constructorsData.map((team) => {
					return (
						<li className={classes.detail} key={team.Constructor.constructorId}>
							<span>{team.position}.</span>
							<span>{team.Constructor.name}</span>
							<span>{team.points}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ConstructorStandings;
