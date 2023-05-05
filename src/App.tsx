import { useState, useEffect, useMemo } from 'react';
import {
	getDataHandler,
	getRaceData,
	getDriverStandings,
	getConstructorStandings,
} from './utils/race-helper';
// import RaceCalendar from './components/activeRace-calendar/RaceCalendar';
import RaceResult from './components/RaceResult/RaceResult';
import SeasonStandings from './components/SeasonStanding/SeasonStandings';
import Loader from './components/ui/Loader';
import ConstructorStandings from './components/ConstructorStanding/ConstructorStandings';
import RecentRaces from './components/RecentRaces';
import ResultStanding from './components/ResultStanding/ResultStanding';
import RaceSelector from './components/RaceSelector/RaceSelector';

import './index.css';
import Hero from './components/Hero';
import { finishedRaces } from './helpers/finishedRaces';
import {
	ConstructorType,
	DriverType,
	FastestLapType,
	StandingsType,
	TimeType,
} from './types/ergastAPI';

export type raceType = {
	Constructor: ConstructorType;
	Driver: DriverType;
	FastestLap: FastestLapType;
	Time: TimeType;
	grid: string;
	laps: string;
	number: string;
	points: string;
	position: string;
	positionText: string;
	status: string;
};

export type driverStadingsType = {
	Constructor: ConstructorType;
	Driver: DriverType;
} & StandingsType;

export type constructorStandingsType = {
	Constructor: ConstructorType;
} & StandingsType;

const App = () => {
	let today = new Date();

	const [data, setData] = useState<any>();
	const [season, setSeason] = useState<number>(today.getFullYear());
	const [activeRace, setActiveRace] = useState<number>();
	const [raceData, setRaceData] = useState<raceType[]>();
	const [standings, setStandings] = useState<driverStadingsType[]>();
	const [constructors, setConstructors] =
		useState<constructorStandingsType[]>();
	const [loading, setLoading] = useState<boolean>(false);

	const lastRace = useMemo(() => {
		if (!data) return;
		const finishedRaces = data.Races.filter(
			(activeRace: any) => new Date(activeRace.date) < new Date()
		);
		const recentRace = finishedRaces.reverse();
		return recentRace[0];
	}, [data]);

	const nextRace = useMemo(() => {
		if (!data) return;
		const unfinishedRaces = data.Races.filter(
			(activeRace: any) => new Date(activeRace.date) > new Date()
		);
		return unfinishedRaces[0];
	}, [data]);

	useEffect(() => {
		(async () => {
			const seasonData = await getDataHandler(`${season}`);
			setData(seasonData.MRData.RaceTable);
		})();
	}, [season]);

	useEffect(() => {
		(async () => {
			if (!activeRace) {
				return setActiveRace(finishedRaces(data));
			}

			const racePromise = getRaceData(season, activeRace, setLoading);
			const driversPromise = getDriverStandings(season, activeRace, setLoading);
			const constructorsPromise = getConstructorStandings(
				season,
				activeRace,
				setLoading
			);

			const dataPromise = Promise.all([
				racePromise,
				driversPromise,
				constructorsPromise,
			]);

			const [races, drivers, constructors] = await dataPromise;

			setRaceData(races);
			setStandings(drivers);
			setConstructors(constructors);
		})();
	}, [activeRace, season, data]);

	return (
		<div>
			<Hero headline="F1" year={season} />
			<div style={{ position: 'fixed', top: '10px', right: '20px' }}>
				{loading && <Loader />}
			</div>
			<div style={{ display: 'flex' }}>
				{/* {data && (
					<RaceCalendar year={season} racesData={data} setRaceData={setActiveRace} />
				)} */}
				{raceData && <RaceResult raceData={raceData} />}
				{standings && <SeasonStandings standingsData={standings} />}
				{constructors && (
					<ConstructorStandings constructorsData={constructors} />
				)}
			</div>
			{data && <RecentRaces lastRace={lastRace} nextRace={nextRace} />}
			{data && (
				<RaceSelector
					setRace={setActiveRace}
					currRace={activeRace}
					racesData={data}
				/>
			)}
			{data && (
				<ResultStanding
					raceData={raceData}
					driversData={standings}
					constructorsData={constructors}
				/>
			)}
		</div>
	);
};

export default App;
