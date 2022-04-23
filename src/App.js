import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import RaceCalendar from './components/race-calendar/RaceCalendar';
import RaceResult from './components/race-result/RaceResult';
import SeasonStandings from './components/season-standings/SeasonStandings';
import Loader from './components/ui/Loader';

/*
	API
		All results - `https://ergast.com/api/f1/${season}/results.json`
		Single race - `https://ergast.com/api/f1/${season}/${race}/results.json` 
*/

const App = () => {
	const today = new Date();

	const [data, setData] = useState();
	const [season, setSeason] = useState(today.getFullYear());
	const [race, setRace] = useState();
	const [raceData, setRaceData] = useState();
	const [standings, setStandings] = useState();
	const [loading, setLoading] = useState(false);

	const finishedRaces = useCallback(() => {
		try {
			if (data) {
				const finishedRaces = data.Races.filter((race) => {
					return new Date(race.date) < new Date();
				});
				setRace(finishedRaces.length);
			}
		} catch (error) {
			console.log(error.message);
		}
	}, [data]);

	useEffect(() => {
		(async () => {
			const seasonData = await getDataHandler(season);
			setData(seasonData.MRData.RaceTable);
		})();
	}, [season]);

	useEffect(() => {
		(async () => {
			if (!race) {
				finishedRaces();
				return;
			}
			const raceData = await getDataHandler(`${season}/${race}/results`);
			setRaceData(raceData.MRData.RaceTable.Races[0].Results);

			const standingsData = await getDataHandler(
				`${season}/${race}/driverStandings`
			);
			setStandings(
				standingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings
			);
		})();
	}, [race, season, data, finishedRaces]);

	const getDataHandler = async (apiUrl) => {
		setLoading(true);
		const response = await axios.get(
			`https://ergast.com/api/f1/${apiUrl}.json`
		);
		setLoading(false);
		return response.data;
	};

	return (
		<div>
			<h1>Formula One App Listening</h1>
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
			</div>
		</div>
	);
};

export default App;
