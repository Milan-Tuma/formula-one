import { useState, useEffect, useCallback, useMemo } from 'react';

import {
	getDataHandler,
	getRaceData,
	getDriverStandings,
	getConstructorStandings,
} from './utils/race-helper';

import RaceCalendar from './components/race-calendar/RaceCalendar';
import RaceResult from './components/race-result/RaceResult';
import SeasonStandings from './components/season-standings/SeasonStandings';
import Loader from './components/ui/Loader';
import ConstructorStandings from './components/constructor-standings/ConstructorStandings';
import RecentRaces from './components/recent-races/RecentRaces';
import ResultStanding from './components/result-standing/ResultStanding';
import RaceSelector from './components/race-selector/RaceSelector';

import './index.css';

const App = () => {
	let today = new Date();

	const [data, setData] = useState();
	const [season, setSeason] = useState(today.getFullYear());
	const [race, setRace] = useState();
	const [raceData, setRaceData] = useState();
	const [standings, setStandings] = useState();
	const [constructors, setConstructors] = useState();
	const [loading, setLoading] = useState(false);

	const lastRace = useMemo(() => {
		if (!data) return;
		const finishedRaces = data.Races.filter(
			(race) => new Date(race.date) < new Date()
		);
		const recentRace = finishedRaces.reverse();
		return recentRace[0];
	}, [data]);

	const nextRace = useMemo(() => {
		if (!data) return;
		const unfinishedRaces = data.Races.filter(
			(race) => new Date(race.date) > new Date()
		);
		return unfinishedRaces[0];
	}, [data]);

	const finishedRaces = useCallback(() => {
		try {
			if (!data) return;
			const finishedRaces = data.Races.filter((race) => {
				return new Date(race.date) < new Date();
			});
			const raceNumber = finishedRaces.length;
			setRace(raceNumber);
		} catch (error) {
			throw new Error(error.message);
		}
	}, [data]);

	useEffect(() => {
		(async () => {
			const seasonData = await getDataHandler(season, setLoading);
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
			<h1 className="text-xl">Formula One App Listening</h1>
			<div style={{ position: 'fixed', top: '10px', right: '20px' }}>
				{loading && <Loader />}
			</div>
			<div>
				<input
					onChange={(e) => setSeason(e.target.value)}
					value={season}
					type="number"
				/>
			</div>
			<div style={{ display: 'flex' }}>
				{data && (
					<RaceCalendar year={season} racesData={data} setRaceData={setRace} />
				)}
				{raceData && <RaceResult raceData={raceData} />}
				{standings && <SeasonStandings standingsData={standings} />}
				{constructors && (
					<ConstructorStandings constructorsData={constructors} />
				)}
			</div>
			{data && season === today.getFullYear() && (
				<RecentRaces lastRace={lastRace} nextRace={nextRace} />
			)}
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
