import { FC } from 'react';
import classes from './RaceDetail.module.css';

type RaceDetailProps = {
	raceData: any;
	setRaceData: React.Dispatch<any>;
	index: number;
};

const RaceDetail: FC<RaceDetailProps> = ({ raceData, setRaceData, index }) => {
	const raceDate = new Date(raceData.date);
	const readableDate = new Date(raceData.date).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const raceFinished = raceDate < new Date();

	return (
		<div
			onClick={() => raceFinished && setRaceData(index)}
			className={`${classes.wrapper} ${
				raceFinished ? classes.finished : classes.pending
			}`}
		>
			<div className={classes.roundDate}>{raceData.round}</div>
			<div className={classes.raceDetail}>
				<h3>{raceData.raceName}</h3>
				<small>{readableDate}</small>
			</div>
		</div>
	);
};

export default RaceDetail;
