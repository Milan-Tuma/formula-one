import axios from 'axios';
import {
	constructorStandingsType,
	driverStandingsType,
	raceResultType,
} from '../types/ergastAPI';

export const getDataHandler = async (apiUrl: string) => {
	const response = await axios.get(`https://ergast.com/api/f1/${apiUrl}.json`);
	return response.data;
};

export const getRaceData = async (
	season: number,
	race: number,
	setLoading: (arg1: boolean) => void
) => {
	setLoading(true);
	const data: raceResultType = await getDataHandler(
		`${season}/${race}/results`
	);
	setLoading(false);
	return data.MRData.RaceTable.Races[0].Results;
};

export const getDriverStandings = async (
	season: number,
	race: number,
	setLoading: (arg1: boolean) => void
) => {
	setLoading(true);
	const data: driverStandingsType = await getDataHandler(
		`${season}/${race}/driverStandings`
	);
	setLoading(false);
	return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};

export const getConstructorStandings = async (
	season: number,
	race: number,
	setLoading: (arg1: boolean) => void
) => {
	setLoading(true);
	const data: constructorStandingsType = await getDataHandler(
		`${season}/${race}/constructorStandings`
	);
	setLoading(false);
	return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
};
