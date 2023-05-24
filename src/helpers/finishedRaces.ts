import { seasonDataType } from '../types/ergastAPI';

export const finishedRaces = (data?: seasonDataType['MRData']['RaceTable']) => {
	if (!data) return;
	return data.Races.filter((race) => new Date(race.date) < new Date()).length;
};
