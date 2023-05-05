import { FC, useState } from 'react';

import DataList from '../DataList/DataList';
import Button from '../ui/Button';

import '../../index.css';

type ResultStandingProps = {
	raceData: any;
	driversData: any;
	constructorsData: any;
};

const ResultStanding: FC<ResultStandingProps> = ({
	raceData,
	driversData,
	constructorsData,
}) => {
	const [index, setIndex] = useState(0);

	if (!raceData || !driversData || !constructorsData)
		return <div className="align-center mx-5">Loading...</div>;

	const races = raceData.map((race: any) => {
		const driverName = race.Driver.givenName + ' ' + race.Driver.familyName;
		const status = race.status === 'Finished' ? race.Time.time : race.status;
		const { position, points } = race;

		return (
			<li key={race.Driver.driverId} className="flex w-full mb-1">
				<span className="w-10 px-3">{position}</span>
				<span className="flex-1">{driverName}</span>
				<span className="w-max px-3">{status}</span>
				<span className="w-10 px-3">{points}</span>
			</li>
		);
	});

	const drivers = driversData.map((driver: any) => {
		const driverName = driver.Driver.givenName + ' ' + driver.Driver.familyName;
		const driverTeam = driver.Constructors[0].name;
		const { position, points } = driver;

		return (
			<li key={driver.Driver.driverId} className="flex w-full mb-1">
				<span className="w-10 px-3">{position}</span>
				<span className="flex-1">{driverName}</span>
				<span className="w-max px-3">{driverTeam}</span>
				<span className="w-10 px-3">{points}</span>
			</li>
		);
	});

	const constructors = constructorsData.map((constructor: any) => {
		const teamName = constructor.Constructor.name;
		const { position, points } = constructor;

		return (
			<li
				key={constructor.Constructor.constructorId}
				className="flex w-full mb-1"
			>
				<span className="w-10 px-3">{position}</span>
				<span className="flex-1">{teamName}</span>
				<span className="w-10 px-3">{points}</span>
			</li>
		);
	});

	const buttons = ['Race Results', 'Drivers', 'Constructors'];
	const buttonContent = buttons.map((button, i) => {
		return (
			<Button
				key={i}
				onClick={() => setIndex(i)}
				className={`${
					index === i ? 'bg-red-600' : 'bg-neutral-400'
				} w-full shadow-md py-3 text-white`}
			>
				{<>{button}</>}
			</Button>
		);
	});

	return (
		<section className="md:hidden sm:block">
			<div className="flex my-3 mb-5">{buttonContent}</div>
			{index === 0 && (
				<div className="flex w-full">
					<DataList>{<>{races}</>}</DataList>
				</div>
			)}
			{index === 1 && (
				<div className="flex w-full">
					<DataList>{<>{drivers}</>}</DataList>
				</div>
			)}
			{index === 2 && (
				<div className="flex w-full">
					<DataList>{<>{constructors}</>}</DataList>
				</div>
			)}
		</section>
	);
};

export default ResultStanding;
