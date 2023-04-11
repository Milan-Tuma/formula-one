import { useState, useEffect, useCallback, useMemo } from 'react';
import {
	getDataHandler,
	getRaceData,
	getDriverStandings,
	getConstructorStandings,
} from './utils/race-helper';
// import RaceCalendar from './components/race-calendar/RaceCalendar';
import RaceResult from './components/race-result/RaceResult';
import SeasonStandings from './components/season-standings/SeasonStandings';
import Loader from './components/ui/Loader';
import ConstructorStandings from './components/constructor-standings/ConstructorStandings';
import RecentRaces from './components/RecentRaces';
import ResultStanding from './components/result-standing/ResultStanding';
import RaceSelector from './components/race-selector/RaceSelector';

import './index.css';
import Hero from './components/Hero';

const App = () => {
	let today = new Date();

	const [data, setData] = useState<any>();
	const [season, setSeason] = useState<number>(today.getFullYear());
	const [race, setRace] = useState<any>();
	const [raceData, setRaceData] = useState<any>();
	const [standings, setStandings] = useState<any>();
	const [constructors, setConstructors] = useState<any>();
	const [loading, setLoading] = useState<boolean>(false);

	const lastRace = useMemo(() => {
		if (!data) return;
		const finishedRaces = data.Races.filter(
			(race: any) => new Date(race.date) < new Date()
		);
		const recentRace = finishedRaces.reverse();
		return recentRace[0];
	}, [data]);

	const nextRace = useMemo(() => {
		if (!data) return;
		const unfinishedRaces = data.Races.filter(
			(race: any) => new Date(race.date) > new Date()
		);
		return unfinishedRaces[0];
	}, [data]);

	const finishedRaces = useCallback(() => {
		try {
			if (!data) return;
			const finishedRaces = data.Races.filter((race: any) => {
				return new Date(race.date) < new Date();
			});
			const raceNumber = finishedRaces.length;
			setRace(raceNumber);
		} catch (error: any) {
			throw new Error(error.message);
		}
	}, [data]);

	useEffect(() => {
		(async () => {
			const seasonData = await getDataHandler(`${season}`);
			setData(seasonData.MRData.RaceTable);
		})();
	}, [season]);

	useEffect(() => {
		(async () => {
			if (!race) {
				return finishedRaces();
			}

			const raceData = await getRaceData(season, race, setLoading);
			setRaceData(raceData);

			const standingsData = await getDriverStandings(season, race, setLoading);
			setStandings(standingsData);

			const constructorsData = await getConstructorStandings(
				season,
				race,
				setLoading
			);
			setConstructors(constructorsData);
		})();
	}, [race, season, data, finishedRaces]);

	return (
		<div>
			<Hero headline="F1" year={season} />
			<div style={{ position: 'fixed', top: '10px', right: '20px' }}>
				{loading && <Loader />}
			</div>
			<div style={{ display: 'flex' }}>
				{/* {data && (
					<RaceCalendar year={season} racesData={data} setRaceData={setRace} />
				)} */}
				{raceData && <RaceResult raceData={raceData} />}
				{standings && <SeasonStandings standingsData={standings} />}
				{constructors && (
					<ConstructorStandings constructorsData={constructors} />
				)}
			</div>
			{data && <RecentRaces lastRace={lastRace} nextRace={nextRace} />}
			{data && (
				<RaceSelector setRace={setRace} currRace={race} racesData={data} />
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
