import axios from 'axios';

export const getDataHandler = async (apiUrl) => {
	const response = await axios.get(`https://ergast.com/api/f1/${apiUrl}.json`);
	return response.data;
};

export const getRaceData = async (season, race, setLoading) => {
	setLoading(true);
	const data = await getDataHandler(`${season}/${race}/results`);
	setLoading(false);
	return data.MRData.RaceTable.Races[0].Results;
};

export const getDriverStandings = async (season, race, setLoading) => {
	setLoading(true);
	const data = await getDataHandler(`${season}/${race}/driverStandings`);
	setLoading(false);
	return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};

export const getConstructorStandings = async (season, race, setLoading) => {
	setLoading(true);
	const data = await getDataHandler(`${season}/${race}/constructorStandings`);
	setLoading(false);
	return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
};
