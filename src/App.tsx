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
	seasonDataType,
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

	const [seasonData, setSeasonData] =
		useState<seasonDataType['MRData']['RaceTable']>();
	const [season, setSeason] = useState<number>(today.getFullYear());
	const [activeRace, setActiveRace] = useState<number>();
	const [raceData, setRaceData] = useState<raceType[]>();
	const [standings, setStandings] = useState<driverStadingsType[]>();
	const [constructors, setConstructors] =
		useState<constructorStandingsType[]>();
	const [loading, setLoading] = useState<boolean>(false);

	const lastRace = useMemo(() => {
		if (!seasonData) return;
		const finishedRaces = seasonData.Races.filter(
			(activeRace) => new Date(activeRace.date) < new Date()
		);
		const recentRace = finishedRaces.reverse();
		return recentRace[0];
	}, [seasonData]);

	const nextRace = useMemo(() => {
		if (!seasonData) return;
		const unfinishedRaces = seasonData.Races.filter(
			(activeRace) => new Date(activeRace.date) > new Date()
		);
		return unfinishedRaces[0];
	}, [seasonData]);

	useEffect(() => {
		(async () => {
			const seasonData: seasonDataType = await getDataHandler(`${season}`);
			setSeasonData(seasonData.MRData.RaceTable);
		})();
	}, [season]);

	useEffect(() => {
		(async () => {
			if (!activeRace) {
				return setActiveRace(finishedRaces(seasonData));
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
	}, [activeRace, season, seasonData]);

	return (
		<div>
			<Hero headline="F1" year={season} setSeason={setSeason} />
			<div style={{ position: 'fixed', top: '10px', right: '20px' }}>
				{loading && <Loader />}
			</div>
			<div style={{ display: 'flex' }}>
				{/* {seasonData && (
					<RaceCalendar year={season} racesData={seasonData} setRaceData={setActiveRace} />
				)} */}
				{raceData && <RaceResult raceData={raceData} />}
				{standings && <SeasonStandings standingsData={standings} />}
				{constructors && (
					<ConstructorStandings constructorsData={constructors} />
				)}
			</div>
			{seasonData && <RecentRaces lastRace={lastRace} nextRace={nextRace} />}
			{seasonData && (
				<RaceSelector
					setRace={setActiveRace}
					currRace={activeRace}
					racesData={seasonData}
				/>
			)}
			{seasonData && (
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
